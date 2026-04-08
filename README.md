# 🌐 S Adithya | Personal Website

Welcome to the source code for my **personal website and integrated project portfolio**. This repository now contains my full website in one place, covering my personal profile, resume, blogs, hobbies, financial models, research work, and analytics projects.

🌍 **Live Website:** [https://adithya05.vercel.app/](https://adithya05.vercel.app/)

**Note:** *This is now a unified repository. The earlier separate projects website has been merged into this main website, so everything lives under one deployment and one codebase.*

## 🌟 Features

* **Unified Portfolio Website:** Personal pages and project portfolio are integrated into a single static website.
* **Dedicated Internal Projects Page:** The `Projects` navbar link opens an internal page instead of redirecting to a separate site.
* **Dynamic Project Rendering:** Project cards and project details are driven from shared data in `js/project-data.js`.
* **Reusable Detail Templates:** Narrative project pages and PDF-based report pages use shared templates instead of separate HTML files for every project.
* **Interactive Financial Model:** Includes a working Payback Period Calculator with chart support.
* **Embedded Research Reports:** Report pages display PDFs directly inside the website using embedded viewers.
* **Responsive Design:** Layout adapts across desktop, tablet, and mobile devices using Flexbox and Grid.
* **Consistent Visual System:** Shared navigation, typography, styling, and interactions across all sections of the website.
* **Interactive UI Effects:** Typewriter hero effect, reveal animations, scroll progress bar, and custom cursor interactions.
* **SEO & Analytics:** SEO metadata is intentionally kept only on the main pages, while project detail pages stay lightweight. Google Analytics remains enabled site-wide.

## 📄 Main Pages

The website currently includes the following main pages:

* `index.html` - **Home:** Introduction, profile, skills, and social links
* `HTML/resume.html` - **Resume:** Professional experience, education, and CV download
* `HTML/blogs.html` - **Blogs:** Blog cards linking to published articles
* `HTML/hobby.html` - **Hobby:** Personal interests and music section
* `HTML/projects.html` - **Projects:** Financial models, research, analytics, and strategy projects

## 📊 Project Pages

The integrated Projects section now uses a simplified internal structure:

* `HTML/payback.html` - standalone interactive calculator
* `HTML/project.html?slug=...` - shared template for narrative and analytics project pages
* `HTML/report.html?slug=...` - shared template for PDF-based report pages

📁 Supporting PDFs used in report pages are stored in `assets/PDF/`.

🔁 Legacy project URLs are redirected through `vercel.json` so older links still resolve.

🔎 SEO metadata is intentionally maintained only for:

* `index.html`
* `HTML/projects.html`
* `HTML/blogs.html`
* `HTML/resume.html`
* `HTML/hobby.html`

## 🛠️ Tech Stack

Built with lightweight web technologies, with no framework and no build tools required.

| Layer | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 |
| Scripting | Vanilla JavaScript (ES6) |
| Charts | Chart.js |
| Icons | Font Awesome, Devicon |
| Fonts | Google Fonts |
| Hosting | Vercel |
| Analytics | Google Analytics |

## 📁 Repository Structure

```text
📂 personal-website/
├── 📄 index.html
├── 📄 README.md
├── 📄 robots.txt
├── 📄 sitemap.xml
├── 📄 vercel.json
│
├── 📂 assets/
│   ├── 📂 Hobby/
│   └── 📂 PDF/
│
├── 📂 css/
│   ├── 📄 style.css
│   └── 📄 projects.css
│
├── 📂 HTML/
│   ├── 📄 resume.html
│   ├── 📄 blogs.html
│   ├── 📄 hobby.html
│   ├── 📄 projects.html
│   ├── 📄 project.html
│   ├── 📄 report.html
│   └── 📄 payback.html
│
├── 📂 images/
│   ├── 📂 Blogs/
│   ├── 📂 Hobby/
│   └── 📂 Projects/
│
└── 📂 js/
    ├── 📄 gtag-config.js
    ├── 📄 main.js
    ├── 📄 project-data.js
    ├── 📄 project-detail.js
    ├── 📄 projects.js
    └── 📄 payback.js
```

## ➕ Adding A New Project

Open `js/project-data.js` and add the new project in the shared data source.

```js
{
    template: 'project',
    card: {
        icon: '📈',
        title: 'My New Project',
        description: 'Short description here.',
        tools: ['Python'],
        tags: ['Analytics'],
        status: 'Completed',
        year: '2026',
        category: 'analytics'
    },
    heroTag: 'Data Analytics',
    heroTitle: 'My New <span class="highlight">Project</span>',
    heroSub: 'Short hero text here.'
}
```

For most additions:

1. Add the detail content in `js/project-data.js`
2. Use `template: 'project'` for narrative pages or `template: 'report'` for PDF pages
3. Add any required PDFs to `assets/PDF/`
4. Only create a separate HTML page when the project needs custom interactive logic, like `payback.html`
5. If it belongs inside the filtered research section, use `category: 'analytics'`, `category: 'equity'`, or `category: 'strategy'`

The card will then render automatically on the Projects page.

## 🚀 Running Locally

No installation is required.

1. Clone the repository:

```bash
git clone https://github.com/AnbudanAdithya/personal-website.git
```

2. Open the project folder.

3. Run it using one of these options:

* Open `index.html` directly in your browser
* Use VS Code **Live Server** for easier local previewing

## 📝 Notes

* `css/style.css` contains shared styling for the main website
* `css/projects.css` contains styling specific to the Projects page and both shared project templates
* `js/main.js` handles shared interactions and effects
* `js/project-data.js` stores project listing and detail content
* `js/project-detail.js` renders the shared detail templates
* `js/projects.js` handles the project navigation shell and project card rendering
* `js/payback.js` is only used by the Payback Period Calculator page
* `sitemap.xml` now lists only the main SEO-targeted pages

## 📬 Let's Connect

* **LinkedIn:** [S Adithya](https://www.linkedin.com/in/s-adithya-918009294/)
* **GitHub:** [@AnbudanAdithya](https://github.com/AnbudanAdithya)
* **Substack:** [Adithya's Musings](https://substack.com/@adithya05)
* **Email:** `adithyas0503@gmail.com`

---

*Built with 💛 by Adithya*
