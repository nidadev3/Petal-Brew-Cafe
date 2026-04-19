const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name    = document.getElementById("nameInput").value.trim();
    const email   = document.getElementById("emailInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill in all fields!");
        return;
    }

    const response = await fetch("https://localhost:7262/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message })
    });

    if (!response.ok) {
        alert("Something went wrong!");
        return;
    }

    alert("Message sent successfully!");
    form.reset();
});