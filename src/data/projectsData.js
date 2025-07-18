const projects = [
  {
    name: "Weather App",
    note: "⚠️ Filler project, not featured.",
    image: weather,
    description:
      "A responsive weather application that automatically detects the user's location using the browser's built-in Geolocation API...",
    features: [
      "📍 Auto-fetches user location via navigator.geolocation",
      "🔍 Allows weather search by city name",
      "🌡 Displays temperature, weather condition, and weather icon",
      "📱 Fully responsive, mobile-friendly UI",
      "⚙️ Live weather data using OpenWeather API",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Geolocation API", "OpenWeatherMap API"],
    github: "#",
    live: "#",
  },
  {
    name: "Chatify",
    note: "Real-Time Chat App",
    image: chatify,
    description:
      "Chatify is a full-stack real-time chat application built with the MERN stack and Socket.io...",
    features: [
      "Real-time messaging with Socket.io",
      "User login/signup with JWT authentication",
      "Edit profile (username & profile picture)",
      "Image upload in chat via Cloudinary",
      "Responsive UI with Tailwind CSS",
    ],
    tech: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.io",
      "Cloudinary",
      "JWT",
    ],
    github: "#",
    live: "#",
  },
];
