// About page

interface NavItem {
  label: string;
  href: string;
}

class AboutPage {
  private app: HTMLElement;

  constructor() {
    const appElement = document.getElementById("app");
    if (!appElement) {
      throw new Error("App element not found");
    }
    this.app = appElement;
  }

  init(): void {
    this.render();
    this.initEventListeners();
  }

  private render(): void {
    this.app.innerHTML = `
            ${this.renderNavigation()}
            ${this.renderPageHeader("About")}
            ${this.renderAbout()}
            ${this.renderFooter()}
        `;
  }

  private renderNavigation(): string {
    const navItems: NavItem[] = [
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
                    <div class="grid md:grid-cols-2 gap-6 md:gap-10 items-start">
                        <div class="flex items-center justify-center mb-6 md:mb-0">
                            <div class="relative max-w-sm w-full">
                                <img src="images/Headshot.jpg" alt="Bryce Pannone" class="w-full rounded-2xl shadow-xl object-cover aspect-[3/4] border-4 border-slate-100 hover:shadow-2xl transition-shadow duration-300" />
                            </div>
                        </div>
                        <div>
                            <div class="prose max-w-none">
                                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4">About Me</h2>
                                <p id="about-preview" class="text-gray-700 text-base sm:text-lg leading-relaxed">
                                    I have always been fascinated by computers and how they work. That is the main reason I chose to enroll at Frostburg State University and pursue a degree in Computer Science. I did not have much experience when I started college back in 2022, but as the years have passed, not only have I drastically improved my programming skills, but I have also improved my professional skills. As I approach graduation, I look back on all of the classes I have taken and the experiences I have had. I believe it’s a combination of these that has prepared me to graduate and start a career in technology.
                                </p>
                                <div id="about-full" class="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed hidden">
                                    <p class="mb-4">
                                        Some of my best work has come from classes at Frostburg, one of which I’m particularly proud of is the Gym Management Software I built for my database class. This project combined skills not just from databases, but also from other computer science classes, and was very well-rounded and functioned properly. If I had to do it differently, I would make sure I gave myself more time because, towards the end, I had to rush through some aspects of the project.
                                    </p>
                                    <p class="mb-4">
                                        Some other work that I’m proud of has come through my internship at Willetts Technology. Not only have I learned a lot about how companies operate, but I’ve also picked up multiple software development practices. Along with that, I have been able to apply the skills I’ve learned in school to a real-world setting and have helped make significant updates to their Electronic Health Record Software.
                                    </p>
                                    <p class="mb-4">
                                        My education at Frostburg has helped me to develop many strengths to rely on. I now think more analytically about problems and test multiple solutions before reaching a conclusion. While I have developed these strengths, I still have some weaknesses. I tend not to seek advice or help when I need it; instead, I spend more time trying to figure things out for myself, which decreases productivity. What I have been doing to improve this weakness is seeking out help from the other developers I work with.
                                    </p>
                                    <p class="mb-4">
                                        Looking ahead to next year, I hope to be working as a software developer somewhere. After that, I hope to attend graduate school and obtain a master’s degree. Once I get a job, I intend to keep learning and stay up to date on the latest technology and hopefully use it in my work when needed. I’m hopeful that in the next 10 years, I may be in a leadership position within a company, whether that be local or in a different city.
                                    </p>
                                    <p class="mb-4">
                                        Frostburg State has played a pivotal role in preparing me for my career. When I started college, I didn’t have much programming experience, and after four years, I can say that is no longer the case. Through my time at Frostburg, I have put together a solid collection of work that shows how I have grown over time and has opened doors to opportunities I did not think I would have. Overall, I would rate my college performance as strong, as I have learned numerous concepts and worked to significantly improve my skill set.
                                    </p>
                                    <p class="mb-0">
                                        As I look towards graduation, I am confident that Frostburg State has adequately prepared me for this stage of my professional career. Through coursework, projects, experiences, and my internship, I have gained the necessary skills, and I look forward to continuing to develop them as I start working in the industry.
                                    </p>
                                </div>
                                <button id="about-toggle" class="mt-4 inline-flex items-center text-sm font-semibold text-slate-900 hover:text-slate-700">
                                    Read more
                                </button>
                            </div>

                            <div class="mt-10">
                                <h2 class="text-xl sm:text-2xl font-bold text-slate-900 mb-4">Education</h2>
                                <div class="rounded-xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
                                    <h3 class="text-base sm:text-lg font-bold text-slate-900">Frostburg State University – Frostburg, MD</h3>
                                    <p class="text-slate-700 mt-1">Bachelor of Science in Computer Science</p>
                                    <p class="text-slate-600 text-sm mt-1">May 2026</p>
                                    <p class="text-slate-600 text-sm mt-1"><strong>Honors:</strong> Cum Laude</p>
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
                                        <h3 class="text-base sm:text-lg font-bold text-slate-900">Associate Software Developer</h3>
                                        <p class="text-slate-700 mt-1">Willetts Technology | May 2026 – Present</p>
                                        <ul class="mt-4 space-y-2 text-gray-700 text-sm list-disc list-inside">
                                        </ul>
                                    </div>
                                    <div class="rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
                                        <h3 class="text-base sm:text-lg font-bold text-slate-900">Intern Software Developer</h3>
                                        <p class="text-slate-700 mt-1">Willetts Technology | June 2025 – May 2026</p>
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
            <footer class="bg-slate-900 text-slate-400 text-sm py-3 px-4 sm:px-6 lg:px-8">
                <div class="max-w-6xl mx-auto text-center">
                    <p>&copy; ${currentYear} Bryce Pannone. All rights reserved.</p>
                </div>
            </footer>
        `;
  }

  private initEventListeners(): void {
    // Smooth scrolling
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", (e: Event) => {
        const target = e.target as HTMLAnchorElement;
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

    // About "Read more" toggle
    const aboutToggle = document.getElementById("about-toggle");
    const aboutFull = document.getElementById("about-full");

    if (aboutToggle && aboutFull) {
      aboutToggle.addEventListener("click", () => {
        const isHidden = aboutFull.classList.contains("hidden");
        if (isHidden) {
          aboutFull.classList.remove("hidden");
          aboutToggle.textContent = "Show less";
        } else {
          aboutFull.classList.add("hidden");
          aboutToggle.textContent = "Read more";
        }
      });
    }

    // Scroll effect on nav
    const nav = document.querySelector("nav");
    if (nav) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
          nav.classList.add("shadow-lg");
          nav.classList.remove("shadow-sm");
        } else {
          nav.classList.remove("shadow-lg");
          nav.classList.add("shadow-sm");
        }
      });
    }
  }
}

// Initialize the about page when DOM is ready
document.addEventListener("DOMContentLoaded", (): void => {
  const aboutPage = new AboutPage();
  aboutPage.init();
});
