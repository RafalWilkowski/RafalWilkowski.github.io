/*
 * Single source of truth: everything on the portfolio page (index.html) and
 * in the printable CV (cv.html -> Rafal_Wilkowski_CV.pdf) is rendered from
 * this file. Edit here, refresh, re-run tools/build-pdf.ps1.
 */
window.CV = {
  name: "Rafał Wilkowski",
  headline: "Senior Unity/C# Game Engineer",
  tagline: "F2P Mobile · Systems, LiveOps & Technical Leadership\nAI Agent Workflows", // "\n" forces a line break on the site
  location: "Poznań, Poland",
  timezone: "CET/CEST",
  timezoneNote: "UTC+1/+2",
  workMode: "Remote",

  status: {
    open: true,
    label: "Open to work",
    lookingFor: "Senior / Lead Unity Engineer - F2P mobile, remote."
  },

  contact: {
    email: "rafal.wilkowski.gamedev@gmail.com",
    linkedin: "https://www.linkedin.com/in/rafalwilkowski/",
    website: "https://rafalwilkowski.github.io"
  },

  // CV export options.
  cv: {
    photo: true // false = hide the avatar in the PDF
  },

  // Three facts at a glance.
  stats: [
    { value: "6", suffix: " years", label: "shipping live F2P mobile titles" },
    { value: "3", suffix: " games", label: "developed with integrated AI coding agents" },
    { value: "3", suffix: " engineers", label: "onboarded and mentored" }
  ],

  summary: [
    "Senior Unity Game Engineer with nearly six years at Orchid Games on three live free-to-play solitaire titles for iOS and Android, shipped on App Store, Google Play and Amazon Appstore.",
    "Started on gameplay and LiveOps, now delivery lead on all three titles: I own architecture, performance, player data and release engineering, and I keep every discipline on one timeline so the build ships. I currently work in an AI-first workflow."
  ],

  // "What I bring" cards on the site; the CV carries the experience bullets instead.
  highlights: [
    {
      icon: "compass",
      title: "Technical Leadership",
      text: "Architecture decisions and trade-off calls made together with game design, inside real technical constraints. I onboard engineers onto the codebase, architecture and production process and keep code reviews regular - done for three engineers so far. As delivery lead I keep design, art, localization, QA and store requirements on one timeline, so the build goes out on the date."
    },
    {
      icon: "sparkles",
      title: "AI Agent Workflows",
      text: "A working setup for AI coding agents: repositories prepared with technical specs, documentation and procedures, agents handling implementation and cross-verification, while architecture, product requirements and the production-readiness call stay with me."
    },
    {
      icon: "memory",
      title: "Memory & Assets",
      text: "Asset and memory control that holds up on low-end devices: explicit lifecycle control, memory usage control and background downloading. Fewer loading screens and a significant RAM reduction on live titles."
    },
    {
      icon: "database",
      title: "Data Architecture",
      text: "Experience with changing player data safely on a live game: I have run profile migrations on a live player database and kept the automated cross-device profile merge reliable, improving it along the way."
    },
    {
      icon: "trophy",
      title: "LiveOps & Monetization",
      text: "Hands-on with the systems a F2P game runs on: I have built in-game events, online tournaments with leaderboards, a season pass system and dynamic, player-segmented IAP offers."
    },
    {
      icon: "rocket",
      title: "Platforms & Release Engineering",
      text: "Releases that go out on three stores: a maintained build and release pipeline (Fastlane, Unity Batchmode), third-party SDK integration and platform requirements handled - ATT, GDPR consent, Apple Privacy Manifests and account deletion procedures."
    }
  ],

  experience: [
    {
      company: "Orchid Games",
      url: "https://www.orchidgames.com/",
      role: "Unity Developer",
      period: "Jan 2021 - Present",
      meta: "Full-time · Remote from day one",
      intro: "Three live F2P solitaire titles on the App Store, Google Play and Amazon Appstore - a combined 500K+ installs - built by a small fully-remote team. Started on gameplay features and grew into delivery lead on all three titles: I own architecture, player data, the release pipeline and technical direction, and I keep design, art, QA and store requirements on one timeline so the build goes out. The title never changed, the scope did.",
      products: [
        { name: "Solitaire Dreams", note: "live since 2016", links: [
          { label: "App Store", url: "https://apps.apple.com/us/app/solitaire-dreams/id1031227432" },
          { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.orchidgames.heartwildsolitaire" }
        ] },
        { name: "Collector Solitaire", note: "live since 2020", links: [
          { label: "App Store", url: "https://apps.apple.com/us/app/collector-solitaire/id1535056836" },
          { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.orchidgames.solitairegame3" }
        ] },
        { name: "Solitaire Royals", note: "live since 2022", links: [
          { label: "App Store", url: "https://apps.apple.com/us/app/solitaire-royals-matching-game/id1611154204" },
          { label: "Google Play", url: "https://play.google.com/store/apps/details?id=com.orchidgames.solitaireroyals" }
        ] }
      ],
      // Bullets appear in the CV only; on the site the "What I bring" cards cover them.
      // Wording follows cv-compact.txt, with the delivery-lead sentence added to Technical Leadership.
      bullets: [
        { label: "Technical Leadership", text: "Architectural decisions and evaluating trade-offs, collaborating with game design to shape solutions within technical constraints. Handled the technical onboarding of three engineers, sharing knowledge of the codebase, architecture, and production processes, alongside regular code reviews. As delivery lead I keep design, art, localization, QA and store requirements on one timeline, so the build goes out on the date." },
        { label: "AI Agent Workflows", text: "Prepared repositories for work with AI coding agents using technical specs, documentation, and established procedures. Agents supported implementation and cross-verification of code, while I was responsible for architecture, product requirements, and evaluating solutions for production readiness." },
        { label: "Memory & Assets", text: "A custom asset referencing system designed around project needs (similar to Addressables), featuring explicit lifecycle control, memory usage control, and background downloading. Minimized loading screens and significantly reduced RAM usage, particularly on low-end devices." },
        { label: "Data Architecture", text: "Player profile migrations on a live player database and handling automated cross-device profile conflict resolution." },
        { label: "LiveOps & Monetization", text: "In-game events, online tournaments with leaderboards, a season pass system, and dynamic, player-segmented IAP offers." },
        { label: "Platforms & Release Engineering", text: "Maintaining and improving the build and release pipeline (Fastlane, Unity Batchmode), integrating third-party SDKs, and implementing platform requirements: ATT, GDPR consent, Apple Privacy Manifests, and account deletion procedures." }
      ]

    }
  ],

  education: [
    {
      school: "Game Dev School",
      url: "https://www.gamedevschool.pl/",
      degree: "1-year game programming course - three team projects, one as team lead",
      period: "2019 - 2020"
    }
  ],

  // Before Orchid Games (2019-2020). Compact list on the site only.
  projects: [
    { title: "The Wolf's Night", platform: "PC · Unity", role: "Team lead, programmer", links: [{ label: "Video", url: "https://www.youtube.com/watch?v=ehyjuAJjYeI" }] },
    { title: "Space Pace", platform: "Android · Unity", role: "Solo project, Google Play release", links: [{ label: "Video", url: "https://www.youtube.com/watch?v=N6YdrGl38w0" }] },
    { title: "Gem Rush", platform: "Android · Unity", role: "Programmer, Google Play release", links: [{ label: "Video", url: "https://www.youtube.com/watch?v=T5uRJibwepI" }] },
    { title: "River Raid Vietnam", platform: "PC · Godot", role: "Programmer", links: [{ label: "Video", url: "https://www.youtube.com/watch?v=bm_f63dkV8k" }] },
    { title: "Don & Pansa", platform: "PC · Unity · Global Game Jam", role: "Programmer", links: [] }
  ],

  // Grouped by problem. Same groups on the site and in the CV.
  skills: [
    { group: "Core", items: ["Unity 6", "C#", ".NET", "Mobile game development", "iOS", "Android", "Software architecture", "Systems design"] },
    { group: "Leadership", items: ["Technical leadership", "Code review", "Technical onboarding", "Technical documentation", "Cross-discipline collaboration"] },
    { group: "AI-assisted engineering", items: ["Claude Code", "Agentic workflows", "Model Context Protocol (MCP)", "Agent-ready repositories"] },
    { group: "Performance & memory", items: ["Performance optimization", "Memory management", "Profiling", "Asset management", "Addressables"] },
    { group: "Backend & player data", items: ["Client-server architecture", "Data migration", "Data synchronization", "Firebase"] },
    { group: "F2P & product", items: ["LiveOps", "In-app purchases", "Monetization", "SDK integration", "Mobile analytics"] },
    { group: "Release & platforms", items: ["Fastlane (Ruby)", "Build automation", "App Store Connect (App Manager)", "Google Play Console", "Amazon Appstore", "GDPR", "ATT", "Privacy Manifests", "Git"] }
  ],

  languages: [
    { name: "Polish", level: "Native" },
    { name: "English", level: "Working proficiency" }
  ],

  // Printed at the bottom of the CV.
  gdprClause: "I consent to the processing of my personal data for the purposes of the recruitment process (art. 6(1)(a) GDPR)."
};
