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
    document.getElementById("about").style.opacity = "1";
    aboutShown = true;
  }
});

// about Ok button handler
document.getElementById("about-ok-button").addEventListener("click", () => {
  if (aboutShown) {
    document.getElementById("about").style.opacity = "0";
    aboutShown = false;
  }
});

let items = [
  {
    language: "C",
    position: 338,
    about: "C is a low level language. It has been around for a long time and has many uses - it is used for developing the Linux kernal.",
    link: "https://en.wikipedia.org/wiki/C_(programming_language)"
  },
  {
    language: "Go",
    position: 22,
    about:
      "Go is an open source programming language that makes it easy to build simple, reliable, and efficient software.",
    link: "https://golang.org/"
  },
  {
    language: "JavaScript",
    position: 67,
    about:
      "JavaScript is a very popular programming language used for creating websites (like this one!). It can also be used for server side development with Node.js",
    link: "https://en.wikipedia.org/wiki/JavaScript"
  },
  {
    language: "PHP",
    position: 112,
    about:
      "PHP is a web development language that powers some pretty big projects such as Wordpress.",
    link: "https://www.php.net/"
  },
  {
    language: "C++",
    position: 157,
    about: "C++ is a general purpose OOP/imperative language.",
    link: "https://en.wikipedia.org/wiki/C%2B%2B"
  },
  {
    language: "Java",
    position: 203,
    about:
      "Java is a general purpose OOP language that is compiled to bytecode and then run on the Java Virtual Machine",
    link: "https://en.wikipedia.org/wiki/Java_(programming_language)"
  },
  {
    language: "Python",
    position: 247,
    about:
      "Python is an interpreted, high-level, general-purpose programming language.",
    link: "https://www.python.org/"
  },
  {
    language: "C#",
    position: 290,
    about:
      "C# is a general-purpose, multi-paradigm programming language. Similar to Java, it is compiled to bytecode and then runs on a virtual machine.",
    link: "https://docs.microsoft.com/en-us/dotnet/csharp/"
  }
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
    reset();
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
      setWinner(winner.language);
      setHelpfulInfo(winner.about);
      setLink(winner.link);
    }
  }, updateInterval);
}

function reset() {
  setWinner("");
  setHelpfulInfo("");
  setLink("", "");
}

function setHelpfulInfo(text) {
  document.getElementById("helpful-info").innerText = text;
}

function setLink(link, text) {
  let a = document.getElementById("language-link");

  if (link === "" && text === "") {
    a.style.display = "none";
    return;
  } else {
    a.style.display = "inline";
  }
  a.setAttribute("href", link);
  a.innerText = text || "Learn more here";
}

function setWinner(winnerText) {
  document.getElementById("winner").innerText = winnerText;
}
