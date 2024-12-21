// Variables for the various screen views by ID
const options = document.getElementById("home");
const clock = document.getElementById("clocks");
const welcome = document.getElementById("welcome");
// Set the timer id to a variable
const timer = document.getElementById("timer");
// Set audio to a variable(s)
const beepsound = document.getElementById("beep");
const xsound = document.getElementById("xxx");
// startPause button
const startPauseBtn = document.getElementById("startPause");
// Set constants for the elements to call regularly
let red = document.getElementById("red");
let yellow = document.getElementById("yellow");
// Initialize the countdown time in seconds
let timeLeft;
let initialsetTime;
// Variable to store the interval ID
let countdown;
// Flag to check if the timer is running
let isRunning = false;
// Flag to check if the add time button has been used
let yellowExtUsed = false;
// Flag to check if the add time button has been used
let redExtUsed = false;
// Flag to check if dark mode already active
let dark = false;
// Counters to track if the extension buttons have been pressed
let redcount = 0;
let yellcount = 0;

// Function to hide the welcome section and show the options section
function cont() {
    welcome.style.display = "none";
    options.style.display = "flex";
}

// Function to replace options section with clock and assign values to the variables needed for countdown
function setTimer(time) {
    options.style.display = "none";
    clock.style.display = "flex";
    header.style.display = "none";
    timeLeft = time;
    initialsetTime = time;
    document.getElementById("timer").innerHTML = time;
}

// Function to start, pause or resume the countdown - based upon whichever option was chosen as a timer
function startPause() {
    if (!isRunning) {
        // Call the countdown function immediately
        updateTimer();

        countdown = setInterval(updateTimer, 1000);
        startPauseBtn.innerHTML = "Pause";
    } else {
        clearInterval(countdown);
        startPauseBtn.innerHTML = "Resume";
    }

    isRunning = !isRunning;
}

// Function to update the timer
function updateTimer() {
    timer.innerHTML = timeLeft;
    timeLeft--;

    // If time is less than or equal to 5 on screen - change text to red
    if (timeLeft < 4) {
        timer.style.color = "red";
        beepsound.play();
    }

    // If timer reaches 0, replace numbers with an 'x'
    if (timeLeft < -1) {
        clearInterval(countdown);
        timer.innerHTML = "X";
        xsound.play();
    }
}

// Function to add an extension to the countdown - one per player per frame
function addTime(buttonPressed) {
    if(buttonPressed == "red") {
        redcount++;
        timeLeft += 16;
        timer.innerHTML = timeLeft-1;
        timer.style.color = "white";
        redExtUsed =true;
        red.style.visibility = "hidden";
    } else {
        yellcount++;
        timeLeft += 16;
        timer.innerHTML = timeLeft-1;
        timer.style.color = "white";
        yellowExtUsed = true;
        yellow.style.visibility = "hidden";
    }
    red.disabled = true;
    yellow.disabled = true;

    // Start the countdown immediately
    setTimeout(function() {
        timeLeft--;
        timer.innerHTML = timeLeft;
    }, 0);
}

// Function to limit the amount of uses to one per frame
function showDisabled() {
    if(redcount > 0 && yellcount > 0) {
        console.log("both used");
        return;
    }
    if(redcount > 0) {
        yellow.disabled = false;
    }
    if(yellcount > 0) {
        red.disabled = false;
    }
}

// Function to reset the timer, but not the extensions used - Frames are made up of multiple visits usually
function reset() {
    clearInterval(countdown);
    isRunning = false;
    timeLeft = initialsetTime;
    timer.innerHTML = initialsetTime;
    startPauseBtn.innerHTML = "Start";
    timer.style.color = "white";
    showDisabled();
}

// Function to reset the frame - everything to be restored to seletions made in the options screen
function resetFrame() {
    reset();
    yellcount = 0;
    redcount = 0;
    redExtUsed = false;
    yellowExtUsed = false;
    red.disabled = false;
    yellow.disabled = false;
    red.style.visibility = "visible";
    yellow.style.visibility = "visible";
}

// Add an event listener for the color mode
document.getElementById("modeBtn").addEventListener("click", function() {
    if (!dark) {
        // Set the attributes to be changed to variables
        document.getElementById('logoImg').src="assets/images/wo-glasses.svg";
        document.body.style.backgroundImage = "url(assets/images/background_lt.webp";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundSize = "cover";
        document.getElementById("header").style.backgroundImage = "linear-gradient(135deg, green, blue)";
        dark=true;
        this.innerHTML = `Dark mode`;
    } else {
        document.getElementById('logoImg').src="assets/images/wo-glasses-bw.svg";
        document.body.style.backgroundImage = "url(assets/images/background_lt-bw.webp";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center center";
        document.body.style.backgroundSize = "cover";
        document.getElementById("header").style.backgroundImage = "linear-gradient(135deg, black, darkgrey)";
        dark=false;
        this.innerHTML = `Colour mode`;
    }
});

// Function to return to the options screen and update which timer you require
function beginning() {
    clock.style.display = "none";
    welcome.style.display = "none";
    options.style.display = "flex";
    header.style.display = "flex";
    resetFrame();
}

// Function to return to the Landing page
function homepage() {
    clock.style.display = "none";
    welcome.style.display = "flex";
    options.style.display = "none";
    header.style.display = "flex";
    resetFrame();
}