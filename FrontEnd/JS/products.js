async function loadProducts(){
    const response=await fetch("https://localhost:7262/api/products");
    const products=await response.json();

    const tbody=document.getElementById("productsTable");
    tbody.innerHTML="";
    if(products.length===0){
        tbody.innerHTML=`<tr><td colspan="5" class="text-center text-[#e06c9f] py-6">No products yet!</td></tr> `;
        return;
    }

    products.forEach(product=> {
        tbody.innerHTML +=`
        <tr class="border-b border-pink-100">
                <td class="py-3 text-[#6e9887]">${product.name}</td>
                <td class="py-3 text-[#6e9887]">${product.categoryId === 1 ? 'Coffee' : product.categoryId === 2 ? 'Flowers' : 'Bakery'}</td>
                <td class="py-3 text-[#6e9887]">Rs ${product.price}</td>
                <td class="py-3 text-[#6e9887]">${product.stock}</td>
                <td class="py-3 flex gap-2">
                    <button onclick="deleteProduct(${product.id})"
                        class="bg-[#e06c9f] text-white px-3 py-1 rounded-full text-sm hover:bg-[#582f0e] transition">
                        Delete
                    </button>
                </td>
            </tr>
            `;
    })
}
function showAddForm(){
    document.getElementById("addForm").classList.toggle("hidden");
}
async function addProduct(){
    const product={
        name:document.getElementById("pName").value,
        price:parseFloat(document.getElementById("pPrice").value),
        imageUrl:document.getElementById("pImage").value,
         categoryId:  parseInt(document.getElementById("pCategory").value),
        description: document.getElementById("pDescription").value,
        stock:       10

    };
    await fetch("https://localhost:7262/api/products",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(product)
    });
    alert("Product added!");
    loadProducts();
    showAddForm();
}