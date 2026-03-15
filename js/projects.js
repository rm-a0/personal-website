const PROJECTS = [
    // ── Featured ──────────────────────────────────────────────────────
    {
        featured: true,
        name: "3D Neural Cellular Automata",
        desc: "Configurable 3D NCA training system in PyTorch that grows volumetric structures from single seeds. Custom Blender add-on UI with real-time training visualization via client-server streaming.",
        tags: ["PyTorch", "Blender API", "Client-Server", "Python", "3D NCA"],
        year: "2026",
        url: "https://github.com/rm-a0/3d-nca",
        award: null
    },
    {
        featured: true,
        name: "Transformer Fact-Checker",
        desc: "End-to-end NLP pipeline for Czech/Slovak social-media comments: XLM-RoBERTa checkworthiness classifier and GPT-4.1 atomic claim extraction. Handled bilingual input with enriched context from linked sources.",
        tags: ["XLM-RoBERTa", "GPT-4.1", "Hugging Face", "NLP", "Python"],
        year: "2025",
        url: "https://github.com/rm-a0/fdm-hackathon",
        award: "1st place FDM Hackathon — claim extraction"
    },
    {
        featured: true,
        name: "Book Recommender",
        desc: "Multi-strategy backend service using collaborative filtering, semantic embeddings, author matching, and demographic signals. Scalable pipeline built on PySpark.",
        tags: ["PySpark", "Embeddings", "Collaborative Filtering", "Python"],
        year: "2025",
        url: "https://github.com/rm-a0/book-recommender",
        award: null
    },
    // ── Standard ──────────────────────────────────────────────────────
    {
        featured: false,
        name: "Spark RAG Maintenance",
        desc: "Predictive maintenance pipeline for turbofan engines using the NASA C-MAPSS dataset. RAG-enhanced failure prediction with PySpark.",
        tags: ["PySpark", "RAG", "Predictive Maintenance", "Python"],
        year: "2025",
        url: "https://github.com/rm-a0/spark-rag-maintenance"
    },
    {
        featured: false,
        name: "IMDb Sentiment Classifier",
        desc: "DistilBERT fine-tuning exercise for binary sentiment classification on the IMDb dataset.",
        tags: ["DistilBERT", "Fine-tuning", "PyTorch", "NLP"],
        year: "2025",
        url: "https://github.com/rm-a0/imdb-classifier"
    },
    {
        featured: false,
        name: "CA Traffic Simulation",
        desc: "Simulated real-world Zvonarka–Dornych intersection in Brno using extended Nagel-Schreckenberg cellular automata with multi-phase traffic lights.",
        tags: ["C++", "Nagel-Schreckenberg", "CA", "Simulation"],
        year: "2025",
        url: "https://github.com/rm-a0/ims-ca-transport"
    },
    {
        featured: false,
        name: "ISA Encrypted ICMP Transfer",
        desc: "Client-server app for secure file transfer over ICMP using AES encryption.",
        tags: ["C++", "ICMP", "AES", "Networking"],
        year: "2025",
        url: "https://github.com/rm-a0/isa-encrypted-icmp"
    },
    {
        featured: false,
        name: "IPK Chat Client",
        desc: "Stateful client supporting TCP and UDP variants of IPK25-CHAT protocol with Mealy FSM design and robust UDP retransmission logic.",
        tags: ["C#", "TCP", "UDP", "FSM", "Protocol"],
        year: "2025",
        url: "https://github.com/rm-a0/ipk-chat-client"
    },
    {
        featured: false,
        name: "IFJ Compiler",
        desc: "Compiler for IFJ24, a subset of Zig. Led a team of 4. Implemented lexer, recursive-descent parser, AST, semantic analysis, and code generation.",
        tags: ["C", "Lexer", "Parser", "AST", "Zig subset"],
        year: "2024",
        url: "https://github.com/rm-a0/ifj-compiler"
    },
    {
        featured: false,
        name: "City Sim",
        desc: "Procedurally generated city simulator written in Lua with LÖVE2D.",
        tags: ["Lua", "LÖVE2D", "Procedural Generation"],
        year: "2025",
        url: "https://github.com/rm-a0/city-sim"
    },
    {
        featured: false,
        name: "2D Souls Engine",
        desc: "Simple game engine and Metroidvania demo built in Python with Pygame.",
        tags: ["Python", "Pygame", "Game Engine", "Metroidvania"],
        year: "2025",
        url: "https://github.com/rm-a0/2d-souls"
    },
    {
        featured: false,
        name: "ASCII Video Player",
        desc: "Video player that runs in the terminal, converting video frames to ASCII art using ffmpeg and ncurses.",
        tags: ["C", "ffmpeg", "ncurses", "ASCII"],
        year: "2024",
        url: "https://github.com/rm-a0/ascii-video-player"
    }
];

const GH_ICON = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
  0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
  -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
  .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
  -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0
  012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595
  1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012
  2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
</svg>`;

function createCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card' + (project.featured ? ' featured' : '');

    const awardHTML = project.award
        ? `<div class="card-award vt">[${project.award}]</div>`
        : '';

    const tagsHTML = project.tags.map(t => `<span class="tag vt">${t}</span>`).join('');

    card.innerHTML = `
        <div class="card-header">
            <div>
                <h3 class="card-title vt">${project.name}</h3>
                <span class="card-year vt">${project.year}</span>
            </div>
            <a href="${project.url}" target="_blank" rel="noopener" class="card-link" aria-label="GitHub: ${project.name}">
                ${GH_ICON}
            </a>
        </div>
        ${awardHTML}
        <p class="card-desc">${project.desc}</p>
        <div class="card-tags">${tagsHTML}</div>
    `;
    return card;
}

function renderProjects() {
    const featuredGrid = document.getElementById('featured-grid');
    const projectsGrid = document.getElementById('projects-grid');
    PROJECTS.forEach(project => {
        const card = createCard(project);
        (project.featured ? featuredGrid : projectsGrid).appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderProjects);
