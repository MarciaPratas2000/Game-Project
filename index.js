
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
    constructor({ position, velocity, color='red' }) {
        // Initialize sprite properties
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        //its an object, a rectangle, and it has properties.
        this.attackBox = {
            position: this.position,
            width:100,
            height:50 
        }
        this.color=color; 
        //by Default is false - tells if sprite is attacking
        this.isAttacking; 
    }
    // Method to draw the sprite
    draw() {
        // Set fill color to red
        c.fillStyle = this.color;
        // Draw a filled rectangle at the sprite's position
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
        //Draw attackBox
        c.fillStyle = 'yellow';
        c.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height);

    }


    handleGravity()  {
        // Move the sprite downwards
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
        // Handle sprite reaching the ground
        console.log("Sprite reached the ground");
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
           console.log("Right limit reached");

       }

        // Check if the sprite has reached or exceeded the canvas width (right side)
       else if (this.position.x + this.velocity.x <=0 ) {
           this.velocity.x = 0;
           console.log("Left limit reached");
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
//Note:
// Arrow Functions: Arrow functions do not have their own 'this' context. 
// Instead, they inherit the this value from their enclosing lexical scope (the context in which they are defined). 
// This behavior is particularly useful for maintaining the context of this in nested functions or when using callbacks.
// Normal Functions: Normal functions have their own 'this' context, which is determined by how the function is called. 
// The value of this inside a normal function depends on the function's invocation context (e.g., if it's a method of an object, a standalone function call, etc.).


    // Method to update the sprite's position
    update() {
        // Draw the sprite
        this.draw();

        // Handle gravity
        this.handleGravity();

        // Handle horizontal movement and canvas bounds
        this.handleHorizontalMovement();
    }
}

// Create a player sprite
const player = new Sprite ({ 
    position: {
        x: 0,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    }
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
    if (
      // Check if the right side of the player's attack box is past or touching the left side of the enemy
      player.attackBox.position.x + player.attackBox.width >= enemy.position.x &&
      // Check if the left side of the player's attack box is before or touching the right side of the enemy
      player.attackBox.position.x <= enemy.position.x + enemy.width &&
      // Check if the bottom side of the player's attack box is past or touching the top side of the enemy
      player.attackBox.position.y + player.attackBox.height >= enemy.position.y &&
      // Check if the top side of the player's attack box is before or touching the bottom side of the enemy
      player.attackBox.position.y <= enemy.position.y + enemy.height &&
      player.isAttacking)
       {console.log('collision')
       console.log(player.attackBox.position.y)}
}

// Add event listeners for keydown and keyup events
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Start the animation loop
animate();
