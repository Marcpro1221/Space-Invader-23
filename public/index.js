let draw = document.getElementById("canvas");
let canvas = draw.getContext('2d');
let x = 500; // initial x position of spaceship
let y = 350; // initial y position of spaceship
let spaceshipXSize = 25; // widthX size of spaceship
let spaceshipYSize = 25; // heightY size of spaceship
let keys = {}; // keys for button pressed

function drawBackground(){
    canvas.fillStyle = "black";
    canvas.fillRect(0, 0, draw.width, draw.height);
}

class SpaceShip{
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(){
        drawBackground();
        canvas.fillStyle ='blue';
        canvas.fillRect(this.x, this.y, this. width, this.height);
    }
}

// draw spaceship on canvas when page loads
let spaceship = new SpaceShip(x, y, spaceshipXSize, spaceshipYSize);
spaceship.draw();

document.addEventListener('keydown', /**
 * Event listener function to handle keydown events.
 * Updates the 'keys' object with the pressed key as the key and sets its value to true.
 * 
 * @param {KeyboardEvent} event - The event object representing the keydown event.
 * @returns {void}
 */
function(event){
    keys[event.key] = true;
    console.log(event.key);
});
document.addEventListener('keyup', /**
 * Event listener function to handle keyup events.
 * Updates the 'keys' object with the released key as the key and sets its value to false.
 * Logs the released key to the console.
 * 
 * @param {KeyboardEvent} event - The event object representing the keyup event.
 * @returns {void}
 */
function(event){
    keys[event.key] = false;
    console.log(event.key);
})

function animate(){
    canvas.clearRect(0, 0, draw.width, draw.height);

    if(keys['w']) spaceship.y -= 2;
    if(keys['s']) spaceship.y += 2;
    if(keys['a']) spaceship.x -= 2;
    if(keys['d']) spaceship.x += 2;

    spaceship.draw();
    requestAnimationFrame(animate);
}
animate();