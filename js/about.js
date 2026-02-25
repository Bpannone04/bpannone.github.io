"use strict";
// About page
class AboutPage {
    constructor() {
        const appElement = document.getElementById("app");
        if (!appElement) {
            throw new Error("App element not found");
        }
        this.app = appElement;
    }
    init() {
        this.render();
        this.initEventListeners();
    }
    render() {
        this.app.innerHTML = `
            ${this.renderNavigation()}
            ${this.renderPageHeader("About")}
            ${this.renderAbout()}
            ${this.renderFooter()}
        `;
    }
    renderNavigation() {
        const navItems = [
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Projects", href: "/projects" },
            { label: "Contact", href: "/#contact" },
        ];
        const activeHref = "/about";
        const navLinks = navItems
            .map((item) => {
            const isActive = item.href === activeHref;
            const classes = isActive
                ? "nav-link text-slate-900 font-semibold"
                : "nav-link text-gray-700 hover:text-slate-800 transition-colors";
            return `<a href="${item.href}" class="${classes}">${item.label}</a>`;
        })
            .join("");
        return `
            <nav class="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="text-xl font-bold text-slate-800">Bryce Pannone</div>
                        <div class="hidden md:flex space-x-8">
                            ${navLinks}
                        </div>
                        <button id="mobile-menu-button" class="md:hidden text-gray-700">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" class="hidden md:hidden bg-white border-t">
                    <div class="px-4 py-4 space-y-4">
                        ${navItems
            .map((item) => {
            const isActive = item.href === activeHref;
            const classes = isActive
                ? "block text-slate-900 font-semibold"
                : "block text-gray-700 hover:text-slate-800 transition-colors";
            return `<a href="${item.href}" class="${classes}">${item.label}</a>`;
        })
            .join("")}
                    </div>
                </div>
            </nav>
        `;
    }
    renderPageHeader(title) {
        return `
            <header class="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl md:text-5xl font-bold text-slate-900">${title}</h1>
                    <div class="w-24 h-1 bg-slate-800 mt-4"></div>
                </div>
            </header>
        `;
    }
    renderAbout() {
        return `
            <section id="about" class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
                        <div class="flex items-center justify-center mb-6 md:mb-0">
                            <div class="relative max-w-sm w-full">
                                <img src="images/Headshot.png" alt="Bryce Pannone" class="w-full rounded-2xl shadow-xl object-cover aspect-[3/4] border-4 border-slate-100 hover:shadow-2xl transition-shadow duration-300" />
                            </div>
                        </div>
                        <div>
                            <div class="prose max-w-none">
                                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4">About Me</h2>
                                <p class="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    Over the past four years of studying computer science, my beliefs about software development have changed. I originally believed software development was mostly about learning a programming language. But after four years of classes, projects, and an internship, I've learned that there is much more to learn about software development, from designing, building, and maintaining software to debugging code or using tools such as Docker or Git. My original beliefs about computer science have changed after learning more about the subject and getting more hands-on experience.
                                </p>
                                <br />
                                <p class="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    I have learned that software development involves design, development, problem-solving, and collaboration. While most of the courses I've taken have taught me about debugging code, architecture, and using version control like Git, it's the hands-on experience where I have gained the most knowledge. Through various projects and my internship, I have learned to collaborate with other developers, understand different business workflows, and adapt to changing project requirements.
                                </p>
                                  <br />
                                <p class="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    I'll be graduating in the Spring, which brings to mind my long-term goals. I would like to continue to learn while working in the industry. I want to continue using the latest tools and frameworks to accomplish this. I will research and stay up to date on them. I also want to be able to take feedback from others and use it to improve my development skills. \
                                </p>
                            </div>

                            <div class="mt-10">
                                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Education</h2>
                                <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
                                    <h3 class="text-base sm:text-lg font-bold text-slate-900">Frostburg State University – Frostburg, MD</h3>
                                    <p class="text-slate-700 mt-1">Bachelor of Science in Computer Science</p>
                                    <p class="text-slate-600 text-sm mt-1">Expected May 2026</p>
                                    <div class="mt-4">
                                        <p class="text-sm font-semibold text-slate-700 mb-2">Relevant Coursework:</p>
                                        <p class="text-sm text-gray-600">Software Engineering | Data Structures & Algorithms | Computer Networking | Operating Systems | Databases | Secure Computing | Digital Logic</p>
                                    </div>
                                </div>
                            </div>

                            <div class="mt-10">
                                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Professional Experience</h2>
                                <div class="space-y-6">
                                    <div class="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                                        <h3 class="text-base sm:text-lg font-bold text-slate-900">Intern Software Developer</h3>
                                        <p class="text-slate-700 mt-1">Willetts Technology | June 2025 – Present</p>
                                        <ul class="mt-4 space-y-2 text-gray-700 text-sm list-disc list-inside">
                                            <li>Worked on backend development, building systems from the ground up using frameworks like CakePHP</li>
                                            <li>General website design and upkeep</li>
                                            <li>Worked on implementing new features and bug fixes on the companies Electronic Health Record (EHR) software</li>
                                            <li>Implemented quick solutions on customer support tickets</li>
                                        </ul>
                                    </div>
                                    <div class="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                                        <h3 class="text-base sm:text-lg font-bold text-slate-900">Team Leader</h3>
                                        <p class="text-slate-700 mt-1">Chick-fil-A | June 2020 – August 2025</p>
                                        <ul class="mt-4 space-y-2 text-gray-700 text-sm list-disc list-inside">
                                            <li>Set expectations for the team of 15 members and worked with them to accomplish goals within the restaurant</li>
                                            <li>Monitored customer feedback and implemented strategies to improve service quality and efficiency</li>
                                            <li>Help ensure smooth operations within the restaurant by coaching team members and upholding quality standards</li>
                                            <li>Developed leadership, communication, and problem-solving skills in a high-volume service environment</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    renderFooter() {
        const currentYear = new Date().getFullYear();
        return `
            <footer class="bg-slate-900 text-slate-400 text-sm py-3 px-4 sm:px-6 lg:px-8">
                <div class="max-w-6xl mx-auto text-center">
                    <p>&copy; ${currentYear} Bryce Pannone. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
    initEventListeners() {
        // Smooth scrolling
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                const target = e.target;
                const href = target.getAttribute("href");
                if (href && href !== "#") {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: "smooth",
                        });
                        const mobileMenu = document.getElementById("mobile-menu");
                        if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
                            mobileMenu.classList.add("hidden");
                        }
                    }
                }
            });
        });
        // Mobile menu
        const menuButton = document.getElementById("mobile-menu-button");
        const mobileMenu = document.getElementById("mobile-menu");
        if (menuButton && mobileMenu) {
            menuButton.addEventListener("click", () => {
                mobileMenu.classList.toggle("hidden");
            });
        }
        // Scroll effect on nav
        const nav = document.querySelector("nav");
        if (nav) {
            window.addEventListener("scroll", () => {
                if (window.scrollY > 50) {
                    nav.classList.add("shadow-lg");
                    nav.classList.remove("shadow-sm");
                }
                else {
                    nav.classList.remove("shadow-lg");
                    nav.classList.add("shadow-sm");
                }
            });
        }
    }
}
// Initialize the about page when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    const aboutPage = new AboutPage();
    aboutPage.init();
});
