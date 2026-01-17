// Gallery Modal class for displaying project image galleries

export class GalleryModal {
    private currentSlide: number = 0;
    private galleryId: string = '';
    private keyHandler?: (e: KeyboardEvent) => void;

    static render(id: string, title: string, images: string[]): string {
        const imageItems = images.map((img, idx) => {
            // Replace spaces with %20 for proper URL encoding
            const encodedPath = img.replace(/\s/g, '%20');
                return `
                <div class="gallery-slide ${idx === 0 ? 'active' : ''} flex items-center justify-center w-full h-full" data-slide="${idx}" style="${idx === 0 ? 'display: flex;' : 'display: none;'}">
                    <img src="${encodedPath}" alt="${title} - Image ${idx + 1}" class="max-w-full max-h-[85vh] sm:max-h-[80vh] w-auto h-auto object-contain rounded-lg shadow-2xl" onerror="console.error('Failed to load image: ${encodedPath}'); this.style.border='2px solid red'; this.alt='Image failed to load: ${encodedPath}'">
                </div>
            `;
        }).join('');

        return `
            <div id="${id}" class="gallery-modal hidden fixed inset-0 z-[9999] bg-white/70 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 opacity-0 transition-opacity duration-300">
                <div class="gallery-content relative max-w-7xl w-full max-h-[95vh] sm:max-h-[90vh] transform scale-95 transition-transform duration-300">
                    <!-- Close Button -->
                    <button class="gallery-close absolute -top-10 sm:-top-12 right-2 sm:right-0 text-slate-700 hover:text-slate-900 transition-colors z-10 p-2 rounded-full hover:bg-slate-100">
                        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                    
                    <!-- Gallery Container -->
                    <div class="relative bg-white rounded-xl overflow-hidden shadow-2xl border border-slate-200">
                        <!-- Header -->
                        <div class="bg-slate-50 border-b border-slate-200 text-slate-900 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
                            <h3 class="text-lg sm:text-xl font-bold truncate">${title} - Gallery</h3>
                            <span class="gallery-counter text-xs sm:text-sm text-slate-600 shrink-0">1 / ${images.length}</span>
                        </div>
                        
                        <!-- Image Container -->
                        <div class="gallery-viewport relative bg-slate-50 min-h-[300px] sm:min-h-[400px] md:min-h-[500px] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden">
                            <div class="gallery-slides relative w-full h-full flex items-center justify-center">
                                ${imageItems}
                            </div>
                        </div>
                        
                        <!-- Navigation Buttons -->
                        <button class="gallery-prev absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-50 text-slate-700 p-2 sm:p-3 rounded-full shadow-lg border border-slate-200 transition-all hover:scale-110 z-10">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <button class="gallery-next absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-slate-50 text-slate-700 p-2 sm:p-3 rounded-full shadow-lg border border-slate-200 transition-all hover:scale-110 z-10">
                            <svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                        
                        <!-- Dots Navigation -->
                        <div class="gallery-dots bg-slate-50 border-t border-slate-200 px-4 sm:px-6 py-3 sm:py-4 flex gap-2 justify-center flex-wrap">
                            ${images.map((_, idx) => `
                                <button class="gallery-dot w-2 h-2 rounded-full ${idx === 0 ? 'bg-slate-700' : 'bg-slate-300'} transition-all hover:bg-slate-500" data-dot="${idx}"></button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    open(galleryId: string): void {
        const modal = document.getElementById(galleryId) as HTMLElement;
        if (!modal) return;

        this.galleryId = galleryId;
        this.currentSlide = 0;

        // Show modal with animation
        modal.classList.remove('hidden');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            const content = modal.querySelector('.gallery-content') as HTMLElement;
            if (content) {
                content.classList.remove('scale-95');
                content.classList.add('scale-100');
            }
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Close button
        const closeBtn = modal.querySelector('.gallery-close') as HTMLElement;
        if (closeBtn) {
            closeBtn.onclick = () => this.close();
        }

        // Close on backdrop click
        modal.onclick = (e: MouseEvent) => {
            if (e.target === modal) {
                this.close();
            }
        };

        // Initialize navigation
        this.initNavigation();
    }

    close(): void {
        const modal = document.getElementById(this.galleryId) as HTMLElement;
        if (!modal) return;

        // Animate out
        modal.classList.add('opacity-0');
        const content = modal.querySelector('.gallery-content') as HTMLElement;
        if (content) {
            content.classList.remove('scale-100');
            content.classList.add('scale-95');
        }

        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            this.cleanup();
        }, 300);
    }

    private initNavigation(): void {
        const modal = document.getElementById(this.galleryId) as HTMLElement;
        if (!modal) return;

        const slides = Array.from(modal.querySelectorAll('.gallery-slide')) as HTMLElement[];
        const dots = Array.from(modal.querySelectorAll('.gallery-dot')) as HTMLElement[];
        const prevBtn = modal.querySelector('.gallery-prev') as HTMLElement;
        const nextBtn = modal.querySelector('.gallery-next') as HTMLElement;
        const counter = modal.querySelector('.gallery-counter') as HTMLElement;

        this.currentSlide = 0;

        const showSlide = (index: number): void => {
            // Wrap around
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;

            this.currentSlide = index;

            // Update slides
            slides.forEach((slide, idx) => {
                if (idx === this.currentSlide) {
                    slide.classList.add('active');
                    slide.style.display = 'block';
                } else {
                    slide.classList.remove('active');
                    slide.style.display = 'none';
                }
            });

            // Update dots
            dots.forEach((dot, idx) => {
                if (idx === this.currentSlide) {
                    dot.classList.remove('bg-slate-300');
                    dot.classList.add('bg-slate-700');
                } else {
                    dot.classList.remove('bg-slate-700');
                    dot.classList.add('bg-slate-300');
                }
            });

            // Update counter
            if (counter) {
                counter.textContent = `${this.currentSlide + 1} / ${slides.length}`;
            }
        };

        // Navigation buttons
        if (prevBtn) {
            prevBtn.onclick = () => showSlide(this.currentSlide - 1);
        }
        if (nextBtn) {
            nextBtn.onclick = () => showSlide(this.currentSlide + 1);
        }

        // Dots
        dots.forEach((dot, idx) => {
            dot.onclick = () => showSlide(idx);
        });

        // Keyboard navigation
        this.keyHandler = (e: KeyboardEvent): void => {
            if (modal.classList.contains('hidden')) return;
            if (e.key === 'ArrowLeft') showSlide(this.currentSlide - 1);
            if (e.key === 'ArrowRight') showSlide(this.currentSlide + 1);
            if (e.key === 'Escape') this.close();
        };

        window.addEventListener('keydown', this.keyHandler);

        // Initialize
        showSlide(0);
    }

    private cleanup(): void {
        if (this.keyHandler) {
            window.removeEventListener('keydown', this.keyHandler);
            this.keyHandler = undefined;
        }
    }
}

