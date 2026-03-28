const caseStudies = {
  "nocturne": {
    "title": "Nocturne Studio",
    "category": "Brand Identity",
    "year": "2025",
    "heroColor": "#192BC2",
    "textColor": "light",
    "role": "Brand Designer & Strategist",
    "timeline": "6 Weeks",
    "techStack": ["Adobe Illustrator", "Figma", "After Effects", "Webflow"],
    "liveLink": "https://nocturnestudio.example.com",
    
    "problemStatement": "Nocturne Studio approached me needing a bold new identity. The problem they faced was blending in with other creative studios in the sector. They didn't have a distinct visual language that communicated their focus on editorial tone and structural contrast, making it hard to attract premium clientele.",
    
    "video": null, // subjective: no video available
    
    "process": "I started by immersing myself in their core values: depth, texture, and typographic contrast. My process involved developing a rigorous grid system first. Once the mathematical foundation was laid, I allowed expressive collage elements to breathe over the grid without losing structural integrity. Space Grotesk was specifically chosen for its geometric precision.",
    
    "gallery": [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=2694&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=2400&auto=format&fit=crop"
    ],
    
    "challenges": "One of the major challenges was finding the right balance between 'dark and editorial' and 'accessible'. Initially, the contrast was too stark, making typography hard to read. We solved this by softening the pure blacks to a very deep charcoal and using off-white for text, ensuring accessibility standards were met."
  },

  "procurement": {
    "title": "End-to-End Procurement Management",
    "category": "Process Automation",
    "year": "2024",
    "heroColor": "#EEF36A",
    "textColor": "dark",
    "role": "Lead Product Designer",
    "timeline": "3 Months",
    "techStack": ["Figma", "React", "TailwindCSS"],
    "liveLink": null,
    
    "problemStatement": "The existing procurement process for my client was highly fragmented. Requests were floating around in emails, approvals in Slack, and POs in a legacy software from 2008. They needed an automated system to handle everything from request to payment and quality checks without losing data in transition.",
    
    "video": "https://www.w3schools.com/html/mov_bbb.mp4", // Placeholder video
    
    "process": "I heavily focused on user routing and flows mapping. By interviewing 15 stakeholders, we documented exactly where the bottlenecks were. I streamlined the multi-stage approval process into a clear, linear dashboard, utilizing contextual tooltips for the complex forms to lower the learning curve.",
    
    "gallery": [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    ],
    
    "challenges": "The hardest part was data density. A typical Bill of Materials (BOM) has over 50 columns. Fitting this onto a standard laptop screen without cognitive overload required designing a custom horizontal scrolling table with persistent sticky headers and collapsible metadata drawers. "
  },

  "kinetic": {
    "title": "Kinetic Type",
    "category": "Motion",
    "year": "2024",
    "heroColor": "#FF7733",
    "textColor": "light",
    "role": "Motion Designer",
    "timeline": "Ongoing",
    "techStack": ["After Effects", "GSAP", "Three.js"],
    "liveLink": "#",
    
    "problemStatement": "This was a self-initiated study. The problem I wanted to solve was how to treat typography not just as information, but as the primary composition and structural tool. How can rhythm, tension, and physics dictate how we read text on a screen?",
    
    "video": null,
    
    "process": "Using a blend of After Effects for the pre-rendered concepts and GSAP + WebGL for real-time web execution, I started creating daily loops. I mapped out physical forces like gravity and friction, applying them directly to variable fonts so the weight and width of the letters reacted naturally to their environment.",
    
    "gallery": [
      "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=2600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2564&auto=format&fit=crop"
    ],
    
    "challenges": "Translating heavily stylized After Effects compositions into performant web code was difficult. I ran into severe framerate drops on mobile devices when trying to animate too many individual DOM elements. I had to pivot to using Canvas/WebGL to handle the multi-letter kinetic physics smoothly."
  },

  "verde": {
    "title": "Verde Co.",
    "category": "Brand",
    "year": "2024",
    "heroColor": "#00A86B",
    "textColor": "light",
    "role": "Visual Designer",
    "timeline": "4 Weeks",
    "techStack": ["Illustrator", "Figma", "Photoshop"],
    "liveLink": null,
    
    "problemStatement": "Sustainable brands often fall into the trap of looking 'crunchy' or relying too heavily on generic leaf imagery and rough textures. Verde Co. needed an identity that communicated sustainability but positioned them as a premium, forward-looking lifestyle brand.",
    
    "video": null,
    
    "process": "We stripped away the obvious tropes. I opted for a rich, deep emerald base contrasting with muted sandstone. I paired this with sharp, elegant serif letterforms that convey premium quality. The entire brand ecosystem was designed to feel closer to a high-end fragrance line than a typical eco-company.",
    
    "gallery": [
      "https://images.unsplash.com/photo-1416879598555-46e3cb20a2e7?q=80&w=2600&auto=format&fit=crop"
    ],
    
    "challenges": "Ensuring the physical packaging remained sustainable while looking premium. We couldn't use foil stamping or excessive glossy laminates. We adapted by utilizing blind embossing on recycled heavyweight stock, relying on texture rather than chemicals to create visual interest."
  },

  "research": {
    "title": "Research Agent",
    "category": "AI + Dev",
    "year": "2024",
    "heroColor": "#080705",
    "textColor": "light",
    "role": "Developer & Designer",
    "timeline": "2 Months",
    "techStack": ["React", "FastAPI", "Python", "LangChain", "WebSockets"],
    "liveLink": "https://github.com/vruddhishah",
    
    "problemStatement": "Deep reasoning AI agents like LangChain output a massive amount of 'thought process' text. The problem was taking these verbose reasoning logs and presenting them in a digestible, developer-friendly UI without overwhelming the user.",
    
    "video": null,
    
    "process": "The interface heavily relies on a code-editor aesthetic. I built a React frontend connected to a FastAPI backend. By utilizing WebSockets, I implemented a real-time streaming view where the Agent's specific actions, API calls, and finalized summaries appear dynamically in distinct visual chunks.",
    
    "gallery": [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2600&auto=format&fit=crop"
    ],
    
    "challenges": "Handling WebSocket drops and synchronizing the streaming state across different React components proved challenging. I had to build a custom state management layer simply to handle chunked markdown parsing so the UI didn't glitch out while the LLM was typing."
  },

  "folio": {
    "title": "Folio OS",
    "category": "UI / UX",
    "year": "2023",
    "heroColor": "#f5f0e8",
    "textColor": "dark",
    "role": "Front-End Developer",
    "timeline": "3 Weeks",
    "techStack": ["React", "GSAP", "CSS Modules"],
    "liveLink": "https://example.com/folio-os",
    
    "problemStatement": "Standard grid portfolios can feel a bit monotonous. I wanted to design an interactive playground that made viewing standard projects feel like an engaging experience, standing out to recruiters.",
    
    "video": "https://www.w3schools.com/html/mov_bbb.mp4",
    
    "process": "I heavily engineered a React application manipulating GSAP for window dragging, minimizing, and depth sorting (z-index algorithms). Focus was put on tiny micro-interactions to make it feel like a real operating system—from an accurate clock in the 'start bar' to fake terminal booting sequences.",
    
    "gallery": [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop"
    ],
    
    "challenges": "Managing the `z-index` stacking context for multiple overlapping draggable windows was incredibly tricky. When a user clicks a window, it must instantly jump to the foreground while pushing others back. I ended up creating a centralized 'Window Manager' React Context to orchestrate the depths cleanly."
  }
};
