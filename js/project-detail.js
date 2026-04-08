(function () {
    const GITHUB_ICON = `
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
    `;

    const KAGGLE_ICON = `
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.374v5.111c0 .235-.117.352-.351.352H5.505c-.236 0-.354-.117-.354-.352V.353c0-.233.118-.353.354-.353h2.431c.234 0 .351.12.351.353v12.879l6.378-6.275c.165-.165.33-.246.495-.246h3.239c.144 0 .236.06.285.18.046.149.034.255-.036.315l-6.555 6.344 6.836 8.507c.095.104.117.208.07.301"/>
        </svg>
    `;

    function renderMetaItem(item) {
        const valueMarkup = item.tone === 'success'
            ? `<div class="meta-value" style="color:var(--success);">&#9679; ${item.value}</div>`
            : `<div class="meta-value">${item.value}</div>`;

        return `
            <div class="ba-meta-item">
                <div class="meta-label">${item.label}</div>
                ${valueMarkup}
            </div>
        `;
    }

    function renderLink(link) {
        const isKaggle = link.variant === 'kaggle';
        const buttonClass = isKaggle ? 'btn-kaggle' : 'btn-github';
        const icon = isKaggle ? KAGGLE_ICON : GITHUB_ICON;

        return `
            <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="${buttonClass}">
                ${icon}
                ${link.label}
            </a>
        `;
    }

    function renderNarrativeProject(detail) {
        const overviewMarkup = detail.overviewParagraphs.map((paragraph) => `<p>${paragraph}</p>`).join('');
        const metaMarkup = detail.meta.map(renderMetaItem).join('');
        const tagsMarkup = detail.detailTags.map((tag) => `<span class="tag">${tag}</span>`).join('');
        const insightsMarkup = detail.insights.map((item) => `
            <div class="finding-card">
                <div class="finding-title">${item.title}</div>
                <p>${item.body}</p>
            </div>
        `).join('');
        const linksMarkup = detail.links.map(renderLink).join('');

        return `
            <section class="model-hero">
                <div class="model-hero-content">
                    <p class="hero-tag">${detail.heroTag}</p>
                    <h1>${detail.heroTitle}</h1>
                    <p class="hero-sub">${detail.heroSub}</p>
                </div>
            </section>

            <section class="calculator-section" style="padding-top:0;">
                <div class="calculator-vertical" style="max-width:900px;">
                    <div class="ba-card">
                        <h3>&#128203; Project Overview</h3>
                        ${overviewMarkup}
                        <div class="ba-meta-grid">
                            ${metaMarkup}
                        </div>
                        <div class="ba-tags">
                            ${tagsMarkup}
                        </div>
                    </div>

                    <div class="ba-card">
                        <h3>${detail.insightsIcon} ${detail.insightsTitle}</h3>
                        <div class="ba-findings">
                            ${insightsMarkup}
                        </div>
                    </div>

                    <div class="ba-card ba-cta">
                        <h3>&#128202; ${detail.ctaTitle}</h3>
                        <p>${detail.ctaText}</p>
                        <div class="ba-cta-actions">
                            ${linksMarkup}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function renderReportProject(detail) {
        return `
            <section class="model-hero">
                <div class="model-hero-content">
                    <p class="hero-tag">${detail.heroTag}</p>
                    <h1>${detail.heroTitle}</h1>
                    <p class="hero-sub">${detail.heroSub}</p>
                </div>
            </section>

            <section class="calculator-section report-section">
                <div class="calculator-vertical report-container">
                    <div class="calc-inputs-top report-card">
                        <div class="report-card-header">
                            <h3>&#128196; ${detail.reportTitle}</h3>
                            <a href="${detail.pdfPath}" target="_blank" rel="noopener noreferrer" class="btn-secondary btn-sm">
                                Open in New Tab &#8599;
                            </a>
                        </div>
                        <div class="pdf-viewer">
                            <p class="pdf-loading">Loading PDF...</p>
                            <iframe src="${detail.pdfPath}" class="pdf-iframe" title="${detail.pdfFrameTitle}">
                                <p>Your browser does not support PDFs. <a href="${detail.pdfPath}">Download the PDF</a>.</p>
                            </iframe>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function renderMissingProject(message) {
        return `
            <section class="model-hero">
                <div class="model-hero-content">
                    <p class="hero-tag">Project Portfolio</p>
                    <h1>Project <span class="highlight">Unavailable</span></h1>
                    <p class="hero-sub">${message}</p>
                </div>
            </section>

            <section class="calculator-section" style="padding-top:0;">
                <div class="calculator-vertical" style="max-width:900px;">
                    <div class="ba-card ba-cta">
                        <h3>&#128269; Back To Projects</h3>
                        <p>The selected project could not be loaded from the current route.</p>
                        <div class="ba-cta-actions">
                            <a href="./projects.html" class="btn-primary">Open Projects Page</a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    function initProjectDetail() {
        const root = document.getElementById('project-detail-root');
        if (!root) return;

        const template = document.body.dataset.projectTemplate;
        const slug = new URLSearchParams(window.location.search).get('slug');
        const detail = window.projectDetails ? window.projectDetails[slug] : null;

        if (!slug || !detail) {
            document.title = 'Project Unavailable | S Adithya';
            root.innerHTML = renderMissingProject('The project link is missing or no longer exists.');
            return;
        }

        if (detail.template !== template) {
            window.location.replace(`${detail.template}.html?slug=${encodeURIComponent(slug)}`);
            return;
        }

        document.title = detail.seoTitle || `${detail.card.title} | S Adithya`;
        root.innerHTML = template === 'report'
            ? renderReportProject(detail)
            : renderNarrativeProject(detail);
    }

    document.addEventListener('DOMContentLoaded', initProjectDetail);
}());
