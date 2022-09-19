//variables
const inputs = [...document.querySelectorAll(".formularioCompra .input")];
const checkoutInfo = document.querySelector(".checkout-info");
const checkoutTotal = document.querySelector(".checkout-total");
const infoExtra = document.querySelector(".info-extra");
const form = document.querySelector(".formularioCompra");
const email = document.querySelector("#email");
const suNombre = document.querySelector("#nombre");
const apellido = document.querySelector("#apellido");
const dni = document.querySelector("#dni");
const telefono = document.querySelector("#telefono");
const calle = document.querySelector("#calle");
const numeracion = document.querySelector("#numeracion");
const pagoMP = document.getElementById("payment-mp");
const efectivo = document.getElementById("efectivo");
const btnComprar = document.getElementsByClassName("buttonPropiedades")
let metodoPago = [];
let itemsNumber=document.getElementById("cart-items");
let cantidadItems= carrito.length;
itemsNumber.innerHTML=cantidadItems;

//COMPRA
let compraRealizada = localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];


console.log(compraRealizada);


const estudios= JSON.parse(localStorage.getItem("galeria"))||[]

const estudiosComprados = () => {
    compraRealizada.forEach((estudio) => {
        let div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
        <div>
            <h3>${estudio.nombre}</h4>
            <h4>$ ${estudio.precio}</h5>
            <h5>Cantidad: ${estudio.cantidad}</p>
        </div>
        `;
        checkoutInfo.appendChild(div);
    });
}

//calculo el precio

let sumaFinal = 0;
let costoEnvio = 350;
const precioFinal = () => {
    compraRealizada.map(estud => {
        sumaFinal += estud.precio * estud.cantidad;
    });
    checkoutTotal.innerText = sumaFinal;
    return sumaFinal
}

const realizarCompra = () => {
   estudiosComprados();
    precioFinal();
}


//validacion del formulario

const lettersPattern = /^[A-Z À-Ú]+$/i;
const numbersPattern = /^[0-9]+$/;

const isEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

const campos = {
    email: false,
    nombre: false,
    apellido: false,
    dni: false,
    telefono: false
}

const validarFormulario = (e) => {
    const dniValue = dni.value;
    const phoneValue = telefono.value;

    switch (e.target.name) {
        case "email":
            if (email.value === "") {
                funcionError(email, "Campo obligatorio")
            } else if (!isEmail(email.value)) {
                funcionError(email, "Ingrese un mail válido")
            } else {
                funcionOk(email)
                campos["email"] = true;
            }
            break;
        case "nombre":
            if (nombre.value === "") {
                funcionError(nombre, "Campo obligatorio")
            } else if (!lettersPattern.test(nombre.value)) {
                funcionError(nombre, "Ingrese un nombre válido")
            } else {
                funcionOk(nombre)
                campos["nombre"] = true;
            }
            break;
        case "apellido":
            if (apellido.value === "") {
                funcionError(apellido, "Campo obligatorio")
            } else if (!lettersPattern.test(apellido.value)) {
                funcionError(apellido, "Ingrese un apellido válido")
            } else {
                funcionOk(apellido)
                campos["apellido"] = true;
            }
            break;
        case "dni":
            if (dniValue === "") {
                funcionError(dni, "Campo obligatorio")
            } else if ((!numbersPattern.test(dniValue)) || (dniValue.length < 6)) {
                funcionError(dni, "Ingrese un DNI válido")
            } else {
                funcionOk(dni)
                campos["dni"] = true;
            }
            break;
        case "telefono":
            if (phoneValue === "") {
                funcionError(telefono, "Campo obligatorio")
            } else if ((!numbersPattern.test(phoneValue)) || (phoneValue.length < 8)) {
                funcionError(telefono, "Ingrese un telefono válido")
            } else {
                funcionOk(telefono)
                campos["telefono"] = true;
            }
            break;
        default:
            alert("Dato inválido, intente nuevamente");
            break
    }
}
const funcionError = (input, mensaje) => {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    document.querySelector("i").classList.remove("fa-circle-xmark")
    small.innerText = mensaje;
}

const funcionOk = input => {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
    document.querySelector("i").classList.remove("fa-circle-circle")
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

//validacion boton efectivo
let check = efectivo.addEventListener("change", () => {
    if (efectivo.checked) {
        console.log('Esta chequeado');
        metodoPago.push("Paga en Efectivo")
    }
})


//EJECUCION DE LA COMPRA
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (campos.email && campos.nombre && campos.apellido && campos.dni && campos.telefono && efectivo.checked) {
        swal.fire("Gracias por tu compra!! ")
        form.reset();

    } else if (campos.email && campos.nombre && campos.apellido && campos.dni && campos.telefono && pagoMP.checked) {
        swal.fire({
            title: "Te llevamos a Mercado Pago, gracias por tu compra!!",
            button: false
        }).then(setTimeout(() => {
            mercadopago();
        }, 3000));
        mercadopago()
        form.reset();
    } else {
        swal.fire("Por favor, verifica todos los campos")
    }

});

//pago

const mercadopago = async () => {
    const carritoMap = compraRealizada.map(item => {
        let newItem =
        {
            title: item.titulo,
            description: "",
            picture_url: item.imagen,
            category_id: item.id,
            quantity: item.cantidad,
            currency_id: "ARS",
            unit_price: item.precio
        }
        return newItem;
    });
    console.log(carritoMap)
    try {
        let response = await fetch("https://api.mercadopago.com/checkout/preferences", {
            method: "POST",
            headers: {
                Authorization: "Bearer TEST-409954785412216-091816-8ef85dd1eb1976a5f30e2c4c8483f6db-83448045"

            },
            body: JSON.stringify({
                items: carritoMap,
                back_urls: {
                    "success": "http://127.0.0.1:5501/page/intituto.html",
                    "failure": "http://127.0.0.1:5501/page/intituto.html",
                    "pending": "http://127.0.0.1:5501/page/intituto.html"
                    
                },
                auto_return: "approved"
            })
        });
        let data = await response.json();
        window.open(data.init_point, "_self");
    } catch (error) {
        console.log(error);
    }
    metodoPago.push("Paga por MP");
}

//execution
realizarCompra();