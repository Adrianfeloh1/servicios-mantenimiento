//paso 3 para crear las diferentes secciones del html paso - 1, 2, 3. se crea una variable global

let pagina = 1;

document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  //console.log("iniciando app"); // para verificar que si estoy llamando todo el codigo HTML
  mostrarServicios();

  //Resalta el div actual sugun el tab que se presiona - paso 3
  mostrarSeccion();

  //Oculta o muestra una seccion segun el tab que se presiona - paso 3
  cambiarSeccion();

  //paginacion siguiente y anterior
  paginaSiguiente();

  paginaAnterior();

  //comprueba la pagina actual para oculatar o mostrar la paginacion

  botonesPaginador();
}

function mostrarSeccion() {

//Eliminar mostrar-seccion de la seccion anterior
  const seccionAnterior = document.querySelector(".mostrar-seccion");
  if (seccionAnterior) {
    seccionAnterior.classList.remove("mostrar-seccion");
  }  

  const seccionActual = document.querySelector(`#paso-${pagina}`);
  seccionActual.classList.add("mostrar-seccion");

  //elimina la clase actual en el tab anterior
  const tabAnterior = document.querySelector(".tabs .actual");
  if (tabAnterior) {
    tabAnterior.classList.remove("actual");
  }
  
  //resalta el tab actual
  const tab = document.querySelector(`[data-paso="${pagina}"]`);
  tab.classList.add("actual");
}

function cambiarSeccion() {
  // vamos al HTML y seleccionamos la clase tabs y despues la clase button de la nav
  const enlaces = document.querySelectorAll(".tabs button");
  //ahora agregamos un eventlisentner, pero como solo se le puede agregar a un solo elemento.
  //no puede ser agregar a una coleccion de elementos, entonces tenemos que iterar..

  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", e => {
      e.preventDefault();
      //console.log("click en un boton de nav"); // asi verificamos que los botones se ven en la consola
      //console.log(e.target.dataset.paso); //paso es dado en el html data-paso y verificamos en la consola
      pagina = parseInt(e.target.dataset.paso); //para pasarlo de string a number

     
      
      //llamamos la funcion de mostrar seccion 4.
      mostrarSeccion();

      botonesPaginador();
    })
  })
}

async function mostrarServicios() {
  try {
    const resultado = await fetch("./servicios.json");
    const db = await resultado.json();

    const {servicios} = db; //Para que consulte todos los servicios dentro del array
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

  let elemento;
  if (e.target.tagName === "P") {
    elemento = e.target.parentElement;
    //console.log(e.target.parentElement); para verificar que si se esté dando el mismo resultado
  } else {
    elemento = e.target;
  }
  console.log(elemento.dataset.idServicio); // no importa en que parte le demos click, el va a reconocer el id

  if (elemento.classList.contains("seleccionado")) {
    // si lo contiene
    elemento.classList.remove("seleccionado"); // entonces removerlo
  } else {
    elemento.classList.add("seleccionado"); //y si no lo contiene entonces crearlo
  }
}

function paginaSiguiente() {
  //console.log("pagina siguiente");//para verificar que se estan viendo las funciones en la consola
  const paginaSiguiente = document.querySelector("#siguiente");
  paginaSiguiente.addEventListener("click", () => {
    pagina++;
    console.log(pagina); //verificamos en consola que aumente las paginas ++

    botonesPaginador(); //para reiniciar los valores del documento cada vez que damos en sigiuiente o anterior
  });
}

function paginaAnterior() {
  //console.log("pagina anterior");
  const paginaAnterior = document.querySelector("#anterior");
  paginaAnterior.addEventListener("click", () => {
    pagina--;
    console.log(pagina);

    botonesPaginador(); //para reiniciar los valores del documento cada vez que damos en sigiuiente o anterior
  });
}

// Secrea funcion para darle limites a las paginas

function botonesPaginador() {
  const paginaSiguiente = document.querySelector("#siguiente");
  const paginaAnterior = document.querySelector("#anterior");

  if (pagina === 1) {
    paginaAnterior.classList.add("ocultar");
  } else if (pagina === 3) {
    paginaSiguiente.classList.add("ocultar");
    paginaAnterior.classList.remove("ocultar");
  } else {
    paginaAnterior.classList.remove("ocultar");
    paginaSiguiente.classList.remove("ocultar");
  }
  // con esto cambian las paginas pero no cambia el contenido
  mostrarSeccion(); //entonces se debe de llamar la funcion que cambia las secciones
  
}
