# Software Engineer Profile — Ali Hamoudi

## Email: alihamoudiu18@gmail.com

## LinkedIn: https://www.linkedin.com/in/ali-hamoudi/

## Github: https://github.com/alitcs

## Portfolio: https://alihamoudi.com/

## City: Toronto

# Work Experience

## Ontario Government - GovTechON

### Who Ali Is (At a Glance)

Ali is a **full-stack software engineer** who works comfortably across the entire stack of a large enterprise web platform: a Go backend, a Nuxt/Vue frontend, and a WordPress/PHP content-management layer. Ali is equally at home writing new API services, modernizing legacy code, fixing subtle production defects, hardening security, and polishing user-facing UI. Ali gravitates toward **root-cause understanding** rather than surface-level patches, and delivers vertically integrated features that span backend, frontend, and CMS in a single piece of work.

The platform Ali works on is a **large-scale government intranet** serving tens of thousands of public-service employees across many ministries and agencies, alongside a **media delivery service** for enterprise video and file assets. The scale, security expectations, and accessibility/compliance requirements of a public-sector system shape how Ali writes and reviews code.

### Core Engineering Strengths

- **Full-stack ownership.** Ali routinely delivers a single feature end-to-end — designing the Go API endpoint, exposing the right data to the frontend, building the reactive Vue component, and adjusting the WordPress/PHP side where needed. He is not siloed to one tier.
- **Legacy modernization.** A large share of Ali's work is migrating and decoupling legacy systems: moving web framework code to a cleaner, more idiomatic foundation; replacing self-hosted infrastructure with cloud-native equivalents; and lifting business logic out of an aging PHP monolith into modern services and components.
- **Root-cause diagnosis of hard bugs.** Ali is strong at reproducing and explaining tricky, environment-specific defects — the kind that only appear on staging or under concurrency. He traces problems through authentication flows, session/cookie handling, caching layers, hook execution order, and multi-pod timing before proposing a fix.
- **Security-minded by default.** Ali treats input validation, parameterized queries, access control, and safe content handling as standard practice, not afterthoughts. He has found and closed real vulnerabilities.
- **Performance and correctness under load.** Ali understands caching, concurrency, and the failure modes of distributed systems (race conditions, gateway timeouts, cache contention) and designs fixes that hold up when multiple processes run at once.
- **Code quality discipline.** Ali writes idiomatic, consistently formatted code, adds tests where behavior is subtle, and keeps changes focused and reviewable.
- **Clear communicator.** Ali writes concise pull-request summaries and can explain technical decisions in plain, practical language for both engineers and non-engineers.

### Technologies & Tools

**Backend & APIs**

- Go (Golang) — primary backend language
- `go-chi/chi` router and idiomatic Go standard-library HTTP interfaces; middleware chaining
- Echo framework (the legacy framework being migrated away from)
- RESTful API design, context propagation, structured error handling, route-parameter handling
- `gofumpt` for strict, consistent Go formatting

**CMS & PHP**

- PHP and WordPress plugin/theme development (procedural, hook-based)
- Custom WordPress plugins and theme "dashboard" modules
- WordPress upload/MIME pipeline, capability/permission systems, widget architecture

**Frontend & UI/UX**

- JavaScript (ES6+)
- Vue.js with Nuxt 3 (Nitro, server-side rendering)
- Pinia state stores; PrimeVue component library
- HTML5, CSS3/SASS, responsive design, FontAwesome
- jQuery and the browser MutationObserver API for progressive enhancement of server-rendered markup

**Cloud & Infrastructure**

- AWS (S3, and the broader EC2/RDS/VPC/ALB ecosystem)
- AWS Go SDK; MinIO SDK (the self-hosted storage being replaced)
- Docker and Kubernetes
- Helm and a GitOps/ArgoCD delivery model, including per-ticket, branch-pinned image snapshots seeded with production data for realistic QA

**Databases & Caching**

- MySQL / MariaDB
- Redis — used both for ABAC permission caching and for atomic coordination primitives (e.g., `SETNX` locks); familiar with key scans, invalidation strategy, and cache segregation

**Security & Compliance**

- SQL injection mitigation via parameterized queries and input sanitization
- Attribute-Based Access Control (ABAC)
- Network/access governance for media assets
- MIME-type validation and HTML tag whitelisting/sanitization
- WCAG 2.1 AA / AODA accessibility standards

**Observability**

- New Relic (proxy integration / telemetry)

**Process & Collaboration**

- Git and Bitbucket, with a pull-request-based review workflow
- Jira Cloud and Confluence
- Feature-branch discipline; merges kept current with main

### The Kinds of Work Ali Does

### Backend service development & API modernization

Ali has done extensive work migrating a suite of Go REST microservices off the older Echo framework onto `go-chi/chi`. This meant reworking core domain endpoints — content sections and their navigation/archive variants, navigation menus and menu-by-slug lookups, RSS/syndication feeds, and the legacy media-delivery routes (iframe embeds and internal media endpoints). Across all of these he standardized how requests are handled, how context flows through the stack, how errors are signaled, and how route parameters are extracted.

Beyond migration, Ali builds **new** backend capabilities: for example, a Go handler that lets the API verify the presence and status of the companion WordPress integration plugin, and backend support for exposing an admin capability flag to the frontend. A recurring theme in his backend work is **consolidating authentication and authorization into the Go API** so access decisions have a single source of truth, rather than being duplicated and drifting between the CMS and the API.

### Cloud storage migration & decoupling

Ali refactored the media-delivery service's asset-storage layer away from a self-hosted MinIO SDK to the official AWS S3 SDK. He used dependency injection to decouple the storage implementation from business logic, so the system could stream video and files, snapshot assets, and scale in a cloud-native way without the rest of the code caring which storage backend is in use.

### Performance, caching & concurrency

Ali resolved gateway-timeout failures caused by expensive Redis key scans during bulk permission/taxonomy invalidations by standing up a **dedicated Redis instance and connection handlers just for ABAC lookups**, spanning both the Go API and the CMS layer, so permission evaluation stays fast and isn't starved by cache flushes.

He also fixed a **concurrency bug that sent duplicate reminder emails**. The original logic used a non-atomic "check, then act" pattern, so two pods or cron runs could both decide to send. Ali replaced it with an **atomic Redis claim** taken before sending (with a release-on-failure fallback) and added concurrency tests — a clean example of understanding distributed-systems failure modes and fixing them correctly rather than papering over the symptom.

### Security & access hardening

Ali found and fixed a **SQL injection vulnerability** in a Go data-access function by enforcing parameterized queries and input sanitization. He hardened **media share links** so internal videos couldn't be streamed publicly outside enterprise security boundaries. He tightened **commenting permissions** so read-only users can't post, and added a user-identity guard to stop duplicate comment submissions. He also investigated a subtle **authorship/byline defect** where a post's original author was being overwritten by whoever last edited it — root-causing it to a delegate "post as" mechanism and to how staging's login/session gating differs from other environments, then proposing an environment-agnostic fix that preserves the original author.

### Frontend, UI/UX & monolith decoupling

Ali modernizes the front end by moving logic out of legacy PHP server-rendered widgets (such as recent-comments and popular-posts widgets) into Go endpoints and reactive Vue components. He improves everyday UX and correctness: fixing navigation-menu rendering, correcting a comment-pagination boundary ("view 0 older comments") edge case, making search autocomplete actually execute the query on selection, stripping raw HTML out of search results, fixing a regional-news widget's display, adding a draft/preview overlay to the content-preview experience, correcting ministry-name alignment on a homepage-switching screen, and improving the global alert banner's styling, contrast, and close button. He also optimized site-wide CSS delivery into a single global bundle to remove redundant network overhead and layout shift.

### CMS widget validation & content safety

On the WordPress side, Ali balances contributor empowerment with safety: whitelisting FontAwesome icon markup in text widgets, adding title and image-URL support to image and text widgets, and consolidating external-URL allow-lists into a shared configuration while extending sensitive-content coverage. He implemented **file-type validation** across image and media widgets — both in the browser and on the server — to block invalid non-image files, and **blocked video uploads to the media library** across every upload path (drag-and-drop, file picker, direct upload, and the REST media endpoint), returning a helpful message that redirects users to the proper media-delivery service instead. He fixed an "ultimate posts" widget defect that caused errors and duplicate event listeners on content/excerpt toggles.

### How Ali Works (Working Style)

- **Delivers complete features, not fragments.** When a change touches three tiers, Ali does all three rather than handing off partial work.
- **Investigates before he changes code.** He reads the existing code paths, reproduces the problem, and confirms the mechanism — especially for environment-specific or intermittent bugs — before writing a fix.
- **Fixes causes, not symptoms.** His fixes tend to address the underlying race, gate, or missing validation, and he adds tests when the behavior is easy to regress.
- **Keeps changes clean and reviewable.** Focused diffs, consistent formatting, and clear PR write-ups.
- **Communicates plainly.** He can translate a subtle technical situation into a straightforward explanation for teammates and stakeholders, and prefers practical, non-jargon language.
- **Operates in a modern cloud-delivery workflow.** He is comfortable with Kubernetes, Helm, and GitOps-style deployment, including using production-data snapshots to validate work realistically.

### One-Paragraph Summary (Reusable)

Ali Hamoudi is a full-stack software engineer on a large government enterprise intranet and media-delivery platform, working fluently across a Go (`chi`) backend, a Nuxt/Vue frontend, and a WordPress/PHP CMS. His work spans backend API development and framework modernization, cloud storage migration to AWS S3, Redis caching and concurrency correctness, security hardening (SQL injection, access control, upload/content validation), and a broad range of frontend and CMS UX improvements. He is a strong root-cause debugger of hard, environment-specific and concurrency bugs, a security-conscious and quality-focused coder, and a clear communicator who ships complete, well-tested, vertically integrated features within a Kubernetes/Helm/GitOps delivery model.

### Additional Government Work — August 12 to November 12, 2026 Review

**Context:** Enterprise public-sector intranet and content-management platform. This review period describes the supplied update, not the full employment period. Existing experience above is retained; the details below expand the accomplishment bank.

#### Media storage, reliability, and automated testing

- Modernized Go media delivery by replacing a MinIO-specific client with the AWS SDK for Go's S3 client, using injected storage interfaces rather than constructing clients inside legacy handlers.
- Added mocks and Go unit tests for object retrieval, streaming, and presigned URL workflows, making storage integrations easier to test independently.
- Extended notification concurrency safeguards with per-recipient Redis `SETNX` claims, expiration, release after failed sends, retry handling, and regression tests for competing workers. These controls reduce duplicate sends when background jobs overlap; they do not establish exactly-once delivery under every failure.
- Corrected reminder-date validation to compare calendar dates so reminders scheduled on a post's publication day are not unintentionally rejected.
- Added media audit events for creation, updates, and deletion using UTC timestamps and parameterized database statements. Release status remains to be confirmed.
- Corrected breadcrumb URL generation and section/tag navigation to address broken links and 404s.

#### Global alerts across the API, frontend, and CMS

- Developed an image-based global-alert enhancement across the Go API, Vue/Nuxt interface, and WordPress administration.
- Added image-only presentation, safe links, URL and form validation, meaningful alternative text, and keyboard-focus restoration.
- Included a non-destructive database/schema upgrade that preserves existing alerts. The enhancement appears in feature-branch history; merge and production-release status remain to be confirmed.

#### Security, access, and editorial integrity

- Adjusted media-document Content Security Policy rules to support required same-origin assets and embedded content while retaining script restrictions.
- Implemented parameterized duplicate-comment checks using the post, parent comment, author, and content, returning a clear conflict response for duplicate submissions.
- Added client- and server-side image-widget validation and guarded against invalid existing images that could break rendering.
- Improved delegated publishing by preserving original author attribution and validating that requested author changes select an authorized delegate.
- Added an administrator-only dashboard shortcut and regression tests to help preserve existing section-level access policies.
- Applied consistent content-visibility rules across WordPress quick edit, bulk edit, and post-save workflows.

#### Reader experience, accessibility, and CMS usability

- Built comment sorting by newest, oldest, and popularity; improved pagination boundaries and automatic scrolling after comment submission.
- Improved subscription confirmations and settings guidance, escaping dynamic values in confirmation messages.
- Repaired missing items in CMS widget "Show All" views, duplicated introductory text, and thumbnail-setting controls.
- Improved regional-news links and screen-reader behavior, responsive navigation, and the draft-preview overlay.
- Removed raw HTML from search-result titles and corrected search skip-link behavior.
- Allowed supported icon markup in text widgets and fixed long-content overflow in comment administration.
- Applied accessibility checks and remediation for keyboard navigation, focus targets, image descriptions, skip links, and screen-reader output, guided by AODA/WCAG practices. This work is not a claim of site-wide certification or audited full compliance.

#### Additional skills and tools reflected in the update

- **Storage and backend design:** AWS SDK for Go, S3-compatible storage, MinIO integration, dependency injection, interfaces, background processing, presigned URLs.
- **Reliability and quality:** Expiring Redis keys, atomic operations, retry handling, Go unit tests, mocks, concurrency regression tests, UTC audit logging.
- **Security and data integrity:** Content Security Policy, URL validation, parameterized SQL, role-based access checks, upload validation, duplicate detection, delegated-author validation.
- **Accessibility/debugging tools reported in the supplied summary:** Accessibility Insights, WAVE, and MailHog. Personal hands-on use remains to be confirmed before listing these as established skills.
- **Working strengths reinforced by this review:** Cross-stack debugging, incremental legacy modernization, accessibility and editorial empathy, regression testing, and collaboration through Git branches and pull requests.

#### Private verification notes for future resume tailoring

These notes retain qualifications from the supplied update alongside the existing profile; they do not remove or silently revise earlier claims.

- The update combines a supplied work summary with locally available Git history. Branches and commits do not establish every contribution, review, merge, or production release.
- **Counts:** 40+ pull requests and 20+ Jira work items were reported but not independently verified. Confirm the timeframe and whether the totals refer to authored, merged, reviewed, or otherwise contributed work before using them as accomplishments.
- **Release status:** Global-alert enhancements and media audit events were found in feature-branch history. Confirm merge/release status before describing them as shipped to production.
- **State management:** Inspected application/dashboard code uses Pinia. A branch name containing `redux` does not establish use of the Redux library; personal Redux experience is unconfirmed.
- **SQL-injection claim:** The existing profile's specific vulnerability-fix claim under IOPS-3553 was not independently identifiable in the update's available local history. Parameterized duplicate-comment SQL is supported separately; confirm the specific vulnerability contribution before using that claim in an application.
- **Timing:** Menu/section migrations, the WordPress plugin-status endpoint, and read-only authorization work have local branch tips dated before August 12, 2026. They remain part of the overall experience, but a later merge/release should be verified before assigning them to this review period.
- **Impact and compliance:** User counts, traffic, memory savings, uptime, eliminated vulnerabilities, exactly-once delivery, and site-wide accessibility compliance are not independently established by this update. Preserve distinctions between implementation, measured impact, and audited outcomes.
- **Platform keywords:** Docker, Kubernetes, Helm, Elasticsearch, and MariaDB appear in broader platform context; that context alone does not verify personal hands-on use of each technology.

#### Private evidence pointers supplied with the update

These commit references are lookup aids from the supplied document, not independently checked repository evidence or resume content.

| Work | Evidence |
| --- | --- |
| Media storage and testability | API commits `35604572` and `6159a888` |
| Notification concurrency | API commit `0dd667bd`; contrib commit `9066dfe9` |
| Global alerts and schema preservation | API commit `9148815c`; contrib commits `254fcf51` and `6eb64d9a` |
| Accessibility | API commits `e7609962`, `e73bf9ec`, and `07eaeba2` |
| Duplicate comments, image uploads, and bylines | Contrib commits `87435419`, `3601a13b`, and `b022d682` |
| Navigation and comments | API commits `bda7aa12`, `0ee47911`, and `c012b086` |
| Media audit events | Media commit `b6664bc` |

## Vironix AI - https://vironixai.ca/

**Role:** Founding Software Engineer / Technical Co-Founder  
**Dates:** Sep 2025 – Present  
**Location:** Toronto, ON

### Role Overview

- Helped start and operate Vironix AI alongside the founding team, contributing across software engineering, technical architecture, product development, hiring, financial planning, and day-to-day startup operations.
- Worked as part of a founding engineering team, taking significant ownership over software architecture and development while collaborating with other engineers and founders.
- Helped take the product from development into a real user-facing product with active users, balancing technical decisions with product, cost, and business constraints.

### Software Architecture & Development

- Helped architect the software underlying a full-stack AI-powered video analytics platform, contributing to the frontend, backend API, asynchronous processing system, AI analysis pipeline, billing system, and supporting services.
- Designed and developed individual software modules across the application, contributing directly to both architecture and implementation rather than solely working on isolated features.
- Worked across a React/TypeScript frontend and Node.js/TypeScript backend, with Firebase/Firestore handling authentication and application data and separate worker processes handling asynchronous video-analysis jobs.
- Contributed to the architecture of the asynchronous video-processing pipeline, including job creation, storage uploads, worker processing, analysis, result persistence, credit deduction, refunds, retries, and failure handling.
- Designed and implemented software supporting credit-based usage and cost accounting, including estimating processing costs, deducting credits, reconciling actual usage, handling refunds, and maintaining credit transaction records.
- Contributed to the AI subsystem, including analytics processing, AI-assisted chat, structured assistant functionality, usage quotas, prompt construction, and integration with external AI and media services.
- Contributed to application billing and monetization through Stripe-based subscriptions, credit purchases, usage tracking, and webhook-driven account state management.
- Helped design and implement production safeguards including authentication, authorization, input validation, rate limiting, signed storage URLs, transactional credit operations, and idempotent job/refund handling.
- Worked across the frontend, backend, database, cloud infrastructure, and third-party integrations when implementing features or resolving system-level problems.

### Product & Cost Engineering

- Performed extensive cost and pricing analysis to determine how customer credit consumption should map to underlying AI, media-processing, and infrastructure costs.
- Helped design the economic model behind usage-based customer credits, balancing customer pricing, plan limits, provider costs, and expected usage.
- Worked on credit estimation and post-processing reconciliation so customer charges could account for differences between estimated and actual processing requirements.
- Helped make product and technical decisions with consideration for unit economics, scalability, customer experience, and operational cost.

### Startup & Company Operations

- Helped launch and operate the company alongside the founding team, contributing beyond software development to product, hiring, financial, and operational decisions.
- Participated in financial management and planning, including evaluating company expenses, infrastructure/provider costs, and how technical spending affected the business.
- Helped translate technical constraints and infrastructure costs into product and business decisions as the company developed its commercial offering.
- Worked directly with the founding team to prioritize engineering work, product functionality, operational requirements, and future development needs.

### Engineering Hiring & Team Building

- Interviewed 50+ software engineering candidates to help build the company's engineering team.
- Participated in evaluating technical candidates, assessing engineering ability, problem-solving, technical experience, and suitability for the startup's needs.
- Helped hire software engineers and grow the engineering team supporting the product.
- Worked with other engineers as part of a collaborative development team, reviewing and contributing to architecture and implementation rather than working as a sole developer.

### Product & User Context

- Helped develop and operate a product used by real customers, incorporating practical product requirements and operational feedback into technical and business decisions.
- Contributed to features spanning video upload and analysis, analytics, AI-assisted recommendations, saved analyses, subscriptions, credit management, social integrations, support workflows, and administrative functionality.
- Balanced rapid startup iteration with production concerns including reliability, security, cost control, data lifecycle, and maintainability.

### Technology

- **Languages:** TypeScript, JavaScript, HTML, CSS
- **Frontend:** React, Vite, Tailwind CSS, Wouter, TanStack Query
- **Backend:** Node.js, Express
- **Data:** Firebase Authentication, Firestore, Firebase/Google Cloud Storage
- **AI/Media:** Google Cloud Video Intelligence, AssemblyAI, LLM integrations, FFmpeg/ffprobe
- **Payments:** Stripe
- **Infrastructure:** Google Cloud, Docker, GitHub Actions
- **Architecture:** REST APIs, asynchronous workers, transactional operations, usage/credit metering, CI/CD

---

### Additional VironixAI Work — November 12, 2026 Update

**Confirmed role in the supplied document:** Technical Co-Founder / Founding Software Engineer. **Company/location/tenure:** VironixAI, Toronto, ON, September 2025–Present. **Current primary domain reported in the update:** https://vironixai.ca/ (migration from https://vironixai.net/).

**Recent-work review:** August 12–November 12, 2026, separate from full employment dates. The following expands the existing profile with application development, cloud operations, deployment troubleshooting, and developer-payment responsibilities. Evidence descriptions and qualifications come from the supplied master document; no repository or cloud verification was performed while adding this material.

#### Production domain migration and cloud operations

- Executed the reported production migration from `vironixai.net` to `vironixai.ca`, coordinating Cloud DNS, HTTPS load balancing, managed TLS certificates, Cloud Run custom domains, and path-preserving Netlify 301 redirects.
- Created a public DNS zone, updated registrar nameserver delegation, managed A/TXT/CNAME records, and completed domain ownership and Search Console verification.
- Routed apex and `www` traffic through a global external HTTPS load balancer, provisioned certificate coverage, and attached a certificate to an existing target proxy while retaining legacy certificates.
- Configured `editor.vironixai.ca` on the existing Cloud Run editor service, including ownership verification and HTTPS setup.
- Added forced permanent redirects from both legacy apex and `www` domains, preserving deep links with `:splat` before the SPA fallback.
- Managed Cloud Run configuration and redeployments using versioned secrets, runtime environment settings, and container images in Artifact Registry; worked across Google Cloud, Netlify, Squarespace, and GitHub.
- Updated password-reset link configuration and investigated Stripe redirect settings during migration.

#### Frontend/backend CI/CD and production debugging

- Fixed the frontend GitHub Actions pipeline to retrieve `VITE_EDITOR_URL` from Google Secret Manager and pass it into Docker/Vite builds, addressing outdated production editor routing.
- Added CI configuration masking with `::add-mask::`. The frontend Dockerfile already contained the corresponding `ARG`/`ENV` declarations; the change completed the workflow-to-build connection.
- Diagnosed separate Express API and Google Cloud Storage CORS failures following the domain migration. The supplied summary reports that allowlist updates restored authentication flows, editor session creation, and access to existing video projects while retaining legacy origins.
- Traced API allowed origins through `CLIENT_URL` and `getClientUrls()`; the reported fix changed configuration rather than introducing new CORS middleware.
- Used browser Network and Console tools to investigate signup, password reset, editor sessions, and old project loading. Distinguished static Vite build-time configuration from runtime service settings.

#### Full-stack internship application feature

- Built a responsive React/TypeScript application page and Express submission endpoint using Tailwind CSS, Wouter, and the existing API configuration.
- Implemented form state, accessible labels, required fields, length limits, loading behavior, success/error feedback with status/alert semantics, and field clearing after successful submission.
- Added server-side Zod constraints and normalization, reused `waitlistLimiter`, and escaped user-supplied values before embedding them in HTML email.
- Routed submissions through the existing `emailService.sendEmail` integration with recipients configured by `INTERN_APPLICATION_EMAIL`; documented the setting in `.env.example`.
- Handled invalid input (`400`), missing recipient configuration (`503`), email delivery failures (`502`), unexpected errors (`500`), and successful submissions (`201`).
- Simplified the initial form from name/email/experience/motivation to name/email/motivation, moved the route from `/internapplication` to `/intern`, and aligned the backend schema and email content.
- **Delivery status:** Implemented on `origin/interns`. The supplied review found the commits outside reviewed `main` ancestry; merge, launch, applicant volume, and conversion outcomes are not established.

#### Transactional email and deployment configuration

- Corrected a historical Resend sender fallback, trimmed configured sender values, and added a domain-mismatch warning to aid configuration troubleshooting.
- Added the `EMAIL_FROM=EMAIL_FROM:latest` Secret Manager binding to the backend Cloud Run deployment workflow so the transactional sender can be supplied through the release pipeline.
- The supplied summary reports configuring a Resend sending domain, DKIM/provider-specific DNS records, and a DMARC policy, with sending-domain DNS verification completed; also investigated partial verification and distinguished sending-domain verification from incoming-mail MX configuration.
- **Completion context:** The September fallback change was from `.net` to `.ai`; later team changes restored a `.net` fallback. The warning is a configuration diagnostic, not a live domain-verification check. Final `.ca` sender activation and successful delivery are unconfirmed; the runtime binding alone does not establish either.

#### Contribution review and developer payouts

- Reviewed developer code changes to assess completed work and created corresponding payouts, connecting technical contribution review with developer compensation and startup engineering operations.
- This responsibility comes from the direct user account preserved in the supplied document. It is separate from customer-facing Stripe subscriptions and credit billing.
- Payment tooling, compensation formulas, amounts, developer counts, cadence, automation, and transfer-completion status were not supplied; no payroll-system, Stripe Connect, tax-administration, or accounting-ownership claim is established.

#### Earlier contributions — outside the recent review window

- **February 2026 — signup and subscription checkout:** Connected Firebase signup to an authenticated Stripe checkout request using the user's ID token and selected plan; handled checkout errors and redirected to the returned checkout URL. Added helpers for customer creation with Firebase metadata, subscription sessions, and webhook signature verification/event construction, and corrected shared plan-price environment keys.
- **March 2026 — Windows development:** Adjusted development scripts, Vite server configuration, and ignore rules for Windows compatibility.
- **April 2026 — video analytics:** Refined hook-power and replayability scoring transformations, filler-word weighting, zero-score behavior, and minimum early-audio signal values in analytics/scoring services. No measured prediction-accuracy or engagement improvement was established.

#### Additional technology and platform context

- **Hands-on work described in the update:** Google Cloud Run, Cloud DNS, HTTPS load balancing, managed TLS, Cloud Storage, Secret Manager, Artifact Registry, GitHub Actions/YAML, Docker/Vite build configuration, DNS, CORS, Netlify redirects, Zod, Resend, and email DNS authentication.
- The platform is team-built. Repository presence of Firebase auth, analytics integrations, Gemini/Vertex AI assistance, FFmpeg processing, the editor, billing, and workers does not by itself establish personal implementation of every subsystem.
- The reviewed worker deployment targets Google Compute Engine; Cloud Run services and worker hosting are distinct. YAML workflow changes do not by themselves establish Kubernetes, Terraform, Helm, or authorship of Cloud Run service manifests.
- Interviewing 50+ candidates and AI usage-cost/credit-pricing analysis remain reported broader-tenure responsibilities; their timing and counts are not established by Git or necessarily confined to this review window.

#### Private evidence ledger and qualifications

The supplied review attributes six recent commits to the confirmed Git identity `alitcs`: four in reviewed `main` and two on `origin/interns`. It examined local refs without fetching; this records the supplied November 12 review, not an independent check of current remote history. Commit counts are lookup aids rather than impact metrics.

| Date | Supplied commit | Contribution and reported status |
| --- | --- | --- |
| September 1, 2026 | `e8240705` | Historical email sender fallback, trimming, and warning; ancestor of reviewed `main`. |
| October 6, 2026 | `272e1803` | Internship page/route, Express endpoint, Zod schema, recipient configuration; `origin/interns`, outside reviewed `main` ancestry. |
| October 8, 2026 | `4e4d81d5` | Simplified `/intern` page, fields, validation, and email; same unmerged-branch qualification. |
| November 11, 2026 | `7c9ec48e` | Legacy apex/`www` path-preserving redirects; ancestor of reviewed `main`. |
| November 11, 2026 | `6d545cd9` | Secret Manager editor URL, Docker build argument, CI masking; ancestor of reviewed `main`. |
| November 11, 2026 | `23260268` | Backend `EMAIL_FROM` secret binding; reviewed `HEAD`/`main`. |
| February 12, 2026 | `6d59d9d4` | Earlier signup, Stripe helpers, and shared plan configuration. |
| March 3, 2026 | `8e33dcaf` | Earlier Windows development compatibility. |
| April 20–23, 2026 | `945e0a1f`, `89fad8e3`, `169a6d84` | Earlier video analytics scoring iterations. |

- Cloud-console migration tasks, successful HTTPS, and restored production flows are reported in the supplied summary. The review did not inspect cloud audit logs, deployment runs, live DNS, or browser sessions. Tracked `cors_storage.json` still lists legacy origins and cannot independently verify the live bucket update.
- The internship branch's historical files differ from the separate careers implementation in reviewed `main`; the feature is described as built, not launched.
- Title confirmation and payout responsibilities come from the user account recorded in the document; start date/location come from the supplied experience summary rather than Git.
- No verified uptime, latency improvement, cost savings, revenue increase, applicant conversion, user count, or payout total was established. No new impact figures are inferred from these changes.
- The source notes AI assistance with the frontend workflow fix; interview examples can distinguish the investigation, decisions, and validation personally performed.

# Projects

## Digital Duel - https://github.com/alitcs/Digital-Duel

**Website:** [digitalduel.netlify.app](https://digitalduel.netlify.app/)

### Project Overview

- Designed and built **Digital Duel**, a local two-player, top-down 2D shooter in C using SDL2.
- Developed and deployed a browser-based game version with keyboard and touch controls, hand-drawn artwork, and custom physics.
- Developed a complete playable game loop featuring a main menu, active gameplay, game-over state, player resets, projectile combat, collision detection, and real-time movement.
- Implemented two independent player control schemes, directional aiming and shooting, projectile cooldowns, arena obstacles, and opponent collision detection.
- Created all game graphics by hand, including the menu, arena, player, projectile, and game-over artwork.
- Structured the project into separate modules for application setup, menu behavior, gameplay, and shared utilities.

### C Programming & Data Modeling

- Used C structs to model players and bullets, enums to represent game states, arrays to manage arena boundaries and active projectiles, and header files to share types and declarations between modules.
- Worked with explicit memory and resource lifecycles, including dynamic allocation with `malloc`/`free` and manual management of SDL surfaces, textures, renderers, and windows.
- Applied pointer-based data management and modular header/source organization in a lower-level programming environment.

### Real-Time Systems & Game Loops

- Implemented a real-time game loop that processes SDL events, updates game state, renders frames, and presents the resulting scene.
- Used frame delta time to make player movement independent of frame rate.
- Implemented time-based shooting cooldowns and timed game-over transitions using SDL's tick counter.

### Input, Graphics & Collision Detection

- Implemented independent keyboard controls for two local players and mouse interaction for menu navigation.
- Converted movement input into directional vectors and updated player rotation based on movement direction.
- Used SDL2 textures and sprite rotation to render directional players and projectiles.
- Implemented rectangle-based collision detection for players, projectiles, arena boundaries, and opponents.
- Added boundary handling to prevent players from moving through arena obstacles.

### Gameplay Systems

- Implemented directional projectile creation, movement, collision detection, and removal based on elapsed frame time.
- Added firing cooldowns and limited each player to a maximum of ten active bullets.
- Implemented game-state transitions following successful hits, including game-over display, player reset, and return to the main menu.

### Modular Architecture

- Separated application initialization and the main frame loop into `main.c`, menu functionality into `menu.c`, gameplay systems into `game.c`, and shared resources and utilities into the `util` module.
- Used header files to define shared structures, declarations, and dependencies between modules.
- Kept SDL initialization, image loading, gameplay logic, menu behavior, and resource cleanup separated into focused components.

### Build & Platform Awareness

- Configured the project to build with GCC on Linux/WSL and MinGW on Windows.
- Managed native SDL2 and SDL2_image dependencies and accounted for platform-specific runtime DLL requirements.
- Documented build and dependency setup for both Linux/WSL and Windows environments.

### Technologies

- **Languages:** C
- **Libraries:** SDL2, SDL2_image, C math library
- **Tools:** GCC, MinGW
- **Concepts:** Real-time game loops, collision detection, 2D rendering, manual memory management, modular architecture, input processing, resource management

## Secret Santa Automation Script - https://github.com/alitcs/Secret-Santa

### Project Overview

- Developed a Bash command-line application that automates a Secret Santa gift exchange from participant registration through personalized email delivery.
- Built the script to run in a Linux/server environment through SSH using standard Unix command-line utilities.
- Implemented participant registration, gift budget and deadline collection, personalized interest collection, randomized recipient assignment, email generation, and automated delivery.
- Designed the assignment process to prevent self-matches and duplicate recipients while ensuring each participant receives exactly one recipient.

### Bash Scripting & Data Handling

- Used Bash arrays and associative arrays to store participant names, email addresses, recipient pairings, and participant interests.
- Implemented interactive command-line input loops for collecting participant information and dynamically handling an arbitrary number of participants.
- Used Unix utilities including `cut`, `shuf`, `cat`, `touch`, `rm`, and `mail` to process data, generate files, randomize assignments, and automate communication.
- Generated temporary personalized text files for each participant and automatically removed generated files after emails were sent.

### Randomization & Algorithmic Logic

- Implemented randomized Secret Santa pair generation using `shuf` while tracking previously assigned recipients to prevent duplicate assignments.
- Added logic preventing participants from being assigned to themselves.
- Used associative arrays to maintain the relationship between each participant and their assigned recipient.

### Automation & Systems

- Automated the complete workflow from terminal input to email delivery without requiring a graphical interface or external application.
- Integrated the script with the system's `mail` utility to automatically send personalized Secret Santa emails.
- Designed the project for Linux/server environments, with documented support for Linux, macOS, and WSL.
- Worked with shell scripting, Unix file operations, command-line programs, and system-level email utilities.

### Technologies

- **Language:** Bash / Shell
- **Environment:** Linux, SSH, macOS, WSL
- **Tools:** Unix command-line utilities, `shuf`, `mail`
- **Concepts:** Shell scripting, arrays, associative arrays, randomization, file I/O, command-line automation, system utilities

## Robotic Arm Control System with Web UI - https://github.com/alitcs/Robotic-Arm-UI

**Website:** [roboticarmcontrol.netlify.app](https://roboticarmcontrol.netlify.app/)

### Project Overview

- Built a browser-based dashboard for monitoring commands produced by a local robotic arm keyboard-control system.
- Created a dedicated project website at https://roboticarmcontrol.netlify.app/ for the robotic arm control web UI.
- Connected a Python keyboard-input backend to the browser through a local WebSocket server.
- Displayed six motor-channel values as live gauges and showed the latest command packet alongside a scrollable packet log.
- Added connection status and automatic reconnection when the WebSocket server disconnects.
- Kept the project lightweight with a Python backend and a dependency-free HTML, CSS, and JavaScript frontend.

### Python Backend & Keyboard Input

- Used PyGame to poll keyboard state and keep a small display window available for keyboard input.
- Implemented separate wrist, shoulder, and elbow/claw control modes, selected by holding no modifier, `Shift`, or `Ctrl` respectively.
- Mapped directional keys to neutral and movement PWM-style values, using `128` as neutral and `56` or `200` for directional commands.
- Polled input at approximately 50 Hz and broadcast a packet only when the channel values changed.
- Printed outgoing packets locally to support debugging.

### WebSocket Communication & Packet Format

- Used Python `asyncio` and the `websockets` library to serve local browser clients at `ws://127.0.0.1:8765`.
- Encoded each command as a seven-part underscore-delimited packet: a leading `A` followed by six channel values.
- Broadcast updated packets to connected clients and removed clients that could no longer receive messages.
- Kept the WebSocket stream outbound-only; incoming client messages are ignored.

### Browser Dashboard

- Built the interface with HTML, CSS, and vanilla JavaScript.
- Parsed incoming packets and validated the expected prefix, channel count, and 0–255 value range before updating the gauges.
- Visualized the elbow, right wrist, left wrist, claw, and two shoulder motor channels.
- Maintained a log of up to 150 recent packets and automatically scrolled to the newest entry.
- Allowed the WebSocket endpoint to be overridden through the page's `ws` query parameter.

### Architecture

- Kept keyboard polling, command generation, and WebSocket broadcasting in `backendsender.py`.
- Separated the browser layout, styling, and WebSocket-driven UI behavior into `index.html`, `styles.css`, and `script.js`.
- Used the packet as the shared contract between the Python backend and JavaScript frontend.

### Build & Run

- Requires Python 3.12 or newer, plus the `pygame` and `websockets` packages.
- Starts the backend with `python backendsender.py`, then serves or opens `index.html` in a browser.
- Uses the local WebSocket endpoint `ws://127.0.0.1:8765` by default.

### Technologies

- **Languages:** Python, JavaScript, HTML, CSS
- **Libraries:** PyGame, `websockets`
- **Protocols:** WebSocket
- **Concepts:** Real-time input polling, asynchronous messaging, packet parsing, live data visualization, connection recovery

# Freelance Work

Paid client software and website projects, plus an owner-operated portfolio-building service. Tutoring combines private freelance clients with employment at Little Genius Island and Best Brains. Charity work is listed separately below.

**Source review — November 12, 2026:** Reviewed the linked public repositories and live website HTML, including deployed inquiry/signup definitions and JTC's quote page. Client relationships, payment, ownership, and the apartment tool's hundreds-of-hours time savings come from Ali's account; they are not measurements established by the public source code. Forms were inspected without submitting inquiries.

## Course Availability Notifier - https://github.com/alitcs/Course-Availability-Notifier

### Project Overview

- Created a paid Python/Selenium web-crawling and browser-automation tool for a client to monitor high-demand university courses and receive an automated text message when a seat became available.
- Automated login, navigation, repeated course-page checks, and SMS notifications when enrollment availability changed.
- Designed the tool to work with institution-specific registration portals by allowing customized XPath selectors and login settings.
- Was paid by students to create and customize the automation for their course-registration workflows.

### Automation & Notifications

- Used Selenium WebDriver to automate browser interaction with course-registration websites.
- Supported existing Chrome profiles to preserve login sessions, cookies, and multi-factor authentication state.
- Implemented repeated availability checks with configurable polling intervals.
- Integrated a phone/SMS API to send automated availability alerts, using Twilio tooling for the notification workflow.
- Automatically stopped monitoring after detecting an available seat and sending a notification.

### Technologies

- **Language:** Python
- **Libraries:** Selenium WebDriver, Twilio SDK
- **Tools:** Google Chrome, ChromeDriver
- **Concepts:** Browser automation, web scraping, XPath selectors, scheduled polling, SMS notifications, session persistence

### Business Impact

- Delivered a paid automation solution for students competing for limited course enrollment spaces.
- Reduced the need for students to manually refresh registration portals throughout the day.
- Helped the client act immediately on newly available seats and compete to be among the first to enroll, without manually refreshing the portal; enrollment itself remained the client's action.
- Customized the tool for different students, institutions, course pages, and notification requirements.

**Public source context:** The shared repository is a reusable template with institution-specific selectors, credentials, and SMS initialization/send logic left for configuration; the completed paid client workflow is described by Ali.

## Interior Design R / Interior Studio Website - https://interiordesignr.netlify.app/

**Source:** https://github.com/alitcs/interiordesignR

### Project Overview

- Delivered a paid freelance website for an interior design business to attract prospective clients and turn interest in its work into project inquiries.
- Created a visual, responsive experience that guides visitors from the project portfolio to an inquiry form.

### Website Development

- Showcased interior projects with interactive before-and-after image comparisons and a work-in-progress section.
- Added English and Persian language options to make the site accessible to visitors in both languages.
- Built a project inquiry form for visitors to share their name, email address, and details about their space.
- Deployed the website on Netlify.
- Built the site with React, TypeScript, and Vite, including English/Persian and right-to-left presentation support.
- Connected the project-inquiry workflow to Netlify Forms, with a hidden honeypot field for spam deterrence and structured collection of contact details and project requirements.

### Business Impact

- Gave the business a client-acquisition channel combining visual proof of its work, clear contact actions, and an online project inquiry form for follow-up.

## 99 Portfolio / GetMyPortfolio — Owner-Operated Service - https://getmyportfolio.com/

**Source:** https://github.com/alitcs/freelance-portfolios

### Project Overview

- Owns and operates this portfolio-building service; designed and built the website so visitors can contact Ali directly and apply to have him create a custom portfolio for them.
- Presented the service and its process to help prospective customers understand what to expect.

### Website Development

- Created a responsive experience explaining the steps from the initial inquiry through portfolio design, review, and launch.
- Added a customer inquiry form to collect contact information and details about the prospective customer's work.
- Used clear calls to action to guide visitors toward starting a portfolio inquiry.
- Implemented the site in React, TypeScript, and Vite with a Netlify Forms application capturing name, professional field, email/phone contact, and project details.
- Added contact validation, submission/loading feedback, a honeypot, and a direct-email fallback that preserves entered details if submission fails.

### Business Purpose

- Created a direct channel for generating and qualifying leads for Ali's own paid freelance portfolio design, development, and maintenance services.

## JTC Property Services Website - https://majestic-youtiao-4bc24e.netlify.app/

**Original source:** https://github.com/alitcs/JTC-Website

### Project Overview

- Completed a paid freelance web development project for JTC Property Services, a property maintenance company serving the Greater Toronto Area.
- Designed and built a responsive multi-page business website to help the company attract customers, explain its services, receive client booking and quote requests, and showcase completed work.
- Created the website using semantic HTML5 and responsive CSS, keeping the implementation lightweight and easy for the business to maintain.
- Organized the site into dedicated pages for services, locations, the work gallery, social media, contact information, and quote requests.

### Website Development

- Built a professional homepage presenting the company's property maintenance services, including roofing, exterior cleaning, renovations, carpentry, painting, plumbing, electrical and HVAC work, landscaping, seasonal maintenance, and emergency restoration.
- Added responsive navigation with a CSS-only mobile menu so customers can browse the site on phones, tablets, and desktop devices.
- Created a service-area page with map imagery to communicate where the company operates and clarify its coverage area.
- Developed a gallery page displaying completed projects such as bathroom renovations, roofing, shed construction, garage door painting, painting, and exterior work.
- Added contact information and business details so potential customers can reach the company by phone or email.
- Implemented a quote-request form that collects the customer's name, phone number, email address, project description, location, timeline, and requirements.
- Connected the quote form to an email submission service and added a confirmation page for the customer after submitting a request.
- Applied consistent responsive styling, layout, typography, colors, spacing, and reusable UI components across the website.

### Business Impact

- Delivered a paid client project that gave a property maintenance company a professional online presence for promoting its services and growing its customer base.
- Created a direct booking and lead-generation workflow that allows prospective customers to submit project details and request a quote online.
- Made it easier for the business to turn website visitors into potential customers by placing quote and contact actions throughout the site.
- Helped the company demonstrate the quality and range of its work through a dedicated project gallery featuring real completed jobs.
- Gave the business a central place to present its service areas, contact information, social links, and project portfolio to new and returning customers.

### Technologies

- **Languages:** HTML5, CSS3
- **Frontend:** Responsive web design, CSS Flexbox, CSS-only mobile navigation
- **Integrations:** FormSubmit email form processing
- **Assets:** Project photography, service-area map imagery, company branding
- **Concepts:** Multi-page website architecture, lead generation, quote-request workflows, responsive UI design, accessibility-minded HTML, business website development

## Apartment Listing Filter and AI Scraper - https://github.com/alitcs/Apartment-Filter

### Project Overview

- Created a paid apartment-search tool for a client, using Python, Selenium web crawling, and AI APIs to find online listings matching the client's specified criteria.
- Combined the client's location, price, and bedroom search filters with OpenAI-based description analysis to reduce time spent reviewing unsuitable listings.
- Automated browser navigation through apartment listings using Selenium WebDriver.
- Used OpenAI's GPT model to determine whether listings advertised as two-bedroom units were actually two-bedroom apartments rather than one-bedroom units with a den, closet, or similar space.
- Stored matching apartment URLs in a JSON file for later reference.
- Added logic to identify and label newly discovered listings while preserving previously saved results.

### Browser Automation & Data Processing

- Used Selenium WebDriver to load filtered Apartments.com searches, open individual listings, read descriptions, and navigate across result pages.
- Used WebDriver Manager to automatically install and manage the required ChromeDriver instance.
- Implemented explicit waits and XPath selectors to interact with dynamically loaded listing and pagination elements.
- Added error handling for listings without descriptions and failed AI requests.
- Persisted results with Python JSON file handling so the script could be run repeatedly without losing previously collected listings.

### AI-Assisted Classification

- Integrated the OpenAI API to analyze apartment descriptions and classify whether a listing explicitly represented a true two-bedroom unit.
- Designed a constrained prompt that returned a simple yes-or-no decision for consistent filtering.
- Used the classification result to keep valid listings and exclude misleading or ambiguous bedroom descriptions.

### Technologies

- **Language:** Python
- **Libraries:** Selenium WebDriver, OpenAI Python SDK, WebDriver Manager
- **Tools:** Google Chrome, ChromeDriver
- **Data:** JSON file storage
- **Concepts:** Browser automation, web scraping, AI-assisted classification, pagination, persistent results, and error handling

### Business Impact

- A client paid me to develop and customize this apartment-listing filtering service for their housing search.
- Saved the client hundreds of hours of manual apartment searching and listing review, according to Ali's account of the engagement.
- Delivered a persistent shortlist of matching listing URLs, distinguishing newly found results so the client could focus on relevant apartments rather than repeatedly screening the same listings.

## Little Genius Island Website & Booking System - https://littlegeniusisland.ca/

**Source:** https://github.com/alitcs/little-genius

### Project Overview

- Delivered a paid freelance website for Little Genius Island, an education and childcare business, to attract new families and collect program applications online.
- Created a responsive, professional website with clear service information, contact details, and a structured booking workflow for prospective clients.
- Implemented a lead-generation and scheduling system that helped the business manage customer inquiries and appointments more efficiently.
- Designed the site to support customer trust, business credibility, and a smoother intake process for new clients.
- Focused on a clean, conversion-oriented user experience that could support a high-volume service operation.

### Website Development

- Developed a multi-page responsive website with clear service sections, business information, and strong calls to action tailored to customer acquisition.
- Built service-specific signup forms for daycare, piano lessons, and private tutoring, allowing families to choose programs or tutoring subjects and provide child and parent/contact information.
- Added calendar and weekly availability-selection interfaces so families can specify suitable and unsuitable days/times, helping the business coordinate lessons and appointments.
- Organized applications through a multi-step signup workflow, with contact validation and Netlify Forms submission for business follow-up.
- Created an easy-to-navigate structure across service offerings, company overview, and contact information to improve customer decision-making.
- Built the interface with lightweight, maintainable frontend code and a consistent design system for mobile and desktop screens.
- Wired the booking and inquiry process into a workflow that reduced administrative overhead and made it easier for the business to manage incoming demand.

### Business Impact

- Delivered a paid client project that gave a service business a stronger online presence and a more efficient incoming-lead system.
- Helped the business gather prospective clients through program information, clear application actions, and structured intake of learning needs and scheduling preferences.
- Created a direct customer acquisition and scheduling process that supported repeat bookings, improved lead follow-up, and reduced manual coordination work.
- Increased the business's ability to turn website visitors into booked customers while keeping operations more organized and scalable.

### Technologies

- **Languages:** HTML5, CSS3, TypeScript, React
- **Frontend:** Responsive web design, mobile-friendly layouts, conversion-focused UI design
- **Integrations:** Netlify Forms, program applications, contact intake, calendar and weekly availability selection
- **Concepts:** Lead generation, client acquisition, scheduling workflows, business website development, responsive UX design

## Tutoring — Private Freelance Clients & Employment at Little Genius Island and Best Brains

**Employers:** [Little Genius Island](https://littlegeniusisland.ca/) and [Best Brains](https://bestbrains.com/). Private tutoring was paid freelance work; tutoring at the two companies was employment.

### Overview

- Tutored children and teenagers **ages 6–18** in mathematics, calculus, advanced functions, physics, and English.
- Worked with students at different grade levels and skill levels, adapting explanations, practice problems, and lesson structure to their individual needs.
- Worked with **private freelance clients** and as an **employed tutor at Little Genius Island and Best Brains**.
- Supported both elementary and high-school students, ranging from foundational English reading and writing to senior-level calculus, functions, and physics.

### Subjects & Grade Levels

- **Younger students:** Foundational mathematics, English reading, and writing, with instruction adapted to the student's age and level.
- **Older/high-school students:** Calculus, advanced functions, physics, mathematics, and English.
- Provided individualized instruction focused on understanding concepts, solving problems, completing schoolwork, and building confidence with course material.

### Skills Demonstrated

- One-on-one instruction and communication
- Adapting technical explanations to different ages and learning levels
- Breaking complex concepts into understandable steps
- Problem-solving and guided practice
- Working independently with students and families
- Communication, patience, and mentorship

# Community Involvement

## Under The Tree Charity

### Overview

- Founded and organized **Under The Tree Charity**, a community initiative supporting people experiencing hardship during the winter season.
- Raised **over $1,000** through social media marketing and community fundraising efforts.
- Used fundraising proceeds to prepare and distribute **hot meals, warm clothing, blankets, and winter gear** to people in need.
- Managed the initiative from fundraising and promotion through to preparing and distributing resources to the community.

### Fundraising & Community Outreach

- Created and promoted social media content to raise awareness and encourage donations.
- Used social media marketing to reach community members and generate fundraising support.
- Coordinated the preparation and distribution of donated and purchased supplies.
- Organized resources around practical winter needs, including food, clothing, blankets, and other cold-weather essentials.

### Skills Demonstrated

- Initiative and independent project leadership
- Social media marketing and community outreach
- Fundraising and resource management
- Organization and logistics
- Community engagement
- Project planning and execution

# Extracurricular

## Connect OPS — AI-Powered Organizational Knowledge & People-Discovery Platform - https://connectops.netlify.app/

> **The codebase and pitch materials use the identifier ConnectOPS.** A full-stack
> AI-powered knowledge-retrieval and people-discovery web app built for the **Ontario Public
> Service (OPS)** — a ~66,000-person government organization.

---

### At a Glance

|                        |                                                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What it is**         | An AI chat-first assistant + companion web app that helps a massive government organization find the right _person, skill, project/ticket context, and next step_ in **seconds instead of hours**. |
| **Where it was built** | **OGT ("Ontario Got Talent" / OPS Got Talent) — Summer 2026 hackathon & student-proposal competition at the Ontario Government.**                                                                  |
| **Result**             | 🥉 **3rd place.** Judged on solution quality, technical execution, financial feasibility, and long-term sustainability.                                                                            |
| **Team**               | 4 people — Jackie Liang, Richard Duc Anh Nguyen, Manraj Rakhraj, Ali Hamoudi.                                                                                                                      |
| **Track**              | Knowledge Retrieval & Information Access / Onboarding & Time-to-Productivity.                                                                                                                      |
| **Deliverable**        | A fully working full-stack prototype **plus** a complete public-sector business case (cost model, ROI, security posture, rollout roadmap) **plus** a live deployed demo.                           |
| **Live demo**          | Deployed on **Netlify** (`connectops.netlify.app`).                                                                                                                                                |
| **Stack**              | React 18 · TypeScript · Vite · Node.js · Express · WebGL/Three.js · npm-workspaces monorepo.                                                                                                       |

---

### The Problem

In a large organization the knowledge already exists — but the **people and places that hold
it are hard to reach**. Staff act on partial context (a ticket number, a system name, a vague
problem) and lose time hunting across disconnected systems — ESMT, Forte, email, Teams,
SharePoint — to find the right owner, expert, or next step.

- Requests get **delayed or misrouted** when ownership is unclear.
- Some information can't be shared freely because of **privacy, security, or role**
  restrictions.
- **Quantified:** knowledge workers lose **~1.8 hrs/day (~20% of the workweek)** searching for
  information and chasing colleagues (McKinsey). Across ~66,000 OPS staff, recovering even a
  fraction of that is **millions of dollars in reclaimed capacity per year**.

Connect OPS turns that friction from **hours into seconds**.

---

### The Solution

A **Teams-native AI assistant** (plus a companion web app) built around a clear, governed
pipeline:

1. **Route** — the AI interprets the request and identifies the key entities (ticket, system,
   skill, person, team).
2. **Retrieve** — a governed, **read-only** query hits approved sources; semantic search
   handles synonyms (`k8s` → `Kubernetes`).
3. **Filter** — a **permission layer** applies role-based and data-owner rules _before
   anything is shown_.
4. **Phrase** — the AI writes a short, cited answer; **result cards render from the query, not
   from model text**.

> **Governance-first design principle:** _"The AI routes and phrases; governed queries supply
> the facts; the permission layer decides what may be shown."_ The model never stores data,
> invents facts, or makes access-control decisions.

It does **not** replace the systems of record (ESMT, Forte) — it helps staff use them more
effectively.

---

### Technical Architecture

The whole system is built to be a **production-forward prototype**, not a throwaway demo. Every
mock component is abstracted behind a stable interface so it can be swapped out one piece at a
time for a real implementation.

### Layered, swappable backend

```
routes → controllers → services → data
```

- **`routes/`** — Express route definitions (chat, connect, directory, floors, messages, users).
- **`controllers/`** — request handlers that validate input and shape responses.
- **`services/`** — business logic: the mock AI service, the user service, the connect service.
- **`data/`** — an in-memory / JSON seed store structured like real relational data.

Because every layer depends only on the interface below it, each mock can be replaced without
touching the rest:

| Mock component              | Production replacement                            | Contract that stays stable       |
| --------------------------- | ------------------------------------------------- | -------------------------------- |
| `data/store.ts` (in-memory) | A real relational database                        | Service-layer data access        |
| `services/mockAIService.ts` | **Microsoft Copilot** or a Python AI microservice | `AIReply` / `ChatResponse` shape |
| `middleware/mockAuth.ts`    | **Microsoft Entra ID / Azure AD via MSAL**        | `req.currentUser` identity       |

### Two parallel backends (to prove the concept end-to-end)

- **Client-side mock backend** (`frontend/src/api/mockBackend.ts`) — runs entirely in the
  browser (in-memory + `localStorage`), powers the live Netlify demo with **zero infrastructure**,
  and wraps synchronous calls in promises with artificial latency so the UI _feels_ like it's
  talking to a real server.
- **Express REST reference backend** (`backend/src/`) — a full "what the real server looks
  like" implementation that mirrors the same handlers and authorization policy.

The frontend API client (`frontend/src/api/client.ts`) is the single seam both backends share,
so the same UI can run against either.

---

### The AI Layer

A **mock AI service** simulates an LLM: it parses queries for keywords and intents (skills,
departments, names, ticket/system references) and returns **realistic, cited, explainable**
responses. It's deliberately designed so it can be swapped for **Microsoft Copilot** later
_without changing the response contract_.

**It handles 9+ distinct intent types:**

1. **Person lookup** — "Tell me about [person]."
2. **Project / ticket intelligence** — look up a specific ticket by ID or browse the active
   portfolio, ranked by priority (Critical → Low).
3. **Skill discovery** — generic skill queries across a known keyword vocabulary (Python, data
   analytics, Tableau, ML, DevOps, cybersecurity, accessibility, React, cloud, Azure,
   Kubernetes, GIS, SQL, policy, environmental, …).
4. **Team discovery** — "What teams work on [skill]?"
5. **Project staffing with capability-gap detection** — maps a project's required skills to
   internal people, one best-fit person per skill, and explicitly reports **covered skills vs.
   gap skills** (the capabilities with no internal match).
6. **Co-op / new-hire onboarding companion** — accelerates time-to-productivity.
7. **Field / career exploration** — e.g. cybersecurity or accessibility career paths.
8. **"Shadow-a-mentor"** — surfaces people open to being shadowed.
9. **Counting queries** — e.g. "how many co-ops are there?"

**Explainability is built in, not bolted on.** Every surfaced person comes with:

- A **contextual rationale** — _why_ this person was surfaced (matched skills, team, or role).
- A **deterministic confidence badge** (`high` / `medium`) — strong when there are multiple
  direct skill hits or a title/team match, otherwise a solid "good" match. **No black-box
  scoring.**

---

### Key Features

### Core member experience

- **AI chat assistant (homepage)** — conversational people/knowledge search with a sidebar of
  conversation history and inline **mini-profile cards** that explain _why_ each person was
  surfaced (rationale + confidence).
- **Employee directory** — a filterable roster (department, team, location, title, ministry),
  integrated directly into the chat sidebar.
- **Profile pages** — a clean "business card" view plus extended info and **user-controlled
  privacy toggles**.
- **Connect board** — a "who's open to connect today" bulletin with low-pressure connection
  intents (coffee chat, lunch buddy, walk & talk, skill exchange, shared interest, "new
  here"), a connection concierge that drafts intros and suggests who to meet, and smart
  **proximity** ("N people near you on Floor X are open today").
- **Direct messaging** — a lightweight inbox/threads system for initial outreach (a bridge to
  Teams, not a replacement).
- **A consistent interaction pattern app-wide:** **mini card → preview card → full profile.**

### Manager / coordinator tooling _(the standout differentiator)_

- **The Connection Network** — a live, interactive **3D force-directed graph** (built with
  `react-force-graph-3d` / WebGL / Three.js) where **every employee is a node**. Users switch
  the "lens" (edge mode) — logged coffee-chat connections, same team/ministry/division, shared
  skills/interests, same project, reporting line, location, mentorship, cohort — and the whole
  visualization re-renders. It instantly surfaces:
  - **isolated or newly-arrived staff** who need a nudge,
  - informal **"connector" employees** who bridge the most ministries,
  - **single-person knowledge-dependency risks** (a skill only one person holds — a
    continuity risk).
- **Coordinator analytics page** — a leadership view readable in ~30 seconds: adoption / active
  users, cross-team & cross-ministry collaboration, most/least connected teams, knowledge
  concentration & gaps, and onboarding health for new co-ops. **Aggregate only — never
  individual surveillance.**
- **Manager chat** — plain-language analytics with no dashboards to learn: _"Who on my team is
  isolated?", "How are Priya and Marcus connected?", "Which active projects have staffing gaps,
  and who can fill them?", "Which skills do we rely on only one person for?"_

### The 3D graph, under the hood

- Nodes sized by `sqrt(degree)` and colored by ministry; dimmed when filtered out; grow and
  highlight neighbors on focus.
- The org network is built from **4 deterministic edge layers** (seeded for reproducibility):
  logged coffee chats (weighted), intra-team links, cross-team bridges, and pre-seeded hub
  connectors — producing a realistic, explorable social graph.
- Tuned D3 force physics (charge, link distance/strength, warmup/cooldown ticks) with a
  reheat-once-then-freeze strategy for a stable, performant WebGL scene.
- The manager chat and the graph are wired together: asking "find Priya" in chat animates the
  camera to that node and highlights their connections.

---

### Security & Privacy Modeling

Security was treated as a first-class design concern, with a written **Security Overview** that
is explicit about what is genuine vs. a demonstrative stand-in, and a full production-hardening
backlog.

**Authorization model (modeled correctly, even in the mock):**

- **Self-only profile edits** protected by a **field allow-list** — a proper **mass-assignment
  guard** so a user can't flip their own `isAdmin`, change their ministry, etc.
- **Admin-gated analytics** — every org-level insight, the connection graph, and the admin chat
  throw `403` unless the viewer is an admin (role assigned at seed time, never from user input).
- **Scope-isolated admin chat threads** — coordinators can't read each other's threads, and
  members never see admin threads.
- **Participant-scoped message threads** — prevents thread enumeration (IDOR).

**Privacy-by-design controls:**

- **Opt-in and reciprocal location sharing** — you can't see others' floor/seat while hiding
  your own; proximity only resolves when _both_ people share.
- **Configurable message privacy** — `everyone | ministry | none`, enforced on first contact.
- **Own-profile vs. public-profile data split** — sensitive fields are stripped for anyone
  viewing someone else's profile.
- Deliberate **non-features** to avoid a surveillance feel: no building-wide "where is
  everyone" map, no "Ask AI about this person" button, no dating-app-style matching, no
  manager-visible individual activity tracking.

**Documented production hardening plan (OWASP-aware):**

- Replace mock auth entirely with **Entra ID / MSAL SSO**; validate real bearer/ID tokens
  server-side (signature, issuer, audience, expiry).
- Derive identity and role claims from the **token**, never a client header.
- **RBAC** sourced from Entra group membership instead of a hardcoded admin set.
- Real password KDF (**Argon2id / bcrypt / scrypt**) with per-user salt.
- Server-side input validation, audit logging for analytics access, and data-retention rules.

---

### The Business Case

Beyond the code, the team produced a complete public-sector business case — a major reason the
project placed at a competition that explicitly weighed **financial feasibility and long-term
sustainability**.

**Cost model** — a bottom-up, defensible 3-year budget:

- **~$1.43M total** against a **$1.5M ceiling** ($500k/yr, front-loaded: Y1 $500k · Y2 $470k ·
  Y3 $310k), leaving **~$70k headroom**.
- **~$150k (~12%) contingency**, for a **~16% total buffer** — a strong risk-management story.
- Built on **fully-loaded OPS salaries** (base × 1.40 for pension/benefits/overhead).
- Deliberately staffed with **permanent staff + co-op students** — a contractor team would cost
  **~1.4–2× more** and breach the cap (a core feasibility argument).
- **Reuse-don't-rebuild:** rides on existing OPS-approved infrastructure (Azure tenant, SSO,
  Microsoft 365 + Copilot licensing, ESMT/Forte as systems of record) — paying only marginal
  consumption.

**ROI** — deliberately conservative:

- **~$4M+/year** in reclaimed staff time at scale (~10,000 active users reclaiming ~10
  min/week ≈ 77,000 hrs/yr at ~$55/hr loaded).
- **Payback in under 6 months** at scale; **~9–10× annual return** vs. the ~$310k/yr
  steady-state run cost.
- **Sensitivity floor:** still returns **>2× total cost even at 25% of projected adoption**.

**Compliance angle:** data stays in the OPS/Canada tenant, Copilot doesn't train on OPS data,
SSO via ontario.ca identity, RBAC, audit logging, encryption in transit/at rest, **WCAG 2.2
AA** accessibility.

**4-phase rollout roadmap:** Discovery & Design → Foundation Build → Data Integration → Pilot &
Rollout, each with defined success metrics (time-to-answer from hours to <60s, ≥80% requests
resolved without re-routing, 100% grounded/cited answers).

---

### Tech Stack

**Frontend**

- React 18 + TypeScript + Vite (SPA, mobile-first responsive UI)
- React Router (client-side routing)
- `react-force-graph-3d` + Three.js (WebGL) for the interactive 3D connection graph
- Context API for auth/session, theme (light/dark), toasts, and preview-card state
- Plain CSS with custom properties for theming; **WCAG 2.2 AA** target

**Backend**

- Node.js + Express + TypeScript (REST API)
- Layered architecture (routes → controllers → services → data)
- `cors`, `morgan`; `tsx` for dev, `tsc` for build
- In-memory / JSON seed store; mock auth middleware modeling token-based identity

**AI layer**

- Mock AI service simulating an LLM (keyword/intent routing, cited & explainable responses),
  designed to be swapped for **Microsoft Copilot** without changing the response contract

**Tooling / deployment**

- **npm-workspaces monorepo** running frontend + backend together
- Vite dev proxy (`/api` → backend, no CORS config in dev)
- Deployed live via **Netlify**; presentation built with **Marp**

---

### Quantified Facts

- 🥉 **3rd place** at the OGT Summer 2026 hackathon (Ontario Government).
- **Team of 4.**
- Targets a **~66,000-employee** organization.
- **9+ AI intent types** handled by the assistant.
- **3D connection graph** with **10+ relationship "lens" modes**.
- Full-stack **TypeScript** across frontend and backend (monorepo, npm workspaces).
- **~$1.43M / 3-year** cost model with **~$4M+/yr** projected ROI and **<6-month** payback.
- Live deployed demo on **Netlify**.

---

### Skills Demonstrated

TypeScript · React · Node.js · Express · REST API design · Vite · full-stack development · data
visualization (WebGL / 3D graphs) · UI/UX · responsive / mobile-first design · authentication &
authorization · RBAC · privacy-by-design · application security / OWASP · AI/LLM integration
design · prompt/intent routing · monorepo tooling · Netlify deployment · accessibility (WCAG
2.2 AA) · technical writing · product thinking · business case / ROI modeling · teamwork ·
hackathon delivery under time constraints.

---

### Honest Scope

For interview integrity: Connect OPS is a **proof-of-concept prototype**. It uses **mock data**
and a **mock AI service** — there is no real database, no live LLM call, and no real integration
with OPS systems in the delivered build. What is **real code** is the frontend, the REST API
scaffold, the authorization/privacy logic, the 3D visualization, and the intent-routing engine.
What is **simulated** is the data and the LLM. The honest value is a _working prototype plus a
production-forward design_ — and a business case complete enough to place 3rd at a government
competition.

## T.A.S.C (Toronto Autonomous Systems Collective) [https://tasctmu.com](https://tasctmu.com) - Website Development

### Project Overview

- Designed and developed the official **T.A.S.C (Toronto Autonomous Systems Collective)** website as a student extracurricular project.
- Built the website using **React and TypeScript** to provide the team with a professional online presence for showcasing its work, members, and activities.
- Worked with the team to understand their website requirements and translate them into a functional, responsive interface.
- Developed and organized the site's pages, content, navigation, and overall user experience.

### Website Development

- Built the website using **React and TypeScript** with modern frontend development practices.
- Created responsive layouts designed to work across desktop and mobile devices.
- Implemented reusable components and structured the application to keep the code maintainable.
- Integrated the team's branding, content, and project information into the website.
- Deployed and maintained the website at **https://tasctmu.com**.

### Skills Demonstrated

- React and TypeScript development
- Frontend web development
- Responsive UI/UX design
- Component-based architecture
- Client collaboration and requirements gathering
- Website deployment and maintenance
- Translating organizational requirements into a functional product

### Technologies

- **Languages:** TypeScript, JavaScript, HTML, CSS
- **Frontend:** React
- **Tools:** Git, web development and deployment tooling
- **Concepts:** Responsive design, component-based development, UI/UX, website deployment

---

# Education

## Toronto Metropolitan University (Formerly Ryerson University)

### Degree

Bachelor of Science (BSc) in Computer Science, Co-op

### Dates

Sep 2023 – Present

### Location

Toronto, ON

### Academic Achievement

Dean's List — 2024, 2025

### Program

Computer Science
Co-op program

### Skills & Areas of Study

Software development and programming
Data structures and algorithms
Object-oriented programming
Systems and computer architecture
Databases and data management
Web development
Software engineering
Computer science fundamentals
