// Active Nav Links
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

// Add to Cart Alert  
const cartButtons = document.querySelectorAll(".cart-btn");
cartButtons.forEach(button => {
    button.addEventListener("click", () => {
        alert(" Added to Cart!");
    });
});

//  Menu Filter Buttons
const filterBtns = document.querySelectorAll(".filter-btn");
filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
            b.classList.remove("bg-[#efb5ce]", "text-[#582f0e]");
            b.classList.add("bg-[#6e9887]", "text-[#d9e0cb]");
        });
        btn.classList.remove("bg-[#6e9887]", "text-[#d9e0cb]");
        btn.classList.add("bg-[#efb5ce]", "text-[#582f0e]");

        const filter = btn.dataset.filter;
        if (filter !== "all") {
            document.getElementById(filter).scrollIntoView({ behavior: "smooth" });
        } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
});