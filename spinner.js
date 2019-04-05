// tyler d 4/1/2019

let power = 0;
let max = 130; // how many degrees per tick it will spin
let min = 50; // once it hits min it will stop spinning
let updateInterval = 100; // milliseconds
let decAmt = 3; // amount to decrement power by each tick
let currentPos = 0;
let spinner = document.getElementById("spinner");
let isSpinning = false;
let aboutShown = false;

// spin button handler
document.getElementById("spin-button").addEventListener("click", () => spin());

// show about button handler
document.getElementById("about-show-button").addEventListener("click", () => {
  if (!aboutShown) {
    let aboutBox = document.getElementById("about");

    aboutBox.style.left = "40%";
    aboutShown = true;
  }
});

// about Ok button handler
document.getElementById("about-ok-button").addEventListener("click", () => {
  if (aboutShown) {
    let aboutBox = document.getElementById("about");
    aboutBox.style.left = "-40%";
    aboutShown = false;
  }
});

let items = [
  { language: "C", position: 338 },
  { language: "Go", position: 22 },
  { language: "JavaScript", position: 67 },
  { language: "PHP", position: 112 },
  { language: "C++", position: 157 },
  { language: "Java", position: 203 },
  { language: "Python", position: 247 },
  { language: "C#", position: 290 }
];

function findClosestItem(position) {
  let currentWinner = 0;
  let closestSoFar = 360;

  for (let currItem = 0; currItem < items.length; currItem++) {
    let item = items[currItem];

    //every item shifts by however many degrees the wheel has spun
    let itemPos = item.position + position;
    if (itemPos > 360) {
      itemPos -= 360; // clamp items between 0 and 360
    }

    // the item that has the closest distance to 270 (which is the top of
    // wheel where the marker is) is the winner.

    // 270 is the top of the wheel because of the way the css rotate transform
    // works. For an item in the circle starting at the 3 o'clock position (
    // which is a rotation of 0 degrees or 360 degrees) to reach the top of
    // the circle (12 o'clock) it has to rotate 270 degrees. The winning item
    // is at the 12 o'clock position on the circle.

    let distance = Math.abs(itemPos - 270);
    if (distance < closestSoFar) {
      closestSoFar = distance;
      currentWinner = currItem;
    }
  }
  return items[currentWinner];
}

function spin() {
  if (isSpinning) {
    return; // only spin once
  } else {
    isSpinning = true;
  }

  power = Math.floor(Math.random() * max);

  // make sure the wheel spins at least minimum speed
  if (power < min) {
    power = min - power + min;
  }

  let timerId = setInterval(() => {
    currentPos += power;
    if (currentPos > 360) {
      currentPos -= 360;
    }

    spinner.style.transform = `rotate(${currentPos}deg)`;

    power -= decAmt;
    if (power <= 0) {
      clearInterval(timerId);
      isSpinning = false;

      let winner = findClosestItem(currentPos);
    }
  }, updateInterval);
}


