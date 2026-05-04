async function loadOrders(){
    const response=await fetch("https://localhost:7262/api/orders");
    const orders =await respsonse.json();
    const tbody=document.getElementById("ordersTable");
    tbody.innerHTML=" ";
    if(orders.length==0){
        tbody.innerHTML=`<tr><td colspan="5" class="text-center text-[#e06c9f] py-6">No orders yet!</td></tr>`;
    }
}