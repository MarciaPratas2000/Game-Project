// Sprite class to manage sprite properties and behavior
class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1 ,offset ={x:0,y:0}}) {
        // Initialize sprite properties
        this.position = position;             // Position of the sprite
        this.height = 150;                    // Height of the sprite (arbitrary value)
        this.width = 50;                      // Width of the sprite (arbitrary value)
        this.image = new Image();             // Create a new Image object
        this.image.src = imageSrc;            // Set the source of the image
        this.scale = scale;                   // Scale factor for the sprite
        this.framesMax = framesMax;           // Maximum number of frames in the sprite sheet
        this.framesCurrent = 0;               // Current frame being displayed
        this.framesElapsed = 0;               // Frames elapsed since last frame change
        this.frameHold = 0;                   // Number of updates to wait before switching frames     
        this.offset =offset;
    }

    // Method to draw the sprite on the canvas
    draw() {
        c.drawImage(
            this.image, 
            this.framesCurrent * (this.image.width / this.framesMax), // Source X (frame offset)
            0,                                                       // Source Y (top of the image)
            this.image.width / this.framesMax,                       // Source width (width of one frame)
            this.image.height,                                       // Source height (height of the image)
            this.position.x-this.offset.x,                           // Destination X (position on canvas)
            this.position.y-this.offset.y,                           // Destination Y (position on canvas)
            (this.image.width / this.framesMax) * this.scale,        // Destination width (scaled)
            this.image.height * this.scale                           // Destination height (scaled)
        );
    }

    animateFrames(){
        this.framesElapsed++;
        if (this.framesElapsed % this.frameHold === 0) { // Control animation speed
            if (this.framesCurrent < this.framesMax - 1) { // If not at the last frame (-1 also cause of background stability)
                this.framesCurrent++;                       // Move to the next frame
            } else {
                this.framesCurrent = 0;                     // Reset to the first frame
            }
        }
    }

    // Method to update the sprite's state
    update() {
        // Draw the current frame of the sprite
        this.draw();
        // Update frame animation
        this.animateFrames();
    }
}

// Fighter class extends Sprite to inherit its properties and methods - Hoewever, methods from fighter will overwrite the ones from Sprite
// Fighter class extends Sprite to inherit its properties and methods
class Fighter extends Sprite {
    constructor({ position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1 ,offset ={x:0,y:0}}) {
        // Call the constructor of the Sprite class
        super({ position, imageSrc, scale, framesMax, offset});
        // Additional properties specific to Fighter
        this.velocity = velocity;               // Velocity of the fighter
        this.height = 150;                      // Height of the fighter
        this.width = 50;                        // Width of the fighter

        this.lastKey;                           // Last key pressed for movement
        this.attackBox = {                      // Attack box properties
            position: {
                x: this.position.x,
                y: this.position.y
            },
            offset,
            width: 100,
            height: 50
        };
        this.color = color;                     // Color of the fighter
        this.isAttacking = false;               // Whether the fighter is attacking
        this.health = 100;                      // Health of the fighter
        this.healthBarElement;                  // Element to display health bar
        this.framesCurrent = 0;               // Current frame being displayed
        this.framesElapsed = 0;               // Frames elapsed since last frame change
        this.frameHold = 50;                   // Number of updates to wait before switching frames     
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
        this.animateFrames();
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
