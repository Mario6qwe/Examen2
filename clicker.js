let clicks = 0;
let timeLeft = 10;
let started = false;

function hit() {
    if (timeLeft > 0) {
        clicks++;
        document.getElementById('c').innerText = clicks;
        if (!started) {
            started = true;
            const timer = setInterval(() => {
                timeLeft--;
                document.getElementById('t').innerText = timeLeft;
                if (timeLeft <= 0) {
                    clearInterval(timer);
                    alert("Total de clics: " + clicks);
                    location.reload();
                }
            }, 1000);
        }
    }
}