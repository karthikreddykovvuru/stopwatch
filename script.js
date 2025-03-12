let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let currentText = ""; // Store selected text
let isTimerRunning = false; // Track if timer is running

// Start the timer
function startTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        timer = setInterval(updateTimer, 10); // Update every 10ms for milliseconds
    }
}

// Stop the timer
function stopTimer() {
    clearInterval(timer);
    isTimerRunning = false;
}

// Reset the timer
function resetTimer() {
    stopTimer();
    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    updateDisplay();
}

// Timer update function
function updateTimer() {
    milliseconds += 10;
    if (milliseconds === 1000) {
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
            if (minutes === 60) {
                minutes = 0;
                hours++;
            }
        }
    }
    updateDisplay();
}

// Function to update the timer display
function updateDisplay() {
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    document.getElementById('milliseconds').textContent = String(milliseconds).padStart(3, '0');
}

// Function to set the text and reset validation
function updateTextInput(text) {
    currentText = text; // Store selected text for validation
    document.getElementById('text').value = text;
    document.getElementById('textbox').value = ""; // Clear textarea for fresh input
    resetBorder(); // Reset border color
    resetTimer(); // Reset timer when new text is selected
}

// Attach event listeners to text buttons
document.getElementById('text1').addEventListener('click', function () {
    updateTextInput("This is the text 1.");
});
document.getElementById('text2').addEventListener('click', function () {
    updateTextInput("This is the text 2.");
});
document.getElementById('text3').addEventListener('click', function () {
    updateTextInput("This is the text 3.");
});
document.getElementById('text4').addEventListener('click', function () {
    updateTextInput("This is the text 4.");
});

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

// Function to validate textarea in real-time
function validateInput() {
    if (!isTimerRunning) {
        startTimer(); // Start the timer when user starts typing
    }
    let textValue = currentText.trim(); // Use stored text
    let textAreaValue = document.getElementById('textbox').value.trim();

    if (textValue === "") {
        resetBorder();
    } else if (textValue === textAreaValue) {
        document.getElementById('textbox').style.border = "5px solid green";
    } else if (textValue.startsWith(textAreaValue)) {
        document.getElementById('textbox').style.border = "5px solid blue";
    } else {
        document.getElementById('textbox').style.border = "5px solid red";
    }
}

// Stop timer when user stops writing
document.getElementById('textbox').addEventListener('input', function () {
    validateInput();
    clearTimeout(window.stopTypingTimer);
    window.stopTypingTimer = setTimeout(stopTimer, 1000); // Stops timer after 2 seconds of inactivity
});

// Reset border to default
function resetBorder() {
    document.getElementById('textbox').style.border = "";
}
