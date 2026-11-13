# Ali Hamoudi — Portfolio

The portfolio is a React, TypeScript, and Vite application.

## Development

```powershell
npm install
npm run dev
npm run build
npm run lint
```

## Work previews

- The homepage opens with the landing composition, followed immediately by the work reel. It fills one viewport on desktop and grows naturally on smaller or shorter screens. Native scrolling goes directly through the projects. “See my work” scrolls to `#work-gallery` on the same page; there is no second introduction or entry step.
- The landing, gallery, and filter bar share the same neutral paper color and fixed grain texture. The blurred flower fades before the gallery starts, and gallery backdrops render continuously to avoid a blank background while scrolling into a project.
- Each desktop gallery item fills the viewport and reuses the individual work page’s iframe/image renderer and text placement. At widths up to 1000px, wide previews sit above readable text and each section grows to fit its content. One continuous grain layer surrounds the focus window. In the gallery overview it is opaque neutral white, keeping iframe and artwork edges from showing through; expanded details use their original tinted blur. There are no card containers or dividers.
- The gallery scrolls continuously with native wheel and touch scrolling, without snapping. Focus windows have no border lines or centered plus icons. A sticky category bar keeps All work, Experience, Client work, Projects, and Extracurricular visible while browsing. Selection uses a thin rectangular outline. It shows the selected category and result counts. The top-right menu and project-index dropdown have been removed.
- On phones and tablets, categories use a labeled native selector in a thin rectangular outline, with the current result count beside it. All categories remain available without sideways scrolling. Touch previews keep a stable width, and close, information, and project links have at least 44px touch targets. `src/Responsive.css` owns the final responsive adjustments across the homepage, gallery, direct project pages, and inquiry form.
- Each focus window has an always-visible corner arrow. Clicking the image or the underlined “Click for more info” cue expands that item in place using the existing project-page composition and accent colors. Details are split into a brief overview, two highlights, and a compact tools list with an external project link. Selecting another item closes the previous one. Its close button restores the gallery view. Items have no previous/next buttons; visitors scroll between projects. Expanded sections and direct detail pages grow as needed without clipping.
- Opening an item saves its position and category in session storage. Direct `/work/:slug` pages remain available and their close link returns to the same place in the gallery. Filtered galleries can also be opened with `?category=experience`, `freelance`, `projects`, or `community`.
- All category navigation uses the homepage gallery: Experience, Client work, Projects, and Extracurricular open `/?category=…#work-gallery` directly at the matching work. Extracurricular retains the `community` URL category for existing links and saved positions. Old `/index`, `/experience`, `/freelance`, `/projects`, `/extracurricular`, and `/community` URLs resolve to the same gallery and normalize their URL. The legacy card/list pages have been removed. Filter changes support browser back/forward navigation without a page reload; category labels and URLs are shared through `src/galleryNavigation.ts`.
- The staggered landing navigation uses underlined labels and direction arrows, including an explicit Download résumé/PDF link. Start a project has moved into a separate “Want to build something?” CTA below “See my work.”
- The home-page monochrome rules live in `src/Browsing.css`; the gallery’s full-screen composition is in `src/Gallery.css` and `src/WorkShowcase.tsx`. `src/WorkSceneMedia.tsx` shares media markup, and `src/WorkDetailContent.tsx` shares the full detail content between individual pages and expanded gallery items. All item names, brief descriptions, expanded stories, and media metadata are shared through `src/data/work.ts`; `workPresentation.ts` derives its presentation data from that source.
- The landing and work-page blurred areas have a static film-grain texture; focused previews and interface text remain untextured.
- Work pages embed each public website at a reduced scale behind a blurred backdrop. The focused rectangle expands on hover or keyboard focus and links to the site. Some external sites may prevent embedding.
- Items without a public website use their supplied artwork, fitted within the viewport over a blurred background; their focus rectangle links to a GitHub repository when one exists. The mobile apartment view and direct course page layer interface details from the original artwork. Tutoring and government use white backdrops, and the charity artwork uses a matching blue fill.
- Item names and claims follow `Ali_Hamoudi_Resume.tex`, with `Experience_compressed.md` supplying supporting detail and items omitted from the one-page résumé. Gallery descriptions stay around one short sentence; expanded views add concise, separately labeled blocks rather than long paragraphs. Apartment and course-monitor titles use their current résumé names, while their existing slugs remain stable for links and artwork framing. The expanded desktop apartment view fits its source artwork inside the media column so the terminal cannot overlap the text.
- The typography uses a regular-weight, tightly spaced sans-serif editorial style; work-page text retains each item's accent color.
- Gallery artwork from the root `item-images/` directory is published from `public/item-images/`.
- The animated tracking overlay runs on the landing, gallery, inquiry form, and individual work pages. Each section has an absolutely positioned layer from the dependency-free `public/blob-overlay.js`; shapes scroll with that section rather than following the viewport. `src/App.tsx` manages section creation, local text masks, motion preferences, and visibility. Offscreen layers stop animating and release their bitmaps while retaining their tracking state for when visitors scroll back. Filters and inline details update the layers without duplicates.
- Page-level fallback coverage applies the same anchored behavior to error screens and pages without individual tracking sections.
- The gallery preloads the next three website previews, starting on the introduction, and retains started frames while browsing so returning to a project does not reload it. Third-party sites still control their own startup time. While a preview loads, its window shows a neutral loading surface rather than a project thumbnail. Static-image projects keep their artwork.
- Gallery grain inherits the item pages’ texture, scale, and opacity; multiply blending keeps it visible on the gallery’s lighter grayscale backdrop.
- Course Notifier and Under The Tree use closer gallery crops. The charity artwork is shifted left to keep its baked image edge outside the focus window. Course Notifier uses the notification already in the artwork rather than a second overlapping copy.
- Vironix links to `https://vironixai.ca/` and uses the saved website screenshot in both gallery and detail views because the live domain currently resets connections. Remove its explicit `previewImage` in `src/data/work.ts` when live embedding is available again.

## Project inquiries

- “Want to build something?” opens `/start-project`, a dedicated project inquiry page. The old `/note` URL also opens this form.
- The form collects a name, reply email, project idea, and optional timeline. Required-field and email validation run before submission. A pending state prevents duplicate submissions; failed requests preserve the entered details and offer a retry or direct email.
- Accepted submissions replace the form with a checkmark, confirmation, and Back to portfolio button. The success heading receives focus and the page returns to the top, including on mobile.
- Delivery uses the existing Netlify Forms integration. The `portfolio-project` form and its fields are mirrored in `index.html` for build-time detection. Deploy to Netlify with form detection enabled to receive real submissions. The Vite development server does not handle form delivery. Browser QA uses mocked POST responses to exercise success and failure without sending inquiries.
