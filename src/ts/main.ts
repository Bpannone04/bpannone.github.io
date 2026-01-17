// Main TypeScript file for https://bpannone.com

import { GalleryModal } from './gallery-modal.js';

interface NavItem {
    label: string;
    href: string;
}

interface Skill {
    name: string;
}

interface Project {
    title: string;
    description: string;
    tags: string[];
    link?: string;
    gallery?: string[];
}

interface ContactLink {
    label: string;
    href: string;
    icon: string;
}

class Website {
    private app: HTMLElement;
    
    constructor() {
        const appElement = document.getElementById('app');
        if (!appElement) {
            throw new Error('App element not found');
        }
        this.app = appElement;
    }

    init(): void {
        this.checkDevelopmentEnvironment();
        this.render();
        this.initEventListeners();
    }

    private checkDevelopmentEnvironment(): void {
        const hostname: string = window.location.hostname;
        const port: string = window.location.port;
        const isDevelopment: boolean = (hostname === 'localhost' || hostname === '127.0.0.1') && 
                                       port === '8080';
        
        if (isDevelopment) {
            this.showDevelopmentBanner();
        }
    }

    private showDevelopmentBanner(): void {
        const banner = document.createElement('div');
        banner.className = 'fixed bottom-0 left-0 right-0 bg-orange-500 text-white text-center py-2 font-bold text-sm z-[10000] shadow-md';
        banner.textContent = 'DEVELOPMENT ENVIRONMENT NOT PRODUCTION';
        document.body.appendChild(banner);
    }

    private render(): void {
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

    private renderNavigation(): string {
        const navItems: NavItem[] = [
            { label: 'Home', href: 'index.html' },
            { label: 'About', href: 'about.html' },
            { label: 'Projects', href: 'index.html#projects' },
            { label: 'Contact', href: 'index.html#contact' }
        ];

        const activeHref = 'index.html';

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


    private renderHero(): string {
        return `
            <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                <div class="max-w-5xl mx-auto">
                    <div class="text-center">
                        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-slate-200 border border-white/10">
                            <span class="w-2 h-2 rounded-full bg-slate-200"></span>
                            <span class="text-sm font-semibold tracking-wide">Software Developer</span>
                        </div>

                        <h1 class="mt-6 text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                            Bryce <span class="text-slate-300">Pannone</span>
                        </h1>

                        <p class="mt-6 text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto px-4">
                            Experienced in turning system requirements into user-focused solutions. Seeking to apply my programming and problem-solving skills across various domains of computing and technology.
                        </p>

                    <div class="mt-10 flex flex-col sm:flex-row gap-4 justify-center px-4">
                        <a href="#projects" class="px-6 sm:px-8 py-3 bg-white text-slate-950 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl text-sm sm:text-base">
                            View Projects
                        </a>
                        <a href="#contact" class="px-6 sm:px-8 py-3 bg-slate-800 text-white rounded-lg font-semibold hover:bg-slate-700 transition-all border border-slate-700 text-sm sm:text-base">
                            Contact
                        </a>
                    </div>

                        <div class="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
                            ${this.renderHeroStat('Education', 'Frostburg State University')}
                            ${this.renderHeroStat('Focus', 'Full-stack development')}
                            ${this.renderHeroStat('Location', 'Cumberland, MD')}
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    private renderHeroStat(label: string, value: string): string {
        return `
            <div class="rounded-xl bg-white/5 border border-white/10 p-5 text-left">
                <div class="text-sm text-slate-400">${label}</div>
                <div class="mt-2 text-slate-100 font-semibold">${value}</div>
            </div>
        `;
    }

    private renderAboutTeaser(): string {
        return `
            <section class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto flex justify-center">
                    <div class="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
                        <div class="text-center">
                            <h2 class="text-2xl md:text-3xl font-bold text-slate-900">About</h2>
                            <p class="mt-3 text-gray-600 max-w-md mx-auto">
                                Learn more about my background, education, and professional experience in software development.
                            </p>
                            <a href="about.html" class="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors mt-4">
                                Read About
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    private renderSkills(): string {
        const skills: Skill[] = [
            { name: 'Java' },
            { name: 'Python' },
            { name: 'C' },
            { name: 'C++' },
            { name: 'PHP' },
            { name: 'CakePHP' },
            { name: 'JavaScript' },
            { name: 'Node.js' },
            { name: 'React' },
            { name: 'Tailwind CSS' },
            { name: 'TypeScript' },
            { name: 'HTML' },
            { name: 'CSS' },
            { name: 'SQL' },
            { name: 'WebSockets' },
            { name: 'Git' }
        ];

        const skillCards = skills.map(skill => `
            <div class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-slate-200">
                <div class="flex items-center gap-4">
                    <div class="h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                        ${this.getSkillIcon(skill.name)}
                    </div>
                    <h3 class="font-semibold text-slate-900">${skill.name}</h3>
                </div>
            </div>
        `).join('');

        return `
            <section id="skills" class="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-900">Skills</h2>
                    <div class="w-24 h-1 bg-slate-800 mx-auto mb-12"></div>
                    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-6">
                        ${skillCards}
                    </div>
                </div>
            </section>
        `;
    }

    private getInitials(name: string): string {
        const parts = name
            .replace(/\./g, '')
            .split(' ')
            .filter(Boolean);
        const initials = parts.map(p => p[0]).join('').slice(0, 2).toUpperCase();
        return initials || name.slice(0, 2).toUpperCase();
    }

    private getSkillIcon(skillName: string): string {
        const logoMap: Record<string, string> = {
            'Java': 'https://api.iconify.design/logos/java.svg',
            'Python': 'https://api.iconify.design/logos/python.svg',
            'C': 'https://api.iconify.design/logos/c.svg',
            'C++': 'https://api.iconify.design/logos/c-plusplus.svg',
            'PHP': 'https://api.iconify.design/logos/php.svg',
            'CakePHP': 'https://api.iconify.design/logos/cakephp.svg',
            'JavaScript': 'https://api.iconify.design/logos/javascript.svg',
            'Node.js': 'https://api.iconify.design/logos/nodejs-icon.svg',
            'React': 'https://api.iconify.design/logos/react.svg',
            'Tailwind CSS': 'https://api.iconify.design/logos/tailwindcss-icon.svg',
            'TypeScript': 'https://api.iconify.design/logos/typescript-icon.svg',
            'HTML': 'https://api.iconify.design/logos/html-5.svg',
            'CSS': 'https://api.iconify.design/logos/css-3.svg',
            'SQL': 'https://api.iconify.design/vscode-icons/file-type-sql.svg',
            'WebSockets': 'https://api.iconify.design/logos/websocket.svg',
            'Git': 'https://api.iconify.design/logos/git-icon.svg'
        };
        const logoUrl = logoMap[skillName];
        if (logoUrl) {
            return `<img src="${logoUrl}" alt="${skillName}" class="h-10 w-10 object-contain" />`;
        }
        return `<div class="h-10 w-10 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold tracking-wide">${this.getInitials(skillName)}</div>`;
    }

    private renderProjects(): string {
        const projects: Project[] = [
            {
                title: 'Gym Management Software',
                description: 'Designed and built an application for managing Gyms. Utilized JavaScript and Node.js, along with MySQL for the database. Designed the database to follow business rules and properly configured all tables and keys.',
                tags: ['JavaScript', 'Node.js', 'MySQL'],
                gallery: [
                    'images/GymManagement/home-screen.png',
                    'images/GymManagement/user-dashboard.png',
                    'images/GymManagement/user-notifications.png',
                    'images/GymManagement/manager-dashboard.png',
                    'images/GymManagement/manager-user-information-dashboard.png',
                    'images/GymManagement/manager-classes-dashboard.png',
                    'images/GymManagement/manager-rooms-dashboard.png',
                    'images/GymManagement/manager-notifications-dashboard.png',
                ]
            },
            {
                title: 'Real-Time Chat Webpage',
                description: 'Designed and built a real-time chat website that utilized JavaScript for the front end and Python for the back end. Utilized WebSockets for real-time messaging and designed a system to log chats so users could retrieve previous chat data.',
                tags: ['JavaScript', 'Python', 'WebSockets'],
            },
            {
                title: 'Personal Portfolio Website',
                description: 'This personal website uses TypeScript and Tailwind CSS to create a modern, responsive design. It highlights clean layouts, follows best practices, and includes dynamic content, image galleries, and a layout that works well on any device.',
                tags: ['TypeScript', 'Tailwind CSS'],
            }
        ];

        const projectCards = projects.map((project, index) => {
            const tags = project.tags.map(tag => 
                `<span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${tag}</span>`
            ).join('');

            const link = project.link 
                ? `<a href="${project.link}" class="text-slate-800 hover:text-slate-600 font-semibold">View Project</a>`
                : '';

            const galleryButton = project.gallery
                ? `<button data-gallery-id="gallery-${index}" class="mt-3 px-5 sm:px-6 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 duration-200 text-sm sm:text-base">
                    View Gallery
                    <span class="inline-block ml-2">→</span>
                </button>`
                : '';

            return `
                <div class="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-xl transition-all border border-slate-200">
                    <div class="flex items-start justify-between gap-4">
                        <h3 class="text-lg sm:text-xl font-bold text-slate-900">${project.title}</h3>
                        ${project.link ? `<a href="${project.link}" class="text-sm font-semibold text-slate-800 hover:text-slate-600">GitHub</a>` : ''}
                    </div>
                    <p class="text-sm sm:text-base text-gray-600 mb-4 mt-3">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-4">${tags}</div>
                    <div class="flex flex-wrap gap-3">
                        ${link}
                        ${galleryButton}
                    </div>
                    ${project.gallery ? GalleryModal.render(`gallery-${index}`, project.title, project.gallery) : ''}
                </div>
            `;
        }).join('');

        return `
            <section id="projects" class="py-20 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto">
                    <h2 class="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-900">Projects</h2>
                    <div class="w-24 h-1 bg-slate-800 mx-auto mb-12"></div>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        ${projectCards}
                    </div>
                </div>
            </section>
        `;
    }

    private renderContact(): string {
        const contacts: ContactLink[] = [
            {
                label: 'Email',
                href: 'mailto:bryce5252@outlook.com',
                icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>`
            },
            {
                label: 'GitHub',
                href: 'https://github.com/Bpannone04',
                icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>`
            },
            {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/bpannone04',
                icon: `<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>`
            },
            {
                label: 'Download Resume',
                href: 'files/Bryce Pannone- Resume 2025.pdf',
                icon: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>`
            }
        ];

        const contactButtons = contacts.map(contact => {
            const isDownload = contact.label === 'Download Resume';
            return `
            <a href="${contact.href}" ${isDownload ? 'download' : ''} class="px-6 sm:px-8 py-3 sm:py-4 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base">
                ${contact.icon}
                ${contact.label}
            </a>
        `;
        }).join('');

        return `
            <section id="contact" class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
                <div class="max-w-4xl mx-auto text-center">
                    <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">Get In Touch</h2>
                    <div class="w-24 h-1 bg-slate-300 mx-auto mb-12"></div>
                    <p class="text-lg sm:text-xl text-slate-300 mb-10 px-4">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-6 justify-center">
                        ${contactButtons}
                    </div>
                </div>
            </section>
        `;
    }


    private renderFooter(): string {
        const currentYear = new Date().getFullYear();
        return `
            <footer class="bg-slate-900 text-slate-400 py-8 px-4 sm:px-6 lg:px-8">
                <div class="max-w-6xl mx-auto text-center">
                    <p>&copy; ${currentYear} Bryce Pannone. All rights reserved.</p>
                </div>
            </footer>
        `;
    }

    private initEventListeners(): void {
        // Smooth scrolling
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e: Event) => {
                const target = e.target as HTMLAnchorElement;
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
                } else {
                    nav.classList.remove('shadow-lg');
                    nav.classList.add('shadow-sm');
                }
            });
        }

        // Gallery modals
        this.initGalleryListeners();
    }

    private initGalleryListeners(): void {
        const gallery = new GalleryModal();
        
        // Open gallery buttons
        document.querySelectorAll('[data-gallery-id]').forEach(button => {
            button.addEventListener('click', (e: Event) => {
                const target = e.currentTarget as HTMLElement;
                const galleryId = target.getAttribute('data-gallery-id');
                if (galleryId) {
                    gallery.open(galleryId);
                }
            });
        });
    }
}

// Initialize the website when DOM is ready
document.addEventListener('DOMContentLoaded', (): void => {
    const website = new Website();
    website.init();
});
