/* ============================
ui.js
Handles buttons and stats
============================ */

const moodDisplay = document.getElementById('moodDisplay');
const displayImage = document.getElementById('cat-image');
const fullnessValue = document.getElementById('fullness-value');
const joyValue = document.getElementById('joy-value');
const energyValue = document.getElementById('energy-value');
const loveValue = document.getElementById('love-value');
const catsNameInput = document.getElementById('catsName');
const feedBtn = document.getElementById('feed-btn');
const playBtn = document.getElementById('play-btn');
const restBtn = document.getElementById('rest-btn');

let catsName = "Catoot";	//default name before user inputs their own name

let love = 0;	//initial stat values
let energy = 50;
let fullness = 50;
let joy = 0;
let coins = 10; //initial coins value
let luck = 0; //initial luck stat value


// =============================== Update all game state values and UI START ===============================
function updateGameState() {
  statsClamp();  //calls the function to clamp values within their min/max
  updateStatBar('fullness', fullness);// update stat meters
  updateStatBar('energy', energy);
  updateJoyBar(joy); // joy bar remains custom
  
  updateLoveDisplay(); // update love display
  achievmentTracker();  //calls the function from achievements.js to check for achievements
  updateCoinsDisplay(); // update coins display
  updateTickCounters(); // update tick counters
}

function updateTickCounters() { // +1 to counters for game tick tracking
  ticksSinceStart++;
  if (energy < 15) ticksWithLowEnergy++;
  if (fullness < 15) ticksWithLowFullness++;
}

// =============================== Update all game state values and UI STOP ===============================

  //clamp values to their max/min
  function statsClamp() {
  love = Math.max(0, Math.min(1000, love));
  energy = Math.max(0, Math.min(100, energy));
  fullness = Math.max(0, Math.min(100, fullness));
  joy = Math.max(0, joy); // no upper limit
  }

// =============================== Button Event Listeners START ===============================
document.getElementById('feed-btn').addEventListener('click', () => {
  fullnessUpdate(10), energyUpdate(-8), joyUpdate(3);
  updateGameState();
  updateCatState();
  totalFeeds += 1;
});
document.getElementById('play-btn').addEventListener('click',  () => {
  fullnessUpdate(-8), energyUpdate(-13), joyUpdate(5);
  updateGameState();
  updateCatState();
  totalPlays += 1;
});
document.getElementById('rest-btn').addEventListener('click',  () => {
  energyUpdate(20), fullnessUpdate(-6), joyUpdate(2);
  updateGameState();
  updateCatState();
  totalRests += 1;
});
// =============================== Button Event Listeners END ===============================

/* =================================== CatState START ===================================*/
let catState = "neutral";
function updateCatState() {
  if (energy >= 50 && fullness <= 20) {
    moodPlayful();
  } else if (energy <= 30) {
    moodSleepy();
  } else if (fullness >= 50 && energy <= 30) {
    moodGrumpy();
  } else {
    moodNeutral();
  }
}

 function moodPlayful() {
    displayImage.src = "images/Cat-Playful.png";
    catState = "playful";
    moodDisplay.textContent = "Playful";
}

  function moodSleepy() {
    displayImage.src = "images/Cat-Sleepy.png";
    catState = "sleepy";
    moodDisplay.textContent = "Sleepy";
}

  function moodGrumpy() {
    displayImage.src = "images/Cat-Grumpy.png";
    catState = "grumpy";
    moodDisplay.textContent = "Grumpy";
}

  function moodNeutral() {
    displayImage.src = "images/Cat-Neutral.png";
    catState = "neutral";
    moodDisplay.textContent = "Neutral";
}

/* =================================== CatState END ===================================*/

// Button cooldown utility function
function buttonCooldown(button, cooldownMs, action) {
  if (button.disabled) return; // Prevent multiple clicks during cooldown
  action();
  button.disabled = true;
  setTimeout(() => {
    button.disabled = false;
  }, cooldownMs);
  }

function disableAllButtons() {
    feedBtn.disabled = true;
    playBtn.disabled = true;
    restBtn.disabled = true;
  }
function enableAllButtons() {
    feedBtn.disabled = false;
    playBtn.disabled = false;
    restBtn.disabled = false;
  }

function updateLoveDisplay() {
  const loveValue = document.getElementById('love-value');
  if (loveValue) loveValue.textContent = `♥ ${love}`;
}







document.addEventListener('DOMContentLoaded', () => {
updateGameState();  //initial call to set stats on page load
initializeShopInventory(); // initialize shop prices/sales and inventory on page load
});