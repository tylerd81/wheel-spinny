let power = 0;
let max = 130; // how many degrees per tick it will spin
let min = 50; // once it hits min it will stop spinning
let updateInterval = 100; // milliseconds
let decAmt = 3; // amount to decrement power by each tick
let currentPos = 0;
let spinner = document.getElementById("spinner");
let isSpinning = false;

document.getElementById("spin-button").addEventListener("click", () => spin());

let items = [
    {language: "C", position: 0},
    {language: "Go", position: 45},
    {language: "JavaScript", position: 90},
    {language: "PHP", position: 135},
    {language: "C++", position: 180},
    {language: "Java", position: 225},
    {language: "Python", position: 270},
    {language: "C#", position: 315},
];

function findClosestItem(position) {
    let top = 270; // top position of wheel is at 270 degrees
                   // so whichever item is closest to 270 wins.

    let currentWinner = 0;
    let closestSoFar = 360;    

    for(let currItem = 0; currItem < items.length; currItem++) {
        let item = items[currItem];

        let itemPos = item.position + position;
        if(itemPos > 360) {
            itemPos -= 360;
        }

        let distance = Math.abs(itemPos - 270);
        if(distance < closestSoFar) {
            closestSoFar = distance;
            currentWinner = currItem;
        }        
    }

    console.log("ok");
    return items[currentWinner];
}


function spin() {
    if(isSpinning) {
        return; // only spin once
    } else {
        isSpinning = true;
    }

    power = Math.floor(Math.random() * max);
    if(power < min) {
        power = (min - power) + min;
    }

    let timerId = setInterval(() => {
        displayPower();
        currentPos += power;
        if(currentPos > 360) {
            currentPos -= 360;
        }

        spinner.style.transform = `rotate(${currentPos}deg)`;
        power -= decAmt;
        if(power <= 0) {
            clearInterval(timerId);
            console.log("Done");
            isSpinning = false;
            
            let winner = findClosestItem(currentPos);
            document.getElementById("winner").innerText = winner.language;
        }
    }, updateInterval);
}

function displayPower() {
    document.getElementById("power").innerText = "Power: " + power;
    document.getElementById("pos").innerText = "Position: " + currentPos;
}
