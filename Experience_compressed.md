# Ali Hamoudi

Toronto, ON | alihamoudiu18@gmail.com | [LinkedIn](https://www.linkedin.com/in/ali-hamoudi/) | [GitHub](https://github.com/alitcs) | [alihamoudi.com](https://alihamoudi.com/)

## Education

**BSc Computer Science (Co-op), Toronto Metropolitan University** | Sep 2023 to present | Dean's List 2024, 2025
Data structures and algorithms, OOP, systems and computer architecture, databases, web development, software engineering.

## Experience

### Full-Stack Software Engineer, GovTechON (Ontario Government)

Full-stack work on a large government intranet (tens of thousands of public-service employees) and a media delivery service, across a Go backend, Nuxt 3/Vue frontend, and WordPress/PHP CMS. Strong root-cause debugger of environment-specific and concurrency bugs; ships features end-to-end across all three tiers.

- **Backend modernization:** Migrated a suite of Go REST microservices from Echo to `go-chi/chi` (content sections, navigation menus, RSS feeds, legacy media routes), standardizing middleware, context propagation, error handling, and route params. Consolidated auth/authorization into the Go API as a single source of truth.
- **Cloud migration:** Refactored the media service's storage layer from the MinIO SDK to the AWS S3 SDK, using dependency injection to decouple storage from business logic.
- **Performance and concurrency:** Fixed gateway timeouts from expensive Redis key scans during bulk permission invalidations by adding a dedicated Redis instance for ABAC lookups across the Go API and CMS. Fixed a duplicate reminder-email bug (non-atomic check-then-act across pods) with an atomic Redis `SETNX` claim, release-on-failure fallback, and concurrency tests.
- **Security:** Found and fixed a SQL injection via parameterized queries and input sanitization. Hardened media share links so internal videos can't be streamed publicly, tightened commenting permissions, and added duplicate-submission guards. Diagnosed an authorship-overwrite defect caused by a delegate "post as" mechanism and staging session gating, and proposed an environment-agnostic fix.
- **Frontend and CMS:** Moved legacy PHP widgets (recent comments, popular posts) into Go endpoints and Vue components. Fixed menu rendering, comment pagination edge cases, search autocomplete, and HTML leaking into search results. Consolidated site CSS into a single global bundle. Added server- and client-side file-type validation and blocked video uploads across all WordPress upload paths (including the REST endpoint), redirecting users to the media service. Whitelisted FontAwesome markup in text widgets.
- **Workflow:** Kubernetes, Helm, GitOps/ArgoCD with per-ticket, branch-pinned snapshots seeded with production data; Git/Bitbucket PR reviews, Jira, Confluence.
- **Standards:** WCAG 2.1 AA / AODA, `gofumpt`, New Relic telemetry.

#### Additional government work — August 12 to November 12, 2026 review

This is a review window, not the full employment period; the existing experience above is retained.

- **Storage testability:** Used injected storage interfaces, mocks, and Go unit tests for S3 object retrieval, streaming, and presigned URLs, extending the MinIO-to-AWS-SDK migration.
- **Notification reliability:** Added per-recipient Redis claim expiration, retry handling, release after failed sends, and competing-worker regression tests to reduce duplicate sends. Corrected calendar-date validation for reminders scheduled on a post's publication day; no exactly-once guarantee is claimed.
- **Cross-stack global alerts:** Developed image-only alerts across Go, Vue/Nuxt, and WordPress with safe links, URL/form validation, alternative text, keyboard-focus restoration, and a schema upgrade preserving existing alerts. Production-release status is unconfirmed.
- **Auditability and navigation:** Added UTC-timestamped media create/update/delete audit events with parameterized database statements (release status unconfirmed); repaired breadcrumb URLs and section/tag links causing 404s.
- **Security and editorial integrity:** Adjusted media Content Security Policy while retaining script restrictions; added parameterized duplicate-comment checks and clear conflict responses, invalid-existing-image guards, delegated-author validation and byline preservation, an admin-only dashboard shortcut with regression tests, and consistent visibility rules across quick edit, bulk edit, and post saves.
- **Reader and CMS experience:** Added newest/oldest/popularity comment sorting and post-submission scrolling; improved subscription confirmations with escaped dynamic values, widget "Show All" results, intro text and thumbnail controls, regional-news links, responsive navigation, draft preview, search titles/skip links, supported icon markup, and comment-admin overflow.
- **Accessibility:** Remediated keyboard navigation, focus targets, image descriptions, skip links, and screen-reader output toward AODA/WCAG requirements; site-wide certification or full compliance is not established.
- **Additional skills:** Content Security Policy, URL validation, injected interfaces, Go mocks/unit tests, expiring Redis keys, retry handling, concurrency regression tests, and audit logging. Accessibility Insights, WAVE, and MailHog are reported tools whose personal use remains to be confirmed.
- **Private verification context:** Reported 40+ PRs and 20+ Jira items lack independently verified counts/timeframes; global alerts and media audit events appear in feature branches. Pinia is supported, Redux is unconfirmed. The prior SQL-injection claim (IOPS-3553) needs contribution verification; parameterized duplicate-comment SQL is separately supported. Earlier migrations, plugin-status and read-only access work may predate this review window. Platform context alone does not prove hands-on use, measured impact, user counts, or audited compliance. Detailed qualifications and supplied commit pointers are retained in `Experience.md`.

### Founding Engineer / Technical Co-Founder, Vironix AI | Sep 2025 to present

Helped architect and build an AI-powered video analytics platform with active users, owning large parts of the architecture alongside the founding team.

- **Stack:** React, TypeScript, Vite, Tailwind, TanStack Query; Node.js/Express; Firebase Auth and Firestore; Google Cloud Storage; Docker, GitHub Actions.
- **Async pipeline:** Job creation, storage uploads, worker processing, analysis, result persistence, retries, and failure handling, with idempotent job and refund logic.
- **Billing and cost engineering:** Built a credit-based usage system (cost estimation, deduction, post-processing reconciliation, refunds, transaction records) with transactional operations. Analyzed pricing against AI, media, and infrastructure costs to design the unit economics. Stripe subscriptions, credit purchases, and webhook-driven account state.
- **AI/media:** Google Cloud Video Intelligence, AssemblyAI, LLM integrations (AI chat, structured assistant, usage quotas, prompt construction), FFmpeg/ffprobe.
- **Production safeguards:** Authentication/authorization, input validation, rate limiting, signed storage URLs.
- **Company operations:** Interviewed 50+ engineering candidates and helped hire the team; contributed to financial planning, expense evaluation, and prioritization.

#### Additional VironixAI work — November 12, 2026 update

**Confirmed title:** Technical Co-Founder / Founding Software Engineer. **Location/tenure from supplied summary:** Toronto, ON, Sep 2025–Present. **Primary domain reported:** [vironixai.ca](https://vironixai.ca/). Recent review: August 12–November 12, 2026, separate from full tenure; existing experience above is retained.

- **Domain migration:** Migrated `.net` to `.ca` across Cloud DNS, registrar delegation, A/TXT/CNAME records, domain verification, HTTPS load balancing, managed TLS, and Cloud Run editor custom domains; added path-preserving Netlify 301 redirects for old apex/`www` links while retaining legacy certificates/origins. Also worked on password-reset configuration and investigated Stripe redirects.
- **CI/CD and production debugging:** Connected Secret Manager's `VITE_EDITOR_URL` through GitHub Actions to Docker/Vite build arguments and masked CI configuration values. Diagnosed separate Express API and Cloud Storage CORS failures; the supplied summary reports restored auth, editor sessions, and existing video access following configuration updates. Operated Cloud Run redeployments, versioned secrets, and Artifact Registry images; used browser Network/Console tools.
- **Internship applications:** Built a React/TypeScript/Tailwind/Wouter form and Express endpoint with accessible feedback, Zod validation, existing rate limiting, HTML escaping, configurable email recipients, and explicit input/configuration/delivery error handling. Simplified the form and route to `/intern`. Committed on `origin/interns`; merge and production launch are unverified.
- **Transactional email:** Corrected a historical Resend sender fallback and added diagnostics; bound backend `EMAIL_FROM` to Secret Manager through the Cloud Run release workflow. Reported DNS work includes DKIM/provider records and DMARC. Sending-domain verification is reported complete; final `.ca` application sender activation/delivery is unconfirmed, and later team changes altered the fallback.
- **Developer payouts:** Reviewed code changes to assess delivered work and created corresponding developer payments, as reported directly by the user. Separate from customer Stripe billing; tooling, formulas, totals, automation, and transfer completion are unspecified.
- **Earlier tenure:** February 2026 Firebase signup-to-Stripe checkout, customer/session/webhook helpers, and plan-key fixes; March Windows development-script/Vite compatibility; April hook/replayability scoring, filler-word weighting, and zero-score handling. These predate the recent review and carry no measured revenue/accuracy claims.
- **Additional technologies:** Cloud Run, Cloud DNS, HTTPS load balancing, managed TLS, Secret Manager, Artifact Registry, GitHub Actions/YAML, DNS/CORS, Netlify redirects, Zod, Resend, and email DNS authentication. The reviewed worker uses Compute Engine; platform context alone does not establish personal implementation of every subsystem or Kubernetes/Terraform/Helm experience.
- **Private evidence context:** The supplied review identifies six recent personal commits: four in reviewed `main`, two unmerged internship commits, using local refs without a fetch. Cloud-console actions and restored production flows are reported rather than independently verified; the tracked bucket CORS file does not prove the live update. Candidate interviewing/cost analysis are broader responsibilities, not necessarily recent-window work. No measured impact or payout totals are established. Detailed commit pointers and qualifications are retained in `Experience.md`.

## Projects

### Connect OPS | 3rd place, Ontario Government OGT Hackathon, Summer 2026 | [Demo](https://connectops.netlify.app/)

AI chat-first people and knowledge discovery app for the ~66,000-person Ontario Public Service. Team of 4. Prototype with mock data and a mock AI service; the frontend, REST API, authorization logic, 3D visualization, and intent routing are real code.

- **Stack:** React 18, TypeScript, Vite, Node/Express, WebGL/Three.js, npm-workspaces monorepo, Netlify.
- **Architecture:** Layered backend (routes, controllers, services, data) with swappable mocks for the database, AI (designed to swap for Microsoft Copilot without changing the response contract), and auth (Entra ID/MSAL). Client-side mock backend powers the live demo; an Express reference backend mirrors it.
- **AI layer:** 9+ intent types (person lookup, ticket intelligence, skill/team discovery, project staffing with capability-gap detection, onboarding, mentor shadowing), with a rationale and deterministic confidence badge on every result. Governance-first design: AI routes and phrases, governed queries supply facts, a permission layer decides what is shown.
- **3D connection network:** Interactive force-directed graph (`react-force-graph-3d`) with 10+ relationship lenses surfacing isolated staff, cross-ministry connectors, and single-person knowledge risks; linked to a manager chat.
- **Security and privacy:** Field allow-list against mass assignment, admin-gated analytics (403s), scope-isolated chat threads, IDOR-safe message threads, opt-in reciprocal location sharing, and a documented OWASP-aware hardening plan.
- **Business case:** ~$1.43M 3-year cost model, ~$4M+/yr projected ROI, under 6-month payback, still over 2x return at 25% adoption.

### Digital Duel | C, SDL2 | [Website](https://digitalduel.netlify.app/) | [GitHub](https://github.com/alitcs/Digital-Duel)

Local two-player top-down 2D shooter with menu, gameplay, and game-over states. Frame-rate-independent movement via delta time, projectile cooldowns, rectangle collision detection, and manual memory and SDL resource management in a modular C codebase. Builds with GCC (Linux/WSL) and MinGW (Windows). Also developed and deployed a browser version with keyboard/touch controls, hand-drawn artwork, and custom physics.

### Robotic Arm Control Web UI | Python, JavaScript | [Website](https://roboticarmcontrol.netlify.app/) | [GitHub](https://github.com/alitcs/Robotic-Arm-UI)

PyGame keyboard backend polling at ~50 Hz and broadcasting six-channel PWM-style packets over an `asyncio` WebSocket server to a dependency-free browser dashboard with live gauges, a packet log, and auto-reconnect.

### Secret Santa Automation | Bash | [GitHub](https://github.com/alitcs/Secret-Santa)

CLI tool using associative arrays and `shuf` to generate self-match-free random pairings and send personalized emails via `mail`.

### T.A.S.C Website | React, TypeScript | [tasctmu.com](https://tasctmu.com)

Designed, built, deployed, and maintains the Toronto Autonomous Systems Collective site.

## Freelance

Paid client software/website engagements, an owner-operated portfolio service, and tutoring through both private freelance clients and employment. Public repos and all four live websites were reviewed November 12, 2026; client/payment details and apartment-search time savings reflect Ali's account. Full source-review notes are in `Experience.md`.

- **Interior Design R / Interior Studio** ([site](https://interiordesignr.netlify.app/), [source](https://github.com/alitcs/interiordesignR)): Paid React/TypeScript/Vite website for an interior design business to attract clients, combining before-and-after project comparisons, English/Persian support, and a Netlify Forms project-inquiry workflow for contact details and requirements.
- **99 Portfolio / GetMyPortfolio — Owner-Operated Service** ([site](https://getmyportfolio.com/), [source](https://github.com/alitcs/freelance-portfolios)): Owns and built this React/TypeScript service website so people can contact Ali and apply to have him create their portfolios. Added Netlify Forms intake, contact validation, submission feedback, spam deterrence, and an email fallback to generate leads for his paid freelance services.
- **Little Genius Island** ([site](https://littlegeniusisland.ca/), [source](https://github.com/alitcs/little-genius)): Paid React/TypeScript website helping the business attract families through daycare, piano, and tutoring applications; program/subject selection, parent/child details, calendar and weekly availability selection, validation, and Netlify Forms intake support client acquisition and scheduling follow-up.
- **JTC Property Services** ([site](https://majestic-youtiao-4bc24e.netlify.app/), [original source](https://github.com/alitcs/JTC-Website)): Paid HTML/CSS business website to attract property-service clients, with service information, project galleries, contact actions, and a FormSubmit quote-request workflow collecting contact details and work requirements for business follow-up.
- **Course Availability Notifier** ([source](https://github.com/alitcs/Course-Availability-Notifier)): Paid client tool using Python/Selenium web crawling, portal polling, and a phone/SMS API to automatically text the client when a course seat opened so they could act quickly and compete to enroll first. Supports custom XPath selectors and Chrome session reuse; public code is a configurable template rather than the complete client deployment.
- **Apartment Listing Filter & AI Scraper** ([source](https://github.com/alitcs/Apartment-Filter)): Paid client tool using Python/Selenium and the OpenAI API to find apartments matching the client's location, budget, and bedroom criteria, reject misleading two-bedroom descriptions, and retain a JSON shortlist with new-result markers. Saved hundreds of hours of manual searching and review, according to Ali's account.
- **Tutoring — Private Freelance & Employed:** Tutored students ages **6–18** in **calculus, advanced functions, physics, mathematics, and English**, through private freelance clients and employment at **Little Genius Island** and **Best Brains**, adapting instruction to each learner's age and needs.

## Community Involvement

- **Under The Tree Charity:** Founded a winter charity initiative; raised over $1,000 through social media and distributed meals, clothing, and blankets.

## Technical Skills

- **Languages:** Go, TypeScript, JavaScript, Python, C, PHP, Bash, HTML/CSS/SASS
- **Backend:** Go `chi`/Echo, Node.js/Express, REST API design, Firebase Cloud Functions
- **Frontend:** React, Vue/Nuxt 3, Pinia, PrimeVue, Vite, Tailwind, Three.js/WebGL
- **CMS:** WordPress plugin and theme development
- **Data and caching:** MySQL/MariaDB, Redis, Firestore
- **Cloud and DevOps:** AWS (S3, EC2, RDS), Google Cloud, Docker, Kubernetes, Helm, ArgoCD, GitHub Actions, Netlify
- **Integrations:** Stripe, Selenium, OpenAI API, AssemblyAI, Twilio
- **Security:** ABAC/RBAC, parameterized queries, input validation, OWASP practices
- **Tools:** Git, Bitbucket, Jira, Confluence, New Relic
