let draw = document.getElementById("canvas");
let canvas = draw.getContext('2d');
let x = 500; // initial x position of spaceship
let y = 350; // initial y position of spaceship
let spaceshipXSize = 35; // widthX size of spaceship
let spaceshipYSize = 55; // heightY size of spaceship
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
        this.img = new Image();
        this.img.src = 'asset/spaceship.gif';
        this.img.onload = function(){
            this.draw();
        };
    }
    draw(){
        drawBackground();
        canvas.drawImage(this.img, this.x, this.y, this.width, this.height);
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
    console.log(spaceship.y);
    console.log(spaceship.x);
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
})

function animate(){
    canvas.clearRect(0, 0, draw.width, draw.height);

    if(keys['w']){
        if(!(spaceship.y < -5)){
            spaceship.y -= 5;
        }
    }
    if(keys['s']){
        if(!(spaceship.y > 650)){
            spaceship.y += 5;
        }
    }
    if(keys['a']){
        if(!(spaceship.x < 0)){
            spaceship.x -= 5;
        }
    }
    if(keys['d']){
        if(!(spaceship.x > 960)){
            spaceship.x += 5;
        }
    }

    spaceship.draw();
    requestAnimationFrame(animate);
}
animate();