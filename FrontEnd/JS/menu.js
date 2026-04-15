// load products

async function loadProducts() {
    try {
        const response = await fetch("https://localhost:7262/api/products");

        if (!response.ok) {
            console.log("Error!");
            return; 
        }

        const data = await response.json();
        console.log(data);

    } catch (error) {
        console.log("Fetch failed:", error);
    }
}

loadProducts();