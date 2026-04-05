const caseStudies = {
  "automated-pdf-processing": {
  "title": "Automated PDF Processing Pipeline",
  "category": "Process Automation / AIML",
  "year": "2025",
  "heroColor": "#192BC2",
  "textColor": "light",
  "role": "Automation & ML Engineer",
  "timeline": "2-3 Months",
  "techStack": ["Python", "OpenCV", "Tesseract OCR", "PyMupdf","FastAPI","Computer Vision","Ghostscript","fitz"],
  "liveLink": null,
  
  "problemStatement": "The existing workflow for handling construction-related PDF documents was highly manual and fragmented. Users had to extract ZIP files, upload documents to different systems, manually identify drawing vs specification files, and further separate specification divisions. This process was time-consuming, error-prone, and required significant human intervention for even repetitive tasks.",
  
  "video": null,
  "process": "I designed an end-to-end automated pipeline that begins with a ZIP file upload. The system extracts files, uploads them into processing software, and identifies document types using computer vision and OCR techniques. PDFs are analyzed to distinguish between BIM drawing files (3D/parametric models exported as PDFs) and specification files (text-heavy documents). The pipeline then classifies and segregates files accordingly. For specification documents, I implemented logic to detect and isolate specific sections (Division 8 and Division 10) by analyzing page content and ensuring no overlap with other divisions. Finally, relevant pages are merged into consolidated PDFs, and output files are optimized for quality and size using Ghostscript before delivery to the user.",
  
  "gallery": [
    "https://thebimengineers.com/public/storage/scopes/September2022/uBvjhPtaF4XSqruA7tUd.JPG",
    "https://digital.gov/s3/files/m-images/guide-rpa.png"
  ],
  
  "challenges": "One of the biggest challenges was accurately classifying PDFs without human intervention, especially when documents contained a mix of drawings and text. Multiple approaches were tested using computer vision and OCR to reliably distinguish file types. Another challenge was precisely identifying and extracting Division 8 and Division 10 sections without contamination from other divisions, which required careful page-level validation. Additionally, maintaining consistent output quality while balancing file size constraints required dynamic optimization techniques."
},

"enterprise-llm": {
  "title": "Enterprise LLM",
  "category": "AIML",
  "year": "2025",
  "heroColor": "#FF7733",
  "textColor": "light",
  "role": "AIML Engineer",
  "timeline": "2 Months",
  "techStack": ["Python", "LLaMA", "Vector Database", "Tokenization"],
  "liveLink": "#",

  "problemStatement": "Our company worked with highly confidential BIM construction drawings and specification files. Existing third-party tools were not an option due to strict data privacy concerns. The challenge was to build an internal system that could securely process, understand, and summarize large volumes of technical data without exposing it outside the organization.",

  "video": null,

  "process": "We designed and developed an in-house LLM-powered solution capable of summarizing documents and answering queries interactively. After evaluating multiple database options, we selected a LLaMA-based architecture combined with a vector database for efficient retrieval. To handle large datasets within token limits, we implemented a tokenization pipeline that converted documents into structured chunks. These token batches were incrementally fed into the model for training and indexing. The system was optimized to ensure contextual understanding, allowing users to query the data and receive accurate, domain-specific responses.",

  "gallery": [
    "https://imgs.search.brave.com/toiYfr8ai7yIkQgznJ94P7jQZRpvPKilzlRsNKtysEg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zeW1i/bC5haS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyNC8wNS9CdWls/ZGluZy1MTE1zLTEy/ODB4NzIwLnBuZw",
    "https://imgs.search.brave.com/hwOd56UimgFP4sywyZUaqqv9jmqrQQTwjJVysCRuQzM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wZXRl/cmZhbGtpbmdoYW0u/Y29tL3dwLWNvbnRl/bnQvdXBsb2Fkcy8y/MDI0LzA0L3N1bW1h/cml6ZS1wZGZzLXdp/dGgtbG9jYWwtbGxt/LWFpLnBuZz93PTEy/MDA"
  ],

  "challenges": "One of the main challenges was ensuring strict data privacy while maintaining high performance. Handling token limitations required careful chunking and efficient data feeding strategies. Another critical issue was minimizing hallucinations. We addressed this by constraining the model to respond only based on the trained internal dataset, ensuring reliable and accurate outputs without introducing external or misleading information."
},
"recipe-finder": {
  "title": "Recipe Visualizer & Ingredient Search",
  "category": "Process Automation",
  "year": "2025",
  "heroColor": "#00A86B",
  "textColor": "light",
  "role": "Designer & Developer",
  "timeline": "6 Weeks",
  "techStack": ["JavaScript", "React", "Recipe Database","Python","Figma"],
  "liveLink": "https://on2cook-recipe-finder.vercel.app/",

  "problemStatement": "Company's recipe database had grown to hundreds of entries across six cooking methods, multiple accessories, cuisines, diet types, and meal categories — but there was no way to present this to potential clients in a compelling, interactive format. Sales demos relied on spreadsheets and verbal explanations, which failed to convey the device's versatility. The company needed a tool that could be used live in pitches to hesitant buyers, showcasing exactly what the machine could cook for their specific context.",

  "process": "I built a dual-mode recipe explorer. The primary mode is a full visual canvas where every recipe in the database is plotted and browsable — zoomable, pannable, and filterable in real time. Filters cover the six cooking methods (baking, grilling, mashing, sautéing, frying, boiling), accessory type (standard and additional accessories sold with the device), cuisine, meal category (breakfast, main course, dessert, snack), diet type (veg, non-veg, egg), and cooking time — since the On2Cook device targets 15–20 minute cook times, this was a key differentiator to showcase. The second mode is an ingredient-based search: a user types whatever ingredients they have at home, and the system returns every recipe in the On2Cook database that can be made from those ingredients on the device. Both modes pull from the same structured recipe database and update instantly without page reloads.",

  "gallery": [
    "../assets/Recipe Finder 1.png",
    "../assets/Recipe Finder 2.png"
  ],

  "challenges": "The hardest problem was performance on the canvas visualiser — plotting and re-filtering hundreds of recipe nodes simultaneously while keeping the pan-and-zoom smooth required careful optimisation of the render loop. The ingredient search also had to handle fuzzy matching, since users type ingredients in different ways. Designing the filter UI to handle seven independent dimensions without overwhelming a non-technical client audience during a live pitch took several rounds of iteration."
},

"culinary-management": {
  "title": "Culinary Management System",
  "category": "Process Automation",
  "year": "2026",
  "heroColor": "#080705",
  "textColor": "light",
  "role": "Full-Stack Developer & UX Designer",
  "timeline": "3 Months",
  "techStack": ["Python", "React", "Node.js", "PostgreSQL", "Figma"],
  "liveLink": "https://on2cook-culinary-management.vercel.app/",

  "problemStatement": "Company's culinary team had no unified system to track anything — inventory was managed on paper, demo costs were calculated manually in spreadsheets, RnD expenses had no paper trail, and chef activity was completely untracked. With a growing team doing device demos for clients, training sessions, and customer service refreshers daily, there was no way to measure efficiency, flag low stock, or understand the true cost of any operation.",

  "process": "I designed and built a five-module operations platform, each solving a distinct pain point. The Inventory module tracks every ingredient with purchase history — critically, inventory value always recalculates from the last purchase price automatically, so if milk goes from ₹100 to ₹120 per litre, the system updates the total stock value without any manual entry. When staff issue ingredients, the system only shows brands actually in stock at quantities available — preventing over-issuing entirely. The Demo Costing module connects directly to the recipe database: a cook searches a recipe, adjusts the portion size for that demo, and the system auto-calculates the full ingredient cost at current purchase prices. The RnD Tracking module captures trial and research costs against specific experiments. The Customer Service module logs refresher sessions and repeat demos per customer. Finally, the Log Timeline requires every team member to log their full working day — what they cooked, what they issued, what sessions they ran — which feeds a Master Dashboard showing demo schedules, recipe usage frequency, individual performance, task distribution, inventory reorder alerts, brand preferences, and cooking mode breakdowns across the whole team.",

  // "gallery": [
  //   "./assets/culinary-management/1.png",
  //   "./assets/culinary-management/2.png"
  // ],
  // "video": "assets/culinary-management.mov",

  "challenges": "The core technical challenge was building the auto-pricing logic correctly — the system had to always use the most recent purchase price per ingredient per brand for every cost calculation across inventory valuation, demo costing, and RnD tracking simultaneously. The bigger design challenge was that the primary users — cooks and kitchen staff — were not tech-savvy, so the issuing and logging flows had to be foolproof: no free-text fields where errors could creep in, smart dropdowns that only showed valid options, and confirmation steps before any stock movement was committed."
},

"ambassador-program": {
  "title": "Ambassador Portal",
  "category": "UI / UX",
  "year": "2025",
  "heroColor": "#080705",
  "textColor": "light",
  "role": "UI/UX Designer & Front-End Developer",
  "timeline": "3 Months",
  "techStack": ["TypeScript", "PostgreSQL", "Figma", "Auth"],
  "liveLink": "https://ambassador-on2cook.vercel.app/",

  "problemStatement": "The company wanted to build a structured ambassador program — recruiting chefs, consultants, and food entrepreneurs to promote the device through referrals. But there was no system in place: onboarding was done over WhatsApp, referral tracking was manual, and earnings were calculated by hand. More critically, there was no single place a potential ambassador could land, understand the full program, self-assess their fit, and sign up — which meant conversion relied entirely on a salesperson explaining it.",

  "process": "I designed the portal to serve two entirely different audiences from the same URL, switching modes cleanly at the auth gate. The public-facing side is a full conversion funnel: it opens with an animated hero explaining the program, then flows through social proof (ambassador count, device stats, award recognition), a step-by-step program explainer, a quiz that lets visitors self-assess whether they are the right fit, an ROI calculator showing projected earnings, a video testimonial section, and a gallery of the ambassador community. Every element is built to remove hesitation and answer objections before they are raised. Once a visitor signs up, the experience flips completely into a functional dashboard: they receive a unique referral code, can track how many people registered through it, monitor their monthly and total earnings, and access the structured product training module required to become an active ambassador.",

  "gallery": [
    "../assets/ambassador.png",
    "../assets/ambassador2.png",
    "../assets/ambassador3.png",
    "../assets/ambassador4.png",
    "../assets/ambassador5.png",
    "../assets/ambassador6.png"
  ],

  "challenges": "The dual-audience problem was the central design challenge — the public marketing site needed to feel premium and inspiring, while the ambassador dashboard needed to be clean and functional. These two modes live on the same domain but must feel like different products depending on who is looking. Getting the auth transition to feel seamless rather than jarring required careful thought about loading states and layout shifts. Integrating Supabase real-time data for referral tracking while keeping the public marketing pages fast also required deliberate code-splitting."
},

"bom-portal": {
  "title": "BOM Management Portal",
  "category": "Process Automation",
  "year": "2026",
  "heroColor": "#192BC2",
  "textColor": "light",
  "role": "Full-Stack Developer",
  "timeline": "2 Months",
  "techStack": ["JavaScript", "React", "XLSX Parsing", "PostgreSQL", "Role-Based Auth"],
  "liveLink": "https://on2cook-inventory.vercel.app/",

  "problemStatement": "Company's hardware Bill of Materials was being managed across individual Excel files — each team member maintaining their own copy, with no central version of truth. When someone updated a part cost, changed a supplier, or revised a lead time, nobody else knew. Decisions were constantly being made on outdated data, and there was no way to tell which sheet was current. The team needed one single place that everyone could see, that was always up to date, and that required no Excel expertise to read.",

  "process": "I built a three-tab portal that replaced the entire spreadsheet ecosystem. The BOM tab lists every unique part with its part number, unit cost, freight, currency, HSN code, supplier, country of origin, and lead time — filterable by lead time urgency (critical over 60 days, high 30–60, medium, low). Each part is also linked to its sub-assemblies: clicking any part shows every sub-assembly that uses it, making cross-dependency visible for the first time. The Store Inventory tab shows current stock levels for each part across the production line and contract manufacturing pipeline, flagging what needs to be purchased to meet upcoming demand. It includes live currency conversion across USD, RMB, and others at user-defined rates, with a one-click export of the converted values. The Procurement tab groups all parts by vendor, showing how many parts are sourced from each supplier, with the ability to attach quotes directly to each vendor entry so the final negotiated price is always on record in the same system.",

  // "gallery": [
  //   "./assets/bom-portal/1.png",
  //   "./assets/bom-portal/2.png"
  // ],

  "challenges": "The biggest challenge was replacing a workflow that people had used for years — the resistance to changing from personal Excel files to a shared system was real. The portal had to be immediately more useful than the spreadsheet on day one, which meant the import process had to be frictionless and the data had to display in a format familiar enough to not require retraining. Technically, cross-referencing part numbers across BOM, store inventory, and procurement data — uploaded as three separate files at different times — required a strict validation layer to catch mismatches before they contaminated live data."
},

"project-inventory": {
  "title": "Project Store Inventory",
  "category": "Process Automation",
  "year": "2026",
  "heroColor": "#FF7733",
  "textColor": "light",
  "role": "Full-Stack Developer",
  "timeline": "4 Weeks",
  "techStack": ["React", "PostgreSQL", "PostgreSQL", "Auth System", "Tailwind CSS","JavaScript"],
  "liveLink": "https://inventindia-project-inventory.vercel.app/",

  "problemStatement": "The Company manages multiple concurrent engineering projects, each with physical components stored in containers across the office. The problem: containers were being misused constantly. Someone assigned a container to Project A, but a colleague from Project B would quietly place their items in it too — no record, no notification, no way to find out until something was missing. There was no map of where anything was, no track of who had what, and no way to temporarily borrow a part without it disappearing into a grey zone.",

  "process": "I built a transparent container management system where every action is visible to everyone. Each user gets their own ID and can issue a container to their project, logging exactly what items are inside it. The system maintains a physical map of the office — floor by floor, room by room — so anyone can search a container number and immediately see its physical location. Every issue, movement, and return triggers a real-time notification to all relevant team members, so nothing happens behind anyone's back. For the common case where someone needs just one or two parts and does not want to take a whole container, I built a borrow mechanism: a user can request to borrow specific items from another user's container, the owner is notified, and the borrowed items are tracked against both the borrower and the original container until they are returned — at which point everyone is notified again. The result is a system where the status of every container and every part is always visible, always current, and never ambiguous.",

  // "gallery": [
  //   "./assets/project-inventory/1.png",
  //   "./assets/project-inventory/2.png"
  // ],
"video": "https://vjrvapoxlwcimprhswom.supabase.co/storage/v1/object/public/videos/project-inventory.mov",
  "challenges": "The notification system was the most complex piece — every action (issue, borrow, return, movement) had to fan out to the right people in real time without flooding everyone with irrelevant alerts. Designing the notification logic so that only affected parties are notified while the broader team still has visibility through the map required careful thinking about who 'needs to know' versus who 'should be able to find out'. The physical office map also had to stay accurate as teams moved rooms and reorganised storage, so I made it fully editable by admins without requiring a code change."
},

"procurement": {
  "title": "End-to-End Procurement Pipeline",
  "category": "Process Automation",
  "year": "2026",
  "heroColor": "#EEF36A",
  "textColor": "dark",
  "role": "Full-Stack Developer & UX Designer",
  "timeline": "3 Months",
  "techStack": ["React", "Node.js", "PostgreSQL", "Figma", "Role-Based Auth","JavaScript","Python","PO Generation"],
  "liveLink": "https://inventindia-procurement-tracker.vercel.app/",

  "problemStatement": "The procurement process was entirely unstructured — requests were raised over Microsoft Teams messages, quotes were attached to emails, approvals were verbal, and purchase orders were generated manually in Word documents. Nobody could see what phase any request was in, duplicates were common, and vendor performance was never recorded. The process from request to delivery had no formal structure and no accountability at any stage.",

  "process": "I designed a role-based pipeline system modelled on how procurement actually works, with four distinct user roles: Engineer, Procurement Manager, Project Manager, and Accounts. An engineer raises a formal request within the system — specifying the part, quantity, and project. The procurement manager receives it, attaches quotes from multiple vendors directly in the portal, and sends it back. The engineer reviews the quotes, selects the preferred vendor, and submits for approval. The project manager sees the costed request, approves or rejects it with comments, and it returns to procurement. The procurement manager then generates a Purchase Order directly within the system — a formatted PO document, custom to that request — which is sent to the vendor. When parts arrive, the engineer logs a Goods Receipt Note and completes a quality check. The request then moves to accounts for payment processing, after which it is formally closed. At every stage, all parties can see exactly where the request sits. After closure, engineers rate the vendor — and the system maintains a full vendor history showing ratings and performance across every request ever made through that supplier.",

  // "gallery": [
  //   "./assets/procurement/1.png",
  //   "./assets/procurement/2.png"
  // ],

  "challenges": "The hardest design problem was handling the back-and-forth nature of procurement — requests do not flow linearly, they bounce between roles multiple times, and each bounce needed to preserve full context without confusion. Making it clear whose court the ball was in at any moment, across multiple simultaneous requests, required careful dashboard design per role. Generating the PO document dynamically within the browser — formatted correctly for vendor submission — also required building a custom PDF templating system since no off-the-shelf library matched the format required."
}
};
