// classes are in a separate file for maintainance purposes
class Sprite {

    constructor({ position , imageSrc}) {
        // Initialize sprite properties
        this.position= position;
        this.height = 150;
        this.width = 50;
        this.image = new Image(); //native Api for image creation
        this.image.src = imageSrc;
       
    }
    // Method to draw 
    draw() {
        c.drawImage(this.image ,this.position.x ,this.position.y);
    }

    // Method to update the sprite's position
    update() {
        // Draw 
        this.draw();
        
    }   
 }


class Fighter {
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


