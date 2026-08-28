import vedicServices from "../assets/projectImages/vedic-portfolio.webp";
import ecommerce from "../assets/projectImages/luxe-ecommerce.webp";
import chatify from "../assets/projectImages/chatify.webp";
import realxr from "../assets/projectImages/real-xr.webp";

export const projectsData = [
  {
    id: "vedic-services",
    title: "Vedic Services",
    subtitle: "Freelance Portfolio & Admin CMS",
    description:
      "A high-performance service business platform built with a crawler-first architecture, enabling SEO-friendly rendering without the complexity of full SSR. Features a custom CMS allowing clients to manage services, bookings, and gallery content independently.",
    features: [
      "🚀 Crawler-first rendering architecture for SEO",
      "📈 100/100 Lighthouse scores in SEO, Accessibility & Best Practices",
      "🛠️ Custom admin CMS for content and inquiry management",
      "⚡ Zero CLS state initialization for instant visual paint",
      "🔍 Dynamic meta tag rendering for search engine indexing",
    ],
    tech: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "SEO",
    ],
    image: vedicServices,
    github: "https://github.com/khanubed/Vedic-Portfolio",
    live: "https://vedic-portfolio-two.vercel.app/",
  },

  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    subtitle: "Full-Stack Commerce Solution",
    description:
      "A scalable e-commerce platform featuring advanced state management, secure authentication workflows, automated cache synchronization, and a modular architecture designed for maintainability and performance.",
    features: [
      "🛒 Modular state architecture using RTK Query",
      "🔐 Silent JWT refresh token authentication flow",
      "⚡ Automated cache synchronization across modules",
      "📦 Cart, Wishlist & Checkout state consistency",
      "📱 Optimized responsive UI with stable layouts",
    ],
    tech: [
      "React",
      "Redux Toolkit",
      "RTK Query",
      "Axios",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    image: ecommerce,
    github: "https://github.com/khanubed/E-Commerce-Luxe",
    live: "https://luxe-store-alpha.vercel.app/",
  },

  {
    id: "chatify",
    title: "Chatify",
    subtitle: "Real-Time Messaging Platform",
    description:
      "A MERN-based real-time communication platform leveraging Socket.io for instant messaging, secure authentication, image sharing, and efficient WebSocket session management.",
    features: [
      "⚡ Real-time messaging with Socket.io",
      "👥 Dynamic user session mapping & socket rooms",
      "🖼️ Cloudinary-powered image sharing",
      "🔐 JWT authentication & protected routes",
      "🧠 Optimized listener lifecycle management",
    ],
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Cloudinary",
      "Axios",
      "Tailwind CSS",
    ],
    image: chatify,
    github: "https://github.com/khanubed/Chatify",
    live: "https://chatify-three.vercel.app/",
  },

  {
    id: "realxr",
    title: "RealXR",
    subtitle: "Immersive Club Portfolio Experience",
    description:
      "An immersive WebGL-powered institutional club portfolio featuring advanced scroll-driven storytelling, interactive fluid simulations, and a futuristic cyber-inspired visual identity designed entirely from scratch.",
    features: [
      "🎨 Complete UI/UX and visual identity design",
      "📜 GSAP-powered scrollytelling experience",
      "🌊 Interactive Three.js fluid shader animations",
      "⚡ Smooth scrolling with Lenis integration",
      "🧩 Responsive modular bento grids & project showcases",
    ],
    tech: [
      "React",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "ScrollTrigger",
      "Lenis",
      "Tailwind CSS",
      "React Router DOM",
    ],
    image: realxr,
    github: "https://github.com/khanubed/RealXR-Website",
    live: "https://real-xr.vercel.app/",
  },
];