"use strict";
// Main TypeScript file for https://bpannone.com
class Website {
    constructor() {
        const appElement = document.getElementById('app');
        if (!appElement) {
            throw new Error('App element not found');
        }
        this.app = appElement;
        this.page = this.getPage();
    }
    init() {
        this.checkDevelopmentEnvironment();
        this.render();
        this.initEventListeners();
    }
    getPage() {
        const pageAttr = document.body.getAttribute('data-page');
        if (pageAttr === 'about')
            return 'about';
        return 'home';
    }
    checkDevelopmentEnvironment() {
        const hostname = window.location.hostname;
        const port = window.location.port;
        const isDevelopment = (hostname === 'localhost' || hostname === '127.0.0.1') &&
            port === '8080';
        if (isDevelopment) {
            this.showDevelopmentBanner();
        }
    }
    showDevelopmentBanner() {
        const banner = document.createElement('div');
        banner.className = 'fixed bottom-0 left-0 right-0 bg-orange-500 text-white text-center py-2 font-bold text-sm z-[10000] shadow-md';
        banner.textContent = 'DEVELOPMENT ENVIRONMENT NOT PRODUCTION';
        document.body.appendChild(banner);
    }
    render() {
        if (this.page === 'about') {
            this.app.innerHTML = `
                ${this.renderNavigation()}
                ${this.renderPageHeader('About')}
                ${this.renderAbout()}
                ${this.renderFooter()}
            `;
            return;
        }
        // Home page
        this.app.innerHTML = `
            ${this.renderNavigation()}
            ${this.renderHero()}
            ${this.renderAboutTeaser()}
            ${this.renderSkills()}
            ${this.renderProjects()}
            ${this.renderContact()}
            ${this.renderFooter()}
        `;
    }
    renderNavigation() {
        const navItems = [
            { label: 'Home', href: 'index.html' },
            { label: 'About', href: 'about.html' },
            { label: 'Projects', href: 'index.html#projects' },
            { label: 'Contact', href: 'index.html#contact' }
        ];
        const activeHref = this.page === 'about' ? 'about.html' : 'index.html';
        const navLinks = navItems.map(item => {
            const isActive = item.href === activeHref;
            const classes = isActive
                ? 'nav-link text-slate-900 font-semibold'
                : 'nav-link text-gray-700 hover:text-slate-800 transition-colors';
            return `<a href="${item.href}" class="${classes}">${item.label}</a>`;
        }).join('');
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
                        ${navItems.map(item => {
            const isActive = item.href === activeHref;
            const classes = isActive
                ? 'block text-slate-900 font-semibold'
                : 'block text-gray-700 hover:text-slate-800 transition-colors';
            return `<a href="${item.href}" class="${classes}">${item.label}</a>`;
        }).join('')}
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
    renderHero() {
        return `
            <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                <div class="max-w-5xl mx-auto">
                    <div class="text-center">
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-slate-200 border border-white/10">
                            <span class="w-2 h-2 rounded-full bg-slate-200"></span>
                            <span class="text-sm font-semibold tracking-wide">Software Engineer</span>
                        </div>

                        <h1 class="mt-6 text-5xl md:text-6xl font-bold text-white">
                            Bryce <span class="text-slate-300">Pannone</span>
                        </h1>

                        <p class="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
                            I build fast, accessible web experiences with TypeScript and modern tooling.
                        </p>

                        <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="#projects" class="px-8 py-3 bg-white text-slate-950 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl">
                                View Projects
                            </a>
                            <a href="#contact" class="px-8 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700">
                                Contact
                            </a>
                        </div>

                        <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
                            ${this.renderHeroStat('Focus', 'Frontend, DX, and performance')}
                            ${this.renderHeroStat('Stack', 'TypeScript, Tailwind, Docker')}
                            ${this.renderHeroStat('Style', 'Clean UI, pragmatic engineering')}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    renderHeroStat(label, value) {
        return `
            <div class="rounded-xl bg-white/5 border border-white/10 p-5 text-left">
                <div class="text-sm text-slate-400">${label}</div>
                <div class="mt-2 text-slate-100 font-semibold">${value}</div>
            </div>
        `;
    }
    renderAbout() {
        return `
            <section id="about" class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="grid md:grid-cols-2 gap-10 items-start">
                        <div>
                            <p class="mt-6 text-gray-700 text-lg leading-relaxed">
                                I enjoy building products that feel simple to use and solid under the hood. I care about
                                performance, accessibility, and maintainable code.
                            </p>
                            <p class="mt-4 text-gray-700 text-lg leading-relaxed">
                                I like working end-to-end: UI, build tooling, developer experience, and shipping.
                            </p>
                        </div>
                        <div class="rounded-xl border border-slate-200 bg-slate-50 p-8">
                            <h3 class="text-lg font-bold text-slate-900">What I focus on</h3>
                            <ul class="mt-4 space-y-3 text-gray-700">
                                <li class="flex gap-3">
                                    <span class="mt-2 h-2 w-2 rounded-full bg-slate-700"></span>
                                    <span>Responsive UI with clear information hierarchy</span>
                                </li>
                                <li class="flex gap-3">
                                    <span class="mt-2 h-2 w-2 rounded-full bg-slate-700"></span>
                                    <span>Type-safe code and predictable architecture</span>
                                </li>
                                <li class="flex gap-3">
                                    <span class="mt-2 h-2 w-2 rounded-full bg-slate-700"></span>
                                    <span>Fast builds and smooth deployments</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    renderAboutTeaser() {
        return `
            <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-10">
                        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                            <div>
                                <h2 class="text-2xl md:text-3xl font-bold text-slate-900">About</h2>
                                <p class="mt-3 text-gray-700 text-lg">
                                    A bit more about what I value and how I approach building software.
                                </p>
                            </div>
                            <a href="about.html" class="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors">
                                Read About
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }
    renderSkills() {
        const skills = [
            { name: 'TypeScript' },
            { name: 'JavaScript' },
            { name: 'Tailwind CSS' },
            { name: 'HTML and CSS' },
            { name: 'React' },
            { name: 'Node.js' },
            { name: 'Docker' },
            { name: 'CI/CD' }
        ];
        const skillCards = skills.map(skill => `
            <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
                <div class="flex items-center gap-4">
                    <div class="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold tracking-wide">
                        ${this.getInitials(skill.name)}
                    </div>
                    <h3 class="font-semibold text-slate-900">${skill.name}</h3>
                </div>
            </div>
        `).join('');
        return `
            <section id="skills" class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-4xl font-bold text-center mb-4 text-slate-900">Skills</h2>
                    <div class="w-24 h-1 bg-slate-800 mx-auto mb-12"></div>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        ${skillCards}
                    </div>
                </div>
            </section>
        `;
    }
    getInitials(name) {
        const parts = name
            .replace(/\./g, '')
            .split(' ')
            .filter(Boolean);
        const initials = parts.map(p => p[0]).join('').slice(0, 2).toUpperCase();
        return initials || name.slice(0, 2).toUpperCase();
    }
    renderProjects() {
        const projects = [
            {
                title: 'Personal Website',
                description: 'A modern, responsive personal website built with TypeScript and Tailwind CSS, showcasing clean design and best practices.',
                tags: ['TypeScript', 'Tailwind CSS'],
                link: 'https://github.com/bpannone/bpannone.github.io'
            },
            {
                title: 'Coming Soon',
                description: 'More projects are on the way. Check back soon for updates.',
                tags: ['In Progress']
            },
            {
                title: 'More Projects',
                description: 'Check back soon for additional projects and case studies.',
                tags: ['Coming Soon']
            }
        ];
        const projectCards = projects.map(project => {
            const tags = project.tags.map(tag => `<span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${tag}</span>`).join('');
            const link = project.link
                ? `<a href="${project.link}" class="text-slate-800 hover:text-slate-600 font-semibold">View Project</a>`
                : '';
            return `
                <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-slate-200">
                    <div class="flex items-start justify-between gap-4">
                        <h3 class="text-xl font-bold text-slate-900">${project.title}</h3>
                        ${project.link ? `<a href="${project.link}" class="text-sm font-semibold text-slate-800 hover:text-slate-600">GitHub</a>` : ''}
                    </div>
                    <p class="text-gray-600 mb-4 mt-3">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">${tags}</div>
                    ${link}
                </div>
            `;
        }).join('');
        return `
            <section id="projects" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-4xl font-bold text-center mb-4 text-slate-900">Projects</h2>
                    <div class="w-24 h-1 bg-slate-800 mx-auto mb-12"></div>
                    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        ${projectCards}
                    </div>
                </div>
            </section>
        `;
    }
    renderContact() {
        const contacts = [
            {
                label: 'Email',
                href: 'mailto:your.email@example.com',
                icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>`
            },
            {
                label: 'GitHub',
                href: 'https://github.com/bpannone',
                icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>`
            }
        ];
        const contactButtons = contacts.map(contact => `
            <a href="${contact.href}" class="px-8 py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                ${contact.icon}
                ${contact.label}
            </a>
        `).join('');
        return `
            <section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-4xl font-bold text-white mb-4">Get In Touch</h2>
                    <div class="w-24 h-1 bg-slate-300 mx-auto mb-12"></div>
                    <p class="text-xl text-slate-300 mb-10">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-6 justify-center">
                        ${contactButtons}
                    </div>
                </div>
            </section>
        `;
    }
    renderFooter() {
        const currentYear = new Date().getFullYear();
        return `
            <footer class="bg-slate-900 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
                <div class="max-w-6xl mx-auto text-center">
                    <p>&copy; ${currentYear} Bryce Pannone. All rights reserved.</p>
                </div>
            </footer>
        `;
    }
    initEventListeners() {
        // Smooth scrolling
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                const target = e.target;
                const href = target.getAttribute('href');
                if (href && href !== '#') {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    if (targetElement) {
                        const offsetTop = targetElement.offsetTop - 80;
                        window.scrollTo({
                            top: offsetTop,
                            behavior: 'smooth'
                        });
                        const mobileMenu = document.getElementById('mobile-menu');
                        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                            mobileMenu.classList.add('hidden');
                        }
                    }
                }
            });
        });
        // Mobile menu
        const menuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        if (menuButton && mobileMenu) {
            menuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
        // Scroll effect on nav
        const nav = document.querySelector('nav');
        if (nav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    nav.classList.add('shadow-lg');
                    nav.classList.remove('shadow-sm');
                }
                else {
                    nav.classList.remove('shadow-lg');
                    nav.classList.add('shadow-sm');
                }
            });
        }
    }
}
// Initialize the website when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const website = new Website();
    website.init();
});
