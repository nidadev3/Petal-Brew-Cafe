async function loadDashboard() {

    // Total Products
    const productsRes = await fetch("https://localhost:7262/api/products");
    const products = await productsRes.json();
    document.getElementById("totalProducts").textContent = products.length;
 //Toatal Orders
  const ordersRes = await fetch("https://localhost:7262/api/orders");
    const orders = await ordersRes.json();
    document.getElementById("totalOrders").textContent = orders.length;




}
