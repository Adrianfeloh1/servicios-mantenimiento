document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  //console.log("iniciando app"); // para verificar que si estoy llamando todo el codigo HTML
  mostrarServicios();
}

async function mostrarServicios() {
  try {
    const resultado = await fetch("./servicios.json");
    const db = await resultado.json();

    const servicios = db.servicios; //Para que consulte todos los servicios dentro del array
    //console.log(servicios); // para verificar que aparezcan todos los servicios en la consola

    //2.Generar todo el HTML

    servicios.forEach((servicio) => {
      //console.log(servicio); //Conforme vaya iterando, se va a crear la variable servicio

      // destructuring para crear una sola variable con cada propiedad del objeto

      const { id, nombre, precio } = servicio; //itaración

      //DOM scripting = GENERAR CODIGO HTML CON SCRIPTING

      //GENERAR NOMBRE DE SERVICIOS
      const nombreServicio = document.createElement("P"); // en el parrafo estamos creando la variable nombreServicio
      nombreServicio.textContent = nombre; // le decimos que su contenido va a ser el resultado de la interacion = servicio
      nombreServicio.classList.add("nombre-servicio"); // agregamos una clase a esa etiqueta P

      //console.log(nombreServicio);//para verificar en consola

      //GENERAR EL PRECIO DEL SERVICIO
      const precioServicio = document.createElement("P"); // creando el párrafo para el precio
      precioServicio.textContent = "$ " + precio; // su contenido va a ser el resultado de la interación = servicio
      precioServicio.classList.add("precio-servicio");

      //console.log(precioServicio);//para verificar en consola

      //GENERAR EL DIV CONTENEDOR DE CADA SERVICIO
      const servicioDiv = document.createElement("DIV");
      servicioDiv.classList.add("servicio");
      //console.log(servicioDiv); //para verificar que se vea en la consola

      servicioDiv.dataset.idServicio = id; //para que seleccione el numero del id que el usuario está seleccionando 2.

      //Selecciona un servicio para la cita
      servicioDiv.onclick = seleccionarServicio; //se debe crear la fución abajo  2.

      //INYECTAR LAS VARIABLES DE PRECIO Y NOMBRE AL DIV DE SERVICIO

      servicioDiv.appendChild(nombreServicio);
      servicioDiv.appendChild(precioServicio);

      //console.log(servicioDiv);//para verificar en consola

      //INYECTARLO EN EL HTML - se debe crear una id ="servicios" del HTML
      document.querySelector("#servicios").appendChild(servicioDiv); // para visualizarlo en el HTML
    });
  } catch (error) {
    console.log(error);
  }
}

function seleccionarServicio(e) {
  console.log(e.target.tagName); // el evento se propaga en los hijos (DIV y P)

  //forzar al elemento al cual le dimos click se el DIV

  let elemento = 0;
  if (e.target.tagName === "P") {
    elemento = e.target.parentElement;
    //console.log(e.target.parentElement); para verificar que si se esté dando el mismo resultado
  } else {
    elemento = e.target;
  }
  console.log(elemento.dataset.idServicio); // no importa en que parte le demos click, el va a reconocer el id

  if (elemento.classList.contains("seleccionado")) { // si lo contiene
    elemento.classList.remove("seleccionado"); // entonces removerlo
  } else {
    elemento.classList.add("seleccionado");//y si no lo contiene entonces crearlo
  }
}
