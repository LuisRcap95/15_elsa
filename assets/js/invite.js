/* const video = document.querySelector('#framevideo');
video.currentTime = 3;

// Video set display size
if(window.matchMedia("(max-width: 767px)").matches) {
    // change style left
    video.style.left = '-50vw';
    video.width = window.innerWidth * 2;
    video.height = window.innerHeight;
} else {
    video.width = window.innerWidth;
    video.height = window.innerHeight;
}

// pouse video on its second 14
video.addEventListener('timeupdate', function(e) {
    e.preventDefault();
    if (video.currentTime >= 14.2 && interactions === 0) {
        video.pause();
        changeSlide();
        interactions++;
    } else if(video.currentTime >= 29.5 && video.currentTime < 48 && interactions === 1) {
        video.pause();
        interactions = 1;
        changeSlide();
        interactions++;
    } else if (video.currentTime >= 54.5 && interactions === 1) {
        video.pause();
        interactions = 2;
        changeSlide();
    }
}); */

const container = document.querySelector('#container');
const scene = document.querySelector('.scene');

const star2D = document.querySelector('.twoD');
const star3D = document.querySelector('.threeD');

let interactions = 0;

const cuteTexts = [
    `<div class="slider_caption">
        <span class="span-caption">
            Estás invitado a lo XV de Elsa María este
            18 de octubre.<br>
            Misa: 05:00 pm en  
            <a href="https://maps.app.goo.gl/WJYXUUS8hTP89TMa7" target="_blank">
                Iglesia de San Miguel
            </a><br>
            Recepción: al finalizar la misa de acción de gracias los esperamos en <a href="https://maps.app.goo.gl/dC2xjGSCD4npPcf76" target="_blank">
                Calle Girasol, Las Huertas 1ra Secc, 53427 Naucalpan de Juárez
            </a>
        </span>
        <div class="btn-container">
            <button id="si">
                ¿Confirmas asistencia?
                <img src="assets/media/yes-image.png" alt="yes" class="yes-image">
            </button>
                
            <button id="no" >
                No, gracias
                <img src="assets/media/no-image.png" alt="no" class="no-image">
            </button>
        </div>
    </div>`,
    `<div class="slider_caption">
    <span class="span-caption">
        ¡Qué bueno saber que aceptas la invitación! Por favor confirma tu asistencia llenando el
        siguiente formulario.<br><br>
    </span>
    <div class="form-div">
        <img src="assets/media/form-side.png" alt="form-aside" height="300px" class="form-aside">
        <span class="fill-span"></span>
        <form id="inviteForm">
            <input class="pap-input" type="text" placeholder="Nombre" id="nombre" required />
            <input class="pap-input" type="tel" placeholder="Teléfono" id="telefono" required />
            <input class="pap-input" type="number" placeholder="Acompañantes (0 si no)" id="acompanantes" required />
            <button class="pap-btn" id="enviar" >Enviar</button>
        </form>
    </div>
    </div>`,
    `<div class="slider_caption">
    <span class="span-caption">
        Qué pena no poder verte ese día... 😢<br><br><br>
        pero si cambias de opinión puedes volver a usar el enlace de la invitación
        para confirmar tu asistencia.
    </span>
    <img src="assets/media/not-accept.png" alt="no-accept" class="not-accept">
    </div>`,
    `<div class="slider_caption">
    <sapn class="span-caption">
        ¡Gracias por confirmar tu asistencia!<br><br>
        Sugerencia de regalo: Para mí el mejor regalo es tu presencia este día tan epecial,
        pero si quieres darme un presente y no sabes qué podrías regalarme; puedes hacerlo dentro
        de un sobre. <br>
    </span>
    <img src="assets/media/final-accept.png" alt="no-accept" class="final-image">
    </div>`,
]

changeSlide();

function changeSlide () {
    const sliderArea = document.createElement('div');
    sliderArea.innerHTML = cuteTexts[interactions];
    sliderArea.className = `slider-area animate__animated animate__fadeIn animate__delay-2s`;

    container.appendChild( sliderArea );

    if (interactions === 0) {
        addFirstListenerButtons();
    } else if (interactions === 1) {
        addFormListener();
    }

}

function addFirstListenerButtons () {
    const buttonSi = document.querySelector('#si');
    const buttonNo = document.querySelector('#no');
    buttonSi.addEventListener( 'click', async (e) => {
        e.preventDefault();
        interactions++;
        star2D.classList.add('animate__slow');
        star3D.classList.add('animate__slow');
        star2D.classList.add('animate__fadeOutUpBig');
        star3D.classList.add('animate__fadeOutUpBig');
        
        container.removeChild( document.querySelector('.slider-area') );
        scene.removeChild( star2D );
        await new Promise( resolve => setTimeout(() => {
            resolve();
        }, 500));
        scene.removeChild( star3D );
        

        star2D.classList.remove('animate__fadeOutUpBig');
        star3D.classList.remove('animate__fadeOutUpBig');
        
        star2D.classList.add('animate__fadeInDownBig');
        star3D.classList.add('animate__fadeInDownBig');
        scene.appendChild( star3D );
        setTimeout(() => {
            scene.appendChild( star2D );
            changeSlide();
        }, 500);
        
    })

    buttonNo.addEventListener( 'click', async (e) => {
        e.preventDefault();
        star2D.classList.add('animate__slower');
        star3D.classList.add('animate__slower');
        star2D.classList.add('animate__fadeOutDownBig');
        star3D.classList.add('animate__fadeOutDownBig');
        container.removeChild( document.querySelector('.slider-area') );
        await new Promise( resolve => setTimeout(() => {
            scene.removeChild( star2D );
            scene.removeChild( star3D );
            resolve();
        }, 500));

        interactions = 2;
        changeSlide();
    })
}

function addFormListener() {
    const url = "https://9fgcaoptb3.execute-api.us-west-1.amazonaws.com/Prod"
    const btnSubmit = document.querySelector('#enviar');
    btnSubmit.addEventListener('click', (e) => {
        e.preventDefault();

        try {
            document.querySelector('#inviteForm').removeChild( document.querySelector('.error-form') );
        } catch( err ) {}
        const nombre = document.querySelector('#nombre').value;
        const telefono = document.querySelector('#telefono').value;
        const acompanantes = document.querySelector('#acompanantes').value;

        if( !nombre || !telefono || !acompanantes ) {
            const errorMessage = document.createElement('span');
            errorMessage.innerHTML = `Por favor llene todos los campos`;
            errorMessage.className = `message-form text-danger`;
            document.querySelector('#inviteForm').appendChild(errorMessage)
            return;
        }

        btnSubmit.innerText = `Gracias!`
        btnSubmit.classList.remove('pap-btn');
        btnSubmit.classList.add('btn');
        btnSubmit.classList.add('btn-success');
        btnSubmit.disabled = true

        const successMessage = document.createElement('span');
        successMessage.innerHTML = `Estamos registrando sus datos`;
        successMessage.className = `message-form text-success`;
        document.querySelector('#inviteForm').appendChild(successMessage);
        fetch(url + '/add-guest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name: nombre, phone: telefono, companions: acompanantes})
        }).then( res => {
            if(res.ok) {                
                setTimeout(() =>{
                    const sliderArea = document.querySelector('.slider-area')
                    container.removeChild( sliderArea );
                    sliderArea.innerHTML = cuteTexts[3];
                    sliderArea.className = `slider-area animate__animated animate__fadeIn animate__delay-2s`;
                    container.appendChild( sliderArea );
                    interactions = 3;
                    changeSlide();
                },500);
            }
        }).catch( err => {
            console.log(err);
            successMessage.innerHTML = `Hubo un error, por favor intenta de nuevo`;
            successMessage.classList.remove('text-success');
            successMessage.classList.add('text-danger');
        });
    })
}