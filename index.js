
document.addEventListener('DOMContentLoaded', function() {
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

class Sprite {
    constructor({ position, velocity, color='red' , offset}) {
        // Initialize sprite properties
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
       
        this.lastKey;
        //its an object, a rectangle, and it has properties. The position in the constructor isnt dynamic -> update()
        this.attackBox = {
            position: {
               x: this.position.x,
               y: this.position.x
            },
            offset,
            width:100,
            height:50 
        }
        this.color=color; 
        //by Default is false - tells if sprite is attacking
        this.isAttacking; 
        this.health = 100;
        this.healthBarElement;

    }
    // Method to draw the sprite
    draw() {
        // Set fill color to red
        c.fillStyle = this.color;
        // Draw a filled rectangle at the sprite's position
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        if(this.isAttacking){
        //Draw attackBox
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x ;
        this.attackBox.position.y = this.position.y;
        c.fillStyle = 'yellow';
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);
        }

    }


    handleGravity()  {
        // Move the sprite downwards
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        // Handle sprite reaching the ground
        //console.log("Sprite reached the ground");
        this.velocity.y = 0;
    } else {
        // Apply gravity to mimic sprite falling
        this.velocity.y += gravity;
    }
}
    handleHorizontalMovement() {
        // Move the sprite sideways based on its velocity
            // Check if the sprite has reached or exceeded the canvas width (right side)
        if (this.position.x + this.width + this.velocity.x >= canvas.width) {
           this.velocity.x = 0;
           //console.log("Right limit reached");
       }

        // Check if the sprite has reached or exceeded the canvas width (right side)
       else if (this.position.x + this.velocity.x <=0 ) {
           this.velocity.x = 0;
           //console.log("Left limit reached");
       }
       else{  this.position.x += this.velocity.x;
       }
       
   }
   // Method to activate attack
   attack() {
    // Set isAttacking to true when attacking
    this.isAttacking = true; 
    // Define handleAttackTime as an arrow function to preserve `this` context
    const handleAttackTime = () => {
        this.isAttacking = false; // Reset isAttacking to false after timeout
    };
    // Set a timeout to execute handleAttackTime after 100 milliseconds
    setTimeout(handleAttackTime, 100);
    
}

    // Method to update the sprite's position
    update() {
        // Draw the sprite
        this.draw();
        // Handle gravity
        this.handleGravity();
        // Handle horizontal movement and canvas bounds
        this.handleHorizontalMovement();    
    }    

    updateHealthBar() {
        const decreaseAmount = 0.02; // 2% decrease in health bar width
        if (!this.healthBarElement) {
            console.error('Health bar element not set. Use setHealthBarElement() to assign the element.');
            return 0;
        }
        let computedStyle = window.getComputedStyle(this.healthBarElement);
        let currentWidth = parseFloat(computedStyle.getPropertyValue('width'));
    
        // Calculate the decrease amount in pixels
        let decreaseWidth = decreaseAmount * currentWidth;
        let newWidth = currentWidth - decreaseWidth;
    
        // Ensure the health bar width doesn't go below 0
        if (newWidth < 0) {
            newWidth = 0;
        }
    
        // Apply the updated width to the health bar element
        this.healthBarElement.style.width = `${newWidth}px`;

        // Calculate the new health after applying the decrease amount
        let newHealth = this.health - (this.health * decreaseAmount);
        // Ensure the health doesn't go below 0
        if (newHealth < 0) {
            newHealth = 0;
        }
        // Update the health attribute
        this.health = newHealth;

    console.log(`Health bar width updated to ${newWidth}px`);
    console.log(`Health bar width updated to ${this.health}%`);
    }
    
}



//Note:
// Arrow Functions: Arrow functions do not have their own 'this' context. 
// Instead, they inherit the 'this' value from their enclosing lexical scope (the context in which they are defined). 
// This behavior is particularly useful for maintaining the context of this in nested functions or when using callbacks.
// Normal Functions: Normal functions have their own 'this' context, which is determined by how the function is called. 
// The value of 'this' inside a normal function depends on the function's invocation context (e.g., if it's a method of an object, a standalone function call, etc.).

 
// Create a player sprite
const player = new Sprite ({ 
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x: 0,
        y: 0
    },
});

// Create an enemy sprite
const enemy = new Sprite ({ 
    position: {
        x: 500,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    offset:{
        x: -50,
        y: 0
    },
    color:'blue'
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
function handleRectangleCollision(rectangle1, rectangle2) {
    return (
        // Horizontal overlap check
        // Check if the right side of rectangle1's attack box is past or touching the left side of rectangle2
        (rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
            // Check if the left side of rectangle1's attack box is before or touching the right side of rectangle2
            rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width) &&
        // Vertical overlap check
        // Check if the bottom side of rectangle1's attack box is past or touching the top side of rectangle2
        (rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
            // Check if the top side of rectangle1's attack box is before or touching the bottom side of rectangle2
            rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height)
    );
}

let timerElement = document.querySelector('#timer');
let resultElement = document.querySelector('#result');
function determine ()
{
    if (player.health === enemy.health) {
        resultElement.innerHTML = "Result: TIE";
    } else if (player.health > enemy.health) {
        resultElement.innerHTML = "Result: Player 1 wins";
    } else {
        resultElement.innerHTML = "Result: Player 2 wins";
    }
}
// Start the timer countdown
function startTimer(seconds) {
    let timer = seconds;
    function decreaseTime() {
        if (timer > 0) {
            timer--;
            timerElement.innerHTML = timer;
            setTimeout(decreaseTime, 1000); // Call countdown again after 1 second
        } 
        else { determine();
            // Timer reaches 0, determine the result based on health comparison
         
        }
    }

    decreaseTime(); // Start the initial countdown
}
// Usage: Start the timer with 60 seconds (adjust as needed)
startTimer(10);

function animate() {
    window.requestAnimationFrame(animate);
    // Clear the canvas
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Update player and enemy velocity based on keys
     // Update player and enemy position based on velocity
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

if (player.health <= 0 || enemy.health <= 0 )
    determine();
    }


        // Get the computed style of the enemy health bar
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Start the animation loop
animate();

});


