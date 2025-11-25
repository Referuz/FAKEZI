const productsContainer = document.getElementById("cartProducts");
const productos = localStorage.getItem("productoCarrito");
const productosParsed = JSON.parse(productos) || [];
const btnRegresar = document.getElementById("btnRegresar").addEventListener("click", () => {window.history.back()});
const labelTotalCArrito = document.getElementById("totalCarrito");
const btnVaciarCarrito = document.getElementById("btnVaciarCarrito");
const btnComprarCarrito = document.getElementById("btnComprarCarrito");
const cartContainer = document.getElementById("cartContainer");
let categoria = "All";


if(!sessionStorage.getItem("token")){
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function(){
    mostrarProductos();
});

document.getElementById("categoriaSelect").addEventListener("change", function(){
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
    categoria = "All";
    productsContainer.innerHTML = "";
    mostrarProductos();
    categoriaSelect.selectedIndex = 0;
    
});

function mostrarProductos(){
    const localCategory = "All";
    productsContainer.innerHTML = "";
    if(productos !== "[]"){
        labelTotalCArrito.textContent = "Total carrito: $"
        labelTotalCArrito.style.display = "block";
        btnVaciarCarrito.style.display = "block";
        btnComprarCarrito.style.display = "block";
        cartContainer.className += "mb-3 pb-3";
        document.body.style.paddingTop = "9.6rem";
        btnVaciarCarrito.addEventListener("click", function(e){
            e.preventDefault();
            localStorage.setItem("productoCarrito", "[]");
            window.location.reload();
        });
        btnComprarCarrito.addEventListener("click", function(e){
            e.preventDefault();
            window.open("bill.html","","width=600, height=600");
        });
    }else{
        labelTotalCArrito.style.display = "none";
        btnVaciarCarrito.style.display = "none";
        btnComprarCarrito.style.display = "none";
        document.body.style.paddingTop = "5.5rem";
    }
    productosParsed.forEach(p => {
        if(localCategory == categoria || p.category == categoria){
        const producto = document.createElement("div");
        producto.className = "card px-0 mb-3";
        producto.style.backgroundColor = "#cececeff"
        producto.setAttribute("data-id-card-product",p.id);

        const productoBody = document.createElement("div");
        productoBody.className = "card-body d-flex justify-content-between alig-items-center";

        const productoBodyImgContainer = document.createElement("div");
        productoBodyImgContainer.className = "d-flex align-items-center";

        const productoBodyImg = document.createElement("img");
        productoBodyImg.src = `https://corsproxy.io/?${p.images}`;
        productoBodyImg.style.width = "5rem";
        productoBodyImg.className = "rounded me-3";

        const productoBodyInfo = document.createElement("div");
        productoBodyInfo.className = "form-control";
        productoBodyInfo.style.backgroundColor = "gainsboro";
        productoBodyInfo.style.border = "1px solid black";

        const productoBodyInfoTitle = document.createElement("p");
        productoBodyInfoTitle.className = "text-fakezi fw-bold mb-0";
        productoBodyInfoTitle.textContent = p.title;

        const productoBodyInfoDescription = document.createElement("p");
        productoBodyInfoDescription.className = "mb-0";
        productoBodyInfoDescription.textContent = p.description;

        const productoBodyInfoCant = document.createElement("p");
        productoBodyInfoCant.className = "form-control text-start";
        productoBodyInfoCant.textContent = "Cantidad: 1";
        productoBodyInfoCant.setAttribute("data-id-cant-product",p.id);

        const productoBodyInfoBtnAndPricesContainer = document.createElement("div");
        productoBodyInfoBtnAndPricesContainer.className = "form-control d-flex justify-content-between";

        const productoBodyInfoBtnContainer = document.createElement("div");
        productoBodyInfoBtnContainer.className = "";

        const productoBodyInfoBtnAdd = document.createElement("button");
        productoBodyInfoBtnAdd.className = "btn btn-warning me-2 text-dark fw-bold my-1 btnCartAddProduct";
        productoBodyInfoBtnAdd.style.fontSize = "2rem";
        productoBodyInfoBtnAdd.style.padding = "0px 12px";
        productoBodyInfoBtnAdd.style.paddingBottom = "3px";
        productoBodyInfoBtnAdd.textContent = "+";
        productoBodyInfoBtnAdd.setAttribute("data-btn-add-id-product",p.id);
        productoBodyInfoBtnAdd.setAttribute("data-btn-add-title-product",p.title);
        productoBodyInfoBtnAdd.setAttribute("data-btn-add-price-product",p.price);
        productoBodyInfoBtnAdd.setAttribute("data-btn-add-description-product",p.description);
        productoBodyInfoBtnAdd.setAttribute("data-btn-add-image-product",p.images);
        
        const productoBodyInfoBtnRemove = document.createElement("button");
        productoBodyInfoBtnRemove.className = "btn btn-info text-dark fw-bold my-1 btnCartRemoveProduct";
        productoBodyInfoBtnRemove.style.fontSize = "2rem";
        productoBodyInfoBtnRemove.style.padding = "0px 17px";
        productoBodyInfoBtnRemove.textContent = "-";
        productoBodyInfoBtnRemove.setAttribute("data-btn-remove-id-product",p.id);

        const productoBodyInfoPricesContainer = document.createElement("div");
        productoBodyInfoPricesContainer.className = "";

        const productoBodyInfoUnitPriceContainer = document.createElement("div");
        productoBodyInfoUnitPriceContainer.className = "form-control d-flex justify-content-between precioUnidad";
        productoBodyInfoUnitPriceContainer.textContent = `Unidad: ${p.price}`;
        productoBodyInfoUnitPriceContainer.setAttribute("data-id-product-unit-price", p.id);

        const productoBodyInfoTotalPriceContainer = document.createElement("div");
        productoBodyInfoTotalPriceContainer.className = "form-control d-flex justify-content-between precioTotal";
        productoBodyInfoTotalPriceContainer.textContent = `Total: ${p.price}`;
        productoBodyInfoTotalPriceContainer.setAttribute("data-id-product-total-price", p.id);
        
        productsContainer.appendChild(producto);
        producto.appendChild(productoBody);
        productoBody.appendChild(productoBodyImgContainer);
        productoBody.appendChild(productoBodyInfo);
        productoBodyImgContainer.appendChild(productoBodyImg);
        productoBodyInfo.appendChild(productoBodyInfoTitle);
        productoBodyInfo.appendChild(productoBodyInfoDescription);
        productoBodyInfo.appendChild(productoBodyInfoCant);
        productoBodyInfo.appendChild(productoBodyInfoBtnAndPricesContainer);
        productoBodyInfoBtnAndPricesContainer.appendChild(productoBodyInfoBtnContainer);
        productoBodyInfoBtnContainer.appendChild(productoBodyInfoBtnAdd);
        productoBodyInfoBtnContainer.appendChild(productoBodyInfoBtnRemove);
        productoBodyInfoBtnAndPricesContainer.appendChild(productoBodyInfoPricesContainer);
        productoBodyInfoPricesContainer.appendChild(productoBodyInfoUnitPriceContainer);
        productoBodyInfoPricesContainer.appendChild(productoBodyInfoTotalPriceContainer);
    }});
    apilarProductos();
}

function apilarProductos(){
    let cards = {};
    const cardProductos = document.querySelectorAll("[data-id-card-product]");
    cardProductos.forEach(p => {
        p_id = p.dataset.idCardProduct;
        if(cards[p_id]){
            cards[p_id] += 1;
        }else{
            cards[p_id] = 1;
        }
    });

    let card = {};
    cardProductos.forEach(p => {
        p_id = p.dataset.idCardProduct;
        if(card[p_id]){
            p.remove();
        }else{
            card[p_id] = card;
        }
    });

    const cardProductosCant = document.querySelectorAll("[data-id-cant-product]");
    cardProductosCant.forEach(p => {
        p_id = p.dataset.idCantProduct;
        var cantidad;
        if(cards[p_id]){
            cantidad = cards[p_id];
        }else{
            cantidad = 1;
        }
        p.textContent = `Cantidad: ${cantidad}`;
    });
    actualizarPrecio();
}

function actualizarPrecio(){
    let cardProductosCantMap = {};
    let cardProductosUnitPriceMap = {};
    const cardProductosCant = document.querySelectorAll("[data-id-cant-product]");
    const cardProductosUnitPrice = document.querySelectorAll("[data-id-product-unit-price]");
    
    cardProductosCant.forEach(p => {
        p_id = p.dataset.idCantProduct;

        var rawCant = p.textContent;
        var cant = parseInt(rawCant.replace(/\D/g,""));

        if(!cardProductosCantMap[p_id]){
            cardProductosCantMap[p_id] = 0;
        }

        cardProductosCantMap[p_id] += cant;
    });

    cardProductosUnitPrice.forEach(p => {
        p_id = p.dataset.idProductUnitPrice;
        var rawCant = p.textContent;
        var cant = rawCant.replace("Unidad: ","");
        cardProductosUnitPriceMap[p_id] = cant;
    });

    let cardProductosTotalPriceMap = {};
    const cardProductosTotalPrice = document.querySelectorAll("[data-id-product-total-price]");
    cardProductosTotalPrice.forEach(p => {
        p_id = p.dataset.idProductTotalPrice;
        var totalProducto = cardProductosCantMap[p_id]*cardProductosUnitPriceMap[p_id];
        p.textContent = `Total: ${totalProducto}`;
        if(cardProductosTotalPriceMap[p_id]){
            cardProductosTotalPriceMap[p_id] += totalProducto;
        }else{
            cardProductosTotalPriceMap[p_id] = totalProducto;
        }
    });
    actualizarCantProducto();
    mostrarPrecioTotalCarrito(cardProductosTotalPriceMap);
}

function actualizarCantProducto(){
    const add = document.querySelectorAll(".btnCartAddProduct");
    const remove = document.querySelectorAll(".btnCartRemoveProduct");

    add.forEach(btn => {
        var btn_id_product = btn.dataset.btnAddIdProduct;
        var btn_title_product = btn.dataset.btnAddTitleProduct;
        var btn_price_product = btn.dataset.btnAddPriceProduct;
        var btn_description_product = btn.dataset.btnAddDescriptionProduct;
        var btn_image_product = btn.dataset.btnAddImageProduct;
        btn.addEventListener("click",() =>{
            productosParsed.push({id: btn_id_product, title: btn_title_product, price: btn_price_product, description: btn_description_product, images : btn_image_product});
            localStorage.setItem("productoCarrito", JSON.stringify(productosParsed));
            location.reload();
        });
    });    

    remove.forEach(btn => {
        var btn_id_product = btn.dataset.btnRemoveIdProduct;
        btn.addEventListener("click",() =>{
            const index = productosParsed.findIndex(item => item.id === btn_id_product);
            if(index !== -1){
                productosParsed.splice(index, 1);
            }
            localStorage.setItem("productoCarrito", JSON.stringify(productosParsed));
            location.reload();
        });
    }); 

}


function mostrarPrecioTotalCarrito(mapa){
    let carritoTotal = 0;
    for(let id in mapa){
        carritoTotal += mapa[id];
    }
    labelTotalCArrito.textContent = `Total carrito: $${carritoTotal}`;
}