const imageCart = document.querySelector('#card_btn');

// Preload the image
const preloadImage = new Image();
preloadImage.src = './assets/media/cart_opened.png';


imageCart.addEventListener('click', (e) => {
    e.preventDefault();
    imageCart.setAttribute('src', './assets/media/cart_opened.png');
    imageCart.className = 'slider-area animate__animated animate__zoomInUp'

    setTimeout(() =>{
        window.location = 'invitation.html';
    },1800)
})
