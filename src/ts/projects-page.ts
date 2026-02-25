// Projects page

import { GalleryModal } from "./gallery-modal.js";
import { projects } from "./projects.js";

interface NavItem {
  label: string;
  href: string;
}

class ProjectsPage {
  private app: HTMLElement;
  private galleryModal = new GalleryModal();

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
            <div class="flex flex-col min-h-screen">
                ${this.renderNavigation()}
                <div class="flex-1 flex flex-col">
                    ${this.renderPageHeader("Projects")}
                    ${this.renderProjectsSection()}
                </div>
                ${this.renderFooter()}
                ${this.renderProjectDetailModal()}
            </div>
        `;
  }

  private renderProjectDetailModal(): string {
    return `
            <div id="project-detail-modal" class="project-detail-modal hidden fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 opacity-0 transition-opacity duration-300" aria-hidden="true">
                <div class="project-detail-content relative flex flex-col bg-white rounded-xl shadow-2xl border border-slate-200 max-w-3xl w-full max-h-[85vh] sm:max-h-[90vh] overflow-hidden transform scale-95 transition-transform duration-300">
                    <button type="button" class="project-detail-close absolute top-4 right-4 z-10 text-slate-500 hover:text-slate-900 p-1 rounded-full hover:bg-slate-100 transition-colors">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    <div id="project-detail-body" class="flex-1 min-h-0 overflow-y-auto p-6 pt-12">
                        <!-- Filled by JS when opening -->
                    </div>
                </div>
            </div>
        `;
  }

  private renderNavigation(): string {
    const navItems: NavItem[] = [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Projects", href: "/projects" },
      { label: "Contact", href: "/#contact" },
    ];

    const activeHref = "/projects";

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

  private renderProjectsSection(): string {
    const projectCards = projects
      .map((project, index) => {
        const tags = project.tags
          .map(
            (tag) =>
              `<span class="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm">${tag}</span>`,
          )
          .join("");

        const link = project.link
          ? `<a href="${project.link}" class="text-slate-800 hover:text-slate-600 font-semibold" data-no-card-open>View Project</a>`
          : "";

        const galleryButton = project.gallery
          ? `<button type="button" data-gallery-id="gallery-${index}" data-no-card-open class="mt-3 px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all text-sm">
                    View Gallery
                    <span class="inline-block ml-2">→</span>
                </button>`
          : "";

        return `
                <div class="project-card rounded-xl border border-slate-200 bg-white p-4 sm:p-6 min-w-0 cursor-pointer hover:shadow-md transition-shadow" data-project-index="${index}" role="button" tabindex="0">
                    <div class="flex items-start justify-between gap-4">
                        <h3 class="text-base sm:text-lg font-bold text-slate-900">${project.title}</h3>
                        ${project.link ? `<a href="${project.link}" class="text-sm font-semibold text-slate-800 hover:text-slate-600" data-no-card-open>GitHub</a>` : ""}
                    </div>
                    <p class="text-gray-700 text-sm mt-2 mb-3">${project.description}</p>
                    <div class="flex flex-wrap gap-2 mb-3">${tags}</div>
                    <div class="flex flex-wrap gap-3">
                        ${link}
                        ${galleryButton}
                    </div>
                    ${project.gallery ? GalleryModal.render(`gallery-${index}`, project.title, project.gallery) : ""}
                </div>
            `;
      })
      .join("");

    return `
            <section id="projects" class="py-16 px-4 sm:px-6 lg:px-8 bg-white flex-1">
                <div class="max-w-6xl mx-auto w-full">
                    <p class="text-slate-600 text-sm sm:text-base mb-6">Click any card for more information.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))] gap-6 md:gap-10 items-start">
                        ${projectCards}
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

    this.initProjectDetailListeners();
    this.initGalleryListeners();
  }

  private closeProjectDetailModal(): void {
    const modal = document.getElementById("project-detail-modal");
    if (!modal) return;
    modal.classList.remove("opacity-100");
    modal.classList.add("opacity-0");
    const content = modal.querySelector(".project-detail-content");
    if (content) {
      content.classList.remove("scale-100");
      content.classList.add("scale-95");
    }
    setTimeout(() => {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }, 300);
  }

  private openProjectDetailModal(index: number): void {
    const project = projects[index];
    if (!project) return;

    this.galleryModal.close();

    const body = document.getElementById("project-detail-body");
    if (!body) return;

    const linkHtml = project.link
      ? `<a href="${project.link}" target="_blank" rel="noopener" class="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-colors text-sm mt-4">View on GitHub →</a>`
      : "";

    const modalContent = project.detail ?? project.description;
    body.innerHTML = `
      <h2 class="text-2xl font-bold text-slate-900 mb-3">${project.title}</h2>
      <p class="text-gray-700 text-base leading-relaxed whitespace-pre-line">${modalContent}</p>
      ${linkHtml}
    `;

    const modal = document.getElementById("project-detail-modal");
    if (!modal) return;
    modal.classList.remove("hidden");
    modal.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      modal.classList.remove("opacity-0");
      modal.classList.add("opacity-100");
      const content = modal.querySelector(".project-detail-content");
      if (content) {
        content.classList.remove("scale-95");
        content.classList.add("scale-100");
      }
    }, 10);
    document.body.style.overflow = "hidden";
  }

  private initProjectDetailListeners(): void {
    document.querySelectorAll(".project-card").forEach((card) => {
      const openDetail = (e: Event) => {
        if ((e.target as HTMLElement).closest("[data-no-card-open]")) return;
        const idx = (e.currentTarget as HTMLElement).getAttribute("data-project-index");
        if (idx !== null) this.openProjectDetailModal(parseInt(idx, 10));
      };
      card.addEventListener("click", openDetail);
      card.addEventListener("keydown", (e: Event) => {
        const ev = e as KeyboardEvent;
        if (ev.key === "Enter" || ev.key === " ") {
          ev.preventDefault();
          openDetail(e);
        }
      });
    });

    const modal = document.getElementById("project-detail-modal");
    if (modal) {
      modal.querySelector(".project-detail-close")?.addEventListener("click", () => this.closeProjectDetailModal());
      modal.addEventListener("click", (e: MouseEvent) => {
        if (e.target === modal) this.closeProjectDetailModal();
      });
    }

    window.addEventListener("keydown", (e: Event) => {
      const ev = e as KeyboardEvent;
      const mod = document.getElementById("project-detail-modal");
      if (ev.key === "Escape" && mod && !mod.classList.contains("hidden")) {
        this.closeProjectDetailModal();
      }
    });
  }

  private initGalleryListeners(): void {
    document.querySelectorAll("[data-gallery-id]").forEach((button) => {
      let touchHandled = false;
      const openGallery = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeProjectDetailModal();
        const target = e.currentTarget as HTMLElement;
        const galleryId = target.getAttribute("data-gallery-id");
        if (galleryId && !touchHandled) {
          touchHandled = true;
          this.galleryModal.open(galleryId);
          setTimeout(() => {
            touchHandled = false;
          }, 300);
        }
      };
      button.addEventListener("touchstart", (e) => {
        e.preventDefault();
        this.closeProjectDetailModal();
        const target = e.currentTarget as HTMLElement;
        const galleryId = target.getAttribute("data-gallery-id");
        if (galleryId && !touchHandled) {
          touchHandled = true;
          this.galleryModal.open(galleryId);
          setTimeout(() => {
            touchHandled = false;
          }, 300);
        }
      }, { passive: false });
      button.addEventListener("click", openGallery);
    });
  }
}

document.addEventListener("DOMContentLoaded", (): void => {
  const projectsPage = new ProjectsPage();
  projectsPage.init();
});
