//Nikolic Aleksa

/**
 * The number of points the player has
 * @type {number}
 */
let points = 0;

/**
 * The number of counts how often the player has clicked
 * @type {number}
 */
let tries = 0;

/**
 * The number how often the player has missed.
 * @type {number}
 */
let missed = 0;

/**
 * The number of all hits
 * @type {number}
 */
let hits = 0;
let hitboolean = false;

/**
 * The target zones
 */

let targetZones = [
    {radius: 85, points: 5, color: "yellow"},
    {radius: 65, points: 10, color: "red"},
    {radius: 45, points: 20, color: "blue"},
    {radius: 25, points: 30, color: "green"},
    {radius: 10, points: 40, color: "black"}
];

/**
 * The canvas element
 * @type {HTMLCanvasElement}
 */

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

/**
 * Randomly generates the x coordinates of the target
 * @type {number}
*/

let arcX = Math.random() * ((canvas.width-85) - 85) + 85;

/**
 * Randomly generates the y coordinates of the target
 * @type {number}
 */
let arcY = Math.random() * ((canvas.height-85) - 85) + 85;

/**
 * Generates the points text
 * @type {string}
 */
ctx.font = "20px Arial";
ctx.fillStyle = "black";
ctx.fillText("Points: " + points + "  |  Tries: " + tries + "  |  Hits: " + hits + "  |  Missed: " + missed, 10, 35);

/**
 * Draws the target on the canvas with the intervall of 500ms
 */
setInterval(drawTarget, 1000);

/**
 * Draws a target on the canvas
 */
function drawTarget() {
        arcX = Math.random() * ((canvas.width-85) - 85) + 85;
        arcY = Math.random() * ((canvas.width-285) - 185) + 185;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "20px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("Points: " + points + "  |  Tries: " + tries + "  |  Hits: " + hits + "  |  Missed: " + missed, 10, 35);

        for (let i = 0; i < targetZones.length; i++) {
            ctx.beginPath();
            ctx.arc(arcX, arcY, targetZones[i].radius, 0, 2 * Math.PI);
            ctx.fillStyle = targetZones[i].color;
            ctx.fill();
        }
        console.log(missed);
}

/**
 * Checks if the click was on the target
 * @param x
 * @param y
 */
function checkHit(x, y) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tries++;
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.fillText("Points: " + points + "  |  Tries: " + tries + "  |  Hits: " + hits + "  |  Missed: " + missed, 10, 35);

    let rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    for (let i = 0; i < targetZones.length; i++) {
        let distance = Math.sqrt(Math.pow(x - arcX, 2) + Math.pow(y - arcY, 2));
        if (distance < targetZones[i].radius) {
            points += targetZones[i].points;
            hitboolean = true;
        }
    }

    if(hitboolean === true){
        hits++;
        hitboolean = false;
    }else{
        missed++;
    }

}


/**
 * Event listener for the click event
 */

canvas.addEventListener("click", function(event) {
    checkHit(event.clientX, event.clientY);
});
