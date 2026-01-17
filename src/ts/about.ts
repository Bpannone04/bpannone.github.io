// About page TypeScript file for https://bpannone.com

interface NavItem {
    label: string;
    href: string;
}

class AboutPage {
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
        this.app.innerHTML = `
            ${this.renderNavigation()}
            ${this.renderPageHeader('About')}
            ${this.renderAbout()}
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

        const activeHref = 'about.html';

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

    private renderPageHeader(title: string): string {
        return `
            <header class="pt-28 pb-10 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto">
                    <h1 class="text-4xl md:text-5xl font-bold text-slate-900">${title}</h1>
                    <div class="w-24 h-1 bg-slate-800 mt-4"></div>
                </div>
            </header>
        `;
    }

    private renderAbout(): string {
        return `
            <section id="about" class="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div class="max-w-6xl mx-auto">
                    <div class="grid md:grid-cols-2 gap-10 items-start">
                        <div class="flex items-center justify-center">
                            <div class="relative max-w-sm w-full">
                                <img src="images/Headshot.png" alt="Bryce Pannone" class="w-full rounded-2xl shadow-xl object-cover aspect-[3/4] border-4 border-slate-100 hover:shadow-2xl transition-shadow duration-300" />
                            </div>
                        </div>
                        <div>
                            <div class="prose max-w-none">
                                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Professional Summary</h2>
                                <p class="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    Computer Science student at Frostburg State University, graduating in the spring with strong experience in full-stack development. Proficient in Java, Python, C, C++, and JavaScript, with a great interest in data structures, networking, and machine learning. Experienced in turning system requirements into user-focused solutions through an internship at Willetts Technology. Seeking to apply my programming and problem-solving skills across various domains of computing and technology.
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
    }
}

// Initialize the about page when DOM is ready
document.addEventListener('DOMContentLoaded', (): void => {
    const aboutPage = new AboutPage();
    aboutPage.init();
});

