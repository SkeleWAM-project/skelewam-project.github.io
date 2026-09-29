# SkeleWAM project website

Authors: Juyi Sheng, Hua Wang, Mengyuan Liu.
Affiliation: Peking University (all authors).

## Preview

Open `dist/index.html`, or run `python -m http.server 8765` from `dist` and visit http://127.0.0.1:8765/. The ZIP package places the site files directly at its root; open `index.html` after extracting it.

The website is static and requires no installation or build step. Upload the contents of `dist` to a static hosting service to publish it.

## Contents

- English project page with Peking University affiliation and emblem.
- A single viewer for all five tasks, with thumbnail task selection, RGB/skeleton modes, and front/top/wrist skeleton views.
- Fifteen skeleton visualizations covering five tasks and three camera views.
- Method figures, simulation and real-world results, manuscript download, and a copyable citation.
- Responsive layouts, keyboard-accessible controls, and reduced-motion support.

The standalone paper introduction and download card have been removed. The paper remains accessible from the header and footer. No code repository link is included.

## Content and assets

Scientific content comes from the supplied manuscript. Author names and affiliation follow the user's instructions. No acceptance status, DOI, or arXiv identifier has been added.

Headline results are 85.9% LIBERO-Plus success, 57.1M parameters, 93.4% camera-perturbation success, and 89% mean real-world success across five tasks with 20 trials per task. The privileged sim-state result is identified separately.

Skeleton videos are reconstructions from recorded interactions. RGB clips are separate task recordings; no frame-level correspondence is claimed. The videos are not presented as independent evidence of policy success rates.

Original source assets are preserved. Web copies use compressed images and browser-compatible H.264 videos.

## Editing

- `dist/index.html`: page content, affiliation, tables, and citation.
- `dist/styles.css`: typography, colors, and layout.
- `dist/app.js`: gallery, task, camera, and representation controls.
- `dist/skelewam.pdf`: manuscript file.
- `dist/assets/images`: figures and university emblem.
- `dist/assets/videos/rgb`: browser-compatible task recordings.

Manrope and DM Sans load from Google Fonts, with system font fallbacks. If clipboard access is unavailable, the citation button selects the text for manual copying.

## Design references

The page uses an original implementation informed by these project websites:

- [OpenWAM](https://openwam-official.github.io/#video): affiliation presentation. The task viewer retains the earlier unified layout requested by the user.
- [VidBot](https://hanzhic.github.io/vidbot-project/): concise contribution framing and representation visualizations.
- [GEM](https://vita-epfl.github.io/GEM.github.io/): video-centered capability sections.
- [Robotic Visual Instruction](https://robotic-visual-instruction.github.io/): task-specific video labels.
- [HDP](https://yusufma03.github.io/projects/hdp/): method and process visualization structure.

The Peking University emblem was obtained from the [OpenWAM affiliation asset](https://openwam-official.github.io/data/institutions/pku.png).

## Publication status

The local website is complete. A private online site was registered, but no version was uploaded or published because the Sites publishing component became unavailable. The existing site identifier is retained in `.openai/hosting.json` for future use.

## Validation

Local asset references and script syntax were checked. Browser checks covered task selection, camera switching, RGB/skeleton switching, citation copying, and expandable details. Desktop and mobile layouts were checked for page overflow.
