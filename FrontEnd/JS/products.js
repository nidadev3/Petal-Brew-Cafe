async function loadProducts(){
    const response=await fetch("https://localhost:7262/api/products");
    const products=await response.json();

    const tbody=document.getElementById("productsTable");
    tbody.innerHTML=" ";
    
}