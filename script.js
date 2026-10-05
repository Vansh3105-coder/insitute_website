
/* =========================================================
   SAMARTHYA CAREER POINT
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   ELEMENTS
========================================================= */

const menuToggle =
    document.getElementById("menuToggle");

const navMenu =
    document.getElementById("navMenu");

const navLinks =
    document.querySelectorAll(".nav-link");

const inquiryForm =
    document.getElementById("inquiryForm");

const successModal =
    document.getElementById("successModal");

const modalClose =
    document.getElementById("modalClose");

const modalOk =
    document.getElementById("modalOk");


/* =========================================================
   MOBILE MENU
========================================================= */

function toggleMobileMenu() {

    const isOpen =
        navMenu.classList.toggle("active");

    menuToggle.classList.toggle(
        "active",
        isOpen
    );

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    document.body.classList.toggle(
        "menu-open",
        isOpen
    );
}


menuToggle.addEventListener(
    "click",
    toggleMobileMenu
);


/* =========================================================
   CLOSE MOBILE MENU
========================================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

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

document.querySelectorAll(
    'a[href^="#"]'
).forEach((link) => {

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
                document.querySelector(targetId);

            if (!targetElement) {
                return;
            }

            event.preventDefault();

            const header =
                document.querySelector(".header");

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                targetElement.getBoundingClientRect().top +
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
   AUTOMATIC STAGGER SYSTEM
========================================================= */

/*
 * These containers automatically receive the
 * stagger animation without requiring us to manually
 * add classes to every individual card.
 */

const staggerGroups = [

    ".subjects-grid",

    ".technology-grid",

    ".highlights-grid",

    ".results-grid",

    ".stats-grid"

];


staggerGroups.forEach((selector) => {

    const container =
        document.querySelector(selector);

    if (!container) {
        return;
    }

    container.classList.add(
        "stagger-container"
    );

    const children =
        Array.from(container.children);

    children.forEach((child) => {

        child.classList.add(
            "stagger-item"
        );

    });

    /*
     * Observe the entire group.
     */

    const staggerObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "show"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -50px 0px"
            }
        );

    staggerObserver.observe(container);

});


// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================

const revealElements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                // Element is entering the screen
                entry.target.classList.add("show");
            } else {
                // Element is leaving the screen
                entry.target.classList.remove("show");
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


// ==========================================
// STAGGERED CARD ANIMATIONS
// ==========================================

const staggerContainers = document.querySelectorAll(
    ".subjects-grid, .technology-grid, .highlights-grid, .results-grid, .stats-grid"
);

staggerContainers.forEach((container) => {

    container.classList.add("stagger-container");

    const items = container.children;

    Array.from(items).forEach((item) => {
        item.classList.add("stagger-item");
    });

    const staggerObserver = new IntersectionObserver(
        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {
                    // Cards appear
                    entry.target.classList.add("show");
                } else {
                    // Cards disappear again
                    entry.target.classList.remove("show");
                }

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    staggerObserver.observe(container);
});


// ==========================================
// SECTION HEADINGS
// ==========================================

const sectionHeadings = document.querySelectorAll(".section-heading");

sectionHeadings.forEach((heading) => {

    heading.classList.add("reveal");

    revealObserver.observe(heading);

});


// ==========================================
// LEFT / RIGHT SECTION ANIMATIONS
// ==========================================

const leftElements = document.querySelectorAll(
    ".project-content, .contact-info"
);

leftElements.forEach((element) => {

    element.classList.add("reveal-left");

    revealObserver.observe(element);

});


const rightElements = document.querySelectorAll(
    ".form-container"
);

rightElements.forEach((element) => {

    element.classList.add("reveal-right");

    revealObserver.observe(element);

});


/* =========================================================
   ADD REVEAL TO MAJOR CONTENT BLOCKS
========================================================= */

const projectContent =
    document.querySelector(".project-content");

const contactInfo =
    document.querySelector(".contact-info");

const formContainer =
    document.querySelector(".form-container");


if (projectContent) {

    projectContent.classList.add(
        "reveal-left"
    );

    revealObserver.observe(
        projectContent
    );

}


if (contactInfo) {

    contactInfo.classList.add(
        "reveal-left"
    );

    revealObserver.observe(
        contactInfo
    );

}


if (formContainer) {

    formContainer.classList.add(
        "reveal-right"
    );

    revealObserver.observe(
        formContainer
    );

}


/* =========================================================
   ACTIVE NAVIGATION LINK
========================================================= */

const sections =
    document.querySelectorAll(
        "main section[id]"
    );


function updateActiveNavigation() {

    const header =
        document.querySelector(".header");

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
                sectionTop + sectionHeight
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

    input.classList.remove(
        "input-error"
    );

    errorElement.textContent = "";

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

phoneInput.addEventListener(
    "input",
    () => {

        phoneInput.value =
            phoneInput.value
                .replace(/\D/g, "")
                .slice(0, 10);

    }
);


/* =========================================================
   REAL-TIME ERROR CLEARING
========================================================= */

nameInput.addEventListener(
    "input",
    () => {

        if (
            nameInput.value.trim().length >= 2
        ) {

            clearError(
                nameInput,
                nameError
            );

        }

    }
);


phoneInput.addEventListener(
    "input",
    () => {

        if (
            /^[6-9]\d{9}$/.test(
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


messageInput.addEventListener(
    "input",
    () => {

        if (
            messageInput.value.trim().length >= 10
        ) {

            clearError(
                messageInput,
                messageError
            );

        }

    }
);


/* =========================================================
   FORM VALIDATION
========================================================= */

function validateForm() {

    let isValid = true;

    clearAllErrors();


    /* NAME */

    const name =
        nameInput.value.trim();

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
        phoneInput.value.trim();

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
        messageInput.value.trim();

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


        submitButton.disabled = true;

        submitButton.innerHTML =
            "Submitting...";


        setTimeout(() => {

            submitButton.disabled = false;

            submitButton.innerHTML =
                'Submit Inquiry <span>→</span>';

            inquiryForm.reset();

            showSuccessModal();

        }, 800);

    }
);


/* =========================================================
   SUCCESS MODAL
========================================================= */

function showSuccessModal() {

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


modalClose.addEventListener(
    "click",
    closeSuccessModal
);


modalOk.addEventListener(
    "click",
    closeSuccessModal
);


/* =========================================================
   CLOSE MODAL OUTSIDE
========================================================= */

successModal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === successModal
        ) {

            closeSuccessModal();

        }

    }
);


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
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
            window.innerWidth > 850
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
   SUBJECT CARDS POPUP INTERACTION (DYNAMIC TAGS & DATA)
========================================================= */

const subjectData = {
    // CUET & Academic Subjects
    "Maths": {
        icon: "∑",
        title: "Mathematics",
        desc: "Step-by-step formula derivation, shortcut tricks, aur previous years' questions ki extensive practice ke sath calculus aur algebra ko asaan banaya jata hai.",
        tags: ["Formula Shortcuts", "PYQ Practice", "Step-by-Step Clarity"]
    },
    "Physics": {
        icon: "⚛",
        title: "Physics",
        desc: "Core concepts ki visualization, numerical problem-solving approaches, aur conceptual clarity par special dhyan diya jata hai taaki exam mein har derivation aur numerical pakka ho.",
        tags: ["Concept Visualization", "Numerical Mastery", "Derivation Practice"]
    },
    "Accounts": {
        icon: "₹",
        title: "Accountancy",
        desc: "Partnership, Company accounts, aur financial statements ke practical problems ko ledger/journal entries ke basic rules ke sath crystal clear karwaya jata hai.",
        tags: ["Practical Ledgers", "Exam Focused", "Doubt Support"]
    },
    "English": {
        icon: "A",
        title: "English Guidance",
        desc: "Reading comprehension, grammar rules, vocabulary building, aur CUET pattern ke mock tests ke zariye language section mein full scores secure karwaye jate hain.",
        tags: ["Grammar Rules", "Mock Tests", "Vocabulary Focus"]
    },
    "Science": {
        icon: "🔬",
        title: "General Science",
        desc: "Scientific concepts, fundamental theories, aur analytical questions ki structured practice ke sath complete preparation karwayi jati hai.",
        tags: ["Fundamental Theories", "Structured Revision", "Doubt Support"]
    },
    "Chemistry": {
        icon: "🧪",
        title: "Chemistry",
        desc: "Organic mechanisms, inorganic exceptions ki trick-based learning, aur physical chemistry ke numericals ko aasan steps mein samjhaya jata hai.",
        tags: ["Organic Mechanisms", "Trick-Based Learning", "Numerical Practice"]
    },
    "Economics": {
        icon: "₹",
        title: "Economics",
        desc: "Macro aur Micro economics ke graphs, theoretical concepts, aur numerical problems ko real-world examples ke sath connect karke padhaya jata hai.",
        tags: ["Graph Analysis", "Real-World Examples", "Theory & Numericals"]
    },
    "History": {
        icon: "⌛",
        title: "History",
        desc: "Dates, chronological events, aur important historical themes ko story-format aur structured revision notes ke sath yaad karwaya jata hai.",
        tags: ["Chronological Order", "Story Format", "Structured Notes"]
    },
    "IP": {
        icon: "</>",
        title: "Informatics Practices (IP)",
        desc: "Python pandas, matplotlib, networking, aur SQL queries ki hands-on practical coding ke sath complete training di jati hai.",
        tags: ["Python Pandas", "SQL Queries", "Practical Coding"]
    },
    "Biology": {
        icon: "🧬",
        title: "Biology",
        desc: "Diagram-based learning, NCERT line-to-line revision, aur important terminologies ke structured notes ke sath preparation karwai jati hai.",
        tags: ["NCERT Line-by-Line", "Diagram Learning", "Structured Revision"]
    },
    "BST": {
        icon: "📊",
        title: "Business Studies",
        desc: "Principles of management, case studies analysis, aur exam-focused answer writing formats ke sath concepts clear kiye jate hain.",
        tags: ["Case Studies", "Management Principles", "Exam Formatting"]
    },
    "Pol. Science": {
        icon: "🏛",
        title: "Political Science",
        desc: "World politics aur Indian politics ke current scenarios, treaties, aur timelines ko analytical understanding ke sath cover kiya jata hai.",
        tags: ["Timeline Analysis", "Treaties & Treaties", "Analytical Study"]
    },
    "Comp. Science": {
        icon: "💻",
        title: "Computer Science",
        desc: "C++/Python programming, data structures, boolean algebra, aur database concepts ki strong coding foundation banayi jati hai.",
        tags: ["Programming Logic", "Boolean Algebra", "Coding Foundation"]
    },
    "Psychology": {
        icon: "🧠",
        title: "Psychology",
        desc: "Human behavior, case studies, core psychological theories, aur scientific approaches ko easy terms mein samjhaya jata hai.",
        tags: ["Theories & Case Studies", "Scientific Approach", "Concept Clarity"]
    },
    "Sociology": {
        icon: "👥",
        title: "Sociology",
        desc: "Social structures, changes, aur societal concepts ki comprehensive preparation ke sath analytical writing practice karwayi jati hai.",
        tags: ["Social Structures", "Comprehensive Prep", "Analytical Writing"]
    },
    "Geography": {
        icon: "🌍",
        title: "Geography",
        desc: "Map work, physical geography ke laws, aur human geography ke data ko conceptual clarity ke sath padhaya jata hai.",
        tags: ["Map Practice", "Physical Geography", "Data Analysis"]
    },

    // Tech / Programming Subjects
    "Python": {
        icon: "🐍",
        title: "Python Programming",
        desc: "Python ko bilkul zero level se shuru karenge. Syntax, logic building, aur real-world mini-projects ke sath practice karwayenge.",
        tags: ["Zero to Advanced", "Mini Projects", "Practical Coding"]
    },
    "C": {
        icon: "C",
        title: "C Programming Language",
        desc: "Programming ki foundation strong karne ke liye C language ke pointers, memory management, aur core logical structures par focus kiya jata hai.",
        tags: ["Memory Management", "Pointers", "Core Logic"]
    },
    "C++": {
        icon: "⚡",
        title: "C++ & Problem Solving",
        desc: "Advanced logic building aur competitive coding ke liye C++ ke Object Oriented Programming (OOPs) concepts aur STL ko depth mein cover karenge.",
        tags: ["OOPs Concepts", "Competitive Coding", "STL Mastery"]
    },
    "Data Structure": {
        icon: "DS",
        title: "Data Structures (DSA)",
        desc: "Arrays, Linked Lists, Trees, aur Graphs jaise important topics ko easy visualizations aur step-by-step problem-solving approaches ke sath padhaya jayega.",
        tags: ["Visualizations", "Problem Solving", "Interview Prep"]
    },
    "Java": {
        icon: "☕",
        title: "Java Programming",
        desc: "Enterprise-level development ke liye Java ke core concepts, classes, objects, aur robust backend architecture ki complete training di jayegi.",
        tags: ["Object Oriented", "Backend Architecture", "Robust Coding"]
    },
    "DBMS": {
        icon: "DB",
        title: "Database Management Systems",
        desc: "SQL queries, normalization, transactions, aur database design ko practical examples ke sath samjhaya jayega taaki industry standards clear rahein.",
        tags: ["SQL Queries", "Normalization", "Database Design"]
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("subjectModal");
    const closeModalBtn = document.getElementById("closeModal");
    const modalIcon = document.getElementById("modalIcon");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalFeaturesContainer = document.getElementById("modalFeaturesContainer");

    // Yahan humne saare possible card classes ko target kar liya hai (CUET, Tech, Projects, etc.)
    const cards = document.querySelectorAll(".technology-card, .tech-card, .subject-card, .project-card, .highlight-card");

    cards.forEach(card => {
        card.style.cursor = "pointer";
        card.addEventListener("click", () => {
            const titleEl = card.querySelector("h3");
            if (!titleEl) return;
            
            const subjectName = titleEl.textContent.trim();
            const data = subjectData[subjectName] || {
                icon: "💻",
                title: subjectName,
                desc: "Comprehensive guidance, concept clarity, aur regular practice tests ke sath is subject ki preparation karwayi jayegi.",
                tags: ["Concept Clarity", "Practical Learning", "Doubt Support"]
            };

            modalIcon.textContent = data.icon;
            modalTitle.textContent = data.title;
            modalDescription.textContent = data.desc;

            modalFeaturesContainer.innerHTML = "";
            data.tags.forEach(tag => {
                const span = document.createElement("span");
                span.textContent = "✔ " + tag;
                modalFeaturesContainer.appendChild(span);
            });

            modal.classList.add("active");
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });
});