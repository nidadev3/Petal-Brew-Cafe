const cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartContainer = document.getElementById("cartItems");
const emptyMsg      = document.getElementById("emptyMsg");
const totalPrice    = document.getElementById("totalPrice");
const clearBtn      = document.getElementById("clearCart");
const cartBottom    = document.getElementById("cartBottom");
const checkoutBtn   = document.getElementById("checkoutBtn");
const checkoutForm  = document.getElementById("checkoutForm");
const placeOrderBtn = document.getElementById("placeOrderBtn");


function calculateTotal() {
    const updatedCart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    updatedCart.forEach(item => {
        total += parseInt(item.price.replace(/\D/g, "")) * item.qty;
    });
    totalPrice.textContent = `Rs ${total}`;
}

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

    if (currentCart.length === 0) {
        location.reload();
    } else {
        const updatedItem = currentCart.find(i => i.name === name);
        if (updatedItem) {
            document.getElementById(`qty-${name}`).textContent = updatedItem.qty;
            const price = parseInt(updatedItem.price.replace(/\D/g, ""));
            document.getElementById(`price-${name}`).textContent = `Rs ${price * updatedItem.qty}`;
        } else {
            document.getElementById(`item-${name}`).remove();
        }
        calculateTotal();
    }
}

if (cart.length === 0) {
    emptyMsg.classList.remove("hidden");
    cartBottom.classList.add("hidden");

} else {
    cartBottom.classList.remove("hidden");

    // Group karo
    const grouped = {};
    cart.forEach(item => {
        if (grouped[item.name]) {
            grouped[item.name].qty += 1;
        } else {
            grouped[item.name] = { ...item, qty: item.qty || 1 };
        }
    });

    localStorage.setItem("cart", JSON.stringify(Object.values(grouped)));

    Object.values(grouped).forEach(item => {
        const price = parseInt(item.price.replace(/\D/g, ""));

        const div = document.createElement("div");
        div.className = "flex justify-between items-center bg-white p-4 rounded-lg shadow mb-4";
        div.id = `item-${item.name}`;
        div.innerHTML = `
            <div class="flex items-center gap-4">
                <i class="fa-solid fa-mug-hot text-2xl text-[#6e9887]"></i>
                <p class="text-[#582f0e] text-lg font-poppins font-semibold">${item.name}</p>
            </div>
            <div class="flex items-center gap-4">
                <button class="minus-btn bg-[#e06c9f] text-white w-8 h-8 rounded-full text-xl font-bold hover:bg-[#582f0e] transition" data-name="${item.name}">−</button>
                <span id="qty-${item.name}" class="text-[#582f0e] font-poppins text-lg">${item.qty}</span>
                <button class="plus-btn bg-[#6e9887] text-white w-8 h-8 rounded-full text-xl font-bold hover:bg-[#582f0e] transition" data-name="${item.name}">+</button>
                <p id="price-${item.name}" class="text-[#6e9887] font-poppins w-20 text-right">Rs ${price * item.qty}</p>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    calculateTotal();

    // ✅ Event listeners — onclick ki jagah
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

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload();
});

checkoutBtn.addEventListener("click", () => {
    checkoutForm.classList.remove("hidden");
});


placeOrderBtn.addEventListener("click", () => {

    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;
    const address = document.getElementById("customerAddress").value;

    // Validation
    if (!name || !phone || !address) {
        alert("Please fill all fields!");
        return;
    }

    checkout(name, phone, address);
});