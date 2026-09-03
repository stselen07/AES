document.addEventListener("DOMContentLoaded", function () {

    /* =========================================================
       SECTION NAVIGATION
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

    const heroSlides =
        document.querySelectorAll(".hero-slide");

    const heroImages = [
        "../images/gas-turbine-siemens-III.jpg",
        "../images/heroFoto-2.jpg",
        "../images/heroFoto-3.jpg"
    ];

    heroSlides.forEach(function (slide, index) {

        if (heroImages[index]) {

            slide.style.backgroundImage =
                'url("' + heroImages[index] + '")';

        }

    });

    if (heroSlides.length) {

        let currentSlide = 0;

        heroSlides[0].classList.add("active");

        if (heroSlides.length > 1) {

            setInterval(function () {

                heroSlides[currentSlide]
                    .classList.remove("active");

                currentSlide++;

                if (currentSlide >= heroSlides.length) {
                    currentSlide = 0;
                }

                heroSlides[currentSlide]
                    .classList.add("active");

            }, 8000);

        }

    }


    /* =========================================================
       ENERGY POTENTIAL — OPEN / CLOSE
    ========================================================= */

    const calculatorButtons =
        document.querySelectorAll(
            "[data-open-calculator]"
        );

    const calculatorArea =
        document.querySelector(
            "#energy-calculator"
        );

    const calculatorPanels =
        document.querySelectorAll(
            "[data-calculator-panel]"
        );

    const closeCalculatorButtons =
        document.querySelectorAll(
            ".calculator-close"
        );


    calculatorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (!calculatorArea) return;

            const calculatorName =
                button.getAttribute(
                    "data-open-calculator"
                );

            calculatorPanels.forEach(function (panel) {

                panel.classList.remove("is-active");

            });

            const targetPanel =
                document.querySelector(
                    '[data-calculator-panel="' +
                    calculatorName +
                    '"]'
                );

            if (!targetPanel) return;

            targetPanel.classList.add("is-active");

            calculatorArea.classList.add("is-visible");

        });

    });


    closeCalculatorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            if (!calculatorArea) return;

            calculatorArea.classList.remove(
                "is-visible"
            );

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

        calculatePowerButton.addEventListener(
            "click",
            function () {

                const powerInput =
                    document.querySelector("#powerInput");

                const hoursInput =
                    document.querySelector("#powerHours");

                const result =
                    document.querySelector("#powerResult");

                if (!powerInput || !hoursInput || !result) {
                    return;
                }

                const power =
                    parseFloat(powerInput.value);

                const hours =
                    parseFloat(hoursInput.value);

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

                result.textContent =
                    annualGeneration.toFixed(1);

            }
        );

    }


    /* =========================================================
       CHP CALCULATOR
    ========================================================= */

    const calculateCHPButton =
        document.querySelector("#calculateCHP");

    if (calculateCHPButton) {

        calculateCHPButton.addEventListener(
            "click",
            function () {

                const powerInput =
                    document.querySelector("#chpPower");

                const hoursInput =
                    document.querySelector("#chpHours");

                const result =
                    document.querySelector("#chpResult");

                if (!powerInput || !hoursInput || !result) {
                    return;
                }

                const power =
                    parseFloat(powerInput.value);

                const hours =
                    parseFloat(hoursInput.value);

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

                result.textContent =
                    annualGeneration.toFixed(1);

            }
        );

    }


    /* =========================================================
       FLARE GAS ASSESSMENT
    ========================================================= */

    const flareAssessmentButton =
        document.querySelector("#flareAssessment");

    if (flareAssessmentButton) {

        flareAssessmentButton.addEventListener(
            "click",
            function () {

                const flareFlow =
                    document.querySelector("#flareFlow");

                const flareComposition =
                    document.querySelector(
                        "#flareComposition"
                    );

                const flareMessage =
                    document.querySelector(
                        "#flareMessage"
                    );

                if (
                    !flareFlow ||
                    !flareComposition ||
                    !flareMessage
                ) {
                    return;
                }

                if (
                    flareFlow.value === "" ||
                    flareComposition.value === ""
                ) {

                    flareMessage.classList.remove(
                        "is-visible"
                    );

                    alert(
                        "Будь ласка, вкажіть обсяг газу та його тип."
                    );

                    return;

                }

                flareMessage.classList.add(
                    "is-visible"
                );

                flareMessage.scrollIntoView({
                    behavior: "auto",
                    block: "nearest"
                });

            }
        );

    }


    /* =========================================================
       GAS APPLICATIONS
    ========================================================= */

    const gasTypes =
        document.querySelectorAll(".gas-type");

    const selectedGas =
        document.querySelector("#selectedGas");

    gasTypes.forEach(function (gasType) {

        gasType.addEventListener(
            "click",
            function () {

                gasTypes.forEach(function (item) {

                    item.classList.remove("active");

                });

                gasType.classList.add("active");

                if (selectedGas) {

                    selectedGas.textContent =
                        gasType.getAttribute("data-gas");

                }

            }
        );

    });


    /* =========================================================
       FLARE GAS CALCULATOR
    ========================================================= */

    const flareCalculator =
        document.querySelector(
            '[data-calculator="flare"]'
        );

    if (flareCalculator) {

        const gasFlowInput =
            flareCalculator.querySelector(
                'input[name="gas-flow"], #gasFlow'
            );

        const gasTypeSelect =
            flareCalculator.querySelector(
                'select[name="gas-type"], #gasType'
            );

        const operatingHoursInput =
            flareCalculator.querySelector(
                'input[name="operating-hours"], #operatingHours'
            );

        const resultBox =
            flareCalculator.querySelector(
                ".flare-result"
            );

        const resultPower =
            flareCalculator.querySelector(
                ".flare-result-power b"
            );

        const resultConfiguration =
            flareCalculator.querySelector(
                ".flare-result-main > strong"
            );

        const resultOutput =
            flareCalculator.querySelector(
                ".flare-result-stats div:nth-child(1) strong"
            );

        const resultHeat =
            flareCalculator.querySelector(
                ".flare-result-stats div:nth-child(2) strong"
            );

        const resultOperation =
            flareCalculator.querySelector(
                ".flare-result-stats div:nth-child(3) strong"
            );


        function updateFlareResult() {

            if (!gasFlowInput || !resultPower) {
                return;
            }

            const gasFlow =
                parseFloat(
                    gasFlowInput.value.replace(",", ".")
                ) || 0;

            const hours =
                operatingHoursInput
                    ? Math.max(
                        0,
                        parseFloat(
                            operatingHoursInput.value
                                .replace(",", ".")
                        ) || 8000
                    )
                    : 8000;


            if (resultBox) {

                resultBox.classList.add(
                    "is-updating"
                );

                setTimeout(function () {

                    resultBox.classList.remove(
                        "is-updating"
                    );

                }, 250);

            }


            if (gasFlow <= 0) {

                resultPower.textContent = "—";

                if (resultConfiguration) {
                    resultConfiguration.textContent =
                        "Очікуємо дані";
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


            const referenceFlow = 10000;
            const referencePower = 8.6;

            let estimatedPower =
                (gasFlow / referenceFlow) *
                referencePower;

            estimatedPower =
                Math.max(
                    0,
                    Math.min(250, estimatedPower)
                );

            const powerText =
                estimatedPower.toFixed(1);

            resultPower.textContent =
                powerText;

            if (resultOutput) {
                resultOutput.textContent =
                    powerText + " MW";
            }

            if (resultHeat) {
                resultHeat.textContent =
                    "CHP";
            }

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

            let engineCount =
                Math.ceil(
                    estimatedPower / 4.3
                );

            engineCount =
                Math.max(
                    1,
                    Math.min(20, engineCount)
                );

            if (resultConfiguration) {

                resultConfiguration.textContent =
                    engineCount +
                    " × AES 908 G/C";

            }

        }


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

        updateFlareResult();

    }


    /* =========================================================
       PROJECTS — AUTO ROTATION
    ========================================================= */

  const projectCards =
        document.querySelectorAll(
            "#projects .project-card"
        );

console.log("PROJECT CARDS:", projectCards.length);

    if (projectCards.length) {

        let currentProject = 0;

        projectCards.forEach(function (card) {

            card.classList.remove("is-active");

        });

        projectCards[0].classList.add("is-active");


        setInterval(function () {

            projectCards[currentProject]
                .classList.remove("is-active");

            currentProject++;

            if (
                currentProject >=
                projectCards.length
            ) {
                currentProject = 0;
            }

            projectCards[currentProject]
                .classList.add("is-active");

        }, 5000);

    }


    /* =========================================================
       APPLICATIONS — VIDEO
    ========================================================= */

    const applicationsTrack =
        document.querySelector(
            ".applications-track"
        );

    const applicationItems =
        document.querySelectorAll(
            ".application-item"
        );

    const applicationsPreview =
        document.querySelector(
            ".applications-preview"
        );

    const applicationsVideo =
        document.querySelector(
            ".applications-preview-video"
        );


    if (
        applicationsTrack &&
        applicationItems.length &&
        applicationsPreview &&
        applicationsVideo
    ) {

        let currentIndex = 0;
        let rotationTimer = null;
        let isHovering = false;
        let isAnimating = false;


        function showApplication(index) {

            const item =
                applicationItems[index];

            if (!item) return;

            const source =
                item.getAttribute("data-video");

            if (!source) return;

            currentIndex = index;

            applicationItems.forEach(
                function (element, i) {

                    element.classList.toggle(
                        "is-active",
                        i === index
                    );

                }
            );

            applicationsVideo.src = source;
            applicationsVideo.load();

            applicationsTrack.classList.add(
                "is-previewing"
            );

            applicationsPreview.classList.remove(
                "is-exiting",
                "is-entering"
            );

            applicationsPreview.classList.add(
                "is-visible"
            );

            applicationsVideo.play().catch(
                function () {}
            );

        }


        function changeApplication() {

            if (
                isHovering ||
                isAnimating
            ) {
                return;
            }

            isAnimating = true;

            applicationsPreview.classList.add(
                "is-exiting"
            );


            setTimeout(function () {

                if (isHovering) {

                    isAnimating = false;
                    return;

                }

                applicationsPreview.classList.remove(
                    "is-visible"
                );

                applicationsVideo.pause();

            }, 650);


            setTimeout(function () {

                if (isHovering) {

                    isAnimating = false;
                    return;

                }

                currentIndex =
                    (currentIndex + 1) %
                    applicationItems.length;

                const nextItem =
                    applicationItems[
                        currentIndex
                    ];

                const nextSource =
                    nextItem.getAttribute(
                        "data-video"
                    );


                applicationItems.forEach(
                    function (element, i) {

                        element.classList.toggle(
                            "is-active",
                            i === currentIndex
                        );

                    }
                );


                applicationsVideo.src =
                    nextSource;

                applicationsVideo.load();

                applicationsPreview.classList.remove(
                    "is-exiting"
                );

                applicationsPreview.classList.add(
                    "is-entering",
                    "is-visible"
                );

                applicationsTrack.classList.add(
                    "is-previewing"
                );

                applicationsVideo.play().catch(
                    function () {}
                );

            }, 1150);


            setTimeout(function () {

                applicationsPreview.classList.remove(
                    "is-entering"
                );

                isAnimating = false;

            }, 1650);

        }


        function startApplicationRotation() {

            clearInterval(
                rotationTimer
            );

            rotationTimer =
                setInterval(
                    changeApplication,
                    3000
                );

        }


        applicationItems.forEach(
            function (item, index) {

                item.addEventListener(
                    "mouseenter",
                    function () {

                        isHovering = true;

                        clearInterval(
                            rotationTimer
                        );

                        isAnimating = false;

                        applicationsPreview.classList.remove(
                            "is-exiting",
                            "is-entering"
                        );

                        showApplication(index);

                    }
                );


                item.addEventListener(
                    "mouseleave",
                    function () {

                        isHovering = false;

                        startApplicationRotation();

                    }
                );

            }
        );


        showApplication(0);
        startApplicationRotation();

    }


    /* =========================================================
       BACK TO TOP
    ========================================================= */

    const backToTop =
        document.querySelector(
            ".back-to-top"
        );

    if (backToTop) {

        window.addEventListener(
            "scroll",
            function () {

                if (window.scrollY > 500) {

                    backToTop.classList.add(
                        "is-visible"
                    );

                } else {

                    backToTop.classList.remove(
                        "is-visible"
                    );

                }

            }
        );


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =========================================================
       ABOUT AES — SCROLL ANIMATION
    ========================================================= */

    const aboutSection =
        document.querySelector("#about");

    if (
        aboutSection &&
        "IntersectionObserver" in window
    ) {

        const points =
            aboutSection.querySelectorAll(
                ".about-aes-point"
            );

        if (points.length) {

            const observer =
                new IntersectionObserver(
                    function (entries) {

                        entries.forEach(
                            function (entry) {

                                if (
                                    !entry.isIntersecting
                                ) {
                                    return;
                                }

                                aboutSection.classList.add(
                                    "is-visible"
                                );

                                points.forEach(
                                    function (
                                        point,
                                        index
                                    ) {

                                        setTimeout(
                                            function () {

                                                point.classList.add(
                                                    "is-active"
                                                );

                                            },
                                            index * 500
                                        );

                                    }
                                );

                                observer.unobserve(
                                    aboutSection
                                );

                            }
                        );

                    },
                    {
                        threshold: 0.25
                    }
                );

            observer.observe(
                aboutSection
            );

        }

    }


    /* =========================================================
       TECHNOLOGY — TABS
    ========================================================= */

    const technologyOptions =
        document.querySelectorAll(
            ".technology-option"
        );

    const technologyImage =
        document.getElementById(
            "technologyPreviewImage"
        );

    const technologyTitle =
        document.getElementById(
            "technologyPreviewTitle"
        );

    const technologyDescription =
        document.getElementById(
            "technologyPreviewDescription"
        );


    if (
        technologyOptions.length &&
        technologyImage &&
        technologyTitle &&
        technologyDescription
    ) {

        technologyOptions.forEach(
            function (option) {

                option.addEventListener(
                    "click",
                    function () {

                        technologyOptions.forEach(
                            function (item) {

                                item.classList.remove(
                                    "is-active"
                                );

                                item.setAttribute(
                                    "aria-selected",
                                    "false"
                                );

                            }
                        );


                        option.classList.add(
                            "is-active"
                        );

                        option.setAttribute(
                            "aria-selected",
                            "true"
                        );


                        const image =
                            option.getAttribute(
                                "data-technology-image"
                            );

                        const title =
                            option.getAttribute(
                                "data-technology-title"
                            );

                        const description =
                            option.getAttribute(
                                "data-technology-description"
                            );

                        const alt =
                            option.getAttribute(
                                "data-technology-alt"
                            );


                        if (image) {

                            technologyImage.classList.add(
                                "is-changing"
                            );

                            setTimeout(
                                function () {

                                    technologyImage.src =
                                        image;

                                    if (alt) {
                                        technologyImage.alt =
                                            alt;
                                    }

                                    technologyImage.classList.remove(
                                        "is-changing"
                                    );

                                },
                                180
                            );

                        }


                        if (title) {

                            technologyTitle.textContent =
                                title;

                        }

                        if (description) {

                            technologyDescription.textContent =
                                description;

                        }

                    }
                );

            }
        );

    }

});