const projectModels = window.projectModels || [];
const projectResearch = window.projectResearch || [];

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
                <p>Copyright &copy; <span id="year"></span> SA | Built with &#128155; by Adithya</p>
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
        ? '&#10003;'
        : project.status === 'In Progress'
            ? '&#8635;'
            : '&#8987;';

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
