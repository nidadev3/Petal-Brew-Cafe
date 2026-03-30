
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    const activePage = window.location.pathname;
    const normalize = (path) => (path === "/" ? "/index.html" : path);

    if (normalize(linkPath) === normalize(activePage)) {
        if (link.textContent.trim() === "Contact Us") {
            link.classList.remove("bg-[#6e9887]", "text-[#d9e0cb]");
            link.classList.add("bg-[#efb5ce]", "text-[#582f0e]");
        } else {
            link.classList.add("border-b-2", "border-[#e06c9f]", "text-[#e06c9f]");
        }
    }
});

//  Add to Cart Alert  
const cartButtons = document.querySelectorAll(".cart-btn");
cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        alert("Hi Sweetie! Your item is added to Cart!");
    });
});
