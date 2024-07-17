let draw = document.getElementById("canvas");
let canvas = draw.getContext('2d');
let x = 500; // initial x position of spaceship
let y = 350; // initial y position of spaceship
let spaceshipXSize = 35; // widthX size of spaceship
let spaceshipYSize = 55; // heightY size of spaceship
let keys = {}; // keys object for button pressed
let isGameStart = false;
class SpaceShip{ // Spaceship layout and drawing
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
        canvas.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Star { // Draw stars in different location
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rChange = 0.015; // Rate of change of radius
        this.color = color;
    }
    // Method to update the star's radius
    update() {
        this.r += this.rChange;

        // Reverse the direction of radius change if it gets too large or too small
        if (this.r > 2 || this.r < 1) {
            this.rChange = -this.rChange;
        }
    }
    // Method to draw the star
    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    moveDown(speed){
        this.y += speed;
        if(this.y > draw.height){
            this.y = 0;
            this.x = Math.floor(Math.random()* draw.width);
        }
    }
}

class Asteroid{
    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.numOfSide = 7;
        this.rotation = 0;
    }
    draw(ctx){
        var angle  = 2 * Math.PI / this.numOfSide;
        this.rotation += Math.PI / 180;
        ctx.save();
        ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.moveTo(this.radius, 0);
            for(let i = 0; i <= this.numOfSide; i++){
                ctx.lineTo(this.radius * Math.cos(i * angle), this.radius * Math.sin(i * angle));
            }
        ctx.strokeStyle = 'white';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 10;
        ctx.stroke();   
        ctx.restore(); 
    }
    moveDown(speed){
        this.y += speed;
        //let radius = [50, 75, 100];
        if(this.y > draw.height + 100){
            this.y = 0;
            this.x = Math.floor(Math.random()*draw.width);
        }
    }
}

// draw spaceship on canvas when page loads
let spaceship = new SpaceShip(x - (spaceshipXSize / 2), y - spaceshipYSize, spaceshipXSize, spaceshipYSize); // spaceship coordinates
// Create 100 stars with random positions and radius
var stars = [];
for(let i = 0; i < 200; i++){
    var coordinate_x = Math.floor((Math.random()*draw.width));
    var coordinate_y = Math.floor((Math.random()*draw.height));
    var star_radius = Math.random() * 1.7 + 0.5;
   
    stars.push(new Star(coordinate_x, coordinate_y, star_radius, randomColor()));
}

var asteroids = []; // list of asteroids
var radius = [50, 75, 100, 120]// list of asteroid radius
var coord_y = [-1000, -2000, -3000, -4000]; // list of coordinate Y distance from the top

for(let i = 0; i < 8; i++){ // Number of Asteroids
    var coord_x = Math.floor((Math.random()*draw.width));
    var coordY = Math.floor((Math.random()* coord_y.length));
    var radiusSize = Math.floor(Math.random() * radius.length);
    asteroids.push(new Asteroid(coord_x, coord_y[coordY], radius[radiusSize]));
}

function randomColor(){ // random color generator for stars
    var arrColors = ["ffffff", "ffecd3" , "bfcfff"];
    return "#"+arrColors[Math.floor((Math.random()*3))];
}

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
document.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
        isGameStart = true;
    }
})

function drawStartGame(ctx){
    const welcomeText = "Welcome to Space Invaders!";
    const startGameText = "Press ENTER to Start";
    ctx.fillStyle = 'white';

    const textWidthWelcome = ctx.measureText(welcomeText).width;
    const textWidthStartGame = ctx.measureText(startGameText).width;

    ctx.font = '25px "Itim"';
    ctx.fillText(welcomeText, (draw.width - textWidthWelcome) / 2, 150);//coordinates
    ctx.fillText(startGameText, (draw.width - textWidthStartGame) / 2, 480); //coordinates
}

function collision(spaceship, asteroi){ // NOT USE UNDER STUDY
    console.log(`${spaceship.x + spaceship.width}  ${asteroi.x - asteroi.radius+25}`)
    return (spaceship.x + spaceship.width >= (asteroi.x - asteroi.radius)) &&
            (spaceship.y + spaceship.height >= (asteroi.y - asteroi.radius)+25)&&
            (spaceship.x + spaceship.width <= (asteroi.x + asteroi.radius)+25)&&
            (spaceship.y + spaceship.height <= ( asteroi.y + asteroi.radius+25));
} // EXAMPLE INPUT

/*
    TO DO LIST
    - figure out the collision from bottom to top and top to bottom,
     to get the actual position of the asteroids

    - create game over after the collision

    - add score and lives system

    - add sound effects and music

*/

function animate(){
    canvas.clearRect(0, 0, draw.width, draw.height);   

    for(const starS of stars){
        starS.update();
        starS.draw(canvas);
    }
    for(const astrd of asteroids){
        astrd.draw(canvas);
    }
    spaceship.draw();

    if(isGameStart){ // freeze game if isGameStart is false
        for(const starS of stars){
            starS.moveDown(2);
        }
        for(const astrd of asteroids){
            astrd.moveDown(5);
        }

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
    }else{
        drawStartGame(canvas);
    }    
    
    requestAnimationFrame(animate);
}
animate();