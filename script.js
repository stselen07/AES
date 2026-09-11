document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       INSTANT SECTION NAVIGATION
    ========================================================= */

    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const hash = link.getAttribute("href");

            if (!hash || hash === "#") return;

            const target = document.querySelector(hash);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "auto",
                block: "start"
            });

            history.pushState(null, "", hash);

        });

    });


    /* =========================================================
       OPEN SECTION FROM URL
    ========================================================= */

    const initialHash = window.location.hash;

    if (initialHash) {

        const initialTarget = document.querySelector(initialHash);

        if (initialTarget) {

            setTimeout(function () {

                initialTarget.scrollIntoView({
                    behavior: "auto",
                    block: "start"
                });

            }, 0);

        }

    }


    /* =========================================================
       HERO SLIDESHOW
    ========================================================= */

    const heroSlides = document.querySelectorAll(".hero-slide");

    const heroImages = [
        "images/gas-turbine-siemens-III.jpg",
        "images/heroFoto-2.jpg",
        "images/heroFoto-3.jpg"
    ];


    heroSlides.forEach(function (slide, index) {

        if (heroImages[index]) {
            slide.style.backgroundImage =
                `url("${heroImages[index]}")`;
        }

    });


    if (heroSlides.length > 0) {

        let currentSlide = 0;

        heroSlides[0].classList.add("active");


        if (heroSlides.length > 1) {

            setInterval(function () {

                heroSlides[currentSlide].classList.remove("active");

                currentSlide++;

                if (currentSlide >= heroSlides.length) {
                    currentSlide = 0;
                }

                heroSlides[currentSlide].classList.add("active");

            }, 8000);

        }

    }


    /* =========================================================
       ENERGY POTENTIAL — OPEN / CLOSE
    ========================================================= */

    const calculatorButtons = document.querySelectorAll(
        "[data-open-calculator]"
    );

    const calculatorArea = document.querySelector(
        "#energy-calculator"
    );

    const calculatorPanels = document.querySelectorAll(
        "[data-calculator-panel]"
    );

    const closeCalculatorButtons = document.querySelectorAll(
        ".calculator-close"
    );


    calculatorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const calculatorName =
                button.dataset.openCalculator;

            if (!calculatorArea) return;


            calculatorPanels.forEach(function (panel) {
                panel.classList.remove("is-active");
            });


            const targetPanel = document.querySelector(
                `[data-calculator-panel="${calculatorName}"]`
            );

            if (!targetPanel) return;


            targetPanel.classList.add("is-active");
            calculatorArea.classList.add("is-visible");

        });

    });


    closeCalculatorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (!calculatorArea) return;

            calculatorArea.classList.remove("is-visible");

            calculatorPanels.forEach(function (panel) {
                panel.classList.remove("is-active");
            });

        });

    });


    /* =========================================================
       POWER CALCULATOR
    ========================================================= */

    const calculatePowerButton =
        document.querySelector("#calculatePower");

    if (calculatePowerButton) {

        calculatePowerButton.addEventListener("click", function () {

            const power = parseFloat(
                document.querySelector("#powerInput").value
            );

            const hours = parseFloat(
                document.querySelector("#powerHours").value
            );

            if (
                isNaN(power) ||
                isNaN(hours) ||
                power <= 0 ||
                hours <= 0
            ) {
                return;
            }

            const annualGeneration =
                (power * hours) / 1000;

            document.querySelector("#powerResult").textContent =
                annualGeneration.toFixed(1);

        });

    }


    /* =========================================================
       CHP CALCULATOR
    ========================================================= */

    const calculateCHPButton =
        document.querySelector("#calculateCHP");

    if (calculateCHPButton) {

        calculateCHPButton.addEventListener("click", function () {

            const power = parseFloat(
                document.querySelector("#chpPower").value
            );

            const hours = parseFloat(
                document.querySelector("#chpHours").value
            );

            if (
                isNaN(power) ||
                isNaN(hours) ||
                power <= 0 ||
                hours <= 0
            ) {
                return;
            }

            const annualGeneration =
                (power * hours) / 1000;

            document.querySelector("#chpResult").textContent =
                annualGeneration.toFixed(1);

        });

    }


    /* =========================================================
       FLARE GAS ASSESSMENT
    ========================================================= */

    const flareAssessmentButton =
        document.querySelector("#flareAssessment");

    if (flareAssessmentButton) {

        flareAssessmentButton.addEventListener("click", function () {

            const flareFlow =
                document.querySelector("#flareFlow").value;

            const flareComposition =
                document.querySelector("#flareComposition").value;

            const flareMessage =
                document.querySelector("#flareMessage");

            if (
                flareFlow === "" ||
                flareComposition === ""
            ) {

                flareMessage.classList.remove("is-visible");

                alert(
                    "Please provide the gas flow and gas type."
                );

                return;
            }

            flareMessage.classList.add("is-visible");

            flareMessage.scrollIntoView({
                behavior: "auto",
                block: "nearest"
            });

        });

    }


    /* =========================================================
       GAS APPLICATIONS — INTERACTIVE TYPES
    ========================================================= */

    const gasTypes = document.querySelectorAll(".gas-type");
    const selectedGas = document.querySelector("#selectedGas");

    gasTypes.forEach(function (gasType) {

        gasType.addEventListener("click", function () {

            gasTypes.forEach(function (item) {
                item.classList.remove("active");
            });

            gasType.classList.add("active");

            const gasName = gasType.dataset.gas;

            if (selectedGas) {
                selectedGas.textContent = gasName;
            }

        });

    });
    /* =========================================================
   FLARE GAS CALCULATOR — FINAL
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const flareCalculator = document.querySelector(
        '[data-calculator="flare"]'
    );

    if (!flareCalculator) return;


    /* =====================================================
       INPUTS
       ===================================================== */

    const gasFlowInput = flareCalculator.querySelector(
        'input[name="gas-flow"], #gasFlow'
    );

    const gasTypeSelect = flareCalculator.querySelector(
        'select[name="gas-type"], #gasType'
    );

    const operatingHoursInput = flareCalculator.querySelector(
        'input[name="operating-hours"], #operatingHours'
    );


    /* =====================================================
       OUTPUTS
       ===================================================== */

    const resultBox = flareCalculator.querySelector(
        ".flare-result"
    );

    const resultPower = flareCalculator.querySelector(
        ".flare-result-power b"
    );

    const resultConfiguration = flareCalculator.querySelector(
        ".flare-result-main > strong"
    );

    const resultOutput = flareCalculator.querySelector(
        ".flare-result-stats div:nth-child(1) strong"
    );

    const resultHeat = flareCalculator.querySelector(
        ".flare-result-stats div:nth-child(2) strong"
    );

    const resultOperation = flareCalculator.querySelector(
        ".flare-result-stats div:nth-child(3) strong"
    );


    /* =====================================================
       UPDATE RESULT
       ===================================================== */

    function updateFlareResult() {

        if (!gasFlowInput || !resultPower) return;


        /* ---------- READ FLOW ---------- */

        const gasFlow =
            parseFloat(
                gasFlowInput.value.replace(",", ".")
            ) || 0;


        /* ---------- READ HOURS ---------- */

        let hours =
            operatingHoursInput
                ? parseFloat(
                    operatingHoursInput.value.replace(",", ".")
                ) || 8000
                : 8000;


        /*
         * 8760 = maximum theoretical hours in one year.
         *
         * Тут ми НЕ змінюємо введене користувачем
         * значення автоматично.
         */

        hours = Math.max(0, hours);


        /* ---------- VISUAL UPDATE ---------- */

        if (resultBox) {
            resultBox.classList.add("is-updating");

            setTimeout(() => {
                resultBox.classList.remove("is-updating");
            }, 250);
        }


        /* =================================================
           EMPTY STATE
           ================================================= */

        if (gasFlow <= 0) {

            resultPower.textContent = "—";

            if (resultConfiguration) {
                resultConfiguration.textContent =
                    "Awaiting data";
            }

            if (resultOutput) {
                resultOutput.textContent = "—";
            }

            if (resultHeat) {
                resultHeat.textContent = "—";
            }

            if (resultOperation) {
                resultOperation.textContent = "—";
            }

            return;
        }


        /* =================================================
           REFERENCE CALCULATION
           =================================================

           Reference:
           10 000 Nm³/h → 8.6 MW

           Це попередня оцінка,
           а не фінальний інженерний розрахунок.
        */

        const referenceFlow = 10000;
        const referencePower = 8.6;


        let estimatedPower =
            (gasFlow / referenceFlow) *
            referencePower;


        /* ---------- LIMIT ---------- */

        estimatedPower = Math.max(
            0,
            Math.min(250, estimatedPower)
        );


        /* ---------- ROUND ---------- */

        const powerText =
            estimatedPower.toFixed(1);


        /* ---------- POWER ---------- */

        resultPower.textContent =
            powerText;


        /* ---------- OUTPUT ---------- */

        if (resultOutput) {

            resultOutput.textContent =
                `${powerText} MW`;

        }


        /* =================================================
           HEAT RECOVERY
           ================================================= */

        if (resultHeat) {

            resultHeat.textContent =
                "CHP";

        }


        /* =================================================
           OPERATION MODE
           ================================================= */

        if (resultOperation) {

            if (hours >= 7000) {

                resultOperation.textContent =
                    "BASELOAD";

            } else if (hours >= 4000) {

                resultOperation.textContent =
                    "FLEXIBLE";

            } else {

                resultOperation.textContent =
                    "PEAKING";

            }

        }


        /* =================================================
           ENGINE CONFIGURATION
           =================================================

           Reference:
           1 × AES 908 G/C ≈ 4.3 MW
        */

        let engineCount =
            Math.ceil(
                estimatedPower / 4.3
            );


        engineCount = Math.max(
            1,
            Math.min(20, engineCount)
        );


        if (resultConfiguration) {

            resultConfiguration.textContent =
                `${engineCount} × AES 908 G/C`;

        }

    }


    /* =====================================================
       LIVE INPUT
       ===================================================== */

    if (gasFlowInput) {

        gasFlowInput.addEventListener(
            "input",
            updateFlareResult
        );

    }


    if (operatingHoursInput) {

        operatingHoursInput.addEventListener(
            "input",
            updateFlareResult
        );

    }


    if (gasTypeSelect) {

        gasTypeSelect.addEventListener(
            "change",
            updateFlareResult
        );

    }


    /* =====================================================
       INITIAL CALCULATION
       ===================================================== */

    updateFlareResult();

});

});

/* =========================================================
   PROJECTS — AUTO CARD ROTATION
   ========================================================= */

console.log("PROJECTS SCRIPT START");

const projectCards = document.querySelectorAll(
    "#projects .project-card"
);

console.log("PROJECT CARDS:", projectCards.length);

if (projectCards.length) {

    let currentProject = 0;

    projectCards[currentProject].classList.add("is-active");

    setInterval(() => {

        console.log("SWITCH TO:", currentProject);

        projectCards.forEach(card => {
            card.classList.remove("is-active");
        });

        projectCards[currentProject].classList.add("is-active");

        currentProject++;

        if (currentProject >= projectCards.length) {
            currentProject = 0;
        }

    }, 5000);
}

/* =========================================================
   APPLICATIONS — SMOOTH VIDEO ROTATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const track = document.querySelector(".applications-track");
    const items = document.querySelectorAll(".application-item");
    const preview = document.querySelector(".applications-preview");
    const video = document.querySelector(".applications-preview-video");

    if (!track || !items.length || !preview || !video) return;


    let currentIndex = 0;
    let rotationTimer = null;
    let isHovering = false;
    let isAnimating = false;


    /* =====================================================
       SHOW VIDEO
       ===================================================== */

    function showVideo(index) {

        const item = items[index];
        const source = item.dataset.video;

        if (!source) return;

        currentIndex = index;

        items.forEach((el, i) => {
            el.classList.toggle(
                "is-active",
                i === index
            );
        });

        video.src = source;
        video.currentTime = 0;

        track.classList.add("is-previewing");
        preview.classList.remove(
            "is-exiting",
            "is-entering"
        );

        preview.classList.add("is-visible");

        video.play().catch(() => {});

    }


    /* =====================================================
       HIDE VIDEO
       ===================================================== */

    function hideVideo() {

        preview.classList.remove("is-visible");
        preview.classList.add("is-exiting");

        video.pause();

    }


    /* =====================================================
       SMOOTH AUTO TRANSITION
       ===================================================== */

    function changeVideo() {

        if (isHovering || isAnimating) return;

        isAnimating = true;

        /* 1. Current video leaves */

        preview.classList.add("is-exiting");

        setTimeout(() => {

            if (isHovering) {
                isAnimating = false;
                return;
            }

            /* 2. Pause — line is visible */

            preview.classList.remove("is-visible");

            video.pause();

        }, 650);


        setTimeout(() => {

            if (isHovering) {
                isAnimating = false;
                return;
            }

            /* 3. Select next */

            currentIndex =
                (currentIndex + 1) % items.length;

            const nextItem = items[currentIndex];
            const nextSource = nextItem.dataset.video;


            items.forEach((el, i) => {

                el.classList.toggle(
                    "is-active",
                    i === currentIndex
                );

            });


            video.src = nextSource;
            video.currentTime = 0;


            /* 4. New video enters */

            preview.classList.remove("is-exiting");

            preview.classList.add("is-entering");
            preview.classList.add("is-visible");

            track.classList.add("is-previewing");

            video.play().catch(() => {});


        }, 1150);


        setTimeout(() => {

            preview.classList.remove("is-entering");

            isAnimating = false;

        }, 1650);

    }


    /* =====================================================
       AUTO ROTATION
       ===================================================== */

    function startRotation() {

        clearInterval(rotationTimer);

        rotationTimer = setInterval(() => {

            changeVideo();

        }, 3000);

    }


    /* =====================================================
       HOVER
       ===================================================== */

    items.forEach((item, index) => {

        item.addEventListener("mouseenter", () => {

            isHovering = true;

            clearInterval(rotationTimer);

            isAnimating = false;

            preview.classList.remove(
                "is-exiting",
                "is-entering"
            );

            showVideo(index);

        });


        item.addEventListener("mouseleave", () => {

            isHovering = false;

            startRotation();

        });

    });


    /* =====================================================
       INITIAL STATE
       ===================================================== */

    showVideo(0);
    startRotation();

});


/* =========================================================
   BACK TO TOP
   ========================================================= */

const backToTop = document.querySelector(".back-to-top");

if (backToTop) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            backToTop.classList.add("is-visible");
        } else {
            backToTop.classList.remove("is-visible");
        }

    });

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}

/* =========================================================
   ABOUT AES — SCROLL ANIMATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const aboutSection =
        document.querySelector("#about");

    if (!aboutSection) return;


    const points =
        aboutSection.querySelectorAll(
            ".about-aes-point"
        );


    if (!points.length) return;


    const observer =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;


                    aboutSection.classList.add(
                        "is-visible"
                    );


                    points.forEach((point, index) => {

                        setTimeout(() => {

                            point.classList.add(
                                "is-active"
                            );

                        }, index * 500);

                    });


                    observer.unobserve(
                        aboutSection
                    );

                });

            },
            {
                threshold: 0.25
            }
        );


    observer.observe(aboutSection);

});

/* =========================================================
   TECHNOLOGY — TABS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const options = document.querySelectorAll(".technology-option");
    const image = document.getElementById("technologyPreviewImage");
    const title = document.getElementById("technologyPreviewTitle");
    const description = document.getElementById("technologyPreviewDescription");

    if (!options.length || !image || !title || !description) {
        return;
    }

    options.forEach(function (option) {

        option.addEventListener("click", function () {

            /* ACTIVE TAB */

            options.forEach(function (item) {
                item.classList.remove("is-active");
                item.setAttribute("aria-selected", "false");
            });

            option.classList.add("is-active");
            option.setAttribute("aria-selected", "true");


            /* DATA */

            const newImage = option.getAttribute("data-technology-image");
            const newTitle = option.getAttribute("data-technology-title");
            const newDescription = option.getAttribute("data-technology-description");
            const newAlt = option.getAttribute("data-technology-alt");


            /* IMAGE TRANSITION */

            image.classList.add("is-changing");


            setTimeout(function () {

                image.src = newImage;
                image.alt = newAlt;

                title.textContent = newTitle;
                description.textContent = newDescription;

                image.classList.remove("is-changing");

            }, 180);

        });

    });

});

/* =========================================================
   PROJECTS PDF MODAL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const openButton =
        document.getElementById("openProjectsPdf");

    const modal =
        document.getElementById("projectsPdfModal");

    const closeButton =
        document.getElementById("closeProjectsPdf");

    const overlay =
        modal
            ? modal.querySelector(".pdf-modal-overlay")
            : null;


    if (
        !openButton ||
        !modal ||
        !closeButton ||
        !overlay
    ) {
        return;
    }


    /* =====================================================
       OPEN PDF
    ===================================================== */

    openButton.addEventListener(
        "click",
        function () {

            modal.classList.add("is-open");

            modal.setAttribute(
                "aria-hidden",
                "false"
            );

            document.body.classList.add(
                "pdf-modal-open"
            );

        }
    );


    /* =====================================================
       CLOSE PDF
    ===================================================== */

    function closePdfModal() {

        modal.classList.remove("is-open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "pdf-modal-open"
        );

    }


    closeButton.addEventListener(
        "click",
        closePdfModal
    );


    overlay.addEventListener(
        "click",
        closePdfModal
    );


    /* =====================================================
       ESC
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                modal.classList.contains("is-open")
            ) {

                closePdfModal();

            }

        }
    );

});


/* =========================================================
   SOLUTIONS — OPEN / CLOSE DETAIL PAGES
========================================================= */

document.addEventListener("click", function (event) {

    const arrow = event.target.closest(".solution-arrow");

    if (!arrow) return;

    event.preventDefault();
    event.stopPropagation();


    const card = arrow.closest(".solution-card");

    if (!card) return;


    let solution = arrow.getAttribute("data-solution");


    if (!solution) {

        if (card.classList.contains("solution-power")) {
            solution = "power";
        }

        else if (card.classList.contains("solution-chp")) {
            solution = "chp";
        }

        else if (card.classList.contains("solution-gas")) {
            solution = "gas";
        }

        else if (card.classList.contains("solution-modular")) {
            solution = "modular";
        }

        else if (card.classList.contains("solution-grid-support")) {
            solution = "grid";
        }

        else if (card.classList.contains("solution-industrial")) {
            solution = "industrial";
        }

    }


    if (!solution) return;


    const detail =
        document.getElementById("solutionDetails");

    if (!detail) {
        console.error("solutionDetails NOT FOUND");
        return;
    }


    const pages =
        detail.querySelectorAll(".solution-detail-page");


    pages.forEach(function (page) {
        page.classList.remove("is-active");
    });


    const selectedPage =
        detail.querySelector(
            '[data-solution-page="' + solution + '"]'
        );


    if (!selectedPage) {
        console.error(
            "DETAIL PAGE NOT FOUND:",
            solution
        );
        return;
    }


    selectedPage.classList.add("is-active");

    detail.classList.add("is-open");

    document.body.classList.add("solution-detail-open");

    detail.scrollTop = 0;

});



/* =========================================================
   BACK TO SOLUTIONS
========================================================= */

document.addEventListener("click", function (event) {

    const back =
        event.target.closest(".solution-detail-back");

    if (!back) return;


    const detail =
        document.getElementById("solutionDetails");

    if (!detail) return;


    detail.classList.remove("is-open");

    document.body.classList.remove("solution-detail-open");

});



/* =========================================================
   ESC — CLOSE
========================================================= */

document.addEventListener("keydown", function (event) {

    if (event.key !== "Escape") return;


    const detail =
        document.getElementById("solutionDetails");

    if (!detail) return;


    detail.classList.remove("is-open");

    document.body.classList.remove("solution-detail-open");

});