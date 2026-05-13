async function loadProducts(){
    const response=await fetch("https://localhost:7262/api/products");
    const products=await response.json();

    const tbody=document.getElementById("productsTable");
    tbody.innerHTML="";
    if(products.length===0){
        tbody.innerHTML=`<tr><td colspan="5" class="text-center text-[#e06c9f] py-6">No products yet!</td></tr> `;
        return;
    }
}