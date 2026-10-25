/* ============ EDIT YOUR CONTENT HERE ============ */
export const PROFILE = {
  name: "Gildas Chatue",
  title: "Full-stack software engineer",
  location: "",
  email: "gildassob@gmail.com",
  linkedin: "https://www.linkedin.com/in/gildas-chatue",
  github: "https://github.com/Gildas23",
  contactNote: "I am fluent in English and French and welcome inquiries in either language.",
  // contactNoteFr: "Je travaille couramment en français et en anglais, et je réponds volontiers dans l'une ou l'autre langue.",
  summary:
    "Full-stack software engineer with five years of experience designing, building and operating web applications and APIs with React, Node.js and Java. I deliver production systems on AWS, automate their release pipelines, and stay involved after launch to make sure they perform reliably for the people who depend on them.",
};

export const SKILLS = [
  ["Front-end", "React, Next.js, Angular, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3"],
  ["Back-end", "Node.js, Express, Java/Spring Boot, PHP, Python, REST APIs, third-party API integration, real-time services"],
  ["Databases", "PostgreSQL, MySQL, MongoDB, SQL, schema design, query optimization, database administration"],
  ["Cloud and DevOps", "AWS, OVH Cloud, Docker, GitHub Actions CI/CD, Linux, logging and monitoring, backup automation"],
  ["Infrastructure", "Server infrastructure, VMware, VirtualBox"],
  ["Automation and AI", "Python scripting, billing automation, OpenAI API, Gemini API"],
  ["Practices", "Git, code reviews, testing, mentoring"],
];

// Permanent projects. Thumbnails live in public/projects/thumbnails/.
// "gradient" (g1-g8) and "glyph" are the fallback shown when a thumbnail is missing.
// Optional detail-page fields: status, role, overview (blank line = new paragraph),
// highlights[], techNotes[[name, what it does here]], why. Empty fields are hidden.
export const PROJECTS = [
  {
    id: "biatoben",
    category: "Classifieds marketplace",
    title: "Biatoben",
    description:
      "A free online classifieds platform for Cameroon that makes it easy to sell or buy in Douala, Yaoundé and across the country, available as a mobile-optimized web app.",
    gradient: "g2",
    glyph: "⬡",
    stack: ["PHP", "MySQL", "Firebase", "PostgreSQL"],
    link: "https://biatoben.net",
    thumb: "/projects/thumbnails/biatoben.gif",
    status: "Live product",
    role: "Full-stack developer",
    overview:
      "Biatoben is a classified ads platform for Cameroon. It lets individuals and businesses post free ads to sell or buy online, with coverage of Douala, Yaoundé and the rest of the country.\n\nThe site is built as a mobile-first web app that can be added to a phone's home screen.",
    highlights: [
      "Free classified ads for buyers and sellers",
      "Nationwide coverage, including Douala and Yaoundé",
      "Mobile-first web app that can be added to the home screen",
      "Running in production",
    ],
    techNotes: [
      ["PHP", "Core server-side logic and application architecture"],
      ["MySQL", "Primary relational data storage"],
      ["Firebase", "Real-time updates and authentication"],
      ["PostgreSQL", "Secondary relational data storage"],
    ],
    why: "A production classifieds platform that connects buyers and sellers across Cameroon.",
  },
  {
    id: "iwolonet",
    category: "Agricultural social network and marketplace",
    title: "Iwolonet",
    description:
      "An agricultural social network and agro-pastoral marketplace that connects farmers, breeders, equipment and input suppliers, buyers, investors and service providers across Africa.",
    gradient: "g2",
    glyph: "⬡",
    stack: ["PHP", "MySQL", "Firebase", "PostgreSQL"],
    link: "https://iwolonet.com",
    thumb: "/projects/thumbnails/iwolonet.gif",
    status: "Live product",
    role: "Full-stack developer",
    overview:
      "Iwolonet is a business meeting place for the agro-pastoral value chain. Members create a profile and publish posts to present and sell their products, and can browse the offers of other members.\n\nBeyond trade, the platform helps investors and financiers find agro-industrial projects, lets service providers offer their expertise to producers, and connects employers with job seekers in the sector. It is available on the web and as an Android app.",
    highlights: [
      "Member profiles and an online space to present and sell agro-pastoral products",
      "Business matching between producers, buyers, and suppliers of equipment, fertilizers and phytosanitary products",
      "Project discovery for investors and financiers",
      "Service-provider listings and an agro-pastoral job board",
      "Web platform and Android app, with 10,000+ downloads reported on Google Play",
      "Used by companies, cooperatives and associations in several African countries",
    ],
    techNotes: [
      ["PHP", "Core server-side logic and application architecture"],
      ["MySQL", "Primary relational data storage"],
      ["Firebase", "Real-time updates and authentication"],
      ["PostgreSQL", "Secondary relational data storage"],
    ],
    why: "A social network and marketplace that gives farmers, suppliers, investors and service providers across Africa a common place to do business.",
  },
  {
    id: "myeasyprep",
    category: "EdTech platform",
    title: "Myeasyprep",
    description:
      "A live exam-preparation platform for the TEF and TCF, French-language tests accepted for Canadian immigration. It serves hundreds of learners across Africa with mock exams, progress dashboards and revision tools.",
    gradient: "g2",
    glyph: "⬡",
    stack: ["React", "Tailwind CSS", "Node.js", "PostgreSQL"],
    link: "https://language-test-app-amber.vercel.app/",
    thumb: "/projects/thumbnails/myeasyprep.gif",
    status: "Live product",
    role: "",
    overview:
      "Myeasyprep helps candidates prepare for the TEF and TCF, two widely used French-language proficiency exams. The interface is multilingual and serves hundreds of learners across Africa.\n\nLearners practice with mock exams, track their results on progress dashboards and use revision tools to focus their preparation.",
    highlights: [
      "Mock exams for TEF and TCF practice",
      "Progress dashboards for tracking results",
      "Revision tools to guide study",
      "Multilingual interface for learners across Africa",
      "Deployed on Vercel",
    ],
    techNotes: [
      ["React", "Front-end interface"],
      ["Tailwind CSS", "Styling"],
      ["Node.js", "Server-side logic and API"],
      ["PostgreSQL", "Relational data storage"],
    ],
    why: "The TEF and TCF are accepted for Canadian immigration, so this product speaks directly to the bilingual Canadian context. It is live and in active use, not a demo.",
  },
  {
    id: "server-infrastructure",
    category: "Infrastructure",
    title: "Server Infrastructure and Database Administration",
    description:
      "Managed and optimized high-volume MySQL and PostgreSQL databases, server infrastructure and third-party API integrations across multiple production environments.",
    gradient: "g5",
    glyph: "◐",
    stack: ["PostgreSQL", "MySQL", "Docker", "VMware", "VirtualBox"],
    link: null,
    thumb: "/projects/thumbnails/docker.gif",
    status: "Production operations",
    role: "",
    overview:
      "Day-to-day management and optimization of high-volume MySQL and PostgreSQL databases and the servers they run on, along with third-party API integrations, across multiple production environments.",
    highlights: [
      "Database management and optimization",
      "Server infrastructure",
      "Third-party API integrations",
      "Multiple production environments",
    ],
    techNotes: [
      ["PostgreSQL", "Relational data storage"],
      ["MySQL", "Relational data storage"],
      ["Docker", "Containerized deployments"],
      ["VMware", "Virtual machines for environments"],
      ["VirtualBox", "Virtual machines for development and testing"],
    ],
    why: "Demonstrates the ability to operate the systems behind an application as well as write the code on top of them.",
  },
  {
    id: "photonet-shop",
    category: "E-commerce",
    title: "Photonet Shop",
    description: "A live online shop where customers order photo prints from home.",
    gradient: "g5",
    glyph: "◉",
    stack: [],
    link: "https://photonet.shop/",
    thumb: "/projects/thumbnails/photonet.gif",
    status: "Live product",
    role: "",
    overview:
      "Photonet Shop lets customers order photo prints online instead of visiting a print shop.",
    highlights: ["Online ordering of photo prints", "Customer-facing storefront, live in production"],
    techNotes: [],
    why: "Demonstrates the ability to ship a customer-facing ordering experience used by real customers.",
  },

  {
    id: "chaser-followups",
    category: "SaaS automation tool",
    title: "Chaser",
    description:
      "A billing follow-up tool that identifies overdue invoices, drafts a personalized email for each, and holds every draft for human approval before anything is sent.",
    gradient: "g2",
    glyph: "✉",
    stack: ["React", "Vite", "Tailwind CSS"],
    link: "https://chaser-flame.vercel.app/",
    thumb: "/projects/thumbnails/chaser.png",
    status: "Portfolio project (live demo)",
    role: "Designer and developer",
    overview:
      "A small SaaS-style tool for chasing unpaid invoices without writing each reminder by hand. It flags overdue invoices with no message in the last 7 days, selects a stage (reminder, first overdue, second overdue or final notice) based on how late each one is, and drafts an email in the customer's preferred tone.\n\nEvery draft goes to a review queue, where a person can edit, approve or reject it. Sending stays locked until a message is approved. It is a cleaner, public rebuild of the billing-email workflow from my CRM work.",
    highlights: [
      "Approval-gated sending: nothing goes out until a reviewer approves it",
      "Follow-up rule that skips invoices contacted in the last 7 days",
      "Stage and tone selected automatically from days overdue and customer preference",
      "Live countdowns for due dates, the next automatic check and 7-day cooldowns",
      "Review queue, invoice and customer views, and send history",
    ],
    techNotes: [
      ["React", "Single-page dashboard with hash routing"],
      ["Vite", "Dev server and production build"],
      ["Tailwind CSS", "Styling with light and dark themes"],
      ["Demo data", "Fictional customers and invoices, held in memory"],
    ],
    why: "Demonstrates the ability to turn a real business workflow into a clear product: a rule-driven process, a human-in-the-loop interface and a credible path from demo to production.",
  },
  {
    id: "airborne-magnetic-survey-viewer",
    category: "Data visualization",
    title: "Airborne Magnetic Survey Viewer",
    description:
      "An interactive viewer for airborne magnetic survey data. A flight-line map, a linked profile chart and a histogram update together as you select regions and filter values.",
    gradient: "g3",
    glyph: "≋",
    stack: ["React", "Vite", "Tailwind CSS", "Canvas"],
    link: "https://airborne-flame.vercel.app/",
    thumb: "/projects/thumbnails/amsv.png",
    status: "Portfolio project",
    role: "",
    overview:
      "A web app for exploring airborne magnetic survey data in a form that is readable to people outside geophysics. Each reading is drawn as a point on a map, colored by magnetic field intensity.\n\nThe built-in surveys are synthetic and made for demonstration. Users can also open their own CSV file of survey readings.",
    highlights: [
      "Canvas-rendered map that stays responsive with large point counts",
      "Drag-to-select regions, with statistics and histogram following the selection",
      "Linked map and profile hover; click a point to select its line",
      "Intensity filters, three color palettes (one color-blind safe) and keyboard navigation",
      "Current view stored in the URL so it can be shared",
      "Clear error messages for invalid CSV files, plus unit tests for parsing and filtering",
    ],
    techNotes: [
      ["React", "Components and shared state in a custom hook"],
      ["Vite", "Build tooling and dev server"],
      ["Tailwind CSS", "Styling"],
      ["Canvas", "Rendering of survey points and the interactive overlay"],
    ],
    why: "Demonstrates the ability to turn a dense technical data set into an approachable interface, with attention to interaction design, accessibility and performance.",
  },
  {
    id: "bloosat-crm",
    category: "CRM platform",
    title: "Bloosat CRM",
    description:
      "A production CRM that lets Bloosat SA monitor and manage customer records at scale, with automated billing and dynamic email scheduling.",
    gradient: "g1",
    glyph: "◈",
    stack: ["React", "Node.js", "MySQL", "REST API"],
    link: "https://ssobloosat.com/v3",
    thumb: "/projects/thumbnails/crm.png",
    status: "Live product",
    role: "Software engineer, Bloosat SA",
    overview:
      "A CRM platform built for Bloosat SA to monitor and manage customer records at scale.\n\nIt automates billing and schedules emails dynamically, removing repetitive work from the team.",
    highlights: [
      "Customer record management at scale",
      "Automated billing",
      "Dynamic email scheduling",
      "REST API connecting the React front end to the Node.js back end and MySQL",
    ],
    techNotes: [
      ["React", "Front-end interface"],
      ["Node.js", "Server-side logic and API"],
      ["MySQL", "Relational data storage"],
      ["REST API", "Contract between the front end and back end"],
    ],
    why: "Demonstrates ownership of a business-critical system from requirements through data model, API and interface to production use.",
  },
  {
    id: "vehicle-tracking",
    category: "Real-time API",
    title: "Vehicle Tracking API",
    description:
      "A real-time vehicle tracking web API built with Node.js at A2I Sarl, with comprehensive testing and live data support. I contributed to its development and testing.",
    gradient: "g3",
    glyph: "◎",
    stack: ["Node.js", "REST API", "PostgreSQL"],
    link: null,
    thumb: "/projects/thumbnails/server.png",
    status: "Client work, no public link",
    role: "Software engineer, A2I Sarl",
    overview:
      "A real-time web API for tracking vehicles, built with Node.js at A2I Sarl. It supports live data and was developed with comprehensive testing.",
    highlights: [
      "Real-time vehicle tracking over a REST API",
      "Live data support",
      "Comprehensive testing",
      "Contributed to development and testing",
    ],
    techNotes: [
      ["Node.js", "Server-side logic and real-time API"],
      ["REST API", "Interface for client applications"],
      ["PostgreSQL", "Relational data storage"],
    ],
    why: "Demonstrates experience with real-time back-end services and thorough testing before release.",
  },


  {
    id: "open-pharmacy",
    category: "Health tool",
    title: "Open Pharmacy",
    description:
      "A live tool that shows which pharmacies are open near you in Cameroon, with medicine search and comparison.",
    gradient: "g7",
    glyph: "✚",
    stack: ["Vercel"],
    link: "https://open-pharmacy-sandy.vercel.app/pharmacies",
    thumb: "/projects/thumbnails/open-pharmacy.png",
    status: "Live product",
    role: "",
    overview:
      "Open Pharmacy helps people in Cameroon find a nearby pharmacy that is open right now, and search for and compare medicines.",
    highlights: [
      "Live view of nearby pharmacies that are open",
      "Medicine search with comparison",
      "Built for users in Cameroon",
      "Deployed on Vercel",
    ],
    techNotes: [["Vercel", "Hosting and deployment"]],
    why: "Demonstrates product thinking: a practical tool for a real local problem, shipped live.",
  },

  {
    id: "games-galerie",
    category: "Sample app",
    title: "Shop & Order on WhatsApp",
    description:
      "A sample click-to-order app that lets customers contact a business directly on WhatsApp.",
    gradient: "g6",
    glyph: "◆",
    stack: ["WhatsApp", "Vercel"],
    link: "https://games-galerie.vercel.app",
    thumb: "/projects/thumbnails/games-galerie.png",
    status: "Sample project",
    role: "",
    overview:
      "A sample click-to-order app. Instead of a full checkout, customers click to order and reach the business directly on WhatsApp.",
    highlights: [
      "Click-to-order flow",
      "Direct contact with the business on WhatsApp",
      "Deployed on Vercel",
    ],
    techNotes: [
      ["WhatsApp", "Channel customers use to contact the business and place orders"],
      ["Vercel", "Hosting and deployment"],
    ],
    why: "A lightweight alternative to a full checkout, built on a messaging channel customers already use.",
  },
  {
    id: "github-dashboard",
    category: "Dashboard",
    title: "GitHub Analytics Dashboard",
    description: "A dashboard for viewing GitHub analytics, deployed on Vercel.",
    gradient: "g8",
    glyph: "▤",
    stack: ["Vercel"],
    link: "https://github-analytic-dashbaord-eta.vercel.app/",
    thumb: "/projects/thumbnails/github-dashboard.png",
    status: "Side project",
    role: "",
    overview: "A GitHub analytics dashboard deployed on Vercel.",
    highlights: [],
    techNotes: [["Vercel", "Hosting and deployment"]],
    why: "",
  },

  {
    id: "billing-automation",
    category: "Automation",
    title: "Billing and Admin Automation",
    description:
      "Automated billing, invoicing, server monitoring and data backup scripts that reduce manual workload and improve system reliability.",
    gradient: "g4",
    glyph: "✦",
    stack: ["Python", "Node.js", "MySQL", "CI/CD"],
    link: null,
    thumb: "/projects/thumbnails/billing-automation.png",
    status: "Internal tooling, no public link",
    role: "Software engineer, Bloosat SA",
    overview:
      "A set of automation scripts that handle billing and invoicing, monitor servers and back up data. They reduce manual workload and make the underlying systems more reliable.",
    highlights: [
      "Automated billing and invoicing",
      "Server monitoring",
      "Automated data backups",
      "Fewer manual tasks for the team",
    ],
    techNotes: [
      ["Python", "Automation scripting"],
      ["Node.js", "Server-side tooling"],
      ["MySQL", "Billing and records data"],
      ["CI/CD", "Automated builds and deployments"],
    ],
    why: "Demonstrates a habit of automating repeatable work and a focus on reliability as well as features.",
  },

];

export const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Bloosat SA",
    dates: "Oct 2023 – Sep 2026",
    points: [
      "Translated requirements from support, sales and operations teams into specifications, API designs and data models, and tested features before release.",
      "Diagnosed and resolved production issues across services and databases.",
    ],
    achievements: [
      { area: "Back-end", text: "Designed, built and tested a customer management API platform (Node.js, PHP, Java/Spring Boot) that runs production business workflows and third-party integrations." },
      { area: "Full stack", text: "Delivered a CRM platform that lets the company monitor and manage customer records at scale, with automated billing and dynamic email scheduling." },
      { area: "Front-end", text: "Connected back-end APIs to React and Angular front-end features, delivering each feature end to end from database to screen." },
      { area: "Database", text: "Optimized MySQL schemas and queries behind the billing, invoicing and stock modules used by 1,000+ users." },
      { area: "Cloud and DevOps", text: "Built GitHub Actions CI/CD pipelines that automate builds, tests and deployments, reducing release time." },
      { area: "Cloud and DevOps", text: "Ran production deployments on AWS and OVH Cloud and supported each release after go-live." },
      { area: "Reliability", text: "Added logging and monitoring, plus server monitoring and data backup scripts, to detect problems earlier and reduce manual work." },
      { area: "AI", text: "Built a real-time customer service chatbot on the OpenAI and Gemini APIs to reduce response times for the support team." },
      { area: "Leadership", text: "Reviewed code and mentored junior developers until they could own modules independently." },
    ],
  },
  {
    role: "Software Engineer",
    org: "A2I Sarl",
    dates: "Jun 2022 – Aug 2023",
    points: [
      "Collaborated with teams on security, automation and internal tools.",
      "Converted customer requirements into written use cases to plan development and delivery.",
    ],
    achievements: [
      { area: "Database", text: "Built a data query module for a personnel management system that cut average response time from 10 seconds to 3 seconds." },
      { area: "Cloud and DevOps", text: "Upgraded a legacy Node.js API from Node 8 to 17.2 and redeployed it with Docker, improving responsiveness by up to 30%." },
      { area: "Back-end", text: "Contributed to the development and testing of a real-time vehicle tracking web API in Node.js." },
      { area: "Front-end", text: "Built reusable React components and hooks, and integrated third-party APIs into the front end and Node.js services." },
    ],
  },
  {
    role: "Software Developer Intern",
    org: "A2I Sarl",
    dates: "Jun 2021 – Sep 2021",
    points: ["Researched emerging web technologies and recommended integrations aligned with business goals."],
    achievements: [
      { area: "Database", text: "Automated the extraction of customer stock data from an SQL database." },
      { area: "Automation", text: "Built a module that converts JSON data into editable Excel spreadsheets and emails users when significant stock changes occur." },
    ],
  },
];