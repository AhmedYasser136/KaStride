var timerIntervalRunning;
var isTimerRunning = false;
function onlyshow(cardToShow) {
    var elements = ["Logo", "counter", "run", "Color", "Player", "update"];
    elements.forEach(function (elementId) {
        var element = document.getElementById(elementId);
        element.style.display = elementId === cardToShow ? "block" : "none";
        if (cardToShow === "update") {
            update();
        }
    });
}

function start() {
    document.getElementById("Start").style.display = "none";
    document.getElementById("Logo").style.display = "none";
    document.getElementById("control").style.display = "block";
    document.getElementById("Connected").style.display = "block";
    document.getElementById("Color").style.display = "block";
}
function calculateSpeed() {
    var distance = document.getElementById("distance").value;
    var time = document.getElementById("time").value;
    var speed = time >= 1 ? (distance / time).toFixed(2) : 0;
    document.getElementById("speed").textContent = speed;
}

function toggleTimer() {
    if (isTimerRunning) {
        clearInterval(timerIntervalRunning);
        calculateSpeed();
    } else {
        startTimerRun();
    }
    isTimerRunning = !isTimerRunning;
}

function startTimerRun() {
    var timeInput = document.getElementById("time");
    var currentTime = 0.1;
    timerIntervalRunning = setInterval(function () {
        currentTime += 0.1;
        timeInput.value = currentTime;
        timeInput.value = currentTime.toFixed(1);
    }, 100);
}

document.addEventListener("DOMContentLoaded", () => {
    const title = document.getElementById("title");
    const nameInput = document.getElementById("nameInput");

    // Load saved data from localStorage
    if (localStorage.getItem("titleText")) {
        title.textContent = localStorage.getItem("titleText");
    }

    // Event listener for changing title
    title.addEventListener("click", () => {
        nameInput.value = title.textContent;
        nameInput.style.display = "inline";
        nameInput.focus();
    });

    nameInput.addEventListener("blur", () => {
        title.textContent = nameInput.value;
        localStorage.setItem("titleText", nameInput.value);
        nameInput.style.display = "none";
    });

    nameInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            nameInput.blur();
        }
    });
});