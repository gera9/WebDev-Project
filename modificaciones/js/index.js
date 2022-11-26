
const enviarSugerencia=()=>{
    var corrreo = document.querySelector("#email").value;
    var sugerencia = document.querySelector("#sugerencia").value;
    if(corrreo.trim()==='' || sugerencia.trim()===''){
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