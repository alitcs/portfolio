# Resume technical skills classification rules

Scope: the Technical Skills section of `Ali_Hamoudi_Resume.tex`.

This is an explicit policy for this resume, not a claim that one universal resume classification standard exists. Official product documentation establishes the technology types; this policy establishes the categories, inclusion tests, tie-breakers, and display order. A category may combine types only when its label names those types explicitly.

1. Include only a named language, software product, SDK, or hosted service supported by Ali's recorded hands-on work in `Experience.md`, `Experience_compressed.md`, or the portfolio source. Availability somewhere in a team's stack alone is insufficient evidence.
2. Classify the exact item named, not its vendor or a related technology. An SDK is not the cloud infrastructure it accesses. A hosted database is still a database. A protocol or architectural style is not a library.
3. Use each item once. Prefer specific products to umbrella labels: Firestore and Firebase Authentication, rather than adding Firebase again as another skill. Provider names can qualify a group without becoming additional entries.
4. Use the seven categories below in the listed order. Within each category, sort alphabetically by canonical technology name, ignoring letter case and explanatory qualifiers. The order is a declared presentation convention, not a claim about proficiency or demand.
5. Keep architecture, protocols, methods, and capabilities in the experience bullets for this technology inventory. Thus REST, WebSockets, authentication/authorization, concurrency, and testing remain supported experience claims but are not mixed with software products in this section. A named product such as Firebase Authentication is eligible.
6. Do not introduce new products, proficiency ratings, versions, certifications, or broader expertise solely to fill a category. Renaming the existing S3 SDK entry to AWS SDK for Go (S3) specifies the documented library and limits the scope of the claim.

| Category | Inclusion test | Current entries |
| --- | --- | --- |
| Languages | A formal language used to express programs, shell commands, queries, markup, or styles. The label is Languages, not Programming Languages: HTML and CSS are markup and stylesheet languages. | Bash, C, CSS, Go, HTML, JavaScript, PHP, Python, SQL, TypeScript |
| Runtimes, Frameworks & Libraries | Software that executes application-language code, supplies an application framework, or is imported/linked as an application library or SDK. All three types are named in the label; Node.js is a runtime, Express a framework, React a library, and the AWS SDK a client toolkit. | AWS SDK for Go (S3), chi, Express, Node.js, Nuxt, React, Vue |
| Databases & Caches | Products whose primary role is storing/querying application records or caching data. Hosting location does not change this classification. | Firestore, MariaDB, MySQL, Redis |
| Cloud Infrastructure | Managed compute, object-storage, or secret/configuration infrastructure used to operate the application. Excludes database products, development automation, and application-facing service APIs, which have their own categories. | Google Cloud: Cloud Run, Cloud Storage, Secret Manager |
| Development & Automation Tools | Products primarily used for version control, container delivery, build/deployment workflows, or browser automation. | Docker, Git, GitHub Actions, Selenium |
| Service APIs | Hosted services integrated for application-level identity, AI, payments, or messaging. Names identify the actual products, not the general capability. | Firebase Authentication, OpenAI API, Stripe, Twilio |
| Content Management Systems | Application products providing content authoring, publishing, and administration. Do not relabel these as UI frameworks or generic developer tools. | WordPress |

Tie-breakers:

- Firestore goes under Databases & Caches even though it is cloud hosted.
- Firebase Authentication goes under Service APIs; the general concept of authentication stays in experience.
- AWS SDK for Go (S3) goes under Runtimes, Frameworks & Libraries. Its use does not by itself establish administration of AWS infrastructure or other AWS services.
- GitHub Actions goes under Development & Automation Tools because its documented purpose is workflow/CI/CD automation, even though GitHub hosts its runners.
- Docker goes under Development & Automation Tools because the named product packages, ships, and runs containers; it is not an application-language runtime like Node.js.
- Selenium goes under Development & Automation Tools because the named product is a browser-automation tool suite. Its use for a client tool does not imply browser-test experience that is absent from the record.
- JSON files used by the apartment tool are data files, not a database product; they do not create an additional database skill.

Primary definitions consulted:

- [HTML: markup language](https://developer.mozilla.org/en-US/docs/Web/HTML) and [CSS: stylesheet language](https://developer.mozilla.org/en-US/docs/Web/CSS).
- [Node.js: JavaScript runtime](https://nodejs.org/en/about), [Express: web framework](https://expressjs.com/), [React: UI library](https://react.dev/), [Vue: UI framework](https://vuejs.org/guide/introduction.html), and [chi: Go HTTP router](https://github.com/go-chi/chi).
- [AWS SDK for Go: application APIs and utilities for using AWS services](https://docs.aws.amazon.com/sdk-for-go/v2/developer-guide/welcome.html).
- [Firestore: cloud-hosted NoSQL database](https://firebase.google.com/docs/firestore), [MySQL: database system](https://dev.mysql.com/doc/refman/8.4/en/what-is-mysql.html), and [Redis documentation](https://redis.io/docs/latest/develop/get-started/).
- [Cloud Run: managed application platform](https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run).
- [Firebase Authentication: backend identity service and SDKs](https://firebase.google.com/docs/auth).
- [Git: version control](https://git-scm.com/), [Docker: application development/delivery platform](https://docs.docker.com/get-started/docker-overview/), [GitHub Actions: CI/CD automation](https://docs.github.com/en/actions/get-started/understand-github-actions), and [Selenium: browser automation](https://www.selenium.dev/about/).
- [WordPress official description](https://wordpress.org/about/) and [content management terminology](https://wordpress.org/documentation/article/wordpress-glossary/#content-management-system).
- [REST: architectural style](https://ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm) and [WebSocket: communication protocol](https://www.rfc-editor.org/rfc/rfc6455).

Definitions reviewed November 12, 2026. These sources establish classification, not evidence of Ali's proficiency; the experience records provide that evidence.
