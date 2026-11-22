# Ali Hamoudi — Portfolio

A React, TypeScript, and Vite portfolio with a monochrome landing page, a continuous work gallery, dedicated work pages, and a project inquiry form.

## Development

```powershell
npm.cmd install
npm.cmd run dev
npm.cmd run build
```

Use `npm` in shells without PowerShell's script execution restriction. `npm.cmd run lint` is also available.

## Navigation and layout

- The landing introduces Ali by name and role, then presents two main actions: **See my work**, which scrolls to the gallery, and **Start a project**, which opens `/start-project`. LinkedIn, GitHub, email, phone, and résumé links use the original numbered, staggered arrangement. Phones retain an open, asymmetric composition: compact actions sit beside the flower, and the editorial copy has its own space below. Action helper lines are omitted on phones. The mobile hero can extend beyond the first viewport instead of squeezing every element onto one screen.
- The flower, blurred backdrop, grain, regular sans-serif typography, corner framing, and monochrome gallery remain the visual foundation. `src/Landing.css` owns the landing layout. The existing 80% visual scale is defined in `src/index.css`; body text and controls compensate for it to remain readable and touch targets stay at least 44 rendered pixels.
- The gallery uses native wheel and touch scrolling, with the browser scrollbar visible. Its slim sticky header contains only the selected-work title, plain underlined category filters, and a home link. Visible counts, the project picker, the Previous/Next dock, and preview badges have been removed. Result changes are still announced to screen readers. Project titles and short descriptions use the original small, lowercase, staggered numbered rows and an underlined **View details** link.
- Selecting a preview, title, or **View details** expands that item in place, retaining the surrounding gallery and each work's original accent colors and media. Details stay open while reading. Scrolling beyond either edge of the scene collapses it, preserving the position of the next item when its height changes. Close, Escape, browser Back, or changing categories also close details. Close and Escape restore focus to the item. Modified clicks still open `/work/:slug?category=…` directly, preserving the category even in a new tab or with session storage unavailable.
- Gallery filters use `?category=experience`, `freelance`, `projects`, or `community`. The Community label retains the `community` URL value. Item links use `#item-:slug`. `/index` and the old category routes normalize to the homepage gallery. `src/galleryNavigation.ts` owns shared labels, links, and return navigation.
- Gallery scenes fill at least the space below the sticky toolbar on phones, tablets, and desktops. Mobile artwork sits toward the left, followed by a generous gap and text offset to the right, preserving the desktop's editorial spacing. Longer descriptions and expanded details grow naturally. The end of the gallery provides a project inquiry action and a route back to the top.
- `src/WorkSceneMedia.tsx` shares the media renderer between gallery and detail pages. Live website frames preload the next three applicable previews and retain started frames while browsing. Saved images and project artwork keep their original focus framing. External sites control whether they can be embedded. VironixAI uses its saved screenshot and links to `https://vironixai.ca/`.
- `src/Responsive.css` owns gallery and detail breakpoints; `src/Gallery.css` owns gallery controls and scenes. Keyboard focus, the skip link, labeled controls, and reduced-motion navigation are supported. Navigation glides can be interrupted by wheel, touch, pointer, or keyboard input.
- Tracking remains restrained: desktop uses ten shapes on the landing, seven per gallery scene or direct detail, and five on the inquiry page. Phones use six, four, and three respectively, with slower, fainter motion to keep their smaller canvas quiet. Gallery layers remain attached to their scenes and adjust their tone when details open or close; offscreen layers pause. Reduced-motion preferences disable the layers. `src/App.tsx` manages visibility, text masks, responsive density, and cleanup for `public/blob-overlay.js`.
- Work names, descriptions, roles, media, and links come from `src/data/work.ts`. Claims follow `Ali_Hamoudi_Resume.tex`, with `Experience_compressed.md` supplying supporting detail. Existing slugs remain stable. Artwork is served from `public/item-images/`; `workPresentation.ts` derives its data from the same source.

## Project inquiries

- `/start-project` and the legacy `/note` route open the inquiry form. It collects a name, one contact method (email, phone, handle, or profile link), and a project idea. Required values are trimmed before submission.
- The inquiry shares the landing page's gray paper, grain, blurred flower, narrow framed image, restrained typography, and dark primary action. Form labels remain explicit; decorative field numbers and arrow icons have been removed. Smaller screens stack the content and form.
- Pending submissions prevent duplicates. Failure preserves the entered details and provides a retry and direct email option. Success focuses the confirmation heading, explains the next step, and offers a return to the portfolio.
- Delivery uses Netlify Forms. The `portfolio-project` form is mirrored in `index.html` for build-time detection. Deploy to Netlify with form detection enabled to receive submissions. Vite development servers do not deliver inquiries; browser verification must mock POST responses rather than send real messages.

## Verification

`npm.cmd run build` checks TypeScript and creates the production build. Browser checks should cover desktop and mobile layouts, gallery filters, inline details, scrolling out in both directions without position jumps, Close/Escape/browser Back, direct and legacy links, keyboard focus, reduced motion, résumé download, and mocked inquiry success/failure.
