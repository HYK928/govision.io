document.addEventListener("DOMContentLoaded", function () {
    // Initialize Lenis
    const lenis = new Lenis();

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Text animations for elements with 'reveal-type' class
    const revealTypeElements = document.querySelectorAll('.reveal-type');
    revealTypeElements.forEach((char) => {
        const text = new SplitType(char, { types: 'chars' });

        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: char,
                start: 'top 80%',
                end: 'top 20%',
                scrub: true,
                markers: true  // Enable markers for debugging
            },
            opacity: 0.2,
            stagger: 0.1
        });
    });

    // Text animations for elements with 'self-oled' class
    const selfOledElements = document.querySelectorAll('.self-oled');

    revealTypeElements.forEach((revealTypeElement) => {
        ScrollTrigger.create({
            trigger: revealTypeElement,
            end: 'bottom center',
            onEnter: () => {
                selfOledElements.forEach((selfOledElement) => {
                    const text = new SplitType(selfOledElement, { types: 'chars' });

                    gsap.from(text.chars, {
                        scrollTrigger: {
                            trigger: selfOledElement,
                            start: 'top 100%',  // Start when top of the element is at the bottom of the viewport
                            end: 'top 20%',
                            scrub: true,
                            markers: true  // Enable markers for debugging
                        },
                        y: 100,
                        opacity: 0,
                        stagger: 0.1,
                    });
                });
            }
        });
    });

    // Lottie animation for '.animation' class
    let lottieAnimationContainers = document.querySelectorAll(".animation");

    if (lottieAnimationContainers) {
        lottieAnimationContainers.forEach(container => {
            LottieScrollTrigger({
                trigger: container,
                start: "top center",
                endTrigger: ".end-lottie",
                end: `bottom center+=${container.offsetHeight}`,
                renderer: "svg",
                target: container,
                path: "vid1.json",
                scrub: 1,
            });
        });
    }

    // Lottie animation for '.meta-technology' class
    let metaTechnologyContainers = document.querySelectorAll(".meta-technology");

    metaTechnologyContainers.forEach(container => {
        LottieScrollTrigger({
            trigger: container,
            start: "top center",
            endTrigger: ".end-lottie",
            end: `bottom center+=${container.offsetHeight}`,
            renderer: "svg",
            target: container,
            path: "meta technology.json",
            scrub: 1,
        });
    });

    // LottieScrollTrigger function definition
    function LottieScrollTrigger(vars) {
        let playhead = { frame: 0 },
            target = gsap.utils.toArray(vars.target)[0],
            speeds = { slow: "+=2000", medium: "+=1000", fast: "+=500" },
            st = {
                trigger: ".trigger",
                end: speeds[vars.speed] || "+=1000",
                scrub: 1,
                markers: false,
            },
            ctx = gsap.context && gsap.context(),
            animation = lottie.loadAnimation({
                container: target,
                renderer: vars.renderer || "svg",
                loop: false,
                autoplay: false,
                path: vars.path,
                rendererSettings: vars.rendererSettings || {
                    preserveAspectRatio: "xMidYMid slice"
                },
            });

        for (let p in vars) {
            st[p] = vars[p];
        }

        animation.addEventListener("DOMLoaded", function () {
            let createTween = function () {
                animation.frameTween = gsap.to(playhead, {
                    frame: animation.totalFrames - 1,
                    ease: "none",
                    onUpdate: () => animation.goToAndStop(playhead.frame, true),
                    scrollTrigger: st,
                });
                return () => animation.destroy && animation.destroy();
            };
            ctx && ctx.add ? ctx.add(createTween) : createTween();
        });

        return animation;
    }
});
