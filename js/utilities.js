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
function determine(player, enemy) {
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
        else {
            determine(player, enemy);
            // Timer reaches 0, determine the result based on health comparison
        }
    }

    decreaseTime(); // Start the initial countdown
}
