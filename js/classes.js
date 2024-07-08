// Sprite class to manage sprite properties and behavior
class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, reverseAnimation = false }) {
        // Initialize sprite properties
        this.position = position;
        this.height = 150;
        this.width = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.frameHold = 10; // Set a reasonable default frame hold value
        this.offset = offset;
        this.reverseAnimation = reverseAnimation;

        // Ensure the image is loaded before drawing
        this.image.onload = () => {
            console.log('Image loaded:', this.imageSrc);
        };
    }

    // Method to draw the sprite on the canvas
    draw() {
        c.drawImage(
            this.image,
            this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        );
    }

    // Method to animate frames, supporting reverse animation
    animateFrames() {
        this.framesElapsed++;
        // Check if it's time to advance to the next frame based on frameHold
        if (this.framesElapsed % this.frameHold === 0) {
            if (!this.reverseAnimation) {
                // Forward Animation Logic
                if (this.framesCurrent < this.framesMax - 1) {
                    this.framesCurrent++;
                } else {
                    this.framesCurrent = 0; // Loop back to the first frame
                }
            } else {
                // Reverse Animation Logic
                if (this.framesCurrent > 0) {
                    this.framesCurrent--;
                } else {
                    this.framesCurrent = this.framesMax - 1; // Loop back to the last frame
                }
            }
        }
    }
    
    

    // Method to update the sprite's state
    update() {
        this.draw();
        this.animateFrames();
    }
}

// Fighter class extends Sprite to inherit its properties and methods
class Fighter extends Sprite {
    constructor({ position, velocity, color = 'red', imageSrc, scale = 1, framesMax = 1, offset = { x: 0, y: 0 }, sprites, reverseAnimation = false }) {
        super({ position, imageSrc, scale, framesMax, offset, reverseAnimation });

        this.velocity = velocity;
        this.height = 150;
        this.width = 50;
        this.lastKey;
        this.attackBox = {
            position: { x: this.position.x, y: this.position.y },
            offset,
            width: 100,
            height: 50
        };
        this.color = color;
        this.isAttacking = false;
        this.health = 100;
        this.healthBarElement;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.frameHold = 10;
        this.sprites = sprites;

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
        }
    }

    handleGravity() {
        this.position.y += this.velocity.y;
        if (this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }
    }

    handleHorizontalMovement() {
        if (this.position.x + this.width + this.velocity.x >= canvas.width) {
            this.velocity.x = 0;
        } else if (this.position.x + this.velocity.x <= 0) {
            this.velocity.x = 0;
        } else {
            this.position.x += this.velocity.x;
        }
    }

    attack() {
        this.switchSprite(`attack`);
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
    }

    switchSprite(sprite) {
        // Check if currently attacking and not reached max frames
        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1 && !this.reverseAnimation) {
            return; // Stop execution if still in the middle of attack animation
        }
    
        // Check if currently attacking and starting reverse animation (if needed)
        if (this.image === this.sprites.attack.image && this.framesCurrent > 0 && this.reverseAnimation) {
            // Handle reverse animation logic here, if necessary
            return; // Stop execution if in the reverse animation phase
        }
    
        // Switch to the appropriate sprite
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.frameHold = this.sprites.idle.frameHold;
                    if (!this.reverseAnimation) {
                        this.framesCurrent = 0; // Reset frame to start
                    } else {
                        this.framesCurrent = this.framesMax - 1; // Start from the last frame for reverse animation
                    }
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.frameHold = this.sprites.run.frameHold;
                    if (!this.reverseAnimation) {
                        this.framesCurrent = 0; // Reset frame to start
                    } else {
                        this.framesCurrent = this.framesMax - 1; // Start from the last frame for reverse animation
                    }
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.frameHold = this.sprites.jump.frameHold;
                    if (!this.reverseAnimation) {
                        this.framesCurrent = 0; // Reset frame to start
                    } else {
                        this.framesCurrent = this.framesMax - 1; // Start from the last frame for reverse animation
                    }
                }
                break;
            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image;
                    this.framesMax = this.sprites.attack.framesMax;
                    this.frameHold = this.sprites.attack.frameHold;
                    if (!this.reverseAnimation) {
                        this.framesCurrent = 0; // Reset frame to start
                    } else {
                        this.framesCurrent = this.framesMax - 1; // Start from the last frame for reverse animation
                    }
                }
                break;
            default:
                console.error('Unknown sprite action:', sprite);
                break;
        }
    }
    switchSprite(sprite) {
        // Check if currently attacking and not reached max frames
        if (this.image === this.sprites.attack.image && this.framesCurrent < this.sprites.attack.framesMax - 1 && !this.reverseAnimation) {
            return; // Stop execution if still in the middle of attack animation
        }
    
        // Check if currently attacking and starting reverse animation (if needed)
        if (this.image === this.sprites.attack.image && this.framesCurrent > 0 && this.reverseAnimation) {
            // Handle reverse animation logic here, if necessary
            return; // Stop execution if in the reverse animation phase
        }
    
        // Switch to the appropriate sprite
        switch (sprite) {
            case 'idle':
                if (this.image !== this.sprites.idle.image) {
                    this.image = this.sprites.idle.image;
                    this.framesMax = this.sprites.idle.framesMax;
                    this.frameHold = this.sprites.idle.frameHold;
                    if (!this.reverseAnimation) {
                        this.framesCurrent = 0; // Reset frame to start
                    } else {
                        this.framesCurrent = this.framesMax - 1; // Start from the last frame for reverse animation
                    }
                }
                break;
            case 'run':
                if (this.image !== this.sprites.run.image) {
                    this.image = this.sprites.run.image;
                    this.framesMax = this.sprites.run.framesMax;
                    this.frameHold = this.sprites.run.frameHold;
                    if (!this.reverseAnimation) {
                        this.framesCurrent = 0; // Reset frame to start
                    } else {
                        this.framesCurrent = this.framesMax - 1; // Start from the last frame for reverse animation
                    }
                }
                break;
            case 'jump':
                if (this.image !== this.sprites.jump.image) {
                    this.image = this.sprites.jump.image;
                    this.framesMax = this.sprites.jump.framesMax;
                    this.frameHold = this.sprites.jump.frameHold;
                    if (!this.reverseAnimation) {
                        this.framesCurrent = 0; // Reset frame to start
                    } else {
                        this.framesCurrent = this.framesMax - 1; // Start from the last frame for reverse animation
                    }
                }
                break;
            case 'attack':
                if (this.image !== this.sprites.attack.image) {
                    this.image = this.sprites.attack.image;
                    this.framesMax = this.sprites.attack.framesMax;
                    this.frameHold = this.sprites.attack.frameHold;
                    if (!this.reverseAnimation) {
                        this.framesCurrent = 0; // Reset frame to start
                    } else {
                        this.framesCurrent = this.framesMax - 1; // Start from the last frame for reverse animation
                    }
                }
                break;
            default:
                console.error('Unknown sprite action:', sprite);
                break;
        }
    }
        
    update() {
        this.draw();
        this.animateFrames();
        this.handleGravity();
        this.handleHorizontalMovement();
    }

    updateHealthBar() {
        const decreaseAmount = 0.02;
        if (!this.healthBarElement) {
            console.error('Health bar element not set. Use setHealthBarElement() to assign the element.');
            return 0;
        }
        let computedStyle = window.getComputedStyle(this.healthBarElement);
        let currentWidth = parseFloat(computedStyle.getPropertyValue('width'));
        let decreaseWidth = decreaseAmount * currentWidth;
        let newWidth = currentWidth - decreaseWidth;
        if (newWidth < 0) {
            newWidth = 0;
        }
        this.healthBarElement.style.width = `${newWidth}px`;
        let newHealth = this.health - (this.health * decreaseAmount);
        if (newHealth < 0) {
            newHealth = 0;
        }
        this.health = newHealth;
    }
}
