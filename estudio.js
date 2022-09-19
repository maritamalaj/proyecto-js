 //DECLARO ARRAYS y VARIABLES

let cards=document.getElementById("galeria");
let listaEstudios=[]
let carrito =[]
//CARRITO   STORERAGE JSON -guardar ultima info del carrito-////Operador logico OR
carrito = JSON.parse(localStorage.getItem("carrito"))||[]; 
// Operador logico OR//
const estudios= JSON.parse(localStorage.getItem("estudios"))||[]
const vaciarCarrito = document.getElementById("vaciar-carrito");
const openModal = document.querySelector('.abrirCarrito')
const compra=[]


class listado {
    constructor (id,estudio,precio,fuente,turno){
        this.id=id,
        this.nombre=estudio;
        this.precio=parseFloat (precio);
        this.fuente=fuente;
        this.turno=turno;
    }
}



 
// CARDS// adquierolos datos desde json e inserto las cards
renderizarMenu()
function renderizarMenu(){
    fetch('/menu.json')
    .then((res) => res.json())
    .then((listaEstudios)=> {
    console.table (listaEstudios)
    for (const compra of listaEstudios){
        let card=document.createElement("div");
        card.className="items col-12 col-md-6 col-lg-4 m-3";
        card.style= "width: 18rem";
        card.innerHTML+=`
        <div class="card">
        <img src="${compra.fuente}" "width="250px" height="250px"">
        <p>${compra.nombre}</p>
        <p>$${compra.precio}</p>
        <button id="btn${compra.id}" class="btn btn-primary">Seleccionar Estudio</button>
    </div>
        `;    
        
        //Inyecto cards
    cards.append(card);

    


    //Evento btn Compra
 let botonComprar=document.getElementById(`btn${compra.id}`);
    botonComprar.onclick=()=>{
        //llamo a la fnc carrito
        newAddToCart(compra);
        // muestro el producto en el carrito
         prodACarrito (compra);
        //guardo en el local storage
        localStorage.setItem("carrito",JSON.stringify(carrito));
    }
 }
})
}

   

//Agrego estudios al carrito//
function newAddToCart(selectedId){ //recibo el id
    let selectedEstud = listaEstudios.find(compra => compra.id == selectedId);
    if(selectedEstud == undefined){
        let selectedEstud = {
            ...selectedId,
            cantidad:1
        }; 
    
        carrito.push(selectedEstud) 
        console.table(selectedId); 
        console.table(carrito); 

      
        swal({
            title: "¡Estudio agregado!",
            text: selectedId.nombre+"\n"+'Fue Agregado Exitosamente! .',
            icon: "success",
            buttons: {
                cerrar: {
                    text: "Cerrar",
                    value: false
                },
                carrito: {
                    text: "Ir a carrito",
                    value: true
                }
            }
        }).then((irACarrito) => {

            if(irACarrito) {
                
                //se muestra el carrito
                
                const myModal = new bootstrap.Modal(document.getElementById('exampleModal'), {keyboard: true});
                const modalToggle = document.getElementById('toggleMyModal'); 
                myModal.show(modalToggle);

            }
           
        });
        
    }
    
}
const filasCarrito=document.getElementById("items")
function prodACarrito (){

    //agregamos una fila a la tabla del carro

    filasCarrito.innerHTML="";
    carrito.forEach((compra)=>{
        let div = document.createElement("tr");
        div.innerHTML+=`
        <td> ${compra.nombre}</td>
        <td> ${compra.cantidad}</td>
        <td> ${compra.precio}</td>
        <td>$${compra.precio*compra.cantidad}</td>
        <td> <button class="btn" id="eliminar${compra.id}">🗑️</button>`;
        filasCarrito.append(div);

        //evento al boton eliminar
        const eliminarItem=document.getElementById(`eliminar${compra.id}`);
           eliminarItem.addEventListener("click", function(){

               //funcion eliminar
               eliminarDelCarrito(compra.id)
               swal("Estudio eliminado!");
           })
       
    })
    const cantidadFooterCarrito=document.getElementById("footer");
    const totalFooterCarrito=document.getElementById("gastoTotal");
    const totalSuma = carrito.reduce((acc,compra) => acc+(compra.precio*compra.cantidad),0);
    const cantSuma = carrito.reduce((acc,compra) => acc+compra.cantidad,0);
    carrito.length === 0 ? cantidadFooterCarrito.innerHTML = `<th scope="row" colspan="5">Carrito vacío - comience a comprar!</th>`: totalFooterCarrito.innerHTML=`<h4>Total: $${totalSuma}</h4>`; cantidadFooterCarrito.innerHTML = `<th scope="row" colspan="5">Total de productos: ${cantSuma}</th>`;
    
}

//ELIMINAR PRODUCTOS
const eliminarDelCarrito = (prodId) => {
   const item = carrito.find((compra) => compra.id === prodId);
   const indice = carrito.indexOf(item);
   carrito.splice(indice, 1);
   prodACarrito();
}

vaciarCarrito.addEventListener("click", () => {
   carrito.length = 0;
   Swal.fire('Has vaciado tu carrito');
   localStorage.removeItem("carroCompras");
   itemsCarrito.innerText = 0;
   prodACarrito();
   carroVacio();
})

//EVENTO QUE DIRECCIONA A LOS PRODUCTOS
const botonBanner = document.querySelector(".banner-title");

botonBanner.addEventListener("mousedown", () => {
    location.href = "#galeria";
})

//FINALIZAR COMPRA Y VACIAR DE LOCAL STORAGE
const finalizarCompra=document.getElementById("finish");
finalizarCompra.addEventListener("click", (e) =>{
   e.preventDefault( ) ;
   if(carrito.length === 0){
       swal('Elegí un Estudio!');
   }else{
       swal({
           position: 'center',
           icon: "success",
           text: 'Puedes realizar tu estudio de lun a vie de 8.00 a 20.00hs',
           title: 'Gracias por elegirnos!',
           button: true,
           
      })
   
   //al finalizar la compra se vacia el carrito

   
   //se borran productos de local storage y se actualiza
   carrito =[ ]
   items.innerHTML= "";
   localStorage.removeItem("carrito",JSON.stringify(carrito));
   prodACarrito( );
}
})


// //comienza funcion que te redirecciona del carrito al formulario de pago

// function checkout() {
//     document.getElementById("checkout").addEventListener("click", function () {
//       if (cart.length === 0) {
//         Swal.fire({
//           icon: "error",
//           title: "¡Todavia no agregaste nada al carrito!",
//         });
//       } else {
//         createCart();
//         Swal.fire({
//           position: "center",
//           icon: "success",
//           title: "¡Felicidades, ya seras redireccionado al formulario de pago!",
//           showConfirmButton: false,
//           timer: 3500,
//         }).then(() => {
//           window.location.href = "./procesocompra.html";
//         });
//       }
//     });
//   }
  
//   checkout();
  
//   cart = JSON.parse(localStorage.getItem("cart")) || [];
//   createCart(cart);
//   console.table(cart);
  
//   //finaliza funcion que te redirecciona del carrito al formulario de pago
  