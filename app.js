'use strict';
(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hero = document.getElementById('hero-video');
  if (reducedMotion) { hero.removeAttribute('autoplay'); hero.pause(); }

  const tasks = {
    '1-2': { title: 'Close drawer', file: 'close_drawer' },
    '2-2': { title: 'Open drawer', file: 'open_drawer' },
    '3-2': { title: 'Put block in drawer', file: 'put_block_in_drawer' },
    '4-2': { title: 'Stack blocks', file: 'stack_blocks' },
    '5-2': { title: 'Stack bowls', file: 'stack_bowls' }
  };
  const views = { front: 'Front', top: 'Top', wrist: 'Wrist' };
  let currentTask = '2-2';
  let currentView = 'front';
  let currentMode = 'skeleton';
  const video = document.getElementById('demo-video');
  const error = document.getElementById('video-error');
  const sourceLink = document.getElementById('video-direct');
  function updateVideo() {
    const task = tasks[currentTask];
    const skeleton = currentMode === 'skeleton';
    const src = skeleton ? `assets/videos/${currentTask}/${currentView}_2d3d.mp4` : `assets/videos/rgb/${task.file}.mp4`;
    video.pause();
    error.hidden = true;
    video.poster = skeleton ? `assets/posters/${currentTask}-${currentView}_2d3d-poster.jpg` : `assets/posters/${task.file}-poster.jpg`;
    video.src = src;
    video.setAttribute('aria-label', `${task.title}: ${skeleton ? `${views[currentView]}-view skeleton visualization` : 'RGB recording'}`);
    video.closest('.video-stage').classList.toggle('rgb', !skeleton);
    sourceLink.href = src;
    document.getElementById('camera-picker').hidden = !skeleton;
    document.getElementById('task-instruction').textContent = `“${task.title}.”`;
    document.getElementById('view-description').textContent = skeleton ? `${views[currentView]} camera · RGB + reconstructed skeleton` : 'RGB video · separate task recording';
    video.load();
    if (!reducedMotion) video.play().catch(() => {});
  }
  document.querySelectorAll('[data-task]').forEach(button => {
    button.addEventListener('click', () => {
      currentTask = button.dataset.task;
      document.querySelectorAll('[data-task]').forEach(item => { const selected = item === button; item.setAttribute('aria-pressed', String(selected)); item.classList.toggle('selected', selected); });
      updateVideo();
    });
  });
  document.querySelectorAll('[data-view]').forEach(button => {
    button.addEventListener('click', () => {
      if (currentView === button.dataset.view) return;
      currentView = button.dataset.view;
      document.querySelectorAll('[data-view]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      updateVideo();
    });
  });
  document.querySelectorAll('[data-mode]').forEach(button => {
    button.addEventListener('click', () => {
      if (currentMode === button.dataset.mode) return;
      currentMode = button.dataset.mode;
      document.querySelectorAll('[data-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      updateVideo();
    });
  });
  video.addEventListener('error', () => { error.hidden = false; });
  // Keep the page quiet and avoid decoding video outside the viewport.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) entry.target.pause();
      else if (entry.target === hero && !reducedMotion && !hero.dataset.manuallyPaused) hero.play().catch(() => {});
    }), { threshold: 0.15 });
    observer.observe(hero); observer.observe(video);
    hero.addEventListener('click', () => { hero.dataset.manuallyPaused = 'true'; });
    const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) document.querySelectorAll('.nav-links a').forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
    }), { rootMargin: '-20% 0px -60% 0px' });
    document.querySelectorAll('section[id]').forEach(section => sectionObserver.observe(section));
  }
  document.getElementById('copy-citation').addEventListener('click', async () => {
    const text = document.getElementById('citation-text').textContent;
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(text);
      status.textContent = 'Citation copied.';
      document.querySelector('#copy-citation span').textContent = 'Copied';
      setTimeout(() => { document.querySelector('#copy-citation span').textContent = 'Copy BibTeX'; status.textContent = ''; }, 2500);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(document.getElementById('citation-text'));
      const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
      status.textContent = 'Citation selected. Press Ctrl+C (or ⌘C) to copy.';
    }
  });
})();
