const date = new Date();
const dia = String(date.getDate()).padStart(2,"0");
const mes = String(date.getMonth()+1).padStart(2,"0");
const anio = String(date.getFullYear()).padStart(2,"0");
document.getElementById("date").textContent = `${dia}/${mes}/${anio}`;
const productsContainer = document.getElementById("productos");
const carrito = JSON.parse(localStorage.getItem("productoCarrito") || "[]");
const facturaTotal = document.getElementById("facturaTotal");

document.addEventListener("DOMContentLoaded", function(){
    cargarProductos();
});

function cargarProductos(){
    let items = {};
    carrito.forEach(p => {
        if(items[p.id]){
            items[p.id].cantidad += 1;
        }else{
            items[p.id] = {
                id: p.id,
                title: p.title,
                categoria: p.category, 
                description: p.description,
                price: p.price,
                cantidad: 1
            };
        }
    });
    for(let id in items){
        let p = items[id]
        drawBill(p.title, p.categoria, p.description, p.price, p.cantidad);
    }
}

function drawBill(titulo, categoria, descripcion, precio, cantidad){
    const producto = document.createElement("div");
    producto.className = "",
    producto.style.fontSize = "12px";
    producto.innerHTML = `
        <div class="card-header" style="background-color: gainsboro;">
            <p class="card-text text-center fw-bold m-0">${titulo}</p>
            <p class="m-0 productDescription">${descripcion}</p>
            <div class="d-flex justify-content-between bg-light px-2 rounded">
                <p class="mb-0" style="color: dodgerblue">${categoria}</p>
                <p class="mb-0" style="color: goldenrod">$ ${precio} X ${cantidad}U</p>
                <p class="mb-0 text-success">$ ${precio*cantidad}</p>
            </div>
        </div>
    `;
    productsContainer.append(producto);
    let total = 0;
    carrito.forEach(p => {
        total += Number(p.price);
    });
    facturaTotal.textContent = `$ ${total}`;
}