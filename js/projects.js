const projectModels = [
    {
        icon: '📊',
        title: 'Portfolio Optimization Model',
        description: 'Built using Modern Portfolio Theory to estimate efficient portfolios, risk-return trade-offs, and allocation decisions.',
        tools: ['Python', 'NumPy'],
        tags: ['Monte Carlo', 'MPT', 'Efficient Frontier'],
        status: 'Coming Soon',
        year: '2026',
        link: null,
    },
    {
        icon: '💰',
        title: 'Payback Period Calculator',
        description: 'Interactive model to calculate simple and discounted payback periods with fixed-growth and uneven cash flow patterns.',
        tools: ['Excel', 'VBA'],
        tags: ['DCF', 'Capital Budgeting', 'Calculator'],
        status: 'Completed',
        year: '2026',
        link: 'payback.html',
    },
];

const projectResearch = [
    {
        icon: '🎵',
        title: 'Spotify Tracks Popularity Classification',
        description: 'A machine learning model that classifies Spotify tracks into popularity tiers using audio features and metadata.',
        tools: ['Python', 'Scikit-learn'],
        tags: ['Random Forest', 'Data Preprocessing', 'Model Evaluation'],
        status: 'Completed',
        year: '2026',
        link: 'ML-classification.html',
        category: 'analytics',
    },
    {
        icon: '📝',
        title: 'Global Media Framing Analysis - Iran Israel War',
        description: 'Cross-layer analysis of global sentiment across media channels, editorial opinions, and public opinion on the Iran-Israel war.',
        tools: ['Python', 'Google Cloud API'],
        tags: ['Topic Modelling', 'Sentiment Analysis', 'NLP'],
        status: 'Completed',
        year: '2026',
        link: 'iran-israel-media.html',
        category: 'analytics',
    },
    {
        icon: '🌐',
        title: 'Global Cybersecurity Threat Dashboard',
        description: 'Interactive Power BI dashboard analyzing and visualizing global cybersecurity threats across countries and industries.',
        tools: ['Power BI'],
        tags: ['Power BI', 'Risk Analytics', 'Data Visualization'],
        status: 'Completed',
        year: '2026',
        link: 'cybersecurity-threat-dashboard.html',
        category: 'analytics',
    },
    {
        icon: '📚',
        title: 'MBA Dissertation - Piotroski F-Score',
        description: 'An exploratory quantitative study on Piotroski F-Score and a proposed modification aimed at improving investor returns.',
        tools: ['Excel', 'Capitaline'],
        tags: ['Financial Analysis', 'Valuation Research'],
        status: 'Coming Soon',
        year: '2026',
        link: null,
        category: 'equity',
    },
    {
        icon: '📈',
        title: 'Business Analytics Dashboard',
        description: 'An interactive business analytics dashboard built with R and Power BI to identify the drivers of bike purchase decisions.',
        tools: ['R', 'Power BI'],
        tags: ['Logistic Regression', 'Data Analytics'],
        status: 'Completed',
        year: '2025',
        link: 'bike-analytics.html',
        category: 'analytics',
    },
    {
        icon: '🩺',
        title: 'Apollo Hospitals Equity Research',
        description: 'A fundamental analysis report covering industry positioning, financial ratios, valuation, and an investment recommendation.',
        tools: [],
        tags: ['Equity Research', 'Fundamental Analysis', 'Valuation'],
        status: 'Completed',
        year: '2025',
        link: 'apollo.html',
        category: 'equity',
    },
    {
        icon: '🚗',
        title: 'Tata Motors Financial Analysis',
        description: 'A comprehensive evaluation of Tata Motors through financial statements, cash flow trends, and ratio analysis.',
        tools: [],
        tags: ['Financial Analysis', 'Ratio Analysis', 'Corporate Finance'],
        status: 'Completed',
        year: '2024',
        link: 'tata-motors.html',
        category: 'equity',
    },
    {
        icon: '🏥',
        title: 'Pfizer: Value Chain & BMC',
        description: 'A strategic analysis of Pfizer using Porter\'s Value Chain Analysis and the Business Model Canvas framework.',
        tools: [],
        tags: ['Business Model Canvas', 'Value Chain Analysis'],
        status: 'Completed',
        year: '2025',
        link: 'BMC.html',
        category: 'strategy',
    },
    {
        icon: '🎯',
        title: 'Product Idea Market Study',
        description: 'An in-depth market research study evaluating feasibility, target demographics, and the competitive landscape for a new concept.',
        tools: [],
        tags: ['Market Research', 'Business Strategy', 'Consumer Behavior'],
        status: 'Completed',
        year: '2024',
        link: 'product-study.html',
        category: 'strategy',
    },
    {
        icon: '📱',
        title: 'FinTech Banks Report',
        description: 'A research report analysing the rise of FinTech banks, their operating models, and their disruption of traditional banking.',
        tools: [],
        tags: ['Market Research', 'FinTech', 'Business Strategy'],
        status: 'Completed',
        year: '2023',
        link: 'fintech-report.html',
        category: 'strategy',
    },
    {
        icon: '📖',
        title: 'Book Review',
        description: 'A critical review of The Psychology of Money exploring foundational principles of personal finance and behavioural investing.',
        tools: [],
        tags: ['Personal Finance', 'Behavioral Investing', 'Book Analysis'],
        status: 'Completed',
        year: '2023',
        link: 'book-review.html',
        category: 'strategy',
    },
];

function injectProjectsShell() {
    if (document.getElementById('navbar')) return;

    const navMarkup = `
        <nav id="navbar">
            <div class="nav-container">
                <a href="../index.html" class="nav-logo">
                    <img src="../images/favicon.svg" alt="Logo" width="35" height="35">
                </a>
                <ul class="nav-links">
                    <li><a href="../index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="../HTML/resume.html"><i class="far fa-file-alt"></i> Resume</a></li>
                    <li><a href="../HTML/projects.html"><i class="fas fa-project-diagram"></i> Projects</a></li>
                    <li><a href="../HTML/blogs.html"><i class="fas fa-blog"></i> Blogs</a></li>
                    <li><a href="../HTML/hobby.html"><i class="fas fa-th-large"></i> Hobby</a></li>
                    <li>
                        <a href="https://github.com/AnbudanAdithya/personal-website" target="_blank" rel="noopener noreferrer" class="btn-fork" aria-label="GitHub repository">
                            <i class="fas fa-code-branch"></i> <i class="fas fa-star"></i>
                        </a>
                    </li>
                </ul>
                <button class="hamburger" id="hamburger" aria-label="Open navigation menu" type="button">
                    <span></span><span></span><span></span>
                </button>
            </div>
        </nav>
    `;

    document.body.insertAdjacentHTML('afterbegin', navMarkup);

    if (!document.querySelector('footer')) {
        const footerMarkup = `
            <footer>
                <p>Copyright &copy; <span id="year"></span> SA | Built with 💛 by Adithya</p>
            </footer>
        `;
        const scrollButton = document.getElementById('scroll-top');
        if (scrollButton) {
            scrollButton.insertAdjacentHTML('beforebegin', footerMarkup);
        } else {
            document.body.insertAdjacentHTML('beforeend', footerMarkup);
        }
    }
}

function buildProjectCard(project, buttonLabel) {
    const statusClass = project.status === 'Completed'
        ? 'completed'
        : project.status === 'In Progress'
            ? 'in-progress'
            : 'coming-soon';

    const statusIcon = project.status === 'Completed'
        ? '✓'
        : project.status === 'In Progress'
            ? '↻'
            : '⌛';

    const tagMarkup = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join('');
    const cardClass = project.link ? 'project-card' : 'project-card project-card-disabled';
    const actionMarkup = project.link
        ? `<a href="${project.link}" class="btn-primary btn-card-action">${buttonLabel} &rarr;</a>`
        : '';

    return `
        <article class="${cardClass}" data-category="${project.category || ''}">
            <div class="project-icon">${project.icon}</div>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">${tagMarkup}</div>
            <div class="project-footer">
                <span class="project-status ${statusClass}">
                    <span class="status-icon">${statusIcon}</span> ${project.status}
                </span>
                <span>${project.year}</span>
            </div>
            ${actionMarkup}
        </article>
    `;
}

function renderProjects() {
    const modelsGrid = document.getElementById('models-grid');
    const researchGrid = document.getElementById('research-grid');

    if (modelsGrid) {
        modelsGrid.innerHTML = projectModels.map((project) => buildProjectCard(project, 'Open Model')).join('');
    }

    if (researchGrid) {
        researchGrid.innerHTML = projectResearch.map((project) => buildProjectCard(project, 'View Project')).join('');
    }
}

function initProjectFilters() {
    const pills = document.querySelectorAll('.filter-pill');
    if (!pills.length) return;

    pills.forEach((pill) => {
        pill.addEventListener('click', () => {
            pills.forEach((item) => item.classList.remove('active'));
            pill.classList.add('active');

            const filter = pill.dataset.filter;
            const cards = document.querySelectorAll('#research-grid .project-card');

            cards.forEach((card) => {
                const shouldShow = filter === 'all' || card.dataset.category === filter;
                card.style.display = shouldShow ? '' : 'none';
            });
        });
    });
}

function animateProjectCounter(id, target, duration = 1400) {
    const element = document.getElementById(id);
    if (!element) return;

    const step = target / (duration / 16);
    let current = 0;

    const timer = window.setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            window.clearInterval(timer);
        }
        element.textContent = `${Math.floor(current)}`;
    }, 16);
}

function initProjectStats() {
    const allProjects = [...projectModels, ...projectResearch];
    const totalProjects = allProjects.length;
    const completedProjects = allProjects.filter((project) => project.status === 'Completed').length;
    const uniqueTools = new Set(allProjects.flatMap((project) => project.tools)).size;

    animateProjectCounter('stat-projects', totalProjects);
    animateProjectCounter('stat-completed', completedProjects);
    animateProjectCounter('stat-tools', uniqueTools);
}

document.addEventListener('DOMContentLoaded', () => {
    injectProjectsShell();
    renderProjects();
    initProjectFilters();
    initProjectStats();
});
