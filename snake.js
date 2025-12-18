const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let score = 0;
let dx = 0, dy = 0;
let snake = [{x: 10, y: 10}];
let food = {x: 5, y: 5};

function main() {
    if (didEnd()) return alert("Fin del juego. Score: " + score);
    setTimeout(() => {
        clear();
        drawFood();
        advance();
        drawSnake();
        main();
    }, 120);
}

function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);
}

function drawSnake() {
    snake.forEach(p => {
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(p.x * 20, p.y * 20, 18, 18);
    });
}

function advance() {
    if (dx === 0 && dy === 0) return;
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        document.getElementById("score").innerText = score;
        food = {x: Math.floor(Math.random()*20), y: Math.floor(Math.random()*20)};
    } else snake.pop();
}

function didEnd() {
    const h = snake[0];
    return dx!==0 && dy!==0 && (h.x<0 || h.x>=20 || h.y<0 || h.y>=20 || snake.slice(1).some(p=>p.x===h.x && p.y===h.y));
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowLeft" && dx === 0) { dx = -1; dy = 0; }
    if (e.key === "ArrowRight" && dx === 0) { dx = 1; dy = 0; }
    if (e.key === "ArrowUp" && dy === 0) { dx = 0; dy = -1; }
    if (e.key === "ArrowDown" && dy === 0) { dx = 0; dy = 1; }
});

main();