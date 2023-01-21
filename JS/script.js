//Nikolic Aleksa
/**
 * This code was written by Nikolic Aleksa
 * @author Nikolic Aleksa
 */

/**
 * The number of points the player has
 * @type {number}
 * @author Nikolic Aleksa
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
 * Hit colors
 */
let black = 0;
let green = 0;
let blue  = 0;
let red   = 0;

/**
 * TROPHIES
 */

let twohundredpoints = false;       // 100  Pkts
let fivehundredpoints = false;      // 500  Pkts
let onethousandpoints = false;      // 1000 Pkts
let twothousandpoints = false;      // 2000 Pkts
let fivethousandpoints = false;     // 5000 Pkts

let holein = false;
let goodplayer = false;
let nohole = false;

let trophieselement = document.getElementById("trophiesplace");

/**
 * The target zones
 */

let targetZones = [
    {radius: 65, points: 10, color: "#FC4445"},
    {radius: 45, points: 10, color: "#4056A1"},
    {radius: 25, points: 10, color: "#5CDB95"},
    {radius: 10, points: 10, color: "#282828"}
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
        trophies();
        arcX = Math.random() * ((canvas.width-80) - 80) + 80;
        arcY = Math.random() * ((canvas.width-280) - 180) + 180;
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

    let addedpoints = 0;

    let rect = canvas.getBoundingClientRect();
    x = event.clientX - rect.left;
    y = event.clientY - rect.top;
    for (let i = 0; i < targetZones.length; i++) {
        let distance = Math.sqrt(Math.pow(x - arcX, 2) + Math.pow(y - arcY, 2));
        if (distance < targetZones[i].radius) {
            points += targetZones[i].points;
            hitboolean = true;
            addedpoints += targetZones[i].points;
        }
    }

    addColorCount(addedpoints);

    if(hitboolean === true){
        hits++;
        hitboolean = false;
    }else{
        missed++;
    }

}

/**
 * Manager for color variables
 * @param pkts
 */
function addColorCount(pkts){
    switch (pkts) {
        case 40:
            black++;
            break;
        case 30:
            green++;
            break;
        case 20:
            blue++;
            break;
        case 10:
            red++;
            break;
    }
}


/**
 * Manager for trophies
 */
function trophies(){
    if(points >= 200 && twohundredpoints !== true){
        let abbrtwohundredpoints = document.createElement("abbr");
        abbrtwohundredpoints.title = "Reached more than 200 Points!";

        let twohundredpointselement = document.createElement("li");
        twohundredpointselement.innerHTML = "&#127942 My First 200 Points!  &#127942";
        trophieselement.appendChild(abbrtwohundredpoints);
        abbrtwohundredpoints.appendChild(twohundredpointselement);
        twohundredpoints = true;
    }
    if(points >= 500 && fivehundredpoints !== true){
        let abbrfivehundredpoints = document.createElement("abbr");
        abbrfivehundredpoints.title = "Reached more than 500 Points!";

        let fivehundredpointselement = document.createElement("li");
        fivehundredpointselement.innerHTML = "&#127942 I am getting better! &#127942";
        trophieselement.appendChild(abbrfivehundredpoints);
        abbrfivehundredpoints.appendChild(fivehundredpointselement);
        fivehundredpoints = true;
    }

    if(points >= 1000 && onethousandpoints !== true){
        let abbronethsdnpoints = document.createElement("abbr");
        abbronethsdnpoints.title = "Reached more than 1000 Points!";

        let onethousandpointselement = document.createElement("li");
        onethousandpointselement.innerHTML = "&#127942 Huh, already 1000 Points?";
        trophieselement.appendChild(abbronethsdnpoints);
        abbronethsdnpoints.appendChild(onethousandpointselement);
        onethousandpoints = true;
    }

    if(points >= 5000 && fivethousandpoints !== true){
        let abbrfivethsndpoints = document.createElement("abbr");
        abbrfivethsndpoints.title = "Reached more than 5000 Points!";

        let fivethousandpointselement = document.createElement("li");
        fivethousandpointselement.innerHTML = "&#127942 I'M A CHAMPION! &#127942";
        trophieselement.appendChild(abbrfivethsndpoints);
        abbrfivethsndpoints.appendChild(fivethousandpointselement);
        fivethousandpoints = true;
    }

    if(black >= 50 && holein !== true){
        let abbrblack = document.createElement("abbr");
        abbrblack.title = "Reached more than 50 clicks in the black hole";

        let blackelement = document.createElement("li");
        blackelement.innerHTML = "&#127942 POINTER IN HOLE &#127942";
        blackelement.style.backgroundColor = "#FFD700";
        trophieselement.appendChild(abbrblack);
        abbrblack.appendChild(blackelement);
        holein = true;
    }

    if(blue >= 50 && goodplayer !== true){
        let abbrblue = document.createElement("abbr");
        abbrblue.title = "Reached more than 50 clicks in the blue circle";

        let blue = document.createElement("li");
        blue.innerHTML = "&#127942 Nice hit in the blue &#127942";
        trophieselement.appendChild(abbrblue);
        abbrblue.appendChild(blue);
        goodplayer = true;
    }

    if(missed >= hits+20 && nohole !== true){
        let abbrmissed = document.createElement("abbr");
        abbrmissed.title = "Missed more than 20 times in depended of hits+20";

        let missedelement = document.createElement("li");
        missedelement.innerHTML = "🕳️ Can't hit any holes? 🕳️";
        trophieselement.appendChild(abbrmissed);
        abbrmissed.appendChild(missedelement);
        nohole = true;
    }

}

/**
 * Event listener for the click event
 */

canvas.addEventListener("click", function(event) {
    checkHit(event.clientX, event.clientY);
});
