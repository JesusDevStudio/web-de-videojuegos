
document.addEventListener("DOMContentLoaded", function () {
    /*const navbar = document.getElementById("navbar");  
    const links = document.querySelectorAll(".link_navbar > a");
    function highlightCurrentSection() {
        for (var i = 0; i < links.length; i++) {
            var sectionId = links[i].getAttribute("href");
            var section = document.getElementById(sectionId);

            if (section.offsetTop <= window.scrollY && section.offsetTop + section.offsetHeight > window.scrollY) {
                links[i].classList.add("active");
            } else {
                links[i].classList.remove("active");
            }
        }
  }
      //Resalta de color rojo el momento en el que el usuario se encuentra en esta pagina
  links[0].style.color = 'red';*/

    // Llama a la función inicialmente para resaltar la sección actual al cargar la página
 const rutaJson = './scripts/noticias.json';
    const getParentTagNewsContainer=document.querySelector(".news_container_display")

    fetch(rutaJson)
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status}`);// llamada al backend y te retorna un status
    } 
    return response.json();
  })
  .then(data => {
    console.log(data);
    let htmlString = '';
      data.forEach(item => {
        htmlString +=  `<div>
        <p>${item.titulo}</p>
        <img class="img_news_display" src="${item.imagen}" />
        <a href="${item.enlace}" target="_blank">Ver</a>
        </div>`;
      });
    getParentTagNewsContainer.innerHTML=htmlString
  })
  .catch(error => {
    console.error(`Error de fetch: ${error.message}`);
  }); 
//Ver que debe hacer la funcion
  //  window.addEventListener("scroll", highlightCurrentSection);

//Funcio para poder rescatar del archivo JSON las noticias y poder usarlas en JS
//Funcionalidad slider
    const btnLeft = document.querySelector(".btn-left-destacados");
    const btnRight = document.querySelector(".btn-right-destacados");
    const slider = document.querySelector("#slide2r");
    const sliderSections = document.querySelectorAll(".slider-section2"); // Utiliza querySelectorAll para obtener todos los elementos
    console.log(sliderSections);
    //Aqui lo que hemos hecho es "traer" del HTML los elementos necesarios para que funcione el carrusel

    //Ahora vamos a crear las funciones de movimiento
    btnLeft.addEventListener("click", e => moveToLeft())
    btnRight.addEventListener("click", e => moveToRight())

    setInterval(() => {
        moveToRight();
    }, 3000);

    let operacion = 0;
    let counter = 0;
    let widthImg = 100 / sliderSections.length;
    function moveToRight() {
        
        if (counter >= sliderSections.length - 1) {
            operacion = 0;
            counter = 0;
            slider.style.transform = `translate(${-operacion}%)`
            slider.style.transition = "none"
        } else {
            counter++;
            operacion = operacion + widthImg;
            slider.style.transform = `translate(${-operacion}%)`
            slider.style.transition = "all ease .6s"
        }
    }
    function moveToLeft() {
        counter--;
        if (counter < 0) {
            counter = sliderSections.length - 1;
            operacion = widthImg * (sliderSections.length-1);
            slider.style.transform = `translate(${-operacion}%)`
            slider.style.transition = "none"

        } else {
            
            operacion = operacion - widthImg;
            slider.style.transform = `translate(${-operacion}%)`
            slider.style.transition = "all ease .6s"
        }
    }

});


const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})