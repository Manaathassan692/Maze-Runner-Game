const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const player = {
    x: 40,
    y: 40,
    size: 20,
    color: 'red',
    speed: 5,
};

const finish = {
    x: 440,
    y: 440,
    size: 30,
    color: 'green',
};

const walls = [
    { x: 0, y: 100, width: 400, height: 20 },
    { x: 100, y: 200, width: 400, height: 20 },
    { x: 0, y: 300, width: 400, height: 20 },
    { x: 100, y: 400, width: 400, height: 20 },
];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawFinish() {
    ctx.fillStyle = finish.color;
    ctx.fillRect(finish.x, finish.y, finish.size, finish.size);
}

function drawWalls() {
    ctx.fillStyle = 'black';
    walls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

function detectCollision() {
    for (const wall of walls) {
        if (
            player.x < wall.x + wall.width &&
            player.x + player.size > wall.x &&
            player.y < wall.y + wall.height &&
            player.y + player.size > wall.y
        ) {
            alert('Game Over! You hit a wall.');
            resetGame();
            return;
        }
    }

    if (
        player.x < finish.x + finish.size &&
        player.x + player.size > finish.x &&
        player.y < finish.y + finish.size &&
        player.y + player.size > finish.y
    ) {
        alert('Congratulations! You reached the finish!');
        resetGame();
    }
}

function resetGame() {
    player.x = 40;
    player.y = 40;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawFinish();
    drawWalls();
    detectCollision();
    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
    }
});

gameLoop();
