async function loadDashboard() {

    // Total Products
    const productsRes = await fetch("https://localhost:7262/api/products");
    const products = await productsRes.json();
    document.getElementById("totalProducts").textContent = products.length;
 //Toatal Orders
  const ordersRes = await fetch("https://localhost:7262/api/orders");
    const orders = await ordersRes.json();
    document.getElementById("totalOrders").textContent = orders.length;
    // Total Messages
const messagesRes = await fetch("https://localhost:7262/api/contact");
const messages = await messagesRes.json();
document.getElementById("totalMessages").textContent = messages.length;

// Recent Orders Table
const tbody = document.getElementById("recentOrdersTable");
tbody.innerHTML = "";

if (orders.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" class="text-center text-[#e06c9f] py-6">No orders yet!</td></tr>`;
    return;
}

orders.forEach(order => {
    tbody.innerHTML += `
        <tr class="border-b border-pink-200">
            <td class="py-3 text-[#6e9887]">#${order.id}</td>
            <td class="py-3 text-[#6e9887]">${new Date(order.orderDate).toLocaleDateString()}</td>
            <td class="py-3 text-[#6e9887]">Rs ${order.totalAmount}</td>
            <td class="py-3">
                <span class="bg-[#f7f3e8] text-[#6e9887] px-3 py-1 rounded-full text-sm">
                    ${order.status}
                </span>
            </td>
        </tr>
    `;
});


}
loadDashboard();

