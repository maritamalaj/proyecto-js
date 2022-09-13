//FORMULARIO DE CONTACTO
const formularioNombre = document.querySelector(".nombreForm");
const telefonoFormulario = document.querySelector(".telForm");
const correoElectronico = document.getElementById("email");
const formulario = document.querySelector(".formulario");
const btn = document.getElementById('btnSubmit');
const lettersPattern = /^[A-Z À-Ú]+$/i;
const numbersPattern = /^[0-9]+$/;
const isEmail = email => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);

//VALIDACION MANUAL DEL FORMULARIO
const campos = {
    nombre: false,
    email: false,
    telefono: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            if ((formularioNombre.value === "") || (!lettersPattern.test(formularioNombre.value))) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: `Revisa los datos ingresados`
                })
            } else {
                campos["nombre"] = true
            }
            break;
        case "email":
            if ((correoElectronico.value === "") || (!isEmail(correoElectronico.value))) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: `Revisa los datos ingresados`
                })
            } else {
                campos["email"] = true
            }
            break;
        case "phone":
            if ((telefonoFormulario.value === "") || (!numbersPattern.test(telefonoFormulario.value))) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
                Toast.fire({
                    icon: 'success',
                    title: `Revisa los datos ingresados`
                })
            } else {
                campos["telefono"] = true
            }
            break;
        default:
            console.log("Formulario ok")
            break;
    }

}

//api que envia el mail
document.getElementById('form')
    .addEventListener('submit', function (e) {
        e.preventDefault();
        console.log(campos);
        if (campos.email && campos.nombre && campos.telefono) {
            const serviceID = 'default_service';
            const templateID = 'template_7xbn0c3';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    Swal.fire('Mensaje enviado correctamente! Gracias por contactarse');;
                }, (err) => {
                    alert(JSON.stringify(err));
                    form.reset();
                })
            form.reset();
        } else {
            swal.fire("Por favor, verifica todos los campos")
        }
    });

 inputs.forEach((input) => {
    input.addEventListener('blur', validarFormulario);
});


// MODAL DEL CARRITO
openModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modal--show');
});

closeModal.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.remove('modal--show');
});


















// const nombre = document.getElementById("nombre");
// const apellido = document.getElementById("apellido");
// const email = document.getElementById("email");
// const password = document.getElementById("password");
// const form = document.getElementById("form");
// let btnLogin = document.getElementsByClassName("warnings")

// form.addEventListener("submit", e=>{
//     e.preventDefaul()
//         let warnings= ""
//         let entrar= false
//         let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
//         parrafo.innerHTML = ""
//         if (nombre.nodeValue.length <4){
//             warnings +=`El nombre no es valido <br>`
//             entrar=true
//         }
//         if (apellido.nodeValue.length <4){
//             warnings +=`El apellido no es valido <br>`
//             entrar=true
//         }
//         if(!regexEmail.test(email.value)){
//             warnings +=`El email no es valido <br>`
//             entrar=true
//         }    
//         if (password.value.length<8){
//             warnings +=`El email no es valido <br>`
//             entrar=true

//         }if (entrar){
//             parrafo.innerHTML = warnings 
//         }
//         else{
//             parrafo.innerHTML = "Enviado"
//         }
            
// })
    
