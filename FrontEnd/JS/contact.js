console.log("contact.js loaded!");
console.log(form);
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();

const response = await fetch("https://localhost:7262/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    });

    if (response.ok) {
        alert("Message sent!");
        form.reset();
    } else {
        alert("Error!");
    }
});