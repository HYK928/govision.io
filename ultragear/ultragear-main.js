function toggleMenu() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
}
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
                markers: false  // Enable markers for debugging
            },
            opacity: 0,
            stagger: 0.1
        });
    });

    // Text animations for elements with 'self-oled' class
    const selfOledElements = document.querySelectorAll('.self-oled-title, .self-oled-context');

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
                            markers: false  // Enable markers for debugging
                        },
                        opacity: 0,
                        stagger: 0.1,
                    });
                });
            }
        });
    });

    // Text animations for elements with 'natural-image' class
    const naturalImageElements = document.querySelectorAll('.natural-image');

    naturalImageElements.forEach((naturalImageElement) => {
        gsap.fromTo(naturalImageElement,
            {
                opacity: 0,
                scale: 0.6
            },
            {
                opacity: 1,
                scale: 1,
                scrollTrigger: {
                    trigger: naturalImageElement,
                    start: 'top 50%',  // Start 10% later
                    end: 'top 20%',
                    scrub: true,
                    markers: false  // Enable markers for debugging
                }
            }
        );
    });

    const LightfastElements = document.querySelectorAll('.Light-fast-response-title, .Light-fast-response-context');

    revealTypeElements.forEach((revealTypeElement) => {
        ScrollTrigger.create({
            trigger: revealTypeElement,
            end: 'bottom center',
            onEnter: () => {
                LightfastElements.forEach((LightfastElement) => {
                    const text = new SplitType(LightfastElement, { types: 'chars' });

                    gsap.from(text.chars, {
                        scrollTrigger: {
                            trigger: LightfastElement,
                            start: 'top 100%',  // Start when top of the element is at the bottom of the viewport
                            end: 'top 0%',
                            scrub: true,
                            markers: false  // Enable markers for debugging
                        },
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
                start: "top 10%",
                endTrigger: ".end-lottie",
                end: `bottom center+=${container.offsetHeight}`,
                renderer: "svg",
                target: container,
                path: "built for speed.json",
                scrub: 1,
            });
        });
    }

    // Lottie animation for '.meta-technology' class
    let metaTechnologyContainers = document.querySelectorAll(".meta-technology");

    metaTechnologyContainers.forEach(container => {
        LottieScrollTrigger({
            trigger: container,
            start: "top 165%",
            endTrigger: ".self-oled-title",
            end: `bottom center+=${container.offsetHeight}`,
            renderer: "svg",
            target: container,
            path: "meta technology_4.json",
            scrub: 1,
            onLeave: () => {
                // Trigger the next section's animations or visibility
                ScrollTrigger.refresh();  // Refresh ScrollTrigger instances
            }
        });
    });

    let lightSpeedContainers = document.querySelectorAll(".light-speed");

    lightSpeedContainers.forEach(container => {
        LottieScrollTrigger({
            trigger: container,
            start: "top 100%",
            end: "bottom bottom",
            renderer: "svg",
            target: container,
            path: "light-speed.json",
            scrub: 1,
            onLeave: () => {
                // Trigger the next section's animations or visibility
                ScrollTrigger.refresh();  // Refresh ScrollTrigger instances
            }
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
