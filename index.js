
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
    constructor({ position, velocity }) {
        // Initialize sprite properties
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
    }

    // Method to draw the sprite
    draw() {
        // Set fill color to red
        c.fillStyle = 'red';
        // Draw a filled rectangle at the sprite's position
        c.fillRect(this.position.x, this.position.y, this.width, this.height);
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
       else{        this.position.x += this.velocity.x;
       }
       
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
    }

}

let lastKey;
function handleKeyDown(event) {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'w':
            keys.w.pressed = true;
            player.velocity.y = -10;
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
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    // Clear the canvas
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    // Update player velocity based on keys
     // Update player position based on velocity
     player.update();
     enemy.update();
     player.velocity.x = 0;

    if (keys.d.pressed) {
        player.velocity.x = 1;
    } else if (keys.a.pressed) {
        player.velocity.x = -1;
    }

    // Handle jumping (w key)
    else if (keys.w.pressed) {
        player.velocity.y = -10; // Adjust the value for upward movement
    }
}

// Add event listeners for keydown and keyup events
window.addEventListener('keydown', handleKeyDown);
window.addEventListener('keyup', handleKeyUp);

// Start the animation loop
animate();
