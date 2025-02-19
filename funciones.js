const documentReady = () => {
    const header = document.querySelector('.header');
    const headerNav = document.querySelector('.header-nav');
  
    const headerNavMenuIconContainer = document.getElementById('headerNavMenuIconContainer');
    const headerNavMenuCloseIconContainer = document.getElementById('headerNavMenuCloseIconContainer');
    const headerNavMenuLinkList = document.querySelector('.header-nav__menu-link-list');
    const headerNavLinks = [...document.querySelectorAll('.header-nav__menu-link')];
  
    const heroTitle = document.querySelector('.hero__title');
    const heroLearnButton = document.querySelector('.hero__learn-button');
    const heroStarsImageContainer = document.querySelector('.hero__stars-image-container');
    const heroMoonImageContainer = document.querySelector('.hero__moon-image-container');
    const heroMountainsBehindImageContainer = document.querySelector('.hero__mountains-behind-image-container');
    const heroMountainsFrontImagecontainer = document.querySelector('.hero__mountains-front-image-container');
  
  
    const openMenu = () => {
      headerNavMenuLinkList.classList.add('header-nav__menu-link-list--open');
    };
  
    const closeMenu = () => {
      headerNavMenuLinkList.classList.remove('header-nav__menu-link-list--open');
    };
  
    headerNavMenuIconContainer.addEventListener('click', openMenu);
    headerNavMenuCloseIconContainer.addEventListener('click', closeMenu);
    headerNavLinks.forEach((element) => {
      element.addEventListener('click', closeMenu);
    });
  };
  document.addEventListener('DOMContentLoaded', documentReady);
  
  
  
//funciones desarrollo web

document.getElementById('tarjeta1b').style.display='none';
document.getElementById('tarjeta2b').style.display='none';
document.getElementById('tarjeta3b').style.display='none';
document.getElementById('tarjeta4b').style.display='none';
document.getElementById('tarjeta5b').style.display='none';
document.getElementById('tarjeta6b').style.display='none';

function girar1(){
  document.getElementById('tarjeta1a').style.display='none';
  document.getElementById('tarjeta1b').style.display='block';
}

function girar2(){
  document.getElementById('tarjeta2a').style.display='none';
  document.getElementById('tarjeta2b').style.display='block';
}

function girar3(){
  document.getElementById('tarjeta3a').style.display='none';
  document.getElementById('tarjeta3b').style.display='block';
}

function girar4(){
  document.getElementById('tarjeta4a').style.display='none';
  document.getElementById('tarjeta4b').style.display='block';
}

function girar5(){
  document.getElementById('tarjeta5a').style.display='none';
  document.getElementById('tarjeta5b').style.display='block';
}

function girar6(){
  document.getElementById('tarjeta6a').style.display='none';
  document.getElementById('tarjeta6b').style.display='block';
}

function regresar1(){
  document.getElementById('tarjeta1a').style.display='block';
  document.getElementById('tarjeta1b').style.display='none';
}

function regresar2(){
  document.getElementById('tarjeta2a').style.display='block';
  document.getElementById('tarjeta2b').style.display='none';
}

function regresar3(){
  document.getElementById('tarjeta3a').style.display='block';
  document.getElementById('tarjeta3b').style.display='none';
}

function regresar4(){
  document.getElementById('tarjeta4a').style.display='block';
  document.getElementById('tarjeta4b').style.display='none';
}

function regresar5(){
  document.getElementById('tarjeta5a').style.display='block';
  document.getElementById('tarjeta5b').style.display='none';
}

function regresar6(){
  document.getElementById('tarjeta6a').style.display='block';
  document.getElementById('tarjeta6b').style.display='none';
}

//funciones slider 3d
const initCarousel = (container) => {
  const containerCarrousel = container.querySelector(".container-carrousel");
  const carrousel = container.querySelector(".carrousel");
  const carrouselItems = carrousel.querySelectorAll(".carrousel-item");
  const leftNav = container.querySelector(".carousel-nav.left");
  const rightNav = container.querySelector(".carousel-nav.right");

  let isMouseDown = false;
  let currentMousePos = 0;
  let lastMousePos = 0;
  let lastMoveTo = 0;
  let moveTo = 0;

  const createCarrousel = () => {
    const carrouselProps = onResize();
    const length = carrouselItems.length;
    const degrees = 360 / length;
    const gap = 20;
    const tz = distanceZ(carrouselProps.w, length, gap);

    const fov = calculateFov(carrouselProps);
    const height = calculateHeight(tz);

    container.style.width = tz * 2 + gap * length + "px";
    container.style.height = height + "px";

    carrouselItems.forEach((item, i) => {
      const degreesByItem = degrees * i + "deg";
      item.style.setProperty("--rotatey", degreesByItem);
      item.style.setProperty("--tz", tz + "px");
    });
  };

  const lerp = (a, b, n) => n * (a - b) + b;

  const distanceZ = (widthElement, length, gap) => (widthElement / 2) / Math.tan(Math.PI / length) + gap;

  const calculateHeight = z => {
    const t = Math.atan(90 * Math.PI / 180 / 2);
    return t * 2 * z;
  };

  const calculateFov = carrouselProps => {
    const perspective = window
      .getComputedStyle(containerCarrousel)
      .perspective.split("px")[0];

    const length =
      Math.sqrt(carrouselProps.w * carrouselProps.w) +
      Math.sqrt(carrouselProps.h * carrouselProps.h);
    return 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  };

  const getPosX = x => {
    currentMousePos = x;
    moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;
    lastMousePos = currentMousePos;
  };

  const update = () => {
    lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
    carrousel.style.setProperty("--rotatey", lastMoveTo + "deg");
    requestAnimationFrame(update);
  };

  const onResize = () => {
    const boundingCarrousel = containerCarrousel.getBoundingClientRect();
    return { w: boundingCarrousel.width, h: boundingCarrousel.height };
  };

  const initEvents = () => {
    carrousel.addEventListener("mousedown", () => {
      isMouseDown = true;
      carrousel.style.cursor = "grabbing";
    });
    carrousel.addEventListener("mouseup", () => {
      isMouseDown = false;
      carrousel.style.cursor = "grab";
    });
    container.addEventListener("mouseleave", () => (isMouseDown = false));

    carrousel.addEventListener(
      "mousemove",
      e => isMouseDown && getPosX(e.clientX)
    );

    carrousel.addEventListener("touchstart", () => {
      isMouseDown = true;
      carrousel.style.cursor = "grabbing";
    });
    carrousel.addEventListener("touchend", () => {
      isMouseDown = false;
      carrousel.style.cursor = "grab";
    });
    container.addEventListener(
      "touchmove",
      e => isMouseDown && getPosX(e.touches[0].clientX)
    );

    window.addEventListener("resize", createCarrousel);

    leftNav.addEventListener("click", () => {
      moveTo -= 60; // Adjust the value as needed for rotation angle
    });

    rightNav.addEventListener("click", () => {
      moveTo += 60; // Adjust the value as needed for rotation angle
    });

    update();
    createCarrousel();
  };

  initEvents();
};

document.querySelectorAll('.carousel-container').forEach(container => {
  initCarousel(container);
});


