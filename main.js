const selectElement = (element) => document.querySelector(element);

selectElement('.mobile-menu').addEventListener('click', () =>{
    selectElement('header').classList.toggle('active');
});
document.addEventListener("DOMContentLoaded", function () {
    const backToTopButton = document.querySelector(".back-to-top");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTopButton.style.display = "flex";
            backToTopButton.style.opacity = "1";
            backToTopButton.style.visibility = "visible";
        } else {
            backToTopButton.style.opacity = "0";
            backToTopButton.style.visibility = "hidden";
            backToTopButton.style.display = "none";
        }
    });

    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
