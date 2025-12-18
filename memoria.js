const icons = ['🔥','🔥','💎','💎','🍎','🍎','👻','👻','⚽','⚽','🍀','🍀'];
let deck = icons.sort(() => Math.random() - 0.5);
let active = [];
let found = 0;
let time = 30;

const clock = setInterval(() => {
    time--;
    document.getElementById('timer').innerText = time;
    if (time <= 0) {
        clearInterval(clock);
        alert("¡Tiempo agotado!");
        location.reload();
    }
}, 1000);

const grid = document.getElementById('grid');
deck.forEach(icon => {
    const card = document.createElement('div');
    card.className = "memory-card m-2";
    card.innerHTML = `<div class="inner"><div class="front">?</div><div class="back">${icon}</div></div>`;
    card.onclick = () => {
        if (active.length < 2 && !card.classList.contains('flipped')) {
            card.classList.add('flipped');
            active.push(card);
            if (active.length === 2) {
                if (active[0].innerText === active[1].innerText) {
                    found++;
                    document.getElementById('pairs').innerText = found;
                    active = [];
                    if (found === 6) { clearInterval(clock); setTimeout(() => alert("¡Victoria!"), 500); }
                } else {
                    setTimeout(() => { active.forEach(c => c.classList.remove('flipped')); active = []; }, 800);
                }
            }
        }
    };
    grid.appendChild(card);
});