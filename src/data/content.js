/* ============ EDIT YOUR CONTENT HERE ============ */
export const PROFILE = {
  name: "Gildas Gamaliel Chatue Sobgoui",
  title: "Full-stack software engineer",
  location: "Ottawa, Ontario",
  email: "gildassob@gmail.com",
  linkedin: "https://www.linkedin.com/in/gildas-chatue",
  github: "https://github.com/Gildas23",
  summary:
    "I build and support production web applications and APIs. Over 4 years I have worked across React, Node.js, Java and PHP, deployed on AWS, and kept those systems running. I work well with support, sales and operations teams, and I am fluent in English and French.",
};

export const SKILLS = [
  ["Front-end", "React, Next.js, Angular, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3"],
  ["Back-end", "Node.js, Express, Java/Spring Boot, PHP, Python, REST APIs, Third-party API integration, Real-time services"],
  ["Databases", "PostgreSQL, MySQL, MongoDB, SQL, Schema design, Query optimization, Database administration"],
  ["Cloud and DevOps", "AWS, OVH Cloud, Docker, GitHub Actions CI/CD, Linux, Logging and monitoring, Backup automation"],
  ["Infrastructure", "Server infrastructure, VMware, VirtualBox"],
  ["Automation and AI", "Python scripting, Billing automation, OpenAI API, Gemini API"],
  ["Practices", "Git, Code reviews, Testing, Mentoring"],
];

// Permanent projects. Thumbnails live in public/projects/thumbnails/.
// "gradient" (g1-g5) and "glyph" are the fallback shown when a thumbnail is missing.
export const PROJECTS = [
  {
    id: "myeasyprep",
    category: "EdTech platform",
    title: "Myeasyprep",
    description:
      "A multilingual French exam prep platform (TEF/TCF) serving hundreds of learners across Africa with mock exams, progress dashboards, and smart revision tools.",
    gradient: "g2",
    glyph: "⬡",
    stack: ["React", "Tailwind CSS", "Node.js", "PostgreSQL"],
    link: "https://language-test-app-amber.vercel.app/",
    thumb: "/projects/thumbnails/myeasyprep.png",
  },
  {
    id: "bloosat-crm",
    category: "CRM platform",
    title: "Bloosat CRM",
    description:
      "A full CRM platform enabling Bloosat SA to monitor and manage customer records at scale, with automated billing and dynamic email scheduling.",
    gradient: "g1",
    glyph: "◈",
    stack: ["React", "Node.js", "MySQL", "REST API"],
    link: "https://ssobloosat.com/v3",
    thumb: "/projects/thumbnails/crm.png",
  },
  {
    id: "open-pharmacy",
    category: "Health tool",
    title: "Open Pharmacy",
    description: "A live tool that shows which pharmacies are open near you in Cameroon, and lets you search for medicines and compare them.",
    gradient: "g7",
    glyph: "✚",
    stack: ["Vercel"],
    link: "https://open-pharmacy-git-main-gildas-projects-6b98c95c.vercel.app/",
    thumb: "/projects/thumbnails/open-pharmacy.png",
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
    thumb: "/projects/thumbnails/photonet.png",
  },
  {
    id: "games-galerie",
    category: "Sample app",
    title: "Shop & Order on WhatsApp",
    description: "A sample click-to-order app that lets customers contact a business directly on WhatsApp.",
    gradient: "g6",
    glyph: "◆",
    stack: ["WhatsApp", "Vercel"],
    link: "https://games-galerie-hydtbipng-gildas-projects-6b98c95c.vercel.app",
    thumb: "/projects/thumbnails/games-galerie.png",
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
  },
  {
    id: "vehicle-tracking",
    category: "Real-time API",
    title: "Vehicle Tracking API",
    description:
      "A robust real-time vehicle tracking web API built with Node.js for A2I Sarl, with comprehensive testing and live data support.",
    gradient: "g3",
    glyph: "◎",
    stack: ["Node.js", "REST API", "PostgreSQL"],
    link: null,
    thumb: "/projects/thumbnails/server.png",
  },
  {
    id: "billing-automation",
    category: "Automation",
    title: "Billing & Admin Automation",
    description:
      "Automated billing, invoicing, server monitoring, and data backup scripts reducing manual workload and improving system reliability.",
    gradient: "g4",
    glyph: "✦",
    stack: ["Python", "Node.js", "MySQL", "CI/CD"],
    link: null,
    thumb: "/projects/thumbnails/billing-automation.png",
  },
  {
    id: "server-infrastructure",
    category: "Infrastructure",
    title: "Server Infrastructure & DB Admin",
    description:
      "Managed and optimized high-volume MySQL and PostgreSQL databases, server infrastructure, and third-party API integrations across multiple production environments.",
    gradient: "g5",
    glyph: "◐",
    stack: ["PostgreSQL", "MySQL", "Docker", "VMware", "VirtualBox"],
    link: null,
    thumb: "/projects/thumbnails/docker.gif",
  },
];

export const EXPERIENCE = [
  {
    role: "Software Engineer",
    org: "Bloosat SA",
    dates: "10/2023 – 09/2026",
    points: [
      "Turned requirements from support, sales and operations teams into specifications, API designs and data models, and tested features before release.",
      "Diagnosed and resolved production issues across services and databases.",
    ],
    achievements: [
      { area: "Back-end", text: "Designed, built and tested a customer management API platform (Node.js, PHP, Java/Spring Boot) that runs production business workflows and third-party integrations." },
      { area: "Full stack", text: "Delivered a CRM platform that lets the company monitor and manage customer records at scale, with automated billing and dynamic email scheduling." },
      { area: "Front-end", text: "Connected backend APIs to React and Angular front-end features, so each feature worked from the database to the screen." },
      { area: "Database", text: "Optimized MySQL schemas and queries behind the billing, invoicing and stock modules used by 1,000+ users." },
      { area: "Cloud and DevOps", text: "Built GitHub Actions CI/CD pipelines that automate builds, tests and deployments, reducing release time." },
      { area: "Cloud and DevOps", text: "Ran production deployments on AWS and OVH Cloud and supported each release after go-live." },
      { area: "Reliability", text: "Added logging and monitoring, plus scripts for server monitoring and data backup, to catch problems earlier and cut manual work." },
      { area: "AI", text: "Built a real-time customer service chatbot on the OpenAI and Gemini APIs to reduce response times for the support team." },
      { area: "Leadership", text: "Reviewed code and mentored junior developers until they could own modules independently." },
    ],
  },
  {
    role: "Software Engineer",
    org: "A2I Sarl",
    dates: "06/2022 – 08/2023",
    points: [
      "Collaborated with teams on security, automation and internal tools.",
      "Turned customer requirements into written use cases to plan development and delivery.",
    ],
    achievements: [
      { area: "Database", text: "Built a data query module for a personnel management system that cut average response time from 10 seconds to 3 seconds." },
      { area: "Cloud and DevOps", text: "Upgraded a legacy Node.js API from Node 8 to 17.2 and redeployed it with Docker, improving responsiveness by up to 30%." },
      { area: "Back-end", text: "Helped develop and test a real-time vehicle tracking web API in Node.js." },
      { area: "Front-end", text: "Built reusable React components and hooks, and integrated third-party APIs into the front end and Node.js services." },
    ],
  },
  {
    role: "Software Developer Intern",
    org: "A2I Sarl",
    dates: "06/2021 – 09/2021",
    points: ["Researched emerging web technologies and recommended integrations that fit business goals."],
    achievements: [
      { area: "Database", text: "Automated customer stock data extraction from an SQL database." },
      { area: "Automation", text: "Built a module that converts JSON data into editable Excel spreadsheets and emails users when important stock changes occur." },
    ],
  },
];
