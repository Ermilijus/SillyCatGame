let debug = false; // Set to true to enable debug mode

// -----------------------------------------------

const debugbtn = document.getElementById("debugBtn");
const debugMenu = document.getElementById("debugMenu");

function applyDebugVisibility() {
  if (debug) {
    debugbtn.style.display = "block";
  } else {
    debugbtn.style.display = "none";
    debugMenu.style.display = "none";
  }
}

debugbtn.addEventListener("click", () => {
  debugMenu.style.display =
    debugMenu.style.display === "none" ? "block" : "none";
});

// Toggle debug mode with a keyboard shortcut ( Ctrl+F1 )
document.addEventListener("keydown", (event) => {
  if (event.ctrlKey && event.key === "F1") {
    debug = !debug;
    applyDebugVisibility();
  }
});

// -----------------------------------------------

// Toggle each debug subsection
document.querySelectorAll(".debug-section-toggle").forEach((toggleBtn) => {
  toggleBtn.addEventListener("click", () => {
    const content = toggleBtn.nextElementSibling;

    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

document.getElementById("storyRandom").addEventListener("click", () => {
  const stories = [
    { id: getRandomStoryBeatByLocation("Park") },
    { id: getRandomStoryBeatByLocation("Forest") },
    { id: getRandomStoryBeatByLocation("Shop") },
    { id: getRandomStoryBeatByLocation("CatPlay") },
    { id: getRandomStoryBeatByLocation("Freelance") },
    { id: getRandomStoryBeatByLocation("Beach") },
  ];
  const randomStory = stories[Math.floor(Math.random() * stories.length)];
  showStoryOverlay(randomStory.id);
});

// Display current stats in debug menu --------------------------------------
document
  .getElementById("debug-getStatsBtn")
  .addEventListener("click", function () {
    const stats = [
      { label: "Total Coins Earned", value: totalCoinsEarned },
      { label: "Total Coins Spent", value: totalCoinsSpent },
      { label: "Total Shop Purchases", value: totalShopPurchases },
      { label: "Total Shop Sales", value: totalShopSales },
      { label: "Total Plays", value: totalPlays },
      { label: "Total Feeds", value: totalFeeds },
      { label: "Total Rests", value: totalRests },
      { label: "Power Ups Used", value: powerUpsUsed },
      { label: "Toys Played With", value: toysPlayedWith },
      { label: "Trophies Earned", value: trophiesEarned },
      { label: "Ticks Since Start", value: ticksSinceStart },
      { label: "Ticks With Low Energy", value: ticksWithLowEnergy },
      { label: "Ticks With Low Fullness", value: ticksWithLowFullness },
      { label: "Quackers Given", value: quackersGiven },
      { label: "Story Beats Started", value: storyBeatsStarted },
    ];

    let html = '<ul style="list-style:none; padding:0; margin:0;">';
    stats.forEach((stat) => {
      html += `<li><strong>${stat.label}:</strong> ${stat.value}</li>`;
    });
    html += "</ul>";

    document.getElementById("debug-statsOutput").innerHTML = html;
  });

// modify stats directly from debug menu --------------------------------------
document.getElementById("resetStats").addEventListener("click", () => {
  fullness = 50;
  energy = 50;
  joy = 0;
  updateGameState();
});
document.getElementById("addJoyBtn").addEventListener("click", () => {
  joy += 100;
  updateGameState();
});
document.getElementById("reduceJoyBtn").addEventListener("click", () => {
  joy -= 100;
  updateGameState();
});
document.getElementById("addFullnessBtn").addEventListener("click", () => {
  fullness += 100;
  updateGameState();
});
document.getElementById("reduceFullnessBtn").addEventListener("click", () => {
  fullness -= 100;
  updateGameState();
});
document.getElementById("addEnergyBtn").addEventListener("click", () => {
  energy += 100;
  updateGameState();
});
document.getElementById("reduceEnergyBtn").addEventListener("click", () => {
  energy -= 100;
  updateGameState();
});

// set cat mood directly from debug menu --------------------------------------
document.getElementById("setPlayfulBtn").addEventListener("click", () => {
  moodPlayful();
  catState = moodPlayful;
});
document.getElementById("setGrumpyBtn").addEventListener("click", () => {
  moodGrumpy();
  catState = moodGrumpy;
});
document.getElementById("setSleepyBtn").addEventListener("click", () => {
  moodSleepy();
  catState = moodSleepy;
});
document.getElementById("setNeutralBtn").addEventListener("click", () => {
  moodNeutral();
  catState = moodNeutral;
});

// Items debug --------------------------------------
document.getElementById("clearInventoryBtn").addEventListener("click", () => {
  inventoryItems = inventoryItems.map(() => null);
  initializeInventory();
});
document.getElementById("addFoodBtn").addEventListener("click", () => {
  giveLoot("Food");
  initializeInventory();
});
document.getElementById("addToyBtn").addEventListener("click", () => {
  giveLoot("Toy");
  initializeInventory();
});
document.getElementById("addQuestBtn").addEventListener("click", () => {
  giveLoot("Quest");
  initializeInventory();
});
document.getElementById("addMiscBtn").addEventListener("click", () => {
  giveLoot("Misc");
  initializeInventory();
});
document.getElementById("addPowerupBtn").addEventListener("click", () => {
  giveLoot("Powerup");
  initializeInventory();
});
document.getElementById("addTrophyBtn").addEventListener("click", () => {
  giveLoot("Trophy");
  initializeInventory();
});
document.getElementById("addValuableBtn").addEventListener("click", () => {
  giveLoot("Valuable");
  initializeInventory();
});

// ----------------------- Helper Function for Automation Tests -----------------------

// Expose test helpers globally
window.testHelpers = {
  addCoins: () => {},
  giveItem: () => {},
};

// Enable testware if URL has ?testMode=1
function testMode() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("testMode") === "1") {
    window.TEST_MODE = true;
    introOverlay.style.display = "none"; // Hide intro and start the game directly
    updateGameState();

    window.testHelpers = {
      addCoins(amount) {
        coins += amount;
        updateCoinsDisplay();
      },
      giveItem(itemId, quantity) {
        for (let i = 0; i < quantity; i++) {
          addItemById(itemId);
        }
        initializeInventory();
      },
    };
  }
}

/* Initialize debug visibility on load */
applyDebugVisibility();