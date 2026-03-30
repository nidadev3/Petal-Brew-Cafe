const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    const activePage = window.location.pathname;

    const normalize = (path) => (path === "/" ? "/index.html" : path);

    if (normalize(linkPath) === normalize(activePage)) {
        link.classList.add("border-b-2", "border-[#e06c9f]", "text-[#e06c9f]");
    }
});