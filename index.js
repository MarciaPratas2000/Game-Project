

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

const gravity = 0.7
// Get the canvas element and its 2D drawing context
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

// Resize the canvas
canvas.width = 1024;
canvas.height = 576;
// Set the background color to black
c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height);

//Note:
// Arrow Functions: Arrow functions do not have their own 'this' context. 
// Instead, they inherit the 'this' value from their enclosing lexical scope (the context in which they are defined). 
// This behavior is particularly useful for maintaining the context of this in nested functions or when using callbacks.
// Normal Functions: Normal functions have their own 'this' context, which is determined by how the function is called. 
// The value of 'this' inside a normal function depends on the function's invocation context (e.g., if it's a method of an object, a standalone function call, etc.).

// Create a background
const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc:'./img/background.png'
});
// Create a player Fighter
const player = new Fighter({ 
    position: {
        x: 0,
        y:0 
    },
    velocity: {
        x: 0,
        y: 0
    },
   
    imageSrc: './img/player/Pink_Monster_Idle_4.png',
    scale:5,  
    framesMax: 4,
    offset:{ x: 0,
        y: 50
    }
});

// Create an enemy Fighter
const enemy = new Fighter ({ 
    position: {
        x: 500,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
     
    imageSrc: './img/enemy/Dude_Monster_Idle_4.png',
    scale:5,  
    framesMax: 4,
    offset:{ x: -100,
        y: 50
    }
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
        //player movements
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
        //space bar -activate attack
        case ' ':
            player.attack();
            break;
        //enemy movements  
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
// Usage: Start the timer with 60 seconds (adjust as needed)
startTimer(30);

function animate() {
    window.requestAnimationFrame(animate);
    // Clear the canvas
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Update player and enemy velocity based on keys
     // Update player and enemy position based on velocity
     background.update();
     player.update();
     enemy.update();
     player.velocity.x = 0;
     enemy.velocity.x = 0;

    if (keys.d.pressed && player.lastKey ==='d') {
        player.velocity.x = 5;
    } else if (keys.a.pressed && player.lastKey ==='a') {
        player.velocity.x = -5;
    }

    if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
        enemy.velocity.x = 5;
    } else if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -5;
    }
   //detect for collision
   if (handleRectangleCollision(player,enemy) && player.isAttacking)
    {  
 // The variable player.isAttacking is immediately set to false to prevent counting 
 //any additional attacks triggered by the space bar during the next 100 milliseconds.
 if (handleRectangleCollision(player, enemy) && player.isAttacking) {
     // Disable further attacks for 100 milliseconds
     player.isAttacking = false;
     console.log('Player Attack ');
     //Get the enemy health bar element
     enemy.healthBarElement = document.querySelector('#enemy-health-fill');
     enemy.updateHealthBar();
     }
       
 }
 
 if (handleRectangleCollision(enemy,player) && enemy.isAttacking)
     {  
         enemy.isAttacking = false;
         console.log('Enemy Attack ');
    player.healthBarElement = document.querySelector('#player-health-fill');
    // Update the player's health bar (e.g., decrease by 20%)
    player.updateHealthBar();        
}

if (player.health <= 1 || enemy.health <= 1 )
    determine(player,enemy);
    }


        // Get the computed style of the enemy health bar
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Start the animation loop
animate();




