/* ============================
visual.js
Handles cat behaviour visually
============================ */

// Grab the elements from the DOM
const introOverlay = document.getElementById("introOverlay");
const startBtn = document.getElementById("startBtn");

// ============================== Stat Bars Start =============================

const fullnessBar = document.getElementById('fullnessBar');
const energyBar = document.getElementById('energyBar');
const joyBar   = document.getElementById('joyBar');
const fullnessValueEl = document.getElementById('fullness-value');
const energyValueEl = document.getElementById('energy-value');
const joyValueEl    = document.getElementById('joy-value');

// When Start button is clicked
startBtn.addEventListener("click", () => {
  introOverlay.style.display = "none"; // Hide intro screen
  const inputName = catsNameInput.value.trim();
  catsName = inputName ? inputName : "Catoot"; //default name if none provided
});

// ============================== Configurable Stat Bars Start =============================

// Stat bar configuration
const STAT_CONFIG = {
  fullness: { min: 0, max: 100, barEl: document.getElementById('fullnessBar'), valueEl: document.getElementById('fullness-value') },
  energy: { min: 0, max: 100, barEl: document.getElementById('energyBar'), valueEl: document.getElementById('energy-value') },
  // Add more stats here as needed, e.g.:
  // love:   { min: 0, max: 1000, barEl: document.getElementById('loveBar'), valueEl: document.getElementById('love-value') },
};

// Update any stat bar by name
function updateStatBar(statName, value) {
  const config = STAT_CONFIG[statName];
  if (!config) return;

  // Clamp value
  const v = Math.max(config.min, Math.min(config.max, Number(value) || 0));
  // Calculate fill percent
  const percent = ((v - config.min) / (config.max - config.min)) * 100;

  // Set bar width
  config.barEl.style.width = `${percent}%`;

  // Accessibility
  const progressTrack = config.barEl.parentElement;
  if (progressTrack) {
    progressTrack.setAttribute('aria-valuenow', String(v));
    progressTrack.setAttribute('aria-valuemin', String(config.min));
    progressTrack.setAttribute('aria-valuemax', String(config.max));
  }

  // Update numeric display
  if (config.valueEl) config.valueEl.textContent = v;

  // Optional: pulse effect for low/high values
  config.barEl.classList.toggle('pulse', percent <= 15 || percent >= 90);
}
// ============================== Configurable Stat Bars End =============================

// Joy bar remains custom
function updateJoyBar(joy) {
  const fillMax = 100;
  const vibrateStart = 100;
  const vibrateMax = 200;
  const rainbowStart = 200;
  const rainbowMax = 400;
  const explodeStart = 401;
  const explodeMaxPercent = 300; // Max width: 300% of normal bar

  // Clamp fill for stages 1-3, allow overflow but clamp in explode phase
  let fillPercent;
  if (joy >= explodeStart) {
    fillPercent = Math.min((joy / fillMax) * 100, explodeMaxPercent);
  } else {
    fillPercent = Math.min(joy, fillMax) / fillMax * 100;
  }

  joyBar.style.width = `${fillPercent}%`;

  // Reset effects
  joyBar.className = 'stat-fill joy-bar';
  joyBar.style.filter = '';
  joyBar.style.animation = '';
  joyBar.style.background = '';
  joyBar.style.transform = '';
  joyBar.style.boxShadow = '';

  // --- Vibration Intensity ---
  let vibrateIntensity = 0;
  if (joy > vibrateStart) {
    vibrateIntensity = Math.min((joy - vibrateStart) / (vibrateMax - vibrateStart), 1);
  }
  if (joy > vibrateMax) vibrateIntensity = 1;

  // Calculate vibration distance (e.g. 2px to 8px)
  const vibrateDistance = 2 + vibrateIntensity * 6;

  // Pass this as a CSS variable:
  joyBar.style.setProperty('--vibrate-distance', `${vibrateDistance}px`);

  // --- Rainbow Speed ---
  let rainbowActive = false;
  let rainbowSpeed = 2.0;
  if (joy > rainbowStart) {
    rainbowActive = true;
    let rainbowProgress = Math.min((joy - rainbowStart) / (rainbowMax - rainbowStart), 1);
    if (joy > rainbowMax) rainbowProgress = 1;
    rainbowSpeed = 2.0 - rainbowProgress * 1.6;
  }

  // --- Apply Effects ---
  if (vibrateIntensity > 0) {
    const vibrateDuration = 0.5 - vibrateIntensity * 0.45;
    joyBar.style.animation = `joyVibrate ${vibrateDuration}s infinite linear`;
    joyBar.style.filter = `blur(${vibrateIntensity * 2}px)`;
  }

  if (rainbowActive) {
    joyBar.style.background = 'linear-gradient(135deg, red, orange, yellow, green, cyan, blue, violet, red)';
    joyBar.style.backgroundSize = '200% 100%';
    joyBar.style.animation = `joyRainbow ${rainbowSpeed}s infinite linear, joyVibrate ${0.05 + (1-vibrateIntensity)*0.45}s infinite linear`;
  }

  if (joy >= explodeStart) {
    joyBar.style.boxShadow = '0 0 20px 20px #fff, 0 0 50px 30px #f0f';
    // Only translate if not at max width, so it doesn't keep moving forever
    const maxTranslate = 100; // px, adjust as desired
    const translate = Math.min((joy - explodeStart) * 2, maxTranslate);
    joyBar.style.transform = `translateX(${translate}px) scaleX(1.2)`;
    joyBar.style.animation = `joyRainbow 0.4s infinite linear, joyVibrate 0.05s infinite linear`;
  }

  joyValueEl.textContent = joy;
}


// ========================= Notification System =========================
const MAX_NOTIFICATIONS = 6;
function showNotification({emoji = '', name = '', amount = ''}) {
  const notifArea = document.getElementById('notification-area');
  if (!notifArea) return;

  // Cull oldest if at max
  while (notifArea.children.length >= MAX_NOTIFICATIONS) {
    notifArea.children[0].remove();
  }

  const notif = document.createElement('div');
  notif.className = 'notification';

  notif.innerHTML = `
    ${emoji ? `<span class="notif-emoji">${emoji}</span>` : ''}
    <span class="notif-name">${name}</span>
    ${amount ? `<span class="notif-amount">${amount > 0 ? '+' : ''}${amount}</span>` : ''}
  `;

  notifArea.appendChild(notif);

  // Remove after animation
  setTimeout(() => {
    notif.remove();
  }, 2500);
}

function showNotif(itemId, amount = '', action = '') {
  const item = ITEM_DB[itemId];
  if (!item) return;
  showNotification({
    emoji: item.emoji,
    name: item.name,
    amount,
  });
  console.log(`Notification: ${action} ${item.name} ${amount}`);
}

// Info/Guide popup logic
const infoGuideIcon = document.getElementById('infoGuideIcon');
const infoGuidePopup = document.getElementById('infoGuidePopup');
const infoGuideCloseBtn = document.getElementById('infoGuideCloseBtn');

infoGuideIcon.addEventListener('mouseenter', () => {
  infoGuidePopup.classList.add('active');
});
infoGuideIcon.addEventListener('focus', () => {
  infoGuidePopup.classList.add('active');
});
infoGuideIcon.addEventListener('mouseleave', () => {
  infoGuidePopup.classList.remove('active');
});
infoGuideIcon.addEventListener('blur', () => {
  infoGuidePopup.classList.remove('active');
});
infoGuidePopup.addEventListener('mouseleave', () => {
  infoGuidePopup.classList.remove('active');
});


