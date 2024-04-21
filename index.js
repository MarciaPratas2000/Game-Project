
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

// Define the Sprite class
class Sprite {
    constructor({position, velocity}) { 
        // Initialize sprite properties
        this.position = position;
        this.velocity = velocity;
        this.height = 150;
    }

    // Method to draw the sprite
    draw() { 
        // Set fill color to red
        c.fillStyle = 'red'; 
        // Draw a filled rectangle at the sprite's position
        c.fillRect(this.position.x, this.position.y, 50, 150); 
    }
    
    // Method to update the sprite's position
    update() { 
        // Draw the sprite
        this.draw();
        
        // Move the sprite downwards
        this.position.y += this.velocity.y
        // Check if the sprite has reached the ground
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            // Stop the sprite if it has reached the ground. If the netx iteration is possible.
            this.velocity.y = 0 ;
        }
        else{
            //Change velocity to mimic gravity
        this.velocity.y += gravity
        }
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

// Animation loop function
function animate() { 
    // Request the next animation frame
    window.requestAnimationFrame(animate);
    // Clear the canvas
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // Update the player and enemy sprites
    player.update();
    enemy.update();
}

// Start the animation loop
animate();
