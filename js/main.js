"use strict";
// Main TypeScript file for https://bpannone.com
class Website {
    constructor() {
        const appElement = document.getElementById('app');
        if (!appElement) {
            throw new Error('App element not found');
        }
        this.app = appElement;
    }
    init() {
        this.checkDevelopmentEnvironment();
        this.render();
        this.initEventListeners();
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
        this.app.innerHTML = `
            ${this.renderNavigation()}
            ${this.renderHero()}
            ${this.renderAbout()}
            ${this.renderSkills()}
            ${this.renderProjects()}
            ${this.renderContact()}
            ${this.renderFooter()}
        `;
    }
    renderNavigation() {
        const navItems = [
            { label: 'About', href: '#about' },
            { label: 'Skills', href: '#skills' },
            { label: 'Projects', href: '#projects' },
            { label: 'Contact', href: '#contact' }
        ];
        const navLinks = navItems.map(item => `<a href="${item.href}" class="nav-link text-gray-700 hover:text-slate-800 transition-colors">${item.label}</a>`).join('');
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
                        ${navItems.map(item => `<a href="${item.href}" class="block text-gray-700 hover:text-slate-800 transition-colors">${item.label}</a>`).join('')}
                    </div>
                </div>
            </nav>
        `;
    }
    renderHero() {
        return `
            <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                <div class="max-w-4xl mx-auto text-center">
                    <h1 class="text-5xl md:text-6xl font-bold text-white mb-6">
                        Hi, I'm <span class="text-slate-300">Bryce Pannone</span>
                    </h1>
                    <p class="text-xl md:text-2xl text-slate-300 mb-8">
                        Software Developer & Problem Solver
                    </p>
                    <p class="text-lg text-slate-400 mb-10 max-w-2xl mx-auto">
                        Building innovative solutions and creating exceptional digital experiences
                    </p>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#contact" class="px-8 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl">
                            Get In Touch
                        </a>
                        <a href="#projects" class="px-8 py-3 bg-slate-700 text-white rounded-lg font-semibold hover:bg-slate-600 transition-all border-2 border-slate-600">
                            View My Work
                        </a>
                    </div>
                </div>
            </section>
        `;
    }
    renderAbout() {
        return `
            <section id="about" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-4xl mx-auto">
                    <h2 class="text-4xl font-bold text-center mb-4 text-slate-900">About Me</h2>
                    <div class="w-24 h-1 bg-slate-800 mx-auto mb-12"></div>
                    <div class="text-center">
                        <p class="text-gray-700 text-lg leading-relaxed mb-6">
                            Welcome to my personal website! I'm a passionate software developer dedicated to creating 
                            clean, efficient, and user-friendly applications. I enjoy tackling complex problems and 
                            turning them into elegant solutions.
                        </p>
                        <p class="text-gray-700 text-lg leading-relaxed">
                            When I'm not coding, you can find me exploring new technologies, contributing to open-source 
                            projects, or continuously learning to stay at the forefront of software development.
                        </p>
                    </div>
                </div>
            </section>
        `;
    }
    renderSkills() {
        const skills = [
            { name: 'TypeScript', icon: '💻' },
            { name: 'Tailwind CSS', icon: '🎨' },
            { name: 'React', icon: '⚛️' },
            { name: 'Docker', icon: '🐳' },
            { name: 'Cloud', icon: '☁️' },
            { name: 'DevOps', icon: '🔧' },
            { name: 'CI/CD', icon: '📦' },
            { name: 'Full Stack', icon: '🚀' }
        ];
        const skillCards = skills.map(skill => `
            <div class="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center border border-slate-200">
                <div class="text-4xl mb-3">${skill.icon}</div>
                <h3 class="font-semibold text-slate-900">${skill.name}</h3>
            </div>
        `).join('');
        return `
            <section id="skills" class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-4xl font-bold text-center mb-4 text-slate-900">Skills & Technologies</h2>
                    <div class="w-24 h-1 bg-slate-800 mx-auto mb-12"></div>
                    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        ${skillCards}
                    </div>
                </div>
            </section>
        `;
    }
    renderProjects() {
        const projects = [
            {
                title: 'Personal Website',
                description: 'A modern, responsive personal website built with TypeScript and Tailwind CSS, showcasing clean design and best practices.',
                icon: '🌐',
                tags: ['TypeScript', 'Tailwind CSS'],
                link: 'https://github.com/bpannone/bpannone.github.io'
            },
            {
                title: 'Coming Soon',
                description: 'More exciting projects are on the way. Stay tuned for updates!',
                icon: '🚀',
                tags: ['In Progress']
            },
            {
                title: 'More Projects',
                description: 'Check back soon for additional projects and case studies.',
                icon: '💡',
                tags: ['Coming Soon']
            }
        ];
        const projectCards = projects.map(project => {
            const tags = project.tags.map(tag => `<span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${tag}</span>`).join('');
            const link = project.link
                ? `<a href="${project.link}" class="text-slate-800 hover:text-slate-600 font-semibold">View Project →</a>`
                : '';
            return `
                <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-slate-200">
                    <div class="text-3xl mb-4">${project.icon}</div>
                    <h3 class="text-xl font-bold mb-3 text-slate-900">${project.title}</h3>
                    <p class="text-gray-600 mb-4">${project.description}</p>
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
                label: 'Email Me',
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
                    <p class="mt-2 text-sm">Built with TypeScript & Tailwind CSS</p>
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
//# sourceMappingURL=main.js.map