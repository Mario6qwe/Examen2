let towers = [[3, 2, 1], [], []];
let selectedTower = null;
let moves = 0;

function render() {
    for (let i = 0; i < 3; i++) {
        const pole = document.getElementById(`pole-${i}`);
        const wrapper = document.getElementById(`t${i}`);
        
        pole.innerHTML = "";
        
        // Efecto visual de selección
        if (selectedTower === i) {
            wrapper.classList.add('selected');
        } else {
            wrapper.classList.remove('selected');
        }

        towers[i].forEach(diskSize => {
            const diskDiv = document.createElement('div');
            diskDiv.className = `disk disk-${diskSize}`;
            
            // Importante: El CSS 'align-items: center' en '.pole' 
            // ya se encarga de centrar estos divs automáticamente.
            pole.appendChild(diskDiv);
        });
    }
}

function handleTowerClick(index) {
    if (selectedTower === null) {
        if (towers[index].length > 0) {
            selectedTower = index;
        }
    } else {
        const from = selectedTower;
        const to = index;

        if (from !== to) {
            const movingDisk = towers[from][towers[from].length - 1];
            const topDiskTarget = towers[to][towers[to].length - 1];

            if (!topDiskTarget || movingDisk < topDiskTarget) {
                towers[to].push(towers[from].pop());
                moves++;
                document.getElementById('move-count').innerText = moves;
                checkWin();
            } else {
                alert("¡Movimiento inválido!");
            }
        }
        selectedTower = null;
    }
    render();
}

function checkWin() {
    if (towers[2].length === 3) {
        setTimeout(() => alert("¡Victoria!"), 300);
    }
}

function resetGame() {
    towers = [[3, 2, 1], [], []];
    selectedTower = null;
    moves = 0;
    document.getElementById('move-count').innerText = moves;
    render();
}

render();