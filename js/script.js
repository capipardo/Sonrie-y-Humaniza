/* =========================================================
   SONRÍE Y HUMANIZA 2.0
   ENTREGA 1A · JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PRELOADER
    ===================================================== */

    const preloader = document.getElementById("preloader");

    if (preloader) {

        window.addEventListener("load", () => {

            setTimeout(() => {
                preloader.classList.add("loaded");
            }, 500);

        });

    }


    /* =====================================================
       HEADER · SCROLL
    ===================================================== */

    const header = document.getElementById("siteHeader");

    const updateHeader = () => {

        if (!header) return;

        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    };

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       MENÚ MÓVIL
    ===================================================== */

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const navMenu =
        document.getElementById("navMenu");

    if (mobileMenuButton && navMenu) {

        mobileMenuButton.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            mobileMenuButton.setAttribute(
                "aria-expanded",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            mobileMenuButton.classList.toggle(
                "active",
                isOpen
            );

        });


        /* Cerrar menú al pulsar un enlace */

        const navLinks =
            navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                document.body.classList.remove(
                    "menu-open"
                );

                mobileMenuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuButton.classList.remove(
                    "active"
                );

            });

        });

    }


    /* =====================================================
       NAVEGACIÓN ACTIVA
    ===================================================== */

    const sections =
        document.querySelectorAll("main section[id]");

    const navigationLinks =
        document.querySelectorAll(".nav-link");

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );

    updateActiveNavigation();


    /* =====================================================
       SCROLL SUAVE
    ===================================================== */

    const smoothLinks =
        document.querySelectorAll('a[href^="#"]');

    smoothLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       IDEAS DEL CLIENTE
    ===================================================== */

    const ideaOptions =
        document.querySelectorAll(".idea-option");

    const selectedIdeas = new Set();

    ideaOptions.forEach(option => {

        option.addEventListener("click", () => {

            const idea =
                option.dataset.idea;

            if (!idea) return;


            if (selectedIdeas.has(idea)) {

                selectedIdeas.delete(idea);

                option.classList.remove(
                    "selected"
                );

            } else {

                selectedIdeas.add(idea);

                option.classList.add(
                    "selected"
                );

            }

            updateIdeaMessage();

        });

    });


    function updateIdeaMessage() {

        const callout =
            document.querySelector(".idea-callout");

        if (!callout) return;

        const paragraph =
            callout.querySelector("p");

        if (!paragraph) return;


        if (selectedIdeas.size === 0) {

            paragraph.textContent =
                "No buscamos respuestas perfectas. " +
                "Buscamos ideas que nos ayuden a mejorar.";

            return;

        }


        const ideas =
            Array.from(selectedIdeas);


        if (ideas.length === 1) {

            paragraph.textContent =
                `Has seleccionado: ${ideas[0]}. ` +
                "Cuéntanos qué te gustaría encontrar.";

        } else {

            paragraph.textContent =
                `Has seleccionado ${ideas.length} propuestas. ` +
                "¡Perfecto! Puedes contarnos más en el formulario.";

        }

    }


    /* =====================================================
       ESTRELLAS DE VALORACIÓN
    ===================================================== */

    const ratingButtons =
        document.querySelectorAll(
            ".rating-stars button"
        );

    const ratingInput =
        document.getElementById("valoracion");


    ratingButtons.forEach(button => {

        button.addEventListener("click", () => {

            const rating =
                Number(button.dataset.rating);

            if (!rating) return;


            if (ratingInput) {

                ratingInput.value = rating;

            }


            ratingButtons.forEach(star => {

                const starRating =
                    Number(star.dataset.rating);

                star.classList.toggle(
                    "active",
                    starRating <= rating
                );

            });

        });


        button.addEventListener(
            "mouseenter",
            () => {

                const rating =
                    Number(button.dataset.rating);

                ratingButtons.forEach(star => {

                    const starRating =
                        Number(star.dataset.rating);

                    star.classList.toggle(
                        "active",
                        starRating <= rating
                    );

                });

            }
        );

    });


    const ratingContainer =
        document.querySelector(".rating-stars");

    if (ratingContainer) {

        ratingContainer.addEventListener(
            "mouseleave",
            () => {

                const currentRating =
                    Number(
                        ratingInput?.value || 0
                    );

                ratingButtons.forEach(star => {

                    const starRating =
                        Number(star.dataset.rating);

                    star.classList.toggle(
                        "active",
                        starRating <= currentRating
                    );

                });

            }
        );

    }


    /* =====================================================
       FORMULARIO · PREPARACIÓN
    ===================================================== */

  // =========================================
// FORMULARIO DE CONTACTO - EMAILJS
// =========================================

emailjs.init({
    publicKey: "v3io8_j43X4t7whz3"
});

const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("respuesta");
const submitBtn = document.getElementById("submitBtn");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (!responseMessage) return;

        const consent = document.getElementById("rgpd");

        if (consent && !consent.checked) {

            responseMessage.textContent =
                "Por favor, acepta la política de privacidad.";

            responseMessage.className =
                "form-response error";

            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = "Enviando...";

        emailjs.sendForm(
            "service_m254vng",
            "template_1cphleo",
            contactForm
        )
        .then(function () {

            responseMessage.textContent =
                "¡Gracias por tu aportación! Tu mensaje se ha enviado correctamente.";

            responseMessage.className =
                "form-response success";

            contactForm.reset();

            submitBtn.disabled = false;
            submitBtn.innerHTML = "💛 Enviar comentario";

        })
        .catch(function (error) {

            console.error("Error EmailJS:", error);

            responseMessage.textContent =
                "No ha sido posible enviar el comentario. Inténtalo de nuevo.";

            responseMessage.className =
                "form-response error";

            submitBtn.disabled = false;
            submitBtn.innerHTML = "💛 Enviar comentario";

        });

    });

}

    }


    /* =====================================================
       CONTADORES
    ===================================================== */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    const animateCounter = element => {

        const target =
            Number(element.dataset.counter);

        if (!target) return;


        const duration = 1400;

        const startTime =
            performance.now();


        const updateCounter = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);


            const eased =
                1 - Math.pow(1 - progress, 3);


            const current =
                Math.floor(target * eased);


            element.textContent =
                `${current}+`;


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                element.textContent =
                    `${target}+`;

            }

        };


        requestAnimationFrame(
            updateCounter
        );

    };


    /* =====================================================
       OBSERVER · CONTADORES
    ===================================================== */

    if (counters.length) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting &&
                            !entry.target.dataset.animated
                        ) {

                            entry.target.dataset.animated =
                                "true";

                            animateCounter(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.4
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = [
        ".section-heading",
        ".philosophy-card",
        ".station-visual",
        ".station-content",
        ".idea-option",
        ".idea-callout",
        ".improvement-card",
        ".story-card",
        ".contact-info",
        ".contact-form-wrapper"
    ];


    const elementsToReveal =
        document.querySelectorAll(
            revealElements.join(",")
        );


    elementsToReveal.forEach(element => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    elementsToReveal.forEach(element => {

        revealObserver.observe(element);

    });


    /* =====================================================
       ANIMACIÓN ESCALONADA DE TARJETAS
    ===================================================== */

    const animatedGroups = [
        ".philosophy-grid",
        ".ideas-options",
        ".improvements-grid",
        ".stories-grid"
    ];


    animatedGroups.forEach(selector => {

        const items =
            document.querySelectorAll(
                `${selector} > *`
            );


        items.forEach((item, index) => {

            item.style.transitionDelay =
                `${index * 70}ms`;

        });

    });


    /* =====================================================
       BOTONES · HOVER
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "mouseenter",
            () => {

                button.style.setProperty(
                    "--button-hover",
                    "1"
                );

            }
        );


        button.addEventListener(
            "mouseleave",
            () => {

                button.style.removeProperty(
                    "--button-hover"
                );

            }
        );

    });


    /* =====================================================
       ESCAPE · CERRAR MENÚ
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove(
                    "open"
                );

                document.body.classList.remove(
                    "menu-open"
                );

                mobileMenuButton?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    /* =====================================================
       LOG DE DESARROLLO
    ===================================================== */

    console.log(
        "😊 Sonríe y Humaniza 2.0 · Entrega 1A cargada correctamente."
    );

});
