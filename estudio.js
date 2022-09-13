
let menuJSON = [];
let cards=document.getElementById("galeria");
let carrito=[];
//CARRITO   STORERAGE JSON -guardar ultima info del carrito-////Operador logico OR
carrito = JSON.parse(localStorage.getItem("carrito"))||[]; 


// // CONTANTES //
class listado {
    constructor (id,estudio,precio,fuente,turno){
        this.id=id,
        this.nombre=estudio;
        this.precio=parseFloat (precio);
        this.fuente=fuente;
        this.turno=turno;
    }
}

// Operador logico OR//
const estudios= JSON.parse(localStorage.getItem("estudios"))||[]



 
// CARDS// obtengo los datos del Json e inserto en las cards

function renderizarMenu(){
   //renderizo cards menu
   console.log (menuJSON)
   for (const estud of menuJSON){
     let card=document.createElement("div");
     card.className="card col-md-3 text-align-center";
     card.innerHTML+=(`
     <h4>ID:${estud.id}
     <div class="card" style="width: 18rem;">
     <img src="${estud.fuente}" class="card-img-top" alt="...">
     <h5 class="card-title">${estud.nombre}</h5>
     <p class="card-text">${estud.precio}</p>
     <button id="btn${estud.id}" class="btn btn-primary">AGREGAR</a>
     </div>
    `);
    cards.append(card);
   }

  //Evento-  ELEMENTO Agregar al CARRO//
  menuJSON.forEach(estud=>{
    document.getElementById(`btn${estud.id}`).onclick= function() {
        agregarAlCarrito(estud);
    };
  });
}  
  
function agregarAlCarrito(estudioNuevo)  {
    let encontrado = carrito.find(e => e.id == estudioNuevo.id);
    console.log(encontrado);
    if (encontrado == undefined) {
        let estudioAcarrito = {
            ...estudioNuevo,
            cantidad:1
        };
        carrito.push(estudioAcarrito);
        console.log(carrito);
        Swal.fire(
            'Nuevo Estudios Agregado al Carro',
            estudioNuevo.nombre,
            'success'
        );
        //agregamos una fila a la tabla 
        document.getElementById("tablabody").innerHTML+=(`
           <tr id='fila${estudioAcarrito.id}'>
           <td> ${estudioAcarrito.id} </td>
           <td> ${estudioAcarrito.nombre}</td>
           <td id='${estudioAcarrito.id}'> ${estudioAcarrito.cantidad}</td>
           <td> ${estudioAcarrito.precio}</td>
           <td> <button class='btn btn-light' onclick='eliminar(${estudioAcarrito.id})'>🗑️</button>`);
    }else{
       // posiscion de estudio en el carrito
       let posicion = carrito.findIndex(e => e.id == estudioNuevo.id);
       console.log(posicion);
       carrito[posicion].cantidad += 1;
       document.getElementById(estudioNuevo.id).innerHTML=carrito[posicion].cantidad;
    }    
    //calculo el total
    document.getElementById("gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
}

function calcularTotal() {
    let suma = 0;
    for (const elemento of carrito) {
        suma = suma + (elemento.precio * elemento.cantidad);
    }
    return suma;
}

function eliminar(id){
    let indice=carrito.findIndex(estud => estud.id==id);
    carrito.splice(indice,1);//eliminando del carro
    let fila=document.getElementById(`fila${id}`);
    document.getElementById("tablabody").removeChild(fila);//eliminando de la tabla
    document.getElementById("gastoTotal").innerText=(`Total: $ ${calcularTotal()}`);
    localStorage.setItem("carrito",JSON.stringify(carrito));
    Swal.fire("estudio eliminado del carro!")
}

//fetch para solicitar GETJSON de meun.json
 async function obtenerJSON(){
    const URLJSON="/menu.json";
    const resp=await fetch(URLJSON);
    const data=await resp.json();
    menuJSON = data;
    renderizarMenu();
}

obtenerJSON(); 

