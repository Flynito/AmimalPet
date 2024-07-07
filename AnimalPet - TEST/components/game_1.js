const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

document.querySelector('.top-bar-container iframe').addEventListener('load', () => {
    const iframeDoc = document.querySelector('.top-bar-container iframe').contentDocument;
    const coinCounter = iframeDoc.getElementById('coinCounter');

    let coins_earned = parseInt(localStorage.getItem('coinsEarned')) || 0;
    coinCounter.textContent = coins_earned;

    let animalImg = new Image();
    const animalImageLink = localStorage.getItem('animalImageLink') || '../assets/images/animals/Panda.png'; // Image par défaut
    animalImg.src = animalImageLink;

    let obstacleImg = new Image();
    obstacleImg.src = '../assets/images/animals/MonsieurSananes.png'; // Chemin vers votre image d'obstacle

    let animal = {
        x: 50,
        y: 150,
        width: 42,
        height: 44,
        dy: 0,
        gravity: 0.19,
        jumpPower: -7,
        grounded: true
    };

    let obstacles = [];
    let isJumping = false;
    let gameOver = false;
    let obstacleSpawnInterval = 1000;
    let lastObstacleSpawnTime = 0;
    let obstacleSpeed = 3;
    let obstaclesSpawned = 0;
    let speedIncreaseInterval = 5;

    let score = 0;
    let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;

    function drawAnimal() {
        ctx.drawImage(animalImg, animal.x, animal.y, animal.width, animal.height);
    }

    function drawObstacles() {
        obstacles.forEach(obstacle => {
            ctx.drawImage(obstacle.image, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        });
    }

    function drawScores() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Pixel-7';
        ctx.fillText('Score: ' + score, canvas.width - 80, 20);
        ctx.fillText('Best: ' + bestScore, canvas.width - 80, 50);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function updateAnimal() {
        if (isJumping) {
            animal.dy = animal.jumpPower;
            isJumping = false;
        }
        animal.dy += animal.gravity;
        animal.y += animal.dy;

        if (animal.dy > 0) {
            animal.dy += animal.gravity * 0.3;
        }

        if (animal.y + animal.height > canvas.height) {
            animal.y = canvas.height - animal.height;
            animal.dy = 0;
            animal.grounded = true;
        }
    }

    function updateObstacles() {
        obstacles.forEach(obstacle => {
            obstacle.x -= obstacle.speed;
        });

        obstacles = obstacles.filter(obstacle => {
            if (obstacle.x + obstacle.width > 0) {
                return true;
            } else {
                if (!obstacle.passed) {
                    obstacle.passed = true;
                    coins_earned = coins_earned + 1; 
                    coinCounter.textContent = coins_earned; 
                    localStorage.setItem('coinsEarned', coins_earned);
                    score++; 
                }
                return false;
            }
        });

        let now = Date.now();
        if (now - lastObstacleSpawnTime > obstacleSpawnInterval) {
            spawnObstacle();
            lastObstacleSpawnTime = now;
            obstacleSpawnInterval = Math.random() * 1500 + 500;
        }
    }

    function spawnObstacle() {
        obstacles.push({
            x: canvas.width,
            y: canvas.height - 60,
            width: 50,
            height: 60,
            speed: obstacleSpeed,
            image: obstacleImg,
            passed: false
        });
        obstaclesSpawned++;

        if (obstaclesSpawned % speedIncreaseInterval === 0) {
            obstacleSpeed += 0.5;
            obstacleSpawnInterval = Math.max(300, obstacleSpawnInterval - 100);
        }
    }

    function checkCollision() {
        obstacles.forEach(obstacle => {
            if (
                animal.x < obstacle.x + obstacle.width &&
                animal.x + animal.width > obstacle.x &&
                animal.y < obstacle.y + obstacle.height &&
                animal.y + animal.height > obstacle.y
            ) {
                gameOver = true;
            }
        });
    }

    function displayGameOver() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Pixel-7';
        ctx.fillText('Game Over', canvas.width / 2 - 50, canvas.height / 2.3);
        ctx.fillText('Appuyez sur espace pour rejouer', canvas.width / 2 - 155, canvas.height / 2 + 30);
    }

    function resetGame() {
        animal.y = 150;
        animal.dy = 0;
        animal.grounded = true;
        obstacles = [];
        lastObstacleSpawnTime = Date.now();
        obstacleSpawnInterval = 1000;
        obstacleSpeed = 3;
        obstaclesSpawned = 0;

        if (score > bestScore) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
        }
        score = 0;
        gameOver = false; 
    }

    function gameLoop() {
        clearCanvas();
        if (!gameOver) {
            drawAnimal();
            drawObstacles();
            drawScores();
            updateAnimal();
            updateObstacles();
            checkCollision();
        } else {
            displayGameOver();
        }
        requestAnimationFrame(gameLoop);
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            if (gameOver) {
                resetGame();
            } else if (animal.grounded) {
                isJumping = true;
                animal.grounded = false;
            }
        }
    });

    gameLoop();
});
