/* ============ EDIT YOUR CONTENT HERE ============ */
export const PROFILE = {
  name: "Gildas Chatue",
  title: "Full-stack Developer & Cloud Engineer",
  // Two short role badges shown under the title.
  roles: ["Full-stack development", "Cloud & infrastructure"],
  location: "Ottawa, Canada",
  education: "B.Sc. Software Engineering, University of Buea (2019 – 2023), assessed by WES as equivalent to a Canadian bachelor's degree",
  languages: "English and French (advanced, spoken and written)",
  email: "gildassob@gmail.com",
  linkedin: "https://www.linkedin.com/in/gildas-chatue",
  github: "https://github.com/Gildas23",
  contactNote: "I am fluent in English and French and welcome inquiries in either language.",
  // contactNoteFr: "Je travaille couramment en français et en anglais, et je réponds volontiers dans l'une ou l'autre langue.",
  summary:
    "I build web applications and APIs with React, Node.js, Java and C#/.NET, then run them in production on Linux, Docker, Kubernetes and AWS. From the database to the screen to the server, and I stay with them after launch.",
  // Shown beside the name in the hero. Each entry is [label, value].
  facts: [
    ["Experience", "4+ years, most recently at Bloosat SA"],
    ["Build", "React, Node.js, Java, C#/.NET, PostgreSQL"],
    ["Run", "AWS, Docker, Kubernetes, Proxmox, Linux"],
    ["Languages", "English and French"],
  ],
};

// The two halves of the work, shown in the "What I do" section.
export const SERVICES = [
  {
    title: "Full-stack development",
    text: "Web apps and REST APIs built end to end, from data model and API design to a responsive interface, with tests and code review before release.",
    points: [
      "React, Angular and TypeScript front ends",
      "APIs in Node.js, Java/Spring Boot and C#/.NET with OAuth",
      "PostgreSQL and MySQL schema design and query tuning",
      "Billing, CRM, marketplace and learning products in production",
    ],
  },
  {
    title: "Cloud & infrastructure",
    text: "The platform under the app: containers, clusters, virtualization and pipelines that keep releases fast and services running.",
    points: [
      "Docker images deployed to Kubernetes",
      "Proxmox (KVM/LXC) virtualization on physical servers",
      "AWS and OVH Cloud deployments on Linux",
      "GitHub Actions CI/CD, Ansible, monitoring and backups",
    ],
  },
];

// Projects linked in the "Shipped and live" profile fact, in this order.
export const FEATURED = ["iwolonet", "biatoben", "myeasyprep"];

// Large cards at the top of the Projects section: the first is shown wide, the rest in a row.
// Pick work that shows both halves: shipped products and the platform behind them.
export const SPOTLIGHT = ["iwolonet", "myeasyprep", "server-infrastructure"];

export const SKILLS = [
  ["Front-end", "React, Next.js, Angular, TypeScript, JavaScript, Tailwind CSS, HTML5, CSS3"],
  ["Back-end", "C#, .NET, ASP.NET Core, Node.js, Express, Java/Spring Boot, PHP, Python, REST APIs, OAuth 2.0, third-party API integration, real-time services"],
  ["Databases", "PostgreSQL, MySQL, MongoDB, SQL, schema design, query optimization, database administration"],
  ["Cloud", "AWS (EC2, VPC, IAM, S3, EBS, RDS, Lambda, ECS/EKS, ELB, Route 53, CloudWatch), OVH Cloud"],
  ["DevOps", "Docker, Kubernetes, GitHub Actions CI/CD, Ansible, logging and monitoring, backup automation"],
  ["Infrastructure", "Linux administration, Proxmox VE (KVM, LXC), VMware, VirtualBox, VLANs and network troubleshooting, RAID and NAS storage"],
  ["Embedded", "C, C++, PIC, Arduino, ESP32, UART, I2C, SPI, sensor integration"],
  ["Automation and AI", "Python scripting, billing automation, OpenAI API, Gemini API, AI agents"],
  ["Practices", "Git, code reviews, automated testing, Playwright, Agile/Scrum, Jira, mentoring"],
];

// Permanent projects. Thumbnails live in public/projects/thumbnails/.
// "gradient" (g1-g8) and "glyph" are the fallback shown when a thumbnail is missing.
// Optional detail-page fields: status, role, overview (blank line = new paragraph),
// highlights[], techNotes[[name, what it does here]], why. Empty fields are hidden.
export const PROJECTS = [
  {
    "id": "mini-ai-coding-agent",
    "category": "AI agent",
    "title": "Mini AI Coding Agent",
    "description": "A command-line AI assistant built with Python. It answers prompts, can work with text files, and can run shell commands after you confirm them.",
    "gradient": "g2",
    "glyph": "✦",
    "stack": ["Python", "OpenAI API", "uv"],
    "link": "",
    "thumb": "",
    "status": "In development",
    "role": "Developer",
    "overview": "Mini AI Coding Agent is an interactive terminal assistant powered by OpenAI. Ask questions across multiple prompts, and the assistant can use tools to list files, read or write text files, and run shell commands after asking for confirmation.\n\nThe project demonstrates the basic agent loop: send the conversation to the model, run requested tools, return their results, and continue until the model responds. The API key is read from an environment variable rather than stored in the code.",
    "highlights": [
      "Interactive command-line chat that keeps conversation context",
      "Tools for listing directories and reading or writing text files",
      "Shell commands require user confirmation before execution",
      "Tool schemas let the model request supported actions",
      "Checks for a missing API key and handles recoverable errors",
      "Runs with uv using uv run main"
    ],
    "techNotes": [
      ["Python", "Command-line app and tool implementations"],
      ["OpenAI API", "Model that responds to prompts and requests tools"],
      ["uv", "Python project and dependency management"]
    ],
    "why": "A small learning project for understanding how an AI agent can call tools, preserve conversation context, and request confirmation before running shell commands."
  },
  {
    id: "pip-ai-agent",
    category: "AI agent",
    title: "Pip",
    description:
      "A small AI agent that answers math questions and tells the time by calling tools, built with plain JavaScript, one web page and one small server. No frameworks.",
    gradient: "g2",
    glyph: "✦",
    stack: ["JavaScript", "Node.js", "Anthropic API", "Vercel"],
    link: "https://first-ai-agent-omega.vercel.app/",
    thumb: "/projects/thumbnails/pip.png",
    status: "Live demo",
    role: "Designer and developer",
    overview:
      "Pip is a chat bot that can use tools. When it can answer from memory it just replies. When it needs a calculator or a clock, it asks for the tool to be run, reads the result and then answers.\n\nIt is built to make the agent loop easy to understand: send the conversation to the model, run any tool it requests, add the result, and repeat until it gives an answer. A beginner-friendly README explains each step, and a terminal version shows the bare loop without the web page.",
    highlights: [
      "Tool-using agent loop: the model asks, the server runs the tool, the model answers",
      "Calculator and clock tools written as plain JavaScript functions",
      "Server-side API key handling, so the key is never exposed in the browser",
      "Chat interface with tool-call labels shown in the conversation",
      "Terminal version of the same agent for learning",
      "Beginner-friendly README covering setup, vocabulary, troubleshooting and deployment safety",
    ],
    techNotes: [
      ["JavaScript", "Chat page and agent logic, with no frameworks"],
      ["Node.js", "Small server that runs the agent loop and keeps the API key secret"],
      ["Anthropic API", "Language model that decides when to call a tool"],
      ["Vercel", "Hosting and deployment"],
    ],
    why: "Demonstrates the ability to build and explain an AI agent from first principles, including tool calling, secure API key handling and the risks of exposing a public endpoint.",
  },
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
    thumb: "/projects/thumbnails/biatoben.png",
    video: "/projects/videos/biatoben.mp4",
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
    thumb: "/projects/thumbnails/iwolonet.png",
    metric: "10,000+ Android downloads",
    video: "/projects/videos/iwolonet.mp4",
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
    thumb: "/projects/thumbnails/myeasyprep.png",
    metric: "Hundreds of learners across Africa",
    video: "/projects/videos/myeasyprep.mp4",
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
    category: "Cloud and infrastructure",
    title: "Production Platform: Proxmox, Kubernetes and AWS",
    description:
      "Ran the platform behind Bloosat's applications: Proxmox virtualization on physical servers, containerized services on Kubernetes, AWS and OVH Cloud deployments, and the databases underneath.",
    gradient: "g5",
    glyph: "◐",
    stack: ["Proxmox", "Kubernetes", "Docker", "AWS", "Linux", "PostgreSQL", "MySQL"],
    link: null,
    thumb: "/projects/thumbnails/docker.gif",
    status: "Production operations",
    role: "Full-stack Software Developer, Bloosat SA",
    overview:
      "Day-to-day operation of the infrastructure that Bloosat's billing, CRM and customer systems run on. Virtual machines and LXC containers on Proxmox hosts provide the environments; services are packaged as Docker images and deployed to Kubernetes; releases ship through GitHub Actions to AWS and OVH Cloud.\n\nUnderneath sit high-volume MySQL and PostgreSQL databases that I managed and tuned, with logging, monitoring and automated backups to catch problems early.",
    highlights: [
      "Proxmox VE hosts running VMs and LXC containers, with bridges, VLANs, storage and backups",
      "Kubernetes Deployments, Services, ConfigMaps and health probes; debugging failed pods and rollouts",
      "Linux server administration: systemd, SSH, shell scripting, logs and permissions",
      "GitHub Actions pipelines that build images, run tests and deploy",
      "MySQL and PostgreSQL management and query optimization",
      "Logging, monitoring and automated backups",
    ],
    techNotes: [
      ["Proxmox VE", "KVM virtual machines and LXC containers on physical servers"],
      ["Kubernetes", "Runs the containerized services"],
      ["Docker", "Packages each service as an image"],
      ["AWS and OVH Cloud", "Cloud hosting for production deployments"],
      ["GitHub Actions", "Builds, tests and deploys on every release"],
      ["PostgreSQL and MySQL", "Relational data storage"],
    ],
    why: "Demonstrates the ability to run the systems behind an application as well as write the code on top of them.",
  },
  {
    id: "dotnet-secure-apis",
    category: "Back-end APIs",
    title: "Secure .NET APIs on Kubernetes",
    description:
      "Fast, secure back-end REST APIs in C# and ASP.NET Core with OAuth integration, packaged as Docker images and deployed to Kubernetes.",
    gradient: "g6",
    glyph: "C#",
    stack: ["C#", ".NET", "ASP.NET Core", "OAuth 2.0", "Docker", "Kubernetes"],
    link: null,
    thumb: "",
    status: "Employer work, no public link",
    role: "Full-stack Software Developer, Bloosat SA",
    overview:
      "Back-end services written in C# on .NET, exposing REST APIs to the company's applications. Each API integrates OAuth for authentication and authorization.\n\nThe services ship as Docker images and run as pods on Kubernetes, so they deploy the same way as the rest of the platform.",
    highlights: [
      "REST APIs in C# with ASP.NET Core",
      "OAuth integration for secure access",
      "Packaged as Docker images",
      "Deployed and run on Kubernetes",
    ],
    techNotes: [
      ["C# and .NET", "API implementation"],
      ["OAuth 2.0", "Authentication and authorization"],
      ["Docker", "Container images for each service"],
      ["Kubernetes", "Runs the services in production"],
    ],
    why: "Shows the full path for a back-end service: secure code, a container image and a production cluster.",
  },
  {
    id: "weighing-station-firmware",
    category: "Embedded and IoT",
    title: "Road Weighing Station Devices",
    description:
      "C/C++ firmware and REST APIs that let microcontrollers in road weighing stations read load-cell sensors and report measurements to central systems.",
    gradient: "g3",
    glyph: "⚖",
    stack: ["C", "C++", "PIC", "Arduino", "ESP32", "REST API"],
    link: null,
    thumb: "",
    status: "Client work, no public link",
    role: "Full-stack Software Developer, A2I Sarl",
    overview:
      "A2I builds road weighing stations, speed cameras and electronic breathalyzers. I wrote firmware for the microcontrollers inside the weighing stations and the APIs that connect them to the rest of the system.\n\nThe devices read load-cell sensors through ADCs, send measurements over UART, I2C, SPI and Wi-Fi, and expose them through REST APIs to backend systems and displays. A mobile app controls the devices over Wi-Fi.",
    highlights: [
      "C/C++ firmware for PIC, Arduino and ESP32 microcontrollers",
      "Load-cell sensor readings through ADCs",
      "Communication over UART, I2C, SPI and Wi-Fi",
      "REST APIs that report field measurements to central systems",
      "Mobile app that controls the devices over Wi-Fi",
      "On-site and remote debugging of firmware, wiring and network faults",
    ],
    techNotes: [
      ["C and C++", "Microcontroller firmware"],
      ["PIC, Arduino, ESP32", "Device hardware"],
      ["UART, I2C, SPI, Wi-Fi", "Sensor and device communication"],
      ["REST API", "Connects devices to backend systems"],
    ],
    why: "Shows comfort below the web stack: firmware, sensors and protocols, connected all the way up to an API.",
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
    video: "/projects/videos/photonet.mp4",
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
    role: "Full-stack Software Developer, Bloosat SA",
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
    role: "Full-stack Software Developer, A2I Sarl",
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
    role: "Full-stack Software Developer, Bloosat SA",
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
    role: "Full-stack Software Developer",
    org: "Bloosat SA",
    dates: "Oct 2023 – Sep 2026",
    points: [
      "Translated requirements from support, sales and operations teams into specifications, API designs and data models, and tested features before release.",
      "Diagnosed and resolved production issues across services and databases.",
    ],
    achievements: [
      { area: "Back-end", text: "Built fast, secure REST APIs in C# and .NET with OAuth integration, packaged them as Docker images and deployed them to Kubernetes." },
      { area: "Back-end", text: "Designed, built and tested a customer management API platform (Node.js, PHP, Java/Spring Boot) that runs production business workflows and third-party integrations." },
      { area: "Cloud", text: "Ran Proxmox VE hosts with VMs and LXC containers, including virtual networking (bridges, VLANs), storage and backups." },
      { area: "Cloud", text: "Operated containerized services on Kubernetes: Deployments, Services, ConfigMaps and health probes, and debugging failed pods and rollouts." },
      { area: "Full stack", text: "Delivered a CRM platform that lets the company monitor and manage customer records at scale, with automated billing and dynamic email scheduling." },
      { area: "Database", text: "Optimized MySQL schemas and queries behind the billing, invoicing and stock modules used by 1,000+ users, including a query cut from 10 seconds to 3." },
      { area: "DevOps", text: "Built GitHub Actions CI/CD pipelines that build images, run automated tests and deploy to AWS and OVH Cloud, reducing release time." },
      { area: "Infrastructure", text: "Administered Linux servers (systemd, SSH, shell scripting, logs, permissions) and supported each release after go-live." },
      { area: "Testing", text: "Automated testing with Playwright and Python; SQL data verification cut critical errors by 20%." },
      { area: "Front-end", text: "Connected back-end APIs to React and Angular front-end features, delivering each feature end to end from database to screen." },
      { area: "Reliability", text: "Added logging, monitoring and data backup scripts to detect problems earlier and reduce manual work." },
      { area: "Automation", text: "Automated stock-data extraction in Python, turning JSON into Excel reports with email alerts on significant stock changes." },
      { area: "AI", text: "Built a real-time customer service chatbot on the OpenAI and Gemini APIs to reduce response times for the support team." },
      { area: "Leadership", text: "Reviewed code and mentored junior developers until they could own modules independently." },
    ],
  },
  {
    role: "Full-stack Software Developer",
    org: "A2I Sarl",
    dates: "Jun 2022 – Aug 2023",
    points: [
      "Collaborated with teams on security, automation and internal tools.",
      "Converted customer requirements into written use cases to plan development and delivery.",
    ],
    achievements: [
      { area: "Embedded", text: "Wrote C/C++ firmware for PIC, Arduino and ESP32 microcontrollers in road weighing systems, reading load-cell sensors and communicating over UART, I2C, SPI and Wi-Fi." },
      { area: "Back-end", text: "Built REST APIs that let weighing stations in the field report measurements to central systems, plus a mobile app that controls the devices over Wi-Fi." },
      { area: "DevOps", text: "Upgraded a legacy Node.js API from Node 8 to 17.2 and redeployed it with Docker, improving responsiveness by up to 30%." },
      { area: "Database", text: "Built a data query module for a personnel management system that cut average response time from 10 seconds to 3 seconds." },
      { area: "Back-end", text: "Contributed to the development and testing of a real-time vehicle tracking web API in Node.js." },
      { area: "Infrastructure", text: "Resolved software, hardware and network issues on-site and remotely, and ran a Synology NAS with RAID and scheduled backups to AWS." },
      { area: "Front-end", text: "Built reusable React components and hooks, and integrated third-party APIs into the front end and Node.js services." },
    ],
  },
  {
    role: "Full-stack Software Developer Intern",
    org: "A2I Sarl",
    dates: "Jun 2021 – Sep 2021",
    points: ["Researched emerging web technologies and recommended integrations aligned with business goals."],
    achievements: [],
  },
];