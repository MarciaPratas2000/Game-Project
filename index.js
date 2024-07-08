const gameTextButton = document.getElementById('gameText');
const gameInstructions = document.querySelector('.game-instructions');
const gameSection = document.querySelector('.game-section');

// Toggle game instructions visibility
gameTextButton.addEventListener('click', function() {
    if (gameInstructions.style.display === 'none' || gameInstructions.style.display === '') {
        gameSection.style.display = 'none';
        gameInstructions.style.display = 'block';
        gameTextButton.textContent = 'Go Back'; // Change button text
    } else {
        gameSection.style.display = 'block';
        gameInstructions.style.display = 'none';
        gameTextButton.textContent = 'Instructions!'; // Change button text back
    }
});

const gravity = 0.7;
// Get the canvas element and its 2D drawing context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Resize the canvas
canvas.width = 1024;
canvas.height = 576;
// Set the background color to black
c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height);

// Create a background
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png'
});

// Create a player Fighter
const player = new Fighter({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    imageSrc: './img/player/Pink_Monster_Idle_4.png',
    scale: 5,
    offset: { x: 20, y: 50 },
    sprites: {
        idle: { 
            imageSrc: './img/player/Pink_Monster_Idle_4.png', 
            framesMax: 4,
            frameHold: 30 // Adjust as needed
        },
        run: { 
            imageSrc: './img/player/Pink_Monster_Run_6.png', 
            framesMax: 6,
            frameHold: 10 // Adjust as needed
        },
        jump: { 
            imageSrc: './img/player/Pink_Monster_Jump_8.png', 
            framesMax: 8,
            frameHold: 10 // Adjust as needed
        },
        attack: { 
            imageSrc: './img/player//Pink_Monster_Attack2_6.png', 
            framesMax: 6,
            frameHold: 10 // Adjust as needed
        },
    },
    reverseAnimation: false // Set to false for reverse animation
});

// Create an enemy Fighter
const enemy = new Fighter({
    position: { x: 900, y: 100 },
    velocity: { x: 0, y: 0 },
    imageSrc: './img/enemy/Dude_Monster_Idle_4.png',
    scale: 5,
    offset: { x: 20, y: 50 },
    sprites: {
        idle: { 
            imageSrc: './img/enemy/Dude_Monster_Idle_4.png', 
            framesMax: 4,
            frameHold: 30 // Adjust as needed
        },
        run: { 
            imageSrc: './img/enemy/Dude_Monster_Run_6.png', 
            framesMax: 6,
            frameHold: 10 // Adjust as needed
        },
        jump: { 
            imageSrc: './img/enemy/Dude_Monster_Jump_8.png', 
            framesMax: 8,
            frameHold: 10 // Adjust as needed
        },
        attack: { 
            imageSrc: './img/enemy/Dude_Monster_Attack2_6.png', 
            framesMax: 6,
            frameHold: 10 // Adjust as needed
        },
    },
    reverseAnimation: true // Set to true for reverse animation
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function handleKeyDown(event) {
    switch (event.key) {
        // Player movements
        case 'd':
            keys.d.pressed = true;
            player.lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            player.lastKey = 'a';
            break;
        case 'w':
            keys.w.pressed = true;
            player.velocity.y = -20;
            break; 
        // Space bar - activate attack
        case ' ':
            player.attack();
            break;
        // Enemy movements  
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            enemy.lastKey = 'ArrowRight';
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            enemy.lastKey = 'ArrowLeft';
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = true;
            enemy.velocity.y = -20;
            break;
        case 'ArrowDown':
            enemy.attack();
            break;
    }
}

function handleKeyUp(event) {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false;
            break;
        case 'a':
            keys.a.pressed = false;
            break;
        case 'w':
            keys.w.pressed = false;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
        case 'ArrowUp':
            keys.ArrowUp.pressed = false;
            break;
    }
}

// Detect rectangle collision
function handleRectangleCollision(rect1, rect2) {
    return (
        rect1.position.x + rect1.attackBox.width >= rect2.position.x &&
        rect1.position.x <= rect2.position.x + rect2.attackBox.width &&
        rect1.position.y + rect1.attackBox.height >= rect2.position.y &&
        rect1.position.y <= rect2.position.y + rect2.attackBox.height
    );
}

// Start the animation loop
function animate() {
    window.requestAnimationFrame(animate);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    background.update();
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;

    // Default player sprite to idle
    player.switchSprite('idle');
    if (keys.d.pressed && player.lastKey === 'd') {
        player.velocity.x = 5;
        player.switchSprite('run');
    } else if (keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -5;
        player.switchSprite('run');
    }
    if (player.velocity.y < 0) { 
        player.switchSprite('jump');
    }

    // Default enemy sprite to idle
    enemy.switchSprite('idle');
    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
        enemy.switchSprite('run');
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5; 
        enemy.switchSprite('run');
    }
    if (enemy.velocity.y < 0) { 
        enemy.switchSprite('jump');
    }

    // Detect collision
    if (handleRectangleCollision(player, enemy) && player.isAttacking) {
        player.isAttacking = false;
        console.log('Player Attack');
        enemy.healthBarElement = document.querySelector('#enemy-health-fill');
        enemy.updateHealthBar();
    }
    if (handleRectangleCollision(enemy, player) && enemy.isAttacking) {
        enemy.isAttacking = false;
        console.log('Enemy Attack');
        player.healthBarElement = document.querySelector('#player-health-fill');
        player.updateHealthBar();
    }

    if (player.health <= 1 || enemy.health <= 1) {
        determine(player, enemy);
    }
}

// Start the animation loop
animate();

window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

