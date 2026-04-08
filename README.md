# 🌐 S Adithya | Personal Website

Welcome to the source code for my **personal website and integrated project portfolio**. This repository now contains my full website in one place, covering my personal profile, resume, blogs, hobbies, financial models, research work, and analytics projects.

🌍 **Live Website:** [https://adithya05.vercel.app/](https://adithya05.vercel.app/)

**Note:** *This is now a unified repository. The earlier separate projects website has been merged into this main website, so everything lives under one deployment and one codebase.*

## 🌟 Features

* **Unified Portfolio Website:** Personal pages and project portfolio are integrated into a single static website.
* **Dedicated Internal Projects Page:** The `Projects` navbar link now opens an internal page instead of redirecting to a separate site.
* **Dynamic Project Rendering:** Project cards on the Projects page are rendered from JavaScript data in `js/projects.js`.
* **Interactive Financial Model:** Includes a working Payback Period Calculator with chart support.
* **Embedded Research Reports:** Project detail pages can display PDFs directly inside the website using embedded viewers.
* **Responsive Design:** Layout adapts across desktop, tablet, and mobile devices using Flexbox and Grid.
* **Consistent Visual System:** Shared navigation, typography, styling, and interactions across all sections of the website.
* **Interactive UI Effects:** Typewriter hero effect, reveal animations, scroll progress bar, and custom cursor interactions.
* **SEO & Analytics:** Canonical tags, sitemap, robots file, Open Graph metadata, and Google Analytics configuration.

## 📄 Main Pages

The website currently includes the following main pages:

* `index.html` - **Home:** Introduction, profile, skills, and social links
* `HTML/resume.html` - **Resume:** Professional experience, education, and CV download
* `HTML/blogs.html` - **Blogs:** Blog cards linking to published articles
* `HTML/hobby.html` - **Hobby:** Personal interests and music section
* `HTML/projects.html` - **Projects:** Financial models, research, analytics, and strategy projects

## 📊 Project Pages

The integrated Projects section links to internal detail pages under `HTML/`:

* `HTML/payback.html` - Payback Period Calculator
* `HTML/ML-classification.html` - Spotify Popularity Classification
* `HTML/iran-israel-media.html` - Iran-Israel Media Framing Analysis
* `HTML/cybersecurity-threat-dashboard.html` - Global Cybersecurity Threat Dashboard
* `HTML/bike-analytics.html` - Bike Sales Analytics Dashboard
* `HTML/apollo.html` - Apollo Hospitals Fundamental Analysis
* `HTML/tata-motors.html` - Tata Motors Financial Analysis
* `HTML/BMC.html` - Pfizer Value Chain & BMC
* `HTML/product-study.html` - Product Idea Market Study
* `HTML/fintech-report.html` - FinTech Banks Sector Study
* `HTML/book-review.html` - Critical Book Review

📁 Supporting PDFs used in report pages are stored in `assets/PDF/`.

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
│   └── 📄 project detail pages
│
├── 📂 images/
│   ├── 📂 Blogs/
│   ├── 📂 Hobby/
│   └── 📂 Projects/
│
└── 📂 js/
    ├── 📄 gtag-config.js
    ├── 📄 main.js
    ├── 📄 projects.js
    └── 📄 payback.js
```

## ➕ Adding a New Project

Open `js/projects.js` and add a new object to either the `projectModels` array or the `projectResearch` array.

```js
{
    icon: '📊',
    title: 'My New Project',
    description: 'Short description here.',
    tools: ['Python'],
    tags: ['Analytics'],
    status: 'Completed',
    year: '2026',
    link: 'new-project.html',
    category: 'analytics'
}
```

If the project has a dedicated detail page:

1. Create the corresponding HTML file inside `HTML/`
2. Add any required PDFs to `assets/PDF/`
3. Link the project entry to that page

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
* `css/projects.css` contains styling specific to the Projects page and project detail pages
* `js/main.js` handles shared interactions and effects
* `js/projects.js` handles project navigation shell and project card rendering
* `js/payback.js` is only used by the Payback Period Calculator page

## 📬 Let's Connect

* **LinkedIn:** [S Adithya](https://www.linkedin.com/in/s-adithya-918009294/)
* **GitHub:** [@AnbudanAdithya](https://github.com/AnbudanAdithya)
* **Substack:** [Adithya's Musings](https://substack.com/@adithya05)
* **Email:** `adithyas0503@gmail.com`

---

*Built with 💛 by Adithya*
