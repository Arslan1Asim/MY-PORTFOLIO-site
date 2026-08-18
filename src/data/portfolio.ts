import arslanAsimProfile from "@/assets/arslan-asim-profile.jpg.asset.json";
import mobilePricePredictorForm from "@/assets/Screenshot_2025-10-30_012633.png.asset.json";
import mobilePricePredictorSpecs from "@/assets/Screenshot_2025-10-30_012744.png.asset.json";
import mobilePriceConfusionMatrix from "@/assets/Screenshot_2025-10-30_010955.png.asset.json";
import umt212106 from "@/assets/umt-Screenshot_2026-04-24_212106.png.asset.json";
import umt212144 from "@/assets/umt-Screenshot_2026-04-24_212144.png.asset.json";
import umt212244 from "@/assets/umt-Screenshot_2026-04-24_212244.png.asset.json";
import umt212321 from "@/assets/umt-Screenshot_2026-04-24_212321.png.asset.json";
import umt212524 from "@/assets/umt-Screenshot_2026-04-24_212524.png.asset.json";
import umt212626 from "@/assets/umt-Screenshot_2026-04-24_212626.png.asset.json";
import travelHero from "@/assets/travel-Screenshot_2026-04-14_215700.png.asset.json";
import travelDeganvy from "@/assets/travel-Screenshot_2026-04-14_215714.png.asset.json";
import travelDesert from "@/assets/travel-Screenshot_2026-04-14_215722.png.asset.json";
import travelPopular from "@/assets/travel-Screenshot_2026-04-14_215735.png.asset.json";
import travelFeatures from "@/assets/travel-Screenshot_2026-04-14_215746.png.asset.json";

/**

 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF CONTENT FOR THE PORTFOLIO
 *  Edit this file to update the site. No copy lives in components.
 *  Anything wrapped in [SQUARE BRACKETS] is an editable placeholder.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Arslan Asim",
  role: "AI • Machine Learning • UI/UX",
  headline: "Building with AI. Designing with purpose.",
  intro:
    "Computer Science graduate focused on AI, machine learning, prompt engineering, and UI/UX design.",
  status: "Exploring AI • ML • UI/UX • Creative Development",
  location: "[ADD LOCATION]",
  photo: arslanAsimProfile.url,
  about: [
    "I study how systems behave, a memory allocator, a model's error distribution, a user's first ten seconds on a screen, and then I build the smallest thing that makes that behaviour better.",
    "My Computer Science degree gave me the fundamentals: C and C++ for how machines actually work, Python and Pandas for reasoning about data, and enough statistics to be suspicious of a metric that looks too good.",
    "From there I moved outward into machine learning, prompt engineering and AI agents, framing tasks, auditing signals, and designing the instructions and guardrails that make a model useful instead of merely impressive.",
    "The design side is not a hobby bolted on. I wireframe and prototype in Figma because the interface is where a technical decision either becomes obvious to a person or stays hidden from them.",
  ],
  highlights: [
    { label: "Focus", value: "AI, ML & Applied Data" },
    { label: "Craft", value: "Figma, UI/UX, Prototyping" },
    { label: "Foundations", value: "Python, C/C++, React" },
    { label: "Currently", value: "AI agents & modern web" },
  ],
} as const;

export const education = [
  {
    degree: "BSc Computer Science",
    school: "University of Management and Technology",
    period: "2023 / 2027",
  },
  {
    degree: "Intermediate in Computer Science",
    school: "Government College University",
    period: "2020 / 2022",
  },
  {
    degree: "Matriculation",
    school: "KIPS Boys High School",
    period: "2018 / 2020",
  },
] as const;

export type SkillGroup = {
  id: string;
  title: string;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "ai",
    title: "AI & Machine Learning",
    blurb: "Framing the task, interrogating the data, and keeping the model honest.",
    items: [
      "Python",
      "Pandas",
      "Machine Learning",
      "Data Analysis",
      "Prompt Engineering",
      "AI Agents",
    ],
  },
  {
    id: "dev",
    title: "Development",
    blurb: "From low level fundamentals to interfaces that ship in a browser.",
    items: ["React", "JavaScript", "HTML", "CSS", "C", "C++"],
  },
  {
    id: "design",
    title: "Design",
    blurb: "Structure before styling, flows, wireframes, then the polish.",
    items: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"],
  },
];

export type ProjectCategory = "AI/ML" | "Development" | "UI/UX";

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  tagline: string;
  problem: string;
  approach: string[];
  outcome: string;
  stack: string[];
  caseStudyUrl: string | null;
  githubUrl: string | null;
  imageNote: string;
  images?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    id: "flyrank",
    title: "FlyRank ML / AI Work",
    category: "AI/ML",
    tagline: "Machine learning applied to content performance signals.",
    problem:
      "Content performance data is noisy, and it is easy to build a model that scores well while learning nothing useful about why a piece of content performs.",
    approach: [
      "Framed the ML task and defined what a prediction would actually be used for",
      "Exploratory data analysis and cleaning with Python and Pandas",
      "Built a baseline model first, so every later change had something to beat",
      "Audited signals for leakage, weak correlation and misleading proxies",
      "Analysed content performance patterns across the dataset",
      "Prompt engineering for the language model assisted parts of the workflow",
    ],
    outcome: "[ADD OUTCOME / METRICS]",
    stack: ["Python", "Pandas", "Machine Learning", "Prompt Engineering"],
    caseStudyUrl: null,
    githubUrl: null,
    imageNote: "[ADD FLYRANK PROJECT IMAGE]",
  },
  {
    id: "mobile-price-predictor",
    title: "Mobile Phone Price Range Predictor",
    category: "AI/ML",
    tagline: "A classifier that maps phone hardware specs to a price range.",
    problem:
      "Phone pricing looks arbitrary from the outside, the question was whether hardware specifications alone carry enough signal to place a device in the right price band.",
    approach: [
      "Cleaned and explored the specifications dataset with Python and Pandas",
      "Engineered and compared features across hardware, camera, display and connectivity",
      "Trained and tuned a Random Forest classifier across four price classes",
      "Evaluated with a confusion matrix to see exactly where classes were confused",
      "Built an interactive form UI so anyone can enter specs and get a prediction",
    ],
    outcome:
      "A working end to end predictor: the Random Forest separates all four price bands cleanly, with the remaining errors concentrated between adjacent classes.",
    stack: ["Python", "Pandas", "scikit-learn", "Random Forest", "UI Design"],
    caseStudyUrl: null,
    githubUrl: null,
    imageNote: "Mobile Phone Price Range Predictor",
    images: [
      {
        src: mobilePricePredictorForm.url,
        alt: "Mobile Phone Price Range Predictor hardware specs input form",
      },
      {
        src: mobilePricePredictorSpecs.url,
        alt: "Camera, display and connectivity inputs of the price predictor",
      },
      {
        src: mobilePriceConfusionMatrix.url,
        alt: "Confusion matrix for the Random Forest price range classifier",
      },
    ],
  },

  {
    id: "umt-website-prototype",
    title: "UMT Website Prototype",
    category: "UI/UX",
    tagline: "A redesigned university website concept built as a clickable prototype.",
    problem:
      "University sites bury the things students actually need, admissions, programmes and dates, under layers of institutional navigation.",
    approach: [
      "Audited the existing information architecture and listed the top student tasks",
      "Rebuilt the navigation around those tasks instead of departments",
      "Designed wireframes then high fidelity screens in Figma",
      "Wired the screens into a clickable prototype for walkthrough testing",
    ],
    outcome: "[ADD PROTOTYPE OUTCOME OR FEEDBACK]",
    stack: ["Figma", "Wireframing", "UI Design", "Prototyping"],
    caseStudyUrl: null,
    githubUrl: null,
    imageNote: "UMT Website Prototype",
    images: [
      { src: umt212106.url, alt: "UMT prototype hero section with headline and admission call to action" },
      { src: umt212144.url, alt: "Campus highlights cards explaining why students choose UMT" },
      { src: umt212244.url, alt: "Programs offered page header of the UMT prototype" },
      { src: umt212321.url, alt: "Undergraduate program cards for Computer Science, Data Science and AI" },
      { src: umt212524.url, alt: "Entry test details and how to apply steps" },
      { src: umt212626.url, alt: "Faculty page with profile cards" },
    ],
  },
  {
    id: "travel-planner-site",
    title: "Travel Planner Site",
    category: "Development",
    tagline: "A dark, image led travel site for browsing and planning destinations.",
    problem:
      "Travel pages often drown the photography in chrome, the destination itself should carry the page.",
    approach: [
      "Built a full bleed hero with a clear single call to action",
      "Designed alternating destination cards pairing photography with short copy",
      "Added a popular destinations grid and a value proposition band",
      "Made the whole layout responsive with a plain HTML, CSS and JavaScript stack",
    ],
    outcome: "A complete multi section travel site: hero, destination features, gallery and footer.",
    stack: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    caseStudyUrl: null,
    githubUrl: null,
    imageNote: "Travel Planner Site",
    images: [
      { src: travelHero.url, alt: "Travel site hero section with a night city skyline" },
      { src: travelDeganvy.url, alt: "Deganvy destination card with photo and description" },
      { src: travelDesert.url, alt: "Desert Egypt destination card with photo and description" },
      { src: travelPopular.url, alt: "Popular destinations image grid" },
      { src: travelFeatures.url, alt: "Feature cards and footer of the travel site" },
    ],
  },
];

export const projectFilters = ["All", "AI/ML", "Development", "UI/UX"] as const;

export const designPractice = [
  { title: "Wireframing", detail: "Low fidelity structure first, so layout decisions stay cheap." },
  { title: "User Flows", detail: "Mapping the path a person takes before drawing a single screen." },
  { title: "UI Design", detail: "Type scale, spacing and hierarchy built as a reusable system." },
  { title: "Prototyping", detail: "Clickable Figma prototypes to test interactions before code." },
];

export type JourneyStage = {
  id: string;
  title: string;
  detail: string;
};

export const journey: JourneyStage[] = [
  {
    id: "cs",
    title: "Computer Science Education",
    detail:
      "Formal grounding in algorithms, data structures, operating systems and systems programming with C and C++.",
  },
  {
    id: "software",
    title: "Programming & Software Projects",
    detail:
      "Turned coursework into working artefacts, simulations, management systems and hardware adjacent builds.",
  },
  {
    id: "ml",
    title: "Machine Learning",
    detail:
      "Moved from writing programs to modelling data: Python, Pandas, baselines, evaluation and signal auditing.",
  },
  {
    id: "prompting",
    title: "Prompt Engineering",
    detail:
      "Learned to treat instructions as an engineering surface, structure, constraints, evaluation and iteration.",
  },
  {
    id: "design",
    title: "UI/UX & Figma",
    detail:
      "Added the design layer: wireframes, user flows, component systems and prototypes that can be tested early.",
  },
  {
    id: "agents",
    title: "AI Agents & Modern Web Development",
    detail:
      "Now combining the three: agentic AI workflows delivered through React interfaces that people can actually use.",
  },
];

export const contact = {
  headline: "Let's build something useful.",
  blurb:
    "Open to conversations about AI and machine learning work, product design, internships and collaborations.",
  email: "arslan.asim2005@gmail.com",
  links: [
    { label: "GitHub", handle: "@Arslan1Asim", url: "https://github.com/Arslan1Asim" },
    {
      label: "LinkedIn",
      handle: "in/arslan-asim",
      url: "https://www.linkedin.com/in/arslan-asim-030656253",
    },
    { label: "Figma", handle: "figma.com/ArslanAsim", url: "https://www.figma.com/files/team/1461971765034044002/recents-and-sharing/recently-viewed?fuid=1461971763094819244" },
  ] as { label: string; handle: string; url: string | null }[],
};


export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "UI/UX", href: "#uiux" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const footerTagline = "AI • ML • Design • Development";
