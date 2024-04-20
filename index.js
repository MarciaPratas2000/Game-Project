const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d'); // Get the 2D drawing context of the canvas element

canvas.width = 1024; // Resize background window
canvas.height = 576; // Resize background window
c.fillStyle = 'black'; // Set fill color to black for background
c.fillRect(0, 0, canvas.width, canvas.height); // Draw a filled rectangle to fill the canvas with black color.

class Sprite {
    constructor(position) { // The constructor is a special method in a class that is automatically called when a new instance of the class is created using the 'new' keyword.
        // It initializes the object's properties or performs any setup necessary for the instance.        
        this.position = position; // Property: Initializes and stores the sprite's position.
    }

    draw() { // Method: Draws the sprite on the canvas.
        c.fillStyle = 'red'; // Set fill color to red.
        c.fillRect(this.position.x, this.position.y, 50, 150); // Draw a filled rectangle at the sprite's position with a width of 50 and height of 150.
    }
}

const player = new Sprite ({ //initial properties of player
        x: 0, 
        y: 0
});


const enemy = new Sprite ({ //initial properties of enemy 
        x: 400, 
        y: 100
});

function animate() { 
    // The purpose of this function is to create an animation loop so that we can animate our objects frame by frame.
    // The window.requestAnimationFrame() method is used to tell the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. 
    // In this case, the specified function is 'animate' itself, creating a continuous loop where 'animate' is called repeatedly, allowing for smooth animation.
    // Inside the function, we're logging 'hey' to the console, which serves as a visual cue that the animation loop is running.
    window.requestAnimationFrame(animate); // Request the next animation frame
    console.log('hey'); // Log a message to the console
}

player.draw();
enemy.draw();
console.log(player);