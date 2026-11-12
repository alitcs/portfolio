// Gallery copy is deliberately short; detail copy adds context without changing the composition.
const workPresentation: Record<string, { title?: string; previewImage?: string; blurb: string; detail: string }> = {
  'ontario-government-govtechon': {
    blurb: 'Reliable, secure systems for Ontario’s public service.',
    detail: 'Modernize an intranet and media platform serving tens of thousands of public servants. Work spans Go APIs, cloud-storage migration, Redis performance, and stronger authentication, permissions, and upload validation.',
  },
  'vironix-ai': {
    previewImage: '/gallery-previews/vironix-ai.png',
    blurb: 'Turning video into actionable insights.',
    detail: 'Co-built an AI video analytics product as one of two founding engineers, sharing ownership of the interface, video-processing pipeline, billing, production safeguards, and candidate interviews.',
  },
  'artificial-intelligence-real-estate-scraper-filter': {
    title: 'AI Apartment Filter',
    blurb: 'Finding genuine two-bedroom apartments, faster.',
    detail: 'Built a paid apartment-search tool that combines browser automation with AI classification. It reads listing descriptions, filters for genuine two-bedroom apartments, and saves results between runs to reduce repeated manual searching.',
  },
  'course-availability-notifier': {
    blurb: 'A heads-up when a course seat opens.',
    detail: 'Customized browser automation to monitor course-registration portals for students. Saved Chrome sessions preserve access between checks, while SMS notifications let students know when a seat opens in a course they need.',
  },
  'interior-studio-website': {
    previewImage: '/gallery-previews/interior-studio-website.png',
    title: 'Interior Designr',
    blurb: 'A bilingual home for an interior design studio.',
    detail: 'Designed and built a responsive studio website with English and Persian content. Interactive before-and-after galleries help visitors explore transformations, while a project inquiry form gives prospective clients a direct way to connect.',
  },
  'getmyportfolio': {
    previewImage: '/gallery-previews/getmyportfolio.png',
    blurb: 'Personal portfolios, built around the person.',
    detail: 'Designed and built the website for a custom portfolio service. The site explains the design and delivery process, presents the offering across screen sizes, and collects inquiries from prospective customers.',
  },
  'little-genius-island-website-booking-system': {
    previewImage: '/gallery-previews/little-genius-island-website-booking-system.png',
    title: 'Little Genius Island',
    blurb: 'Helping families explore, enquire, and book.',
    detail: 'Built a responsive, multi-page client website in React and TypeScript. A booking and quote-request workflow gives families a clear next step while helping the business acquire customers and manage incoming inquiries.',
  },
  'jtc-property-services-website-booking-system': {
    previewImage: '/gallery-previews/jtc-property-services-website-booking-system.png',
    title: 'JTC Property Services',
    blurb: 'Property services, with a simpler path to a quote.',
    detail: 'Built a responsive website for a GTA property-maintenance company. Service-area information and a real-work gallery help customers understand the offering, while an emailed quote-request form connects inquiries to the business.',
  },
  'tutoring': {
    blurb: 'Building confidence, one lesson at a time.',
    detail: 'Tutored students in Grades 3–12 across math, English, programming, calculus, functions, and physics. Lessons adapt to each student’s pace and understanding, combining subject support with clear explanations and individual attention.',
  },
  'digital-duel': {
    previewImage: '/gallery-previews/digital-duel.png',
    blurb: 'A two-player game with hand-drawn art and custom physics.',
    detail: 'Built a local two-player shooter in C and SDL2, then brought it to the browser. Hand-drawn artwork, custom physics, and keyboard and touch controls make the game playable across different devices.',
  },
  'robotic-arm-control-system-with-web-ui': {
    previewImage: '/gallery-previews/robotic-arm-control-system-with-web-ui.png',
    title: 'Robotic Arm Control',
    blurb: 'Robotic control, made visible.',
    detail: 'Connected Python keyboard controls to a browser dashboard through WebSockets. Six live motor gauges, packet history, and reconnect handling help users monitor robotic arm movement and understand the control data as it arrives.',
  },
  'secret-santa': {
    previewImage: '/gallery-previews/secret-santa.png',
    blurb: 'Less organizing. More gift-giving.',
    detail: 'Automated a Secret Santa workflow from participant registration to email delivery. Bash scripts on Linux generate randomized assignments without self-matches, create personalized messages, and remove the manual work of distributing each match.',
  },
  'connect-ops': {
    previewImage: '/gallery-previews/connect-ops.png',
    blurb: 'Connecting people and knowledge across public-service teams.',
    detail: 'Co-built a knowledge and people-discovery prototype for the Ontario Public Service, placing third in the OGT Summer 2026 hackathon. The governance-first demo combines a full-stack application, mock data, and a mock AI service.',
  },
  't-a-s-c-website-development': {
    previewImage: '/gallery-previews/t-a-s-c-website-development.png',
    title: 'T.A.S.C.',
    blurb: 'A home for a team building autonomous systems.',
    detail: 'Designed and developed the Toronto Autonomous Systems Collective’s React and TypeScript website. Translated team requirements into a responsive experience, supported deployment, and maintained the site as a place to share the organization’s work.',
  },
  'under-the-tree-charity': {
    blurb: 'Turning community support into winter essentials.',
    detail: 'Founded a winter community initiative and raised over $1,000. Coordinated fundraising and distribution of hot meals, warm clothing, blankets, and winter supplies, turning community contributions into direct support for people who needed it.',
  },
}

export default workPresentation
