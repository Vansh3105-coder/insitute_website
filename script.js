/* =========================================================
   SAMARTHYA CAREER POINT
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = document.querySelectorAll(".nav-link");

const inquiryForm = document.getElementById("inquiryForm");

const successModal = document.getElementById("successModal");
const modalClose = document.getElementById("modalClose");
const modalOk = document.getElementById("modalOk");


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    if (!navMenu || !menuToggle) return;

    const isOpen = navMenu.classList.toggle("active");

    menuToggle.classList.toggle("active", isOpen);

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );
}

if (menuToggle) {
    menuToggle.addEventListener(
        "click",
        toggleMobileMenu
    );
}


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navMenu || !menuToggle) return;

        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove(
            "menu-open"
        );
    });

});


/* =========================================================
   SMOOTH SCROLLING
========================================================= */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#" ||
                    targetId.length <= 1
                ) {
                    return;
                }

                const targetElement =
                    document.querySelector(
                        targetId
                    );

                if (!targetElement) return;

                event.preventDefault();

                const header =
                    document.querySelector(
                        ".header"
                    );

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    targetElement.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        );

    });


/* =========================================================
   SCROLL REVEAL ANIMATIONS
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, .reveal-scale"
    );


const revealObserver =
    new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "show"
                    );

                } else {

                    entry.target.classList.remove(
                        "show"
                    );
                }

            });

        },
        {
            threshold: 0.15,
            rootMargin: "0px 0px -80px 0px"
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================================
   STAGGERED CARD ANIMATIONS
========================================================= */

const staggerContainers =
    document.querySelectorAll(
        ".technology-grid, .highlights-grid, .results-grid, .stats-grid"
    );


staggerContainers.forEach((container) => {

    container.classList.add(
        "stagger-container"
    );

    const items =
        Array.from(container.children);


    items.forEach((item, index) => {

        item.classList.add(
            "stagger-item"
        );

        item.style.setProperty(
            "--stagger-delay",
            `${index * 0.1}s`
        );

    });


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        Array.from(
                            container.children
                        ).forEach((item) => {

                            item.classList.add(
                                "show"
                            );

                        });

                    } else {

                        Array.from(
                            container.children
                        ).forEach((item) => {

                            item.classList.remove(
                                "show"
                            );

                        });

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    observer.observe(container);

});


/* =========================================================
   SECTION HEADINGS
========================================================= */

const sectionHeadings =
    document.querySelectorAll(
        ".section-heading"
    );


sectionHeadings.forEach((heading) => {

    heading.classList.add(
        "reveal"
    );

    revealObserver.observe(
        heading
    );

});


/* =========================================================
   LEFT SIDE ANIMATIONS
========================================================= */

const leftElements =
    document.querySelectorAll(
        ".project-content, .contact-info"
    );


leftElements.forEach((element) => {

    element.classList.add(
        "reveal-left"
    );

    revealObserver.observe(
        element
    );

});


/* =========================================================
   RIGHT SIDE ANIMATIONS
========================================================= */

const rightElements =
    document.querySelectorAll(
        ".form-container"
    );


rightElements.forEach((element) => {

    element.classList.add(
        "reveal-right"
    );

    revealObserver.observe(
        element
    );

});


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


function updateActiveNavigation() {

    const header =
        document.querySelector(
            ".header"
        );

    const headerHeight =
        header
            ? header.offsetHeight
            : 0;


    const scrollPosition =
        window.scrollY +
        headerHeight +
        100;


    let currentSection = "home";


    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
                sectionTop +
                sectionHeight
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach((link) => {

        const linkTarget =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            linkTarget ===
                `#${currentSection}`
        );

    });

}


window.addEventListener(
    "scroll",
    updateActiveNavigation,
    {
        passive: true
    }
);


updateActiveNavigation();


/* =========================================================
   FORM ELEMENTS
========================================================= */

const nameInput =
    document.getElementById("name");

const phoneInput =
    document.getElementById("phone");

const courseInput =
    document.getElementById("course");

const messageInput =
    document.getElementById("message");


const nameError =
    document.getElementById("nameError");

const phoneError =
    document.getElementById("phoneError");

const courseError =
    document.getElementById("courseError");

const messageError =
    document.getElementById("messageError");


/* =========================================================
   ERROR FUNCTIONS
========================================================= */

function setError(
    input,
    errorElement,
    message
) {

    if (!input || !errorElement) return;

    input.classList.add(
        "input-error"
    );

    errorElement.textContent =
        message;
}


function clearError(
    input,
    errorElement
) {

    if (!input || !errorElement) return;

    input.classList.remove(
        "input-error"
    );

    errorElement.textContent =
        "";
}


function clearAllErrors() {

    clearError(
        nameInput,
        nameError
    );

    clearError(
        phoneInput,
        phoneError
    );

    clearError(
        courseInput,
        courseError
    );

    clearError(
        messageInput,
        messageError
    );

}


/* =========================================================
   PHONE INPUT
========================================================= */

if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        () => {

            phoneInput.value =
                phoneInput.value
                    .replace(/\D/g, "")
                    .slice(0, 10);

        }
    );

}


/* =========================================================
   REAL-TIME ERROR CLEARING
========================================================= */

if (nameInput) {

    nameInput.addEventListener(
        "input",
        () => {

            if (
                nameInput.value
                    .trim()
                    .length >= 2
            ) {

                clearError(
                    nameInput,
                    nameError
                );

            }

        }
    );

}


if (phoneInput) {

    phoneInput.addEventListener(
        "input",
        () => {

            if (
                /^[6-9]\d{9}$/
                    .test(
                        phoneInput.value
                    )
            ) {

                clearError(
                    phoneInput,
                    phoneError
                );

            }

        }
    );

}


if (courseInput) {

    courseInput.addEventListener(
        "change",
        () => {

            if (
                courseInput.value !== ""
            ) {

                clearError(
                    courseInput,
                    courseError
                );

            }

        }
    );

}


if (messageInput) {

    messageInput.addEventListener(
        "input",
        () => {

            if (
                messageInput.value
                    .trim()
                    .length >= 10
            ) {

                clearError(
                    messageInput,
                    messageError
                );

            }

        }
    );

}


/* =========================================================
   FORM VALIDATION
========================================================= */

function validateForm() {

    let isValid = true;

    clearAllErrors();


    /* NAME */

    const name =
        nameInput
            ? nameInput.value.trim()
            : "";


    if (name.length === 0) {

        setError(
            nameInput,
            nameError,
            "Please enter your name."
        );

        isValid = false;

    } else if (name.length < 2) {

        setError(
            nameInput,
            nameError,
            "Name must contain at least 2 characters."
        );

        isValid = false;

    }


    /* PHONE */

    const phone =
        phoneInput
            ? phoneInput.value.trim()
            : "";


    if (phone.length === 0) {

        setError(
            phoneInput,
            phoneError,
            "Please enter your phone number."
        );

        isValid = false;

    } else if (
        !/^[6-9]\d{9}$/.test(phone)
    ) {

        setError(
            phoneInput,
            phoneError,
            "Enter a valid 10-digit Indian mobile number."
        );

        isValid = false;

    }


    /* COURSE */

    if (
        courseInput &&
        courseInput.value === ""
    ) {

        setError(
            courseInput,
            courseError,
            "Please select a course or subject."
        );

        isValid = false;

    }


    /* MESSAGE */

    const message =
        messageInput
            ? messageInput.value.trim()
            : "";


    if (message.length === 0) {

        setError(
            messageInput,
            messageError,
            "Please enter your message."
        );

        isValid = false;

    } else if (message.length < 10) {

        setError(
            messageInput,
            messageError,
            "Message should contain at least 10 characters."
        );

        isValid = false;

    }


    return isValid;

}


/* =========================================================
   FORM SUBMISSION
========================================================= */

if (inquiryForm) {

    inquiryForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const isValid =
                validateForm();


            if (!isValid) {

                const firstError =
                    inquiryForm.querySelector(
                        ".input-error"
                    );

                if (firstError) {

                    firstError.focus();

                }

                return;

            }


            const submitButton =
                inquiryForm.querySelector(
                    ".submit-button"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.innerHTML =
                    "Submitting...";

            }


            setTimeout(() => {

                if (submitButton) {

                    submitButton.disabled =
                        false;

                    submitButton.innerHTML =
                        'Submit Inquiry <span>→</span>';

                }


                inquiryForm.reset();

                showSuccessModal();

            }, 800);

        }
    );

}


/* =========================================================
   SUCCESS MODAL
========================================================= */

function showSuccessModal() {

    if (!successModal) return;

    successModal.classList.add(
        "active"
    );

    successModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "menu-open"
    );

}


function closeSuccessModal() {

    if (!successModal) return;

    successModal.classList.remove(
        "active"
    );

    successModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeSuccessModal
    );

}


if (modalOk) {

    modalOk.addEventListener(
        "click",
        closeSuccessModal
    );

}


/* =========================================================
   CLOSE MODAL OUTSIDE
========================================================= */

if (successModal) {

    successModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                successModal
            ) {

                closeSuccessModal();

            }

        }
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            successModal &&
            successModal.classList.contains(
                "active"
            )
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================================
   RESPONSIVE MENU RESET
========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            window.innerWidth > 850 &&
            navMenu &&
            menuToggle
        ) {

            navMenu.classList.remove(
                "active"
            );

            menuToggle.classList.remove(
                "active"
            );

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);


/* =========================================================
   CUET SUBJECT SLIDER
========================================================= */

const subjectSlider =
    document.querySelector(
        ".subjects-grid"
    );

const subjectCards =
    document.querySelectorAll(
        ".subject-card"
    );

const subjectPrev =
    document.querySelector(
        ".subject-prev"
    );

const subjectNext =
    document.querySelector(
        ".subject-next"
    );


if (
    subjectSlider &&
    subjectCards.length &&
    subjectPrev &&
    subjectNext
) {


    /* GET CARD SCROLL DISTANCE */

    function getScrollAmount() {

        const card =
            subjectCards[0];

        if (!card) return 0;


        const cardWidth =
            card.offsetWidth;


        const gap =
            parseFloat(
                getComputedStyle(
                    subjectSlider
                ).gap
            ) || 0;


        return cardWidth + gap;

    }


    /* UPDATE BUTTON STATES */

    function updateSliderButtons() {

        const maxScroll =
            subjectSlider.scrollWidth -
            subjectSlider.clientWidth;


        subjectPrev.disabled =
            subjectSlider.scrollLeft <= 5;


        subjectNext.disabled =
            subjectSlider.scrollLeft >=
            maxScroll - 5;

    }


    /* NEXT */

    subjectNext.addEventListener(
        "click",
        () => {

            subjectSlider.scrollBy({

                left:
                    getScrollAmount(),

                behavior:
                    "smooth"

            });

        }
    );


    /* PREVIOUS */

    subjectPrev.addEventListener(
        "click",
        () => {

            subjectSlider.scrollBy({

                left:
                    -getScrollAmount(),

                behavior:
                    "smooth"

            });

        }
    );


    /* SCROLL EVENT */

    subjectSlider.addEventListener(
        "scroll",
        updateSliderButtons,
        {
            passive: true
        }
    );


    /* RESIZE */

    window.addEventListener(
        "resize",
        updateSliderButtons
    );


    updateSliderButtons();

}


/* =========================================================
   PAGE LOAD
========================================================= */

window.addEventListener(
    "load",
    () => {

        updateActiveNavigation();

    }
);