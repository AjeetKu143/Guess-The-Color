const rgbValueElement = document.getElementById("rgb-value");
const colorGrid = document.getElementById("color-grid");
const resultElement = document.getElementById("result");
const resetButton = document.getElementById("reset-btn");
const easyButton = document.getElementById("easy-btn");
const hardButton = document.getElementById("hard-btn");
const attemptsElement = document.getElementById("attempts");

let correctColor;
let colors = [];
let mode = "hard"; // Default mode
let attempts = 3;
let gameActive = true; // Tracks if the game is still active

// Function to generate a random RGB color
function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

// Function to set up the game based on mode
function setGame() {
  gameActive = true;
  const numBoxes = mode === "easy" ? 3 : 9;
  attempts = mode === "easy" ? 1 : 3;

  // Adjust grid class based on mode
  colorGrid.classList.remove("easy", "hard");
  colorGrid.classList.add(mode === "easy" ? "easy" : "hard");

  // Generate random colors
  colors = Array.from({ length: numBoxes }, () => getRandomColor());

  // Choose one random correct color
  correctColor = colors[Math.floor(Math.random() * numBoxes)];

  // Set the RGB value text
  rgbValueElement.textContent = correctColor.toUpperCase();

  // Clear color grid
  colorGrid.innerHTML = "";

  // Create color boxes and add event listeners
  colors.forEach((color, index) => {
    const colorBox = document.createElement("div");
    colorBox.classList.add("color-box");
    colorBox.style.backgroundColor = color;
    colorBox.addEventListener("click", () => handleGuess(colorBox, color));
    colorGrid.appendChild(colorBox);
  });

  // Reset result text and attempts
  resultElement.textContent = "";
  updateAttemptsText();
}

// Handle user's guess
function handleGuess(box, color) {
  if (!gameActive) return; // Disable interaction after game ends

  if (color === correctColor) {
    resultElement.textContent = "Correct!";
    resultElement.style.color = "green";
    gameActive = false;
    // Change all boxes to the correct color
    document
      .querySelectorAll(".color-box")
      .forEach((box) => (box.style.backgroundColor = correctColor));
  } else {
    attempts--;
    if (attempts > 0) {
      resultElement.textContent = "Try Again!";
      resultElement.style.color = "red";
      box.style.backgroundColor = "#f4f4f4"; // Fade wrong box
      updateAttemptsText();
    } else {
      resultElement.textContent = "Game Over!";
      resultElement.style.color = "red";
      gameActive = false; // Stop game
      // Disable further guesses by removing click events
      document.querySelectorAll(".color-box").forEach((box) => {
        box.style.backgroundColor = correctColor;
      });
      updateAttemptsText();
    }
  }
}

// Update attempts text for hard mode
function updateAttemptsText() {
  if (mode === "hard" && gameActive) {
    attemptsElement.textContent = `Attempts left: ${attempts}`;
  } else {
    attemptsElement.textContent = "";
  }
}

// Reset button functionality
resetButton.addEventListener("click", setGame);

// Mode button event listeners
easyButton.addEventListener("click", function () {
  mode = "easy";
  easyButton.classList.add("selected");
  hardButton.classList.remove("selected");
  setGame();
});

hardButton.addEventListener("click", function () {
  mode = "hard";
  hardButton.classList.add("selected");
  easyButton.classList.remove("selected");
  setGame();
});

// Initialize the game
setGame();
