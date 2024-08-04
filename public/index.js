class SpaceShip{ // Spaceship layout and drawing
    constructor(x, y, width, height){
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = 'asset/spaceship.gif';
    }
    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class Star { // Draw stars in different location
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.rChange = 0.045; // Rate of change of radius
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
    constructor(x, y, sides, radius, rotation){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.sides = sides;
        this.rotation = rotation;
    }

    getVertices() {
        const vertices = [];
        for(let i = 0; i < this.sides; i++){
            const angle = (i * 2 * Math.PI / this.sides) + this.rotation;
            const x = this.x + this.radius * Math.cos(angle);
            const y = this.y + this.radius * Math.sin(angle);
            vertices.push({x, y});
        }
        //console.log(vertices);
        return vertices;
    }
    draw(ctx){
        const vertices = this.getVertices();
        if(this.rotation === 10){
            this.rotation += Math.PI / 180;
        }else{
            this.rotation -= Math.PI / 180;
        }

        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for(let i = 1; i < vertices.length; i++){
            ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.closePath();
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'white';
        ctx.shadowColor = 'white';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetX = 1; // Horizontal offset
        ctx.shadowOffsetY = 1; // Vertical offset
        ctx.stroke();
        ctx.restore();
    }
    moveDown(speed){
        this.y += speed;
        //let radius = [50, 75, 100];
        if(this.y > draw.height + 100){
            this.y = 0;
            this.x = Math.floor(Math.random()*draw.width); /// change draw.width and height add parameter instead
        }
    }
    intersectsRectangle(rectX, rectY, rectWidth, rectHeight) {
        const vertices = this.getVertices();
        // Check if any vertex is inside the rectangle
        for (const vertex of vertices) {
            if (vertex.x >= rectX && vertex.x <= rectX + rectWidth &&
                vertex.y >= rectY && vertex.y <= rectY + rectHeight) {
                return true;
            }
        }

        // Check if any edge intersects with the rectangle
        for (let i = 0; i < vertices.length; i++) {
            const nextIndex = (i + 1) % vertices.length;
            if (lineIntersectsRect(vertices[i], vertices[nextIndex], rectX, rectY, rectWidth, rectHeight)) {
                return true;
            }
        }
        return false;
    }
}
class Particle {
    constructor(x, y, radius, dx, dy, ctx) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
        this.alpha = 1;
        this.color = this.color;
        this.ctx = ctx;
    }
    draw() {
        this.ctx.save();
        this.ctx.globalAlpha = this.alpha;
        this.ctx.fillStyle = this.color;
 
        /* Begins or reset the path for 
        the arc created */
        this.ctx.beginPath();
 
        /* Some curve is created*/
        for(let i = 0; i < 3; i++){ /// 3 sides for triangles
            const angle = (i * 2 * Math.PI / 3) + 0;
            const x = this.x + this.radius * Math.cos(angle);
            const y = this.y + this.radius * Math.sin(angle);

            if(i === 0){
                this.ctx.moveTo(x, y);
            }else{
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.fillStyle = this.color;
        this.ctx.strokeStyle = this.color;
        this.ctx.closePath();
        this.ctx.fill();
        
        /* Restore the recent canvas context*/
        this.ctx.restore();
    }
    update() {
        if(isCollided){
            this.draw();
            this.alpha -= 0.01;
            this.x += this.dx;
            this.y += this.dy;
        }
    }
}

function lineIntersectsRect(p1, p2, rectX, rectY, rectWidth, rectHeight) {
    return lineIntersectsLine(p1, p2, {x: rectX, y: rectY}, {x: rectX + rectWidth, y: rectY}) ||
           lineIntersectsLine(p1, p2, {x: rectX + rectWidth, y: rectY}, {x: rectX + rectWidth, y: rectY + rectHeight}) ||
           lineIntersectsLine(p1, p2, {x: rectX + rectWidth, y: rectY + rectHeight}, {x: rectX, y: rectY + rectHeight}) ||
           lineIntersectsLine(p1, p2, {x: rectX, y: rectY + rectHeight}, {x: rectX, y: rectY});
}

function lineIntersectsLine(p1, p2, q1, q2) {
    const det = (p2.x - p1.x) * (q2.y - q1.y) - (p2.y - p1.y) * (q2.x - q1.x);
    if (det === 0) {
        return false; // Lines are parallel
    }

    const lambda = ((q2.y - q1.y) * (q2.x - p1.x) + (q1.x - q2.x) * (q2.y - p1.y)) / det;
    const gamma = ((p1.y - p2.y) * (q2.x - p1.x) + (p2.x - p1.x) * (q2.y - p1.y)) / det;

    return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
}

function randomColor(){ // random color generator for stars
    var arrColors = ["ffffff", "ffecd3" , "bfcfff"];
    return "#"+arrColors[Math.floor((Math.random()*3))];
}
function drawStartGame(ctx){
    const welcomeText = "Welcome to Space Invaders!";
    const startGameText = "Press ENTER to Start";
    ctx.fillStyle = 'white';

    const textWidthWelcome = ctx.measureText(welcomeText).width;
    const textWidthStartGame = ctx.measureText(startGameText).width;
    
    ctx.font = '25px "Itim"';
    ctx.fillText(startGameText, (draw.width - textWidthStartGame) / 2, 580); //coordinates
}
function countScore(ctx){
    let count = `Score: ${counter}`;
    ctx.fillStyle = 'white';
    ctx.font = '25px "Itim"';
    ctx.fillText(count, 50, 100);
}
function animate(){
    canvas.clearRect(0, 0, draw.width, draw.height);   

    for(const starS of stars){
        starS.update();
        starS.draw(canvas); 
    }
    for(const astrd of asteroids){
        astrd.draw(canvas);
    }
    spaceship.draw(canvas);

    if(isGameStart){ // freeze game if isGameStart is false
        countScore(canvas);
            counter++;
        for(const starS of stars){
            starS.moveDown(2); // speed of 2
        }
        for(const astrd of asteroids){
            astrd.moveDown(7);// speed of 7
            if(astrd.intersectsRectangle(spaceship.x, spaceship.y, spaceship.width, spaceship.height)){
                console.log("collision detected");
                isGameStart = false;
                isCollided = true;
                totalScores = counter; //total score of game duration
                console.log(totalScores)
                for (i = 0; i <= 250; i++) {
                    let dx = (Math.random() - 0.5) * (Math.random() * 6);
                    let dy = (Math.random() - 0.5) * (Math.random() * 6);
                    let radius = Math.random() * 4;
                    let particle = new Particle(astrd.x, astrd.y, radius, dx, dy, canvas);
                    particle.color = 'white';
                    /* Adds new items like particle*/
                    particles.push(particle);
                } 
                for (i = 0; i <= 250; i++) {
                    let dx = (Math.random() - 0.5) * (Math.random() * 6);
                    let dy = (Math.random() - 0.5) * (Math.random() * 6);
                    let radius = Math.random() * 4;
                    let particle = new Particle(spaceship.x, spaceship.y, radius, dx, dy, canvas);
                    particle.color = 'blue';
                    /* Adds new items like particle*/
                    particles.push(particle);
                }
                 astrd.y = coord_y[Math.floor(Math.random() * coord_y.length)];
                 spaceship.img.src = '';
                collision.play();
                collision2.play();
            }else{ 
                console.log('no collision');
            }
        }
        if(keys['w'] || keys['ArrowUp']){
                if(!(spaceship.y < -5)){
                    spaceship.y -= 2;
                }
        }
        if(keys['s'] || keys['ArrowDown']){
                if(!(spaceship.y > 650)){
                    spaceship.y += 5;
                }
        }
        if(keys['a'] || keys['ArrowLeft']){
                if(!(spaceship.x < 0)){
                    spaceship.x -= 5;
                }
        }
        if(keys['d'] || keys['ArrowRight']){
                if(!(spaceship.x > 960)){
                    spaceship.x += 5;
            }
        }
        audio.play();
    }else{
        drawStartGame(canvas);
        setTimeout(function(){
        }, 2000);
        countScore(canvas);
        counter = 0;
        audio.pause();
        audio.load();
        for (let particle of particles) {
            if (particle.alpha <= 0) {
                particles = particles.filter(p => p.alpha > 0);
                break; // Exit loop after modifying array to avoid skipping elements
            } else {
                particle.update();
            }
        }
        if(totalScores !== 0){
            let totalScore = `Total Score: ${totalScores}`;
            canvas.fillStyle = 'white';
            canvas.font = '25px "Itim"';
            const textScoreWidth = canvas.measureText(totalScore).width;
            canvas.fillText(totalScore, (draw.width - textScoreWidth) / 2, 325);
        }
    }
    requestAnimationFrame(animate);
}

const baseURL = 'http://localhost:3000';
let draw = document.getElementById("canvas");
let canvas = draw.getContext('2d');
let x = 500; // initial x position of spaceship
let y = 350; // initial y position of spaceship
let spaceshipXSize = 35; // widthX size of spaceship
let spaceshipYSize = 55; // heightY size of spaceship
let keys = {}; // keys object for button pressed
let isGameStart = false;
let spaceship = new SpaceShip(x, y, spaceshipXSize, spaceshipYSize); // spaceship coordinates
var stars = [];// Create 100 stars with random positions and radius
var asteroids = []; // list of asteroids
var radius = [50, 75, 100, 120]// list of asteroid radius
var coord_y = [-1000, -2000, -3000, -4000, -5000]; // list of coordinate Y distance from the top
var sides = [7, 8, 9, 10];
var isCollided = false;
var particles = [];
var counter = 0;
var totalScores = 0;
var audio = new Audio('/asset/audio/backgroundmusic.m4a');//background music
var collision = new Audio('/asset/audio/collide.wav'); // collision sound part 1
var collision2 = new Audio('/asset/audio/collide2.wav');
/*
   star & asteroid section
*/
async function getData(){
    if(totalScores !== 0){
        const resonse =  await fetch(baseURL,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            score: totalScores
        })
    })
    const data = await resonse.json();
    console.log(data);
    }else{
        console.log('No score detected');
    }

}

window.onload = getData;
for(let i = 0; i < 200; i++){
    var coordinate_x = Math.floor((Math.random()*draw.width));
    var coordinate_y = Math.floor((Math.random()*draw.height));
    var star_radius = Math.random() * 1.10 + 0.5;
   
    stars.push(new Star(coordinate_x, coordinate_y, star_radius, randomColor()));
}

for(let i = 0; i < 7; i++){ // Number of Asteroids
    var coord_x = Math.floor((Math.random() * draw.width));
    var coordY = Math.floor((Math.random() * coord_y.length));
    var radiusSize = Math.floor(Math.random() * radius.length);
    var numOfSides = Math.floor(Math.random() * sides.length);
    var countRotation = 0;
    asteroids.push(new Asteroid(coord_x, coord_y[coordY], sides[numOfSides], radius[radiusSize], countRotation));
}

animate();

/*
    Event Listener function section
*/
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

    if(event.key === 'Enter'){
        if(!isGameStart){
        isGameStart = true;
        for(const asteroid of asteroids){
            asteroid.y = coord_y[Math.floor(Math.random() * coord_y.length)];
        }
        spaceship.img.src = 'asset/spaceship.gif';
        spaceship.x = x;
        spaceship.y = y;
        }

    }
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
});
document.addEventListener('keydown',(event)=>{

});