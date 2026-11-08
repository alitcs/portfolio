# Ali Hamoudi

Toronto, ON | alihamoudiu18@gmail.com | [LinkedIn](https://www.linkedin.com/in/ali-hamoudi/) | [GitHub](https://github.com/alitcs)

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

### Founding Engineer / Technical Co-Founder, Vironix AI | Sep 2025 to present

Helped architect and build an AI-powered video analytics platform with active users, owning large parts of the architecture alongside the founding team.

- **Stack:** React, TypeScript, Vite, Tailwind, TanStack Query; Node.js/Express; Firebase Auth and Firestore; Google Cloud Storage; Docker, GitHub Actions.
- **Async pipeline:** Job creation, storage uploads, worker processing, analysis, result persistence, retries, and failure handling, with idempotent job and refund logic.
- **Billing and cost engineering:** Built a credit-based usage system (cost estimation, deduction, post-processing reconciliation, refunds, transaction records) with transactional operations. Analyzed pricing against AI, media, and infrastructure costs to design the unit economics. Stripe subscriptions, credit purchases, and webhook-driven account state.
- **AI/media:** Google Cloud Video Intelligence, AssemblyAI, LLM integrations (AI chat, structured assistant, usage quotas, prompt construction), FFmpeg/ffprobe.
- **Production safeguards:** Authentication/authorization, input validation, rate limiting, signed storage URLs.
- **Company operations:** Interviewed 50+ engineering candidates and helped hire the team; contributed to financial planning, expense evaluation, and prioritization.

## Projects

### Connect OPS | 3rd place, Ontario Government OGT Hackathon, Summer 2026 | [Demo](https://connectops.netlify.app/)

AI chat-first people and knowledge discovery app for the ~66,000-person Ontario Public Service. Team of 4. Prototype with mock data and a mock AI service; the frontend, REST API, authorization logic, 3D visualization, and intent routing are real code.

- **Stack:** React 18, TypeScript, Vite, Node/Express, WebGL/Three.js, npm-workspaces monorepo, Netlify.
- **Architecture:** Layered backend (routes, controllers, services, data) with swappable mocks for the database, AI (designed to swap for Microsoft Copilot without changing the response contract), and auth (Entra ID/MSAL). Client-side mock backend powers the live demo; an Express reference backend mirrors it.
- **AI layer:** 9+ intent types (person lookup, ticket intelligence, skill/team discovery, project staffing with capability-gap detection, onboarding, mentor shadowing), with a rationale and deterministic confidence badge on every result. Governance-first design: AI routes and phrases, governed queries supply facts, a permission layer decides what is shown.
- **3D connection network:** Interactive force-directed graph (`react-force-graph-3d`) with 10+ relationship lenses surfacing isolated staff, cross-ministry connectors, and single-person knowledge risks; linked to a manager chat.
- **Security and privacy:** Field allow-list against mass assignment, admin-gated analytics (403s), scope-isolated chat threads, IDOR-safe message threads, opt-in reciprocal location sharing, and a documented OWASP-aware hardening plan.
- **Business case:** ~$1.43M 3-year cost model, ~$4M+/yr projected ROI, under 6-month payback, still over 2x return at 25% adoption.

### Digital Duel | C, SDL2 | [GitHub](https://github.com/alitcs/Digital-Duel)

Local two-player top-down 2D shooter with menu, gameplay, and game-over states. Frame-rate-independent movement via delta time, projectile cooldowns, rectangle collision detection, and manual memory and SDL resource management in a modular C codebase. Builds with GCC (Linux/WSL) and MinGW (Windows).

### Robotic Arm Control Web UI | Python, JavaScript | [GitHub](https://github.com/alitcs/Robotic-Arm-UI)

PyGame keyboard backend polling at ~50 Hz and broadcasting six-channel PWM-style packets over an `asyncio` WebSocket server to a dependency-free browser dashboard with live gauges, a packet log, and auto-reconnect.

### Secret Santa Automation | Bash | [GitHub](https://github.com/alitcs/Secret-Santa)

CLI tool using associative arrays and `shuf` to generate self-match-free random pairings and send personalized emails via `mail`.

### T.A.S.C Website | React, TypeScript | [tasctmu.com](https://tasctmu.com)

Designed, built, deployed, and maintains the Toronto Autonomous Systems Collective site.

## Freelance

- **Interior Studio** ([site](https://interiordesignr.netlify.app/)): Interior design website with interactive before-and-after project comparisons, English and Persian language options, and a project inquiry form.
- **GetMyPortfolio** ([site](https://getmyportfolio.com/)): Website for a custom portfolio service, presenting its design and delivery process and collecting prospective customer inquiries.
- **Little Genius Island** ([site](https://littlegeniusisland.ca/)): Responsive React/TypeScript site with a booking and quote-intake workflow for a service business, built to convert inquiries into booked work.
- **JTC Property Services** ([site](https://majestic-youtiao-4bc24e.netlify.app/)): Multi-page HTML/CSS site with a CSS-only mobile menu, service-area page, project gallery, and a quote form wired to an email service.
- **Course Availability Notifier** ([GitHub](https://github.com/alitcs/Course-Availability-Notifier)): Python/Selenium tool with configurable XPath selectors, Chrome profile reuse for MFA sessions, polling, and SMS alerts. Paid by students.
- **Apartment Listing Filter** ([GitHub](https://github.com/alitcs/Apartment-Filter)): Selenium scraper using the OpenAI API to verify true two-bedroom units, with JSON persistence of results. Paid client project.
- **Tutoring:** Grades 3 to 12 in math, calculus, functions, physics, English, and programming, through private clients, Best Brains, and Little Genius Island.
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
