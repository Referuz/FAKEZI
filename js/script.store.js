const productsContainer = document.getElementById("productsContainer");
let categoria = "All";
let productos;
const btnCarrito = document.getElementById("btnCarrito");
const btnUp = document.querySelectorAll(".btn-up").forEach(btn =>{
    btn.addEventListener("click", function(e){
        e.preventDefault();
        window.scrollTo({
            top: 0, behavior: 'smooth'})
        })
    });
const categoriaSelect = document.getElementById("categoriaSelect");

if(!sessionStorage.getItem("token")){
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded",async function(e){
    e.preventDefault();
    categoriaSelect.value = "--Select--";
    let username = document.getElementById("name");
    try{
        const res = await fetch("https://api.escuelajs.co/api/v1/auth/profile",{
            method: "GET",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : `Bearer ${sessionStorage.getItem("token")}`
            }});
        const data = await res.json();
        username.innerHTML = data.name;
        username.href = "profile.html";
    }catch(x){
        console.log("Error con: ",x);
    }
});

btnCarrito.addEventListener("click", function(e){
    e.preventDefault();
    window.location.href = "cart.html"
});

async function cargarProductos(){
    try{
        const loadProducts = await fetch("https://api.escuelajs.co/api/v1/products",{
            method : "GET",
            headers : {"Content-Type" : "application/json"},
        });
        const salida = await loadProducts.json();
        productos = salida
        mostrarProductos();
    }catch (e){
        console.log(e);
    }
}
cargarProductos();

categoriaSelect.addEventListener("change", function(){
    if(this.value != "--Select--"){
        categoria = this.value;
        productsContainer.innerHTML = "";
        mostrarProductos();
    }
    else{
        categoria = "All"
        productsContainer.innerHTML = "";
        mostrarProductos();
    }
});

document.getElementById("btnCancelarFiltro").addEventListener("click", function(){
    categoria = "All"
    productsContainer.innerHTML = "";
    mostrarProductos();
    categoriaSelect.selectedIndex = 0;
    
});

function mostrarProductos(){
    const localCategory = "All";
    productsContainer.innerHTML = "";
    let imagenes = {};
    productos.forEach(p => {
        if(localCategory == categoria || p.category.name == categoria){
            let lista = [];
            p.images.forEach(f => {
                if(f.includes(",")){
                    const partes = f.split(",").map(i => i.trim());
                    partes.forEach(imagen => lista.push(imagen));
                }else{
                    lista.push(f);
                }
            });
            imagenes[p.id] = lista; 
            const productoCargado = document.createElement("div");
            productoCargado.className = "card me-3 mb-3 px-0";
            productoCargado.style.width = "20rem";

            const productoCargadoBodyImg = document.createElement("img");
            productoCargadoBodyImg.src = `https://corsproxy.io/?${imagenes[p.id][0]}`;
            productoCargadoBodyImg.style.width = "10rem";
            productoCargadoBodyImg.className = "rounded mb-2 w-100";
            productoCargadoBodyImg.style.cursor = "pointer";
            let index = 0;
            productoCargadoBodyImg.onclick = function(){
                index = (index + 1) % imagenes[p.id].length;
                this.src = `https://corsproxy.io/?${imagenes[p.id][index]}`;
            };

            const productoCargadoBody = document.createElement("div");
            productoCargadoBody.className = "card-body";

            const productoCargadoBodyTitle = document.createElement("p");
            productoCargadoBodyTitle.textContent = p.title;

            const productoCargadoBodyPrice = document.createElement("p");
            productoCargadoBodyPrice.textContent = `$ ${p.price}`;

            const productoCargadoBodyBuy = document.createElement("button");
            productoCargadoBodyBuy.textContent = "Agregar al carrito";
            productoCargadoBodyBuy.className = "btn form-control btnAddProduct";
            productoCargadoBodyBuy.style.backgroundColor = "#D9E7FA";
            productoCargadoBodyBuy.style.color = "#3483FA";
            productoCargadoBodyBuy.setAttribute("data-id", p.id);
            productoCargadoBodyBuy.setAttribute("data-title",p.title);
            productoCargadoBodyBuy.setAttribute("data-price",p.price);
            productoCargadoBodyBuy.setAttribute("data-description",p.description);
            productoCargadoBodyBuy.setAttribute("data-images",imagenes[p.id]);
            productoCargadoBodyBuy.setAttribute("data-category",p.category.name);

            productoCargado.appendChild(productoCargadoBodyImg);
            productoCargadoBody.appendChild(productoCargadoBodyTitle);
            productoCargadoBody.appendChild(productoCargadoBodyPrice);
            productoCargadoBody.appendChild(productoCargadoBodyBuy);
            productoCargado.appendChild(productoCargadoBody);
            productsContainer.appendChild(productoCargado);
        }
    });

    const btnAddProduct = document.querySelectorAll(".btnAddProduct");

    btnAddProduct.forEach(btn => {
        let viewContador = 0;
        let cant = viewContador;
        let label = "Unidades agregadas: ";

        const unitContainer = document.createElement("div");
        unitContainer.className = "mt-2 container d-flex justify-content-between align-items-center";

        const unitContainerLabel = document.createElement("p");
        unitContainerLabel.className = "pt-3";
        unitContainerLabel.textContent = label;
        unitContainerLabel.style.display = "none";

        const unitContainerButton = document.createElement("button");
        unitContainerButton.className = "btn py-0 my-0 pb-2 px-4 btn-danger fw-bold btn-outline-dark";
        unitContainerButton.style.fontSize = "2rem";
        unitContainerButton.textContent = "-";
        unitContainerButton.style.display = "none";

        btn.parentElement.appendChild(unitContainer);
        unitContainer.appendChild(unitContainerLabel);
        unitContainer.appendChild(unitContainerButton);

        let items = localStorage.getItem("productoCarrito");
        let itemsParsed = JSON.parse(items) || [];
        itemsParsed.forEach(item => {
            if(item.title == btn.dataset.title){
                viewContador += 1;
            }else{
                viewContador == 0;
            }
        });

        if(viewContador > 0){
            unitContainerLabel.style.display = "block";
            unitContainerButton.style.display = "block";
            unitContainerLabel.textContent = `${label}${viewContador}`;
        }

        btn.addEventListener("click", () => {
            guardarProductoCarrito({id : btn.dataset.id, title : btn.dataset.title, price : btn.dataset.price, description : btn.dataset.description, images : btn.dataset.images, category : btn.dataset.category});
            cant += 1;
            unitContainerLabel.style.display = "block";
            unitContainerButton.style.display = "block";
            unitContainerLabel.textContent = `${label}${cant}`;
        });
        unitContainerButton.addEventListener("click", () => {
            eliminarProductoCarrito(btn.dataset.title);
            if(cant > 0){
                cant -= 1;
            }
            unitContainerLabel.innerHTML = `${label}${cant}`;
            if(cant == 0){
                unitContainerLabel.style.display = "none";
                unitContainerButton.style.display = "none";
            }
        });
    });
}


function guardarProductoCarrito(producto){
    let carrito = JSON.parse(localStorage.getItem("productoCarrito")) || [];
    carrito.push(producto);
    localStorage.setItem("productoCarrito", JSON.stringify(carrito));
}

function eliminarProductoCarrito(nombreProducto){
    let carrito = JSON.parse(localStorage.getItem("productoCarrito")) || [];
    const index = carrito.findIndex(item => item.title === nombreProducto);
    if(index !== -1){
        carrito.splice(index, 1);
    }
    localStorage.setItem("productoCarrito",JSON.stringify(carrito));
}

