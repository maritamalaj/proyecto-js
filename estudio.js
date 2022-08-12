

// CONTANTES //
class listado {
    constructor (estudio,precio,fuente,turno){
        this.estudio=estudio;
        this.precio=parseFloat (precio);
        this.fuente=fuente;
        this.turno=turno;
    }
}

const codigos=[];
const menu =[
    {
        estudio:"Radiografia Simple",
        precio:"$1500",
        fuente: src="../multimedia/radio.png ",
        turno:false
    },

    {
        estudio:"Mamografia Digital",
        precio: "$3500",
        fuente: src="../multimedia/mamorx.png",
        turno:false
    },

    {
        estudio:"Tomografia Axial Computada ",
        precio: "$5000",
        fuente: src="../multimedia/tcomp.png",
        turno:false
    },
    
    {
        estudio:"Estudios Contrastados ",
        precio: "$3900 ",
        fuente: src="../multimedia/estctte.png",
        turno:true
    },
    
    {
        estudio:"Resonancia Magnetica",
        precio: "$8500",
        fuente: src="../multimedia/rmn.png",
        turno:false
    },
    
    {
        estudio:"Ecografia ",
        precio: "$1500",
        fuente: src="../multimedia/eco.png",
        turno:true
    }
    
];



//CARRITO   STORERAGE JSON -guardar ultima info del carrito-//
let carrito=[];
if(localStorage.getItem("carrito")){
    carrito=JSON.parse(localStorage.getItem("carrito"));
    actualizarCarrito ();//VER
}

// CARDS//

let cards=document.getElementById("galeria");
for (const imagen of menu){
    let card=document.createElement("div");
    card.className="card col-md-3 text-align-center";
    card.innerHTML=`
    <div class="card" style="width: 18rem;">
    <img src="${imagen.fuente}" class="card-img-top" alt="...">
      <h5 class="card-title">${imagen.estudio}</h5>
      <p class="card-text">${imagen.precio}</p>
      <button id="miBoton--${imagen.estudio}" class="btn btn-primary">AGREGAR</a>
    </div>
 `;
cards.append(card);
}

//Evento-  ELEMENTO Agregar al CARRO//
let miboton = document.getElementById(`miBoton--${imagen.estudio}`);

miboton.addEventliestener ("click", (e)=>{
    e.preventDefault();
    console.log("Agregaste"+ " " + imagen.estudio);
    carrito.push(imagen);
})
  
localStorage.setItem("carrito",JSON.stringify(carrito));// VERRR




















// //chekout
// let botonFinDeCompra= document.getElementById("fin")
// let precioFinal = 0
// let chekout= 0 
// botonFinDeCompra.addEventListener ("click", (e) =>{
//     e.preventDefault();
//     precioFinal= codigos.map (codigos => productos.precio)
    
//     checkOut = precioFinal.reduce ((ac,el) => ac + el,0)
//     console.table(codigos);
//     const filtro = codigos.filter ((est) =>est.turno==true)
//     console.log ("Para realizar este estudio deberá solicitar turno previo");
//     console.log (filtro)

//     console.log ("Total deberá abonar es $"+ chekout)

// })

/////////////////////////////////////////////////////////////



// //Estudio a Solicitar

//  class listaDeEstudios {
//     constructor(estudio,cantidad,precio,turno){
//         this.estudio= estudio;
//         this.cantidad=cantidad;
//         this.precio= parseFloat (precio);
//         this.turno=turno;
//     }
//  }

//  //const codigos=[];
//  let codigo= prompt ("Ingrese el estudio que desee realizarse : - EXIT para salir \n Radiografía \n Mamografía \n Tomografía \n Estudios Contrastados  \n Resonancia Magnética \n ecografia \n(exit para salir).")
//  let precio= 0;
//  let tur=listaDeEstudios.turno

//  function calcular(){    
 
//     while (codigo!="EXIT"){
//         switch (codigo){
//             case "radiografia":
//             codigos.push (new listaDeEstudios("radiografia",60,1500,false));
//             precio=precio+1500;
//             console.log ("El estudio es por orden llegada de 08:00 a 02:00 \n sala rx 2 disponible");
//         break;
    
    
//         case "mamografia":
//             codigos.push (new listaDeEstudios("mamografia",6,3500,false));
//             precio= precio+3500;
        
//             console.log(" El estudio es por orden llegada de 08:00 a 20:00 \n sala rx 2 disponible");
//         break;
    
  
//         case "tomografia":
//             codigos.push (new listaDeEstudios("tomografia",10,5000,false));
//             precio= precio+5000;
            
//             console.log("El estudio es por orden llegada de 08:00 a 20:00 \n sala rx 2 disponible");
//         break;
    
        
//         case "estudios contrastados":
//             codigos.push (new listaDeEstudios("estudios contrastados",4,3900,true));
//             precio=precio+3900;
            
//             console.log("Para realizar este estudio deberá solicitar turno previo");
//         break;
    

//         case "resonancia magnetica":
//             codigos.push (new listaDeEstudios("resonancia magnetica",10,8500,true));
//             precio= precio+ 8500;
            
//             console.log("Para realizar este estudio deberá solicitar turno previo");
            
//         break;

//         case "ecografia":
//             codigos.push (new listaDeEstudios("ecografia",10,1500,true));
//             precio= precio+ 1500;
            
//             console.log("Para realizar este estudio deberá solicitar turno previo");
            
//         break;
    
//         default:
//             console.log("Este estudio no está disponible");
//         break;
//         }
        
//         codigo= prompt("Ingrese el estudio que desee realizarse : - EXIT para salir \n Radiografía \n Mamografía \n Tomografía \n Estudios Contrastados  \n Resonancia Magnética \n ecografia \n - EXIT para salir.")
//       }
      
//       //LISTADO DE ESTUDIOS//
//       console.table(codigos);

//       //ESTUDIO CON TURNO PREVIO//
//       const filtro=codigos.filter((est)=>est.turno==true)
//       console.log("Para realizar este estudio deberá solicitar turno previo");
//       console.log(filtro)

//       //TOTAL A PAGAR CON IVA//

//       let preciConIva=precio*1.21;
//       console.log("Total a pagar $"+preciConIva);
     
//      }
//      calcular();




