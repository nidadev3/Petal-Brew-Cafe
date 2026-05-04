async function loadOrders(){
    const response=await fetch("https://localhost:7262/api/orders");
    const orders =await respsonse.json();
    const tbody=document.getElementById("ordersTable");
    tbody.innerHTML=" ";
    if(orders.length==0){
        tbody.innerHTML=`<tr><td colspan="5" class="text-center text-[#e06c9f] py-6">No orders yet!</td></tr>`;
    }
    orders.forEach(order=>{
        tbody.innerHTML +=`
        <tr class= "border-b border-pink-100">
        <td class="py-3 text-[#6e9887]">#${order.id}</td>
        <td class="py-3 text-[#6e9887]">${new Date(order.orderDate).toLocaleDateString()}</td>
        <td class="py-3 text-[#6e9887]">Rs ${order.totalAmount}</td>
        <td class="py-3">
        <span class="bg-[#d9e0cb] text-[#582f0e] px-3 py-1 rounded-full text-sm">
                        ${order.status}
                    </span>
                    </td>
        
        
        `
    })
}