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
        "../images/gas-turbine-siemens-III.jpg",
        "../images/heroFoto-2.jpg",
        "../images/heroFoto-3.jpg"
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
        document.querySelectorAll("[data-open-calculator]");

    const calculatorArea =
        document.querySelector("#energy-calculator");

    const calculatorPanels =
        document.querySelectorAll("[data-calculator-panel]");

    const closeCalculatorButtons =
        document.querySelectorAll(".calculator-close");


    calculatorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const calculatorName =
                button.dataset.openCalculator;

            if (!calculatorArea) return;

            calculatorPanels.forEach(function (panel) {

                panel.classList.remove("is-active");

            });

            const targetPanel =
                document.querySelector(
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

        calculatePowerButton.addEventListener(
            "click",
            function () {

                const power =
                    parseFloat(
                        document.querySelector("#powerInput").value
                    );

                const hours =
                    parseFloat(
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

                const result =
                    document.querySelector("#powerResult");

                if (result) {

                    result.textContent =
                        annualGeneration.toFixed(1);

                }

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

                const power =
                    parseFloat(
                        document.querySelector("#chpPower").value
                    );

                const hours =
                    parseFloat(
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

                const result =
                    document.querySelector("#chpResult");

                if (result) {

                    result.textContent =
                        annualGeneration.toFixed(1);

                }

            }
        );

    }


    /* =========================================================
       FLARE GAS CALCULATOR
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
                    document.querySelector("#flareComposition");

                const flareMessage =
                    document.querySelector("#flareMessage");

                if (!flareFlow || !flareComposition) return;

                if (
                    flareFlow.value === "" ||
                    flareComposition.value === ""
                ) {

                    if (flareMessage) {

                        flareMessage.classList.remove(
                            "is-visible"
                        );

                    }

                    alert(
                        "Bitte geben Sie den Gasdurchfluss und den Gastyp an."
                    );

                    return;
                }

                if (flareMessage) {

                    flareMessage.classList.add(
                        "is-visible"
                    );

                    flareMessage.scrollIntoView({
                        behavior: "auto",
                        block: "nearest"
                    });

                }

            }
        );

    }


    /* =========================================================
       GAS APPLICATIONS — INTERACTIVE TYPES
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

                const gasName =
                    gasType.dataset.gas;

                if (selectedGas) {

                    selectedGas.textContent =
                        gasName;

                }

            }
        );

    });


    /* =========================================================
       FLARE GAS — LIVE RESULT
    ========================================================= */

    const flareCalculator =
        document.querySelector(
            '[data-calculator="flare"]'
        );

    if (flareCalculator) {

        const gasFlowInput =
            flareCalculator.querySelector(
                'input[name="gas-flow"], #gasFlow, #flareFlow'
            );

        const gasTypeSelect =
            flareCalculator.querySelector(
                'select[name="gas-type"], #gasType, #flareComposition'
            );

        const operatingHoursInput =
            flareCalculator.querySelector(
                'input[name="operating-hours"], #operatingHours, #flareHours'
            );

        const resultBox =
            flareCalculator.querySelector(".flare-result");

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

            if (!gasFlowInput || !resultPower) return;

            const gasFlow =
                parseFloat(
                    gasFlowInput.value.replace(",", ".")
                ) || 0;

            let hours = 8000;

            if (operatingHoursInput) {

                hours =
                    parseFloat(
                        operatingHoursInput.value
                            .replace(",", ".")
                    ) || 8000;

            }

            hours = Math.max(0, hours);


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
                        "Daten erforderlich";
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
                    Math.min(
                        250,
                        estimatedPower
                    )
                );

            const powerText =
                estimatedPower.toFixed(1);


            resultPower.textContent =
                powerText;


            if (resultOutput) {

                resultOutput.textContent =
                    `${powerText} MW`;

            }


            if (resultHeat) {

                resultHeat.textContent =
                    "KWK";

            }


            if (resultOperation) {

                if (hours >= 7000) {

                    resultOperation.textContent =
                        "GRUNDLAST";

                } else if (hours >= 4000) {

                    resultOperation.textContent =
                        "FLEXIBEL";

                } else {

                    resultOperation.textContent =
                        "SPITZENLAST";

                }

            }


            let engineCount =
                Math.ceil(
                    estimatedPower / 4.3
                );

            engineCount =
                Math.max(
                    1,
                    Math.min(
                        20,
                        engineCount
                    )
                );


            if (resultConfiguration) {

                resultConfiguration.textContent =
                    `${engineCount} × AES 908 G/C`;

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
       PROJECTS — AUTO CARD ROTATION
    ========================================================= */

    const projectCards =
        document.querySelectorAll(
            "#projects .project-card"
        );

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
       TECHNOLOGY
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


                        technologyImage.classList.add(
                            "is-changing"
                        );


                        setTimeout(
                            function () {

                                technologyImage.src =
                                    image;

                                technologyImage.alt =
                                    alt;

                                technologyTitle.textContent =
                                    title;

                                technologyDescription.textContent =
                                    description;

                                technologyImage.classList.remove(
                                    "is-changing"
                                );

                            },
                            180
                        );

                    }
                );

            }
        );

    }


    /* =========================================================
       APPLICATIONS — VIDEO ROTATION
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


        function showApplicationVideo(index) {

            const item =
                applicationItems[index];

            if (!item) return;

            const source =
                item.dataset.video;

            if (!source) return;

            currentIndex = index;


            applicationItems.forEach(
                function (el, i) {

                    el.classList.toggle(
                        "is-active",
                        i === index
                    );

                }
            );


            applicationsVideo.src =
                source;

            applicationsVideo.currentTime =
                0;


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


            applicationsVideo
                .play()
                .catch(function () {});

        }


        function hideApplicationVideo() {

            applicationsPreview.classList.remove(
                "is-visible"
            );

            applicationsPreview.classList.add(
                "is-exiting"
            );

            applicationsVideo.pause();

        }


        function changeApplicationVideo() {

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
                    (
                        currentIndex + 1
                    ) %
                    applicationItems.length;


                const nextItem =
                    applicationItems[
                        currentIndex
                    ];

                const nextSource =
                    nextItem.dataset.video;


                applicationItems.forEach(
                    function (el, i) {

                        el.classList.toggle(
                            "is-active",
                            i === currentIndex
                        );

                    }
                );


                applicationsVideo.src =
                    nextSource;

                applicationsVideo.currentTime =
                    0;


                applicationsPreview.classList.remove(
                    "is-exiting"
                );

                applicationsPreview.classList.add(
                    "is-entering"
                );

                applicationsPreview.classList.add(
                    "is-visible"
                );

                applicationsTrack.classList.add(
                    "is-previewing"
                );


                applicationsVideo
                    .play()
                    .catch(function () {});


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
                    function () {

                        changeApplicationVideo();

                    },
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

                        showApplicationVideo(
                            index
                        );

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


        showApplicationVideo(0);

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
        document.querySelector(
            "#about"
        );

    if (aboutSection) {

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

                            },
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

});

/* =========================================================
   SOLUTION DETAIL PAGES
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const solutionArrows =
        document.querySelectorAll(".solution-arrow");

    const solutionDetail =
        document.getElementById("solutionDetails");

    const solutionPages =
        document.querySelectorAll(".solution-detail-page");

    const solutionBackButtons =
        document.querySelectorAll(".solution-detail-back");


    if (
        !solutionArrows.length ||
        !solutionDetail ||
        !solutionPages.length
    ) {
        return;
    }


    /* OPEN SOLUTION */

    solutionArrows.forEach(function (arrow) {

        arrow.addEventListener("click", function () {

            const solution =
                arrow.getAttribute("data-solution");


            solutionPages.forEach(function (page) {

                page.classList.remove("is-active");

            });


            const selectedPage =
                document.querySelector(
                    '[data-solution-page="' + solution + '"]'
                );


            if (!selectedPage) {
                return;
            }


            selectedPage.classList.add("is-active");

            solutionDetail.classList.add("is-open");

            document.body.classList.add(
                "solution-detail-open"
            );

            solutionDetail.scrollTop = 0;

        });

    });



    /* BACK */

    solutionBackButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            solutionDetail.classList.remove("is-open");

            document.body.classList.remove(
                "solution-detail-open"
            );


            setTimeout(function () {

                solutionPages.forEach(function (page) {

                    page.classList.remove("is-active");

                });

            }, 450);

        });

    });



    /* ESC */

    document.addEventListener("keydown", function (event) {

        if (
            event.key === "Escape" &&
            solutionDetail.classList.contains("is-open")
        ) {

            solutionDetail.classList.remove("is-open");

            document.body.classList.remove(
                "solution-detail-open"
            );

        }

    });

});