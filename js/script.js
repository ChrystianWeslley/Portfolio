class NavbarResponsive {
    constructor(menuIconSelector, ulSelector, modalHandler) {
        this.menuIcon = document.querySelector(menuIconSelector);
        this.ul = document.querySelector(ulSelector);
        this.modalHandler = modalHandler;

        this.menuIcon.addEventListener('click', () => {
            this.toggleMenu();
        });

        document.querySelectorAll(`${ulSelector} a[href^="#"]`).forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                this.closeMenu();
                this.scrollToSection(event);
            });
        });
    }

    toggleMenu() {
        if (this.ul.classList.contains('ativo')) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    openMenu() {
        this.ul.classList.add('ativo');
        this.menuIcon.querySelector('img').src = 'img/close.svg';
        // Verifica se o modal está aberto e fecha se necessário
        this.modalHandler.closeModalIfOpen();
    }

    closeMenu() {
        this.ul.classList.remove('ativo');
        this.menuIcon.querySelector('img').src = 'img/menu.svg';
    }

    scrollToSection(event) {
        const targetId = event.target.getAttribute("href").substring(1);
        const distanceFromTheTop = document.getElementById(targetId).offsetTop - 90;
        SmoothScroll.scrollTo(0, distanceFromTheTop);
    }
}

class ModalHandler {
    constructor(verMaisSelector, fecharModalSelector) {
        document.addEventListener("DOMContentLoaded", () => {
            const verMaisButtons = document.querySelectorAll(verMaisSelector);
            const fecharModalButtons = document.querySelectorAll(fecharModalSelector);

            verMaisButtons.forEach(button => {
                button.addEventListener("click", () => {
                    this.openModal(button);
                });
            });

            fecharModalButtons.forEach(button => {
                button.addEventListener("click", () => {
                    this.closeModal(button);
                });
            });
        });
    }

    openModal(button) {
        const modal = button.closest(".card-item").querySelector(".modal");
        modal.classList.add("active");
    }

    closeModal(button) {
        const modal = button.closest(".modal");
        modal.classList.remove("active");
    }

    closeModalIfOpen() {
        const modal = document.querySelector('.modal.active');
        if (modal) {
            modal.classList.remove('active');
        }
    }
}

class ResponsiveNavbarModalManager {
    constructor(navbar, modalHandler) {
        this.navbar = navbar;
        this.modalHandler = modalHandler;

        // Adiciona um observador para fechar o modal quando a navbar responsiva for aberta
        this.navbar.menuIcon.addEventListener('click', () => {
            if (this.navbar.ul.classList.contains('ativo')) {
                this.modalHandler.closeModalIfOpen();
            }
        });
    }
}

// Classe para Scroll Suave
class SmoothScroll {
    static scrollTo(endX, endY, duration = 1000) {
        const startX = window.scrollX || window.pageXOffset;
        const startY = window.scrollY || window.pageYOffset;
        const distanceX = endX - startX;
        const distanceY = endY - startY;
        const startTime = new Date().getTime();

        const easeInOutQuart = (time, from, distance, duration) => {
            if ((time /= duration / 2) < 1) return (distance / 2) * time * time * time * time + from;
            return (-distance / 1.95) * ((time -= 2) * time * time * time - 2) + from;
        };

        const timer = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeElapsed = currentTime - startTime;
            if (timeElapsed >= duration) {
                clearInterval(timer);
            }
            const newX = easeInOutQuart(timeElapsed, startX, distanceX, duration);
            const newY = easeInOutQuart(timeElapsed, startY, distanceY, duration);
            window.scroll(newX, newY);
        }, 1000 / 60);
    }
}

// Classe para gerenciar modais
class ModalManager {
    constructor(verMaisSelector, fecharModalSelector) {
        this.verMaisSelector = verMaisSelector;
        this.fecharModalSelector = fecharModalSelector;
        this.init();
    }

    init() {
        document.addEventListener("DOMContentLoaded", () => {
            this.setupEventListeners();
        });
    }

    setupEventListeners() {
        this.addOpenModalEventListeners();
        this.addCloseModalEventListeners();
    }

    addOpenModalEventListeners() {
        const verMaisButtons = document.querySelectorAll(this.verMaisSelector);
        verMaisButtons.forEach(button => {
            button.addEventListener("click", () => this.openModal(button));
        });
    }

    addCloseModalEventListeners() {
        const fecharModalButtons = document.querySelectorAll(this.fecharModalSelector);
        fecharModalButtons.forEach(button => {
            button.addEventListener("click", () => this.closeModal(button));
        });
    }

    openModal(button) {
        const modal = button.closest(".card-item").querySelector(".modal");
        if (modal) {
            modal.classList.add("active");
        }
    }

    closeModal(button) {
        const modal = button.closest(".modal");
        if (modal) {
            modal.classList.remove("active");
        }
    }
}

const modalHandler = new ModalHandler(".ver-mais", ".fechar-modal");
const navbar = new NavbarResponsive('.menu-icon', '.ul', modalHandler);
const responsiveNavbarModalManager = new ResponsiveNavbarModalManager(navbar, modalHandler);
const modalManager = new ModalManager(".ver-mais", ".fechar-modal");

document.getElementById("copyright-year").textContent = new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
    const myObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.3
    });

    const elements = document.querySelectorAll('.exibir');
    elements.forEach((element) => myObserver.observe(element));
});
