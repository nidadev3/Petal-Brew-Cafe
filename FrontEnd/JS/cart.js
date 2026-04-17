
const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartItems");
const emptyMsg      = document.getElementById("emptyMsg");
const totalPrice    = document.getElementById("totalPrice");
const clearBtn      = document.getElementById("clearCart");
const cartBottom    = document.getElementById("cartBottom");
const checkoutBtn   = document.getElementById("checkoutBtn");


// ---------------- TOTAL CALCULATION ----------------
function calculateTotal() {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;

    updatedCart.forEach(item => {
        total += parseInt(item.price.replace(/\D/g, "")) * item.qty;
    });

    totalPrice.textContent = `Rs ${total}`;
}


// ---------------- QUANTITY CHANGE ----------------
function changeQty(name, change) {
    let currentCart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = currentCart.findIndex(i => i.name === name);

    if (index !== -1) {
        currentCart[index].qty += change;

        if (currentCart[index].qty <= 0) {
            currentCart.splice(index, 1);
        }
    }

    localStorage.setItem("cart", JSON.stringify(currentCart));

    const safeName = name.replace(/\s+/g, "-");

    if (currentCart.length === 0) {
        location.reload();
    } else {
        const updatedItem = currentCart.find(i => i.name === name);

        if (updatedItem) {
            document.getElementById(`qty-${safeName}`).textContent = updatedItem.qty;

            const price = parseInt(updatedItem.price.replace(/\D/g, ""));
            document.getElementById(`price-${safeName}`).textContent =
                `Rs ${price * updatedItem.qty}`;
        } else {
            document.getElementById(`item-${safeName}`)?.remove();
        }

        calculateTotal();
    }
}


// ---------------- CART RENDER ----------------
if (cart.length === 0) {
    emptyMsg.classList.remove("hidden");
    cartBottom.classList.add("hidden");

} else {
    cartBottom.classList.remove("hidden");

    const grouped = {};

    cart.forEach(item => {
        if (grouped[item.name]) {
            grouped[item.name].qty += item.qty || 1;
        } else {
            grouped[item.name] = { ...item, qty: item.qty || 1 };
        }
    });

    localStorage.setItem("cart", JSON.stringify(Object.values(grouped)));

    Object.values(grouped).forEach(item => {

        const price = parseInt(item.price.replace(/\D/g, ""));
        const safeName = item.name.replace(/\s+/g, "-");

        const div = document.createElement("div");
        div.className = "flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4";
        div.id = `item-${safeName}`;

        div.innerHTML = `
            <div class="flex items-center gap-4">
                <i class="fa-solid fa-mug-hot text-2xl text-[#6e9887]"></i>
                <p class="text-[#582f0e] text-lg font-poppins font-semibold">${item.name}</p>
            </div>

            <div class="flex items-center gap-4">

                <button class="minus-btn bg-[#e06c9f] text-white w-8 h-8 rounded-full text-xl font-bold hover:bg-[#582f0e] transition"
                    data-name="${item.name}">−</button>

                <span id="qty-${safeName}" class="text-[#582f0e] font-poppins text-lg">
                    ${item.qty}
                </span>

                <button class="plus-btn bg-[#6e9887] text-white w-8 h-8 rounded-full text-xl font-bold hover:bg-[#582f0e] transition"
                    data-name="${item.name}">+</button>

                <p id="price-${safeName}" class="text-[#6e9887] font-poppins w-20 text-right">
                    Rs ${price * item.qty}
                </p>
            </div>
        `;

        cartContainer.appendChild(div);
    });

    calculateTotal();

    // ---------------- EVENT LISTENERS ----------------
    document.querySelectorAll(".plus-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            changeQty(btn.dataset.name, 1);
        });
    });

    document.querySelectorAll(".minus-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            changeQty(btn.dataset.name, -1);
        });
    });
}


// ---------------- CLEAR CART ----------------
clearBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});


// ---------------- CHECKOUT (FINAL SIMPLE SYSTEM) ----------------
checkoutBtn.addEventListener("click", async () => {

    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cart.length === 0) {
        alert("Cart is empty!");
        return;
    }

    try {
       const orderData = {
    userId: 1,
    items: cart
};

        const response = await fetch("https://localhost:7262/api/orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            alert("Order failed!");
            return;
        }

        await response.json();

        alert("Order placed successfully!");

        localStorage.removeItem("cart");
        location.reload();

    } catch (error) {
        console.log(error);
    }
});
