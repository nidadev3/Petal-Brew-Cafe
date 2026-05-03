async function loadDashboard() {

    // Total Products
    const productsRes = await fetch("https://localhost:7262/api/products");
    const products = await productsRes.json();
    document.getElementById("totalProducts").textContent = products.length;





}
