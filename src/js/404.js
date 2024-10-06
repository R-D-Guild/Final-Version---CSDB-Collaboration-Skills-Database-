let timer = 10;
const timerElement = document.getElementById('redirect-timer');

const redirectToHome = setInterval(() => {
    timer--;
    timerElement.textContent = timer;

    if (timer === 0) {
        clearInterval(redirectToHome);
        window.location.href = 'index.html'; // Redirect to your homepage
    }
}, 10000);
