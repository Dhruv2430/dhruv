export interface ProjectFeature {
  icon: string;
  title: string;
  description: string;
}

export interface TechCategory {
  icon: string;
  title: string;
  technologies: string;
  color: string;
  bg: string;
}

export interface SchemaField {
  name: string;
  type: string;
  primary?: boolean;
}

export interface DatabaseCollection {
  name: string;
  fields: SchemaField[];
}

export interface ChallengeItem {
  title: string;
  solution: string;
}

export interface MetricItem {
  value: string;
  label: string;
}

export interface FutureItem {
  icon: string;
  title: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  image: string;
  github: string;
  live: string;
  video: string;
  problem: {
    description: string;
    points: string[];
  };
  solution: {
    description: string;
    points: string[];
  };
  features: {
    description: string;
    list: ProjectFeature[];
  };
  techStack: TechCategory[];
  database: {
    description: string;
    collections: DatabaseCollection[];
  };
  challenges: ChallengeItem[];
  metrics: MetricItem[];
  future: FutureItem[];
  screenshots?: string[];
}

export const projectsData: Record<string, ProjectData> = {
  "ai-saas-workflow-platform": {
    slug: "ai-saas-workflow-platform",
    title: "AI SaaS Workflow Platform",
    subtitle: "An enterprise-grade AI-powered workflow platform that helps teams automate document processing, extract insights, and build intelligent AI workflows using RAG architecture and modern cloud infrastructure.",
    category: "Featured Project",
    year: "2025",
    image: "/ProjectImage/task.png", // We can use the existing task image or general screenshot
    github: "https://github.com/Dhruv2430/Contexta-AI",
    live: "https://contexta-ai-nine.vercel.app/",
    video: "/Project-1/firstVideo.mp4",
    screenshots: [
      "/Project-1/1p.png",
      "/Project-1/2p.png",
      "/Project-1/3p.png",
      "/Project-1/4p.png",
      "/Project-1/5p.png",
      "/Project-1/6p.png"
    ],
    problem: {
      description: "Organizations struggle to process and analyze large amounts of unstructured documents efficiently. Traditional workflows are slow, manual, and lack intelligent automation capabilities.",
      points: [
        "Manual document processing consumes significant time",
        "Information is scattered across multiple files and systems",
        "Existing solutions lack contextual AI understanding",
        "Search systems fail to provide accurate semantic results",
        "Scaling AI workflows becomes expensive and complex"
      ]
    },
    solution: {
      description: "Built an AI-powered SaaS platform that combines RAG (Retrieval-Augmented Generation), vector search, and workflow automation to create an intelligent document management and AI assistant system.",
      points: [
        "AI-powered contextual search",
        "Smart document ingestion and indexing",
        "Conversational chatbot with memory",
        "Real-time workflow automation",
        "Semantic document understanding",
        "Fast and scalable AI responses"
      ]
    },
    features: {
      description: "Designed for performance and scale, the platform includes everything needed for enterprise document workflows.",
      list: [
        {
          icon: "BrainCircuit",
          title: "AI Chatbot with RAG",
          description: "Implemented an intelligent chatbot capable of answering user queries using contextual document retrieval with vector embeddings and semantic search."
        },
        {
          icon: "Zap",
          title: "Intelligent Document Processing",
          description: "Extracts and processes text from PDFs and documents, generates embeddings, and stores them for contextual AI retrieval."
        },
        {
          icon: "Search",
          title: "Semantic Search Engine",
          description: "Provides accurate context-aware search using embeddings and vector similarity search instead of traditional keyword matching."
        },
        {
          icon: "Lock",
          title: "Authentication & User Management",
          description: "Secure authentication system with protected routes, session handling, and user-specific chat/document management."
        },
        {
          icon: "Users",
          title: "Real-Time AI Responses",
          description: "Optimized backend APIs and streaming AI responses for faster and smoother user experience."
        },
        {
          icon: "BarChart3",
          title: "Responsive SaaS Dashboard",
          description: "Modern responsive UI with clean workflow management, chat interface, analytics, and document handling."
        }
      ]
    },
    techStack: [
      {
        icon: "Monitor",
        title: "Frontend",
        technologies: "Next.js, TypeScript, Tailwind CSS, Framer Motion, Responsive UI Design",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
      },
      {
        icon: "Server",
        title: "Backend",
        technologies: "Node.js, Express.js, REST APIs, JWT Authentication",
        color: "text-green-500",
        bg: "bg-green-500/10"
      },
      {
        icon: "BrainCircuit",
        title: "AI / ML",
        technologies: "OpenAI API, LangChain, RAG Architecture, Vector Embeddings, Semantic Search",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
      },
      {
        icon: "Database",
        title: "Database",
        technologies: "MongoDB, Pinecone Vector Database, Mongoose ODM",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
      },
      {
        icon: "Cloud",
        title: "Cloud & Deployment",
        technologies: "Vercel, Render / AWS, Cloud Storage, CI/CD Deployment",
        color: "text-orange-500",
        bg: "bg-orange-500/10"
      }
    ],
    database: {
      description: "Simplified document relationships in MongoDB & Pinecone.",
      collections: [
        {
          name: "User Collection",
          fields: [
            { name: "_id", type: "ObjectId", primary: true },
            { name: "name", type: "String" },
            { name: "email", type: "String" },
            { name: "role", type: "String" },
            { name: "createdAt", type: "Date" }
          ]
        },
        {
          name: "Document Collection",
          fields: [
            { name: "_id", type: "ObjectId", primary: true },
            { name: "title", type: "String" },
            { name: "fileUrl", type: "String" },
            { name: "userId", type: "ObjectId" },
            { name: "createdAt", type: "Date" }
          ]
        },
        {
          name: "Embedding Collection",
          fields: [
            { name: "_id", type: "ObjectId", primary: true },
            { name: "documentId", type: "ObjectId" },
            { name: "content", type: "Text" },
            { name: "embedding", type: "Vector[]" }
          ]
        }
      ]
    },
    challenges: [
      {
        title: "Large document processing was slow",
        solution: "Implemented chunking and async processing for faster indexing."
      },
      {
        title: "AI responses lacked context accuracy",
        solution: "Added RAG pipeline with vector similarity search."
      },
      {
        title: "High token/API costs",
        solution: "Optimized prompt engineering and retrieval flow."
      },
      {
        title: "Deployment issues across frontend/backend",
        solution: "Configured environment-based API routing and cloud deployment setup."
      }
    ],
    metrics: [
      { value: "98", label: "Lighthouse Score" },
      { value: "1.2s", label: "Avg. Load Time" },
      { value: "99.9%", label: "Uptime" },
      { value: "40%", label: "Cost Reduction" },
      { value: "60%", label: "Faster Processing" },
      { value: "10x", label: "Scalability" }
    ],
    future: [
      { icon: "Cpu", title: "Multi-model AI support" },
      { icon: "MessageSquare", title: "Real-time collaboration" },
      { icon: "Smartphone", title: "Voice-enabled AI assistant" },
      { icon: "Settings", title: "AI workflow automation builder" },
      { icon: "BarChart", title: "Advanced analytics dashboard" },
      { icon: "Users", title: "Team workspace & permissions" }
    ]
  },
  "ai-code-review-platform": {
    slug: "ai-code-review-platform",
    title: "AI Code Review Platform",
    subtitle: "Built an AI-powered code review tool that analyzes code quality and suggests improvements. Integrated LLM APIs for automated review generation, providing developers with instant, actionable feedback on their pull requests.",
    category: "Featured Project",
    year: "2025",
    image: "/ProjectImage/Aicodereview.png",
    github: "https://github.com/Dhruv2430",
    live: "#",
    video: "#",
    problem: {
      description: "Developers spend excessive hours performing manual code reviews, leading to release bottlenecks. Junior code updates often consume senior engineering hours for trivial styling, linting, or basic bug checks.",
      points: [
        "Manual code reviews delay pull request merges and slow down velocity",
        "Code quality feedback is often inconsistent across different reviewers",
        "Vulnerabilities, secrets, and performance leaks occasionally slip into production",
        "Difficulty enforcing organization-wide coding standards automatically"
      ]
    },
    solution: {
      description: "An automated code reviewer that integrates directly with GitHub webhooks, using AST analysis and fine-tuned LLMs to comment directly on code diffs with line-level suggestions.",
      points: [
        "Instant review execution triggered upon opening or updating pull requests",
        "Context-aware analysis using abstract syntax tree (AST) matching",
        "Line-specific recommendations and refactoring code diffs",
        "Vulnerability scanning matching OWASP top security risks",
        "Centralized configuration for organization coding rules"
      ]
    },
    features: {
      description: "A comprehensive developer tool designed to enhance code quality and reduce code review turnaround times.",
      list: [
        {
          icon: "BrainCircuit",
          title: "Automated PR Reviewer",
          description: "Inspects pull request diffs, checks code semantics, and posts actionable suggestions directly as PR comments."
        },
        {
          icon: "Lock",
          title: "Vulnerability Scanner",
          description: "Runs static analysis to detect hardcoded API keys, SQL injection risks, and sensitive data leakage."
        },
        {
          icon: "Zap",
          title: "AST Semantic Parsing",
          description: "Generates Abstract Syntax Trees (AST) to understand code context instead of just doing simple string matching."
        },
        {
          icon: "Settings",
          title: "Custom Review Rules",
          description: "Allows projects to specify custom guidelines (e.g., naming conventions, architecture patterns) using markdown."
        },
        {
          icon: "BarChart3",
          title: "Review Analytics",
          description: "Provides insights on recurring code bugs, time saved per review, and code quality improvement scores."
        },
        {
          icon: "Users",
          title: "Team Collaborative Inbox",
          description: "A centralized dashboard for team leads to review AI suggestions and customize rules in real time."
        }
      ]
    },
    techStack: [
      {
        icon: "Monitor",
        title: "Frontend",
        technologies: "React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
      },
      {
        icon: "Server",
        title: "Backend & Webhooks",
        technologies: "Node.js, Express.js, GitHub App API, BullMQ Queue",
        color: "text-green-500",
        bg: "bg-green-500/10"
      },
      {
        icon: "BrainCircuit",
        title: "AI / ML Engine",
        technologies: "OpenAI GPT API, LangChain, AST Tree-Sitter Parser",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
      },
      {
        icon: "Database",
        title: "Database & Cache",
        technologies: "MongoDB, Mongoose ODM, Redis (BullMQ broker)",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
      },
      {
        icon: "Cloud",
        title: "Cloud & Pipelines",
        technologies: "AWS ECS (Fargate), Route 53, Docker, GitHub Actions CI/CD",
        color: "text-orange-500",
        bg: "bg-orange-500/10"
      }
    ],
    database: {
      description: "Simplified relational representation in MongoDB.",
      collections: [
        {
          name: "User Collection",
          fields: [
            { name: "_id", type: "ObjectId", primary: true },
            { name: "githubId", type: "String" },
            { name: "username", type: "String" },
            { name: "email", type: "String" },
            { name: "createdAt", type: "Date" }
          ]
        },
        {
          name: "Repository Collection",
          fields: [
            { name: "_id", type: "ObjectId", primary: true },
            { name: "repoId", type: "Number" },
            { name: "fullName", type: "String" },
            { name: "installationId", type: "Number" },
            { name: "isActive", type: "Boolean" }
          ]
        },
        {
          name: "Review Collection",
          fields: [
            { name: "_id", type: "ObjectId", primary: true },
            { name: "prNumber", type: "Number" },
            { name: "commitSha", type: "String" },
            { name: "repositoryId", type: "ObjectId" },
            { name: "aiReviewFeedback", type: "Array" }
          ]
        }
      ]
    },
    challenges: [
      {
        title: "GitHub Webhook Timeout (10 seconds Limit)",
        solution: "Offloaded review logic from the main API thread using Redis and BullMQ to handle analysis asynchronously."
      },
      {
        title: "High API cost on huge file updates",
        solution: "Implemented ast-based diff filtering to send only modified functions and structural context to OpenAI."
      },
      {
        title: "AI generated irrelevant style comments",
        solution: "Fed project-specific ESLint rules and config instructions directly into the prompt system."
      },
      {
        title: "Handling concurrent analysis requests",
        solution: "Built a job queue throttling system that matches developer tiers and GitHub API rate limits."
      }
    ],
    metrics: [
      { value: "84%", label: "PR Comment Accept Rate" },
      { value: "12s", label: "Avg. Analysis Speed" },
      { value: "99.95%", label: "API Uptime" },
      { value: "5 hrs", label: "Saved per dev/week" },
      { value: "68%", label: "Critical Bug Catch Rate" },
      { value: "150+", label: "Connected Repos" }
    ],
    future: [
      { icon: "Cpu", title: "Multi-language AST Parser Support" },
      { icon: "MessageSquare", title: "VS Code & JetBrains IDE Extensions" },
      { icon: "Settings", title: "Automated PR Auto-Fix Commits" },
      { icon: "Smartphone", title: "Interactive Voice Explanation" },
      { icon: "Users", title: "Self-Hosted Enterprise Cloud Setup" }
    ]
  }
};
