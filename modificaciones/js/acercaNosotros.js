
const enviarSugerencia=()=>{
    var nombre = document.querySelector("#nombre").value;
    var email = document.querySelector("#email").value;
    if(nombre.trim()==='' || email.trim()===''){
        event.preventDefault();
        Swal.fire({
            title: 'Error!',
            text: 'No has llenado todos los campos',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        return;
    }
}