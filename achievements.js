
// Achievements tracking function
function achievmentTracker() {
  checkJoyAchievement();
  checkJoyAchievement2();
  checkJoyAchievement3();
  checkQuackersAchievement();
  checkQuackersSpawned();
  checkQuackersSpawned2();
  checkQuackersSpawned3();
  checkQuackersSpawned4();
  loveAchievementCheck();
  loveAchievementCheck2();
  storyBeatsStartedCheck();
  TotalCoinsAchievementCheck();
  TotalCoinsAchievementCheck2();
  TotalCoinsAchievementCheck3();
  totalFeedsAchievementCheck();
  totalPlaysAchievementCheck();
  totalRestsAchievementCheck();
  totalSalesAchievementCheck();
  totalPurchasesAchievementCheck();
  totalPowerupsUsedCheck();
  totalToysPlayedWithCheck();
  trophiesEarnedCheck();
  trophiesEarnedCheck2();
  trophiesEarnedCheck3();
}

// Hidden counters for various purposes
let storyBeatsStarted = 0;
let totalCoinsEarned = 0;
let totalCoinsSpent = 0;
let totalShopPurchases = 0;
let totalShopSales = 0;
let totalPlays = 0;
let totalFeeds = 0;
let totalRests = 0;

let powerUpsUsed = 0;
let toysPlayedWith = 0;
let trophiesEarned = 0;

let ticksSinceStart = 0;
let ticksWithLowEnergy = 0;
let ticksWithLowFullness = 0;

let quackersGiven = 0;


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
let joyAchievement2 = false;
let joyAchievement3 = false;
let goldenBellAchievement = false;
let quackersAchievement = false;
let quackersAchievement2 = false;
let quackersAchievement3 = false;
let quackersAchievement4 = false;
let goldenBell = false;
let loveAchievement = false;
let loveAchievement2 = false;
let totalCoinsAchievement = false;
let totalCoinsAchievement2 = false;
let totalCoinsAchievement3 = false;
let totalFeedsAchievement = false;
let totalPlaysAchievement = false;
let totalRestsAchievement = false;
let totalSalesAchievement = false;
let totalPurchasesAchievement = false;
let totalPowerupsUsedAchievement = false;
let totalToysPlayedWithAchievement = false;
let trophiesEarnedAchievement = false;
let trophiesEarnedAchievement2 = false;
let trophiesEarnedAchievement3 = false;
let storyBeatsAchievement = false;



// Joy Achievement condition check
function checkJoyAchievement() {
  if (joy >= 100 && !joyAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Joyful Kitty!';
    achDesc.textContent = 'It has only just begun...';
    joyAchievement = true;
  }
}

function checkJoyAchievement2() {
  if (joy >= 250 && !joyAchievement2) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Blissful Kitty!';
    achDesc.textContent = `${catsName} radiates pure joy!, 250 joy achieved!`;
    joyAchievement2 = true;
  }
}

function checkJoyAchievement3() {
  if (joy >= 500 && !joyAchievement3) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Ascendant Kitty!';
    achDesc.textContent = `${catsName} has reached the pinnacle of joy!, 500 joy achieved!`;
    joyAchievement3 = true;
  }
}

// ----------- Quackers Achievement condition check -----------
function checkQuackersAchievement() {
  if (goldenBell && !goldenBellAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Quackers Galore!!!';
    achDesc.textContent = `With this bell, ${catsName} shall manifest all quackers!, unlocking infinite quackers!`;
    quackersAchievement = true;
  }
}

function checkQuackersSpawned() {
  if (quackersGiven >= 50 && !quackersAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = '50 Quackers!!!';
    achDesc.textContent = `${catsName} has Manifested 50 Quackers!`;
  }
}

function checkQuackersSpawned2() {
  if (quackersGiven >= 200 && !quackersAchievement2) {
    achDisplay.style.display = 'block';
    achTitle.textContent = '200 Quackers!!!';
    achDesc.textContent = `${catsName} has Manifested 200 Quackers!`;
  }
}

function checkQuackersSpawned3() {
  if (quackersGiven >= 500 && !quackersAchievement3) {
    achDisplay.style.display = 'block';
    achTitle.textContent = '500 Quackers!!!';
    achDesc.textContent = `${catsName} has Manifested 500 Quackers!`;
  }
}

function checkQuackersSpawned4() {
  if (quackersGiven >= 1000 && !quackersAchievement4) {
    achDisplay.style.display = 'block';
    achTitle.textContent = '1000 Quackers!!!';
    achDesc.textContent = `${catsName} has Manifested 1000 Quackers!`;
  }
}

function loveAchievementCheck() {
  if (love >= 50 && !loveAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Loving Kitty!';
    achDesc.textContent = `${catsName} feels the love!, 50 love achieved!`;
    loveAchievement = true;
  }
}

function loveAchievementCheck2() {
  if (love >= 200 && !loveAchievement2) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Pure unconditional Love!';
    achDesc.textContent = `${catsName} loves you more than anything!`;
    loveAchievement2 = true;
  }
}

function storyBeatsStartedCheck() {
  if (storyBeatsStarted >= 10 && !storyBeatsAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Storyteller Kitty!';
    achDesc.textContent = `Enough time has passed for the shop to refresh`;
    initializeShop();
    storyBeatsAchievement = true;
  }
}

function storyBeatsStartedCheck2() {
  if (storyBeatsStarted >= 25 && !storyBeatsAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Master Storyteller Kitty!';
    achDesc.textContent = `You have experienced 25 story beats!`;
    storyBeatsAchievement2 = true;
  }
}

function TotalCoinsAchievementCheck() {
  if (totalCoinsEarned >= 100 && !totalCoinsAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Wealthy Kitty!';
    achDesc.textContent = `${catsName} has helped you earn a total of 100 coins!`;
    totalCoinsAchievement = true;
  }
}

function TotalCoinsAchievementCheck2() {
  if (totalCoinsEarned >= 500 && !totalCoinsAchievement2) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Rich Kitty!';
    achDesc.textContent = `${catsName} has helped you earn a total of 500 coins!`;
    totalCoinsAchievement2 = true;
  }
}

function TotalCoinsAchievementCheck3() {
  if (totalCoinsEarned >= 1000 && !totalCoinsAchievement3) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Tycoon Kitty!';
    achDesc.textContent = `${catsName} has helped you earn a total of 1000 coins!`;
    totalCoinsAchievement3 = true;
  }
}

function totalFeedsAchievementCheck() {
  if (totalFeeds >= 100 && !totalFeedsAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Feeding Frenzy!';
    achDesc.textContent = `You have fed ${catsName} 100 times!`;
    totalFeedsAchievement = true;
  }
}

function totalPlaysAchievementCheck() {
  if (totalPlays >= 100 && !totalPlaysAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Playtime Pro!';
    achDesc.textContent = `You have played with ${catsName} 100 times!`;
    totalPlaysAchievement = true;
  }
}

function totalRestsAchievementCheck() {
  if (totalRests >= 100 && !totalRestsAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Rested and Relaxed!';
    achDesc.textContent = `You have rested with ${catsName} 100 times!`;
    totalRestsAchievement = true;
  }
}

function totalSalesAchievementCheck() {
  if (totalShopSales >= 50 && !totalSalesAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Savvy Seller!';
    achDesc.textContent = `You have sold items in the shop 50 times!`;
    totalSalesAchievement = true;
  }
}
function totalPurchasesAchievementCheck() {
  if (totalShopPurchases >= 50 && !totalPurchasesAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Avid Buyer!';
    achDesc.textContent = `You have purchased items in the shop 50 times!`;
    totalPurchasesAchievement = true;
  }
}

function totalPowerupsUsedCheck() {
  if (powerUpsUsed >= 20 && !totalPowerupsUsedAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Powerup Master!';
    achDesc.textContent = `You have used power-ups 20 times!`;
    totalPowerupsUsedAchievement = true;
  }
}

function totalToysPlayedWithCheck() {
  if (toysPlayedWith >= 30 && !totalToysPlayedWithAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Toy Enthusiast!';
    achDesc.textContent = `You have played with toys 30 times!`;
    totalToysPlayedWithAchievement = true;
  }
}

function trophiesEarnedCheck() {
  if (trophiesEarned >= 10 && !trophiesEarnedAchievement) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Trophy Collector!';
    achDesc.textContent = `You have earned 10 trophies!`;
    trophiesEarnedAchievement = true;
  }
}

function trophiesEarnedCheck2() {
  if (trophiesEarned >= 25 && !trophiesEarnedAchievement2) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Trophy Hoarder!';
    achDesc.textContent = `You have earned 25 trophies!`;
    trophiesEarnedAchievement2 = true;
  }
}

function trophiesEarnedCheck3() {
  if (trophiesEarned >= 50 && !trophiesEarnedAchievement3) {
    achDisplay.style.display = 'block';
    achTitle.textContent = 'Trophy Legend!';
    achDesc.textContent = `You have earned 50 trophies!`;
    trophiesEarnedAchievement3 = true;
  }
}