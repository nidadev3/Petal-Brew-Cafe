// load products

async function loadProducts() {
    try {
        const response = await fetch("https://localhost:7262/api/products");

        if (!response.ok) {
            console.log("API Error");
            return;
        }

        const data = await response.json();

        const coffeeGrid = document.getElementById("coffeeGrid");
        const flowersGrid = document.getElementById("flowersGrid");
        const bakeryGrid = document.getElementById("bakeryGrid");

        data.forEach(product => {

            const card = `
            <div class="bg-[#f7f3e8] rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 pb-6">

                <div class="bg-white p-4 rounded-2xl shadow-md">
                    <img src="${product.imageUrl}" class="w-full h-60 object-cover rounded-2xl">
                </div>

                <div class="pl-3 pt-3">
                    <h3 class="text-2xl font-cinzel font-semibold text-[#7a5a3a]">
                        ${product.name}
                    </h3>

                    <p class="text-[#e06c9f] mt-1 font-poppins">
                        ${product.description}
                    </p>

                    <p class="text-[#7a5a3a] font-semibold mt-2">
                        Rs ${product.price}
                    </p>
                </div>

                <div class="pt-4 px-4">
                   <button class="cart-btn block w-full text-center bg-[#6e9887] py-3 rounded-full 
    text-[#d9e0cb] font-poppins text-[20px]
    hover:bg-[#efb5ce] hover:text-[#582f0e]
    transition duration-300 ease-in-out
    hover:scale-105 shadow-md hover:shadow-xl"
    data-name="${product.name}"
    data-price="${product.price}">
    Add to Cart
</button>
                </div>

            </div>
            `;

            if (product.categoryId === 1) {
                coffeeGrid.innerHTML += card;
            } 
            else if (product.categoryId === 2) {
                flowersGrid.innerHTML += card;
            } 
            else if (product.categoryId === 3) {
                bakeryGrid.innerHTML += card;
            }

        });

    } catch (error) {
        console.log("Fetch failed:", error);
    }
}

loadProducts();



document.addEventListener("click", function(e) {

    const btn = e.target.closest(".cart-btn");

    if (!btn) return;

    const name = btn.dataset.name;
    const price = btn.dataset.price;

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    existingCart.push({
        name: name,
        price: `Rs ${price}`,
        qty: 1
    });

    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert(`${name} Added to Cart!`);
});