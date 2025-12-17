
// Achievements tracking function
function achievmentTracker() {
  checkJoyAchievement();
}

// Achievement display elements
const achievementBtn = document.getElementById('achievementBtn');
const achDisplay = document.getElementById('achievementDisplay');
const achTitle = document.getElementById('achievementTitle');
const achDesc = document.getElementById('achievementDesc');

// Achievement display close button
achievementBtn.addEventListener('click', () => {
  achDisplay.style.display = 'none';
});

// Achievement tracking variables
let joyAchievement = false;


// Joy Achievement condition check
function checkJoyAchievement() {
  if (joy >= 100 && !joyAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Joyful Cat!';
    achDesc.textContent = 'It has only just begun...';
    joyAchievement = true;
    addItemById(201); // battery
    addItemById(204); // Drained Flashlight
  }
}