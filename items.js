/* ============================
items.js
Handles Inventory system and items
============================ */


// Item database === Common, Uncommon, Rare, Epic, Legendary, Mythic, Notif ===
const ITEM_DB = { // Food, Toy, Quest, Misc, Powerup, Trophy, Valuable ===

    // Food items
    1: {id: 1, name: "Baguette", emoji: "🥖", type: "Food", stackable: true, maxStack: 10, rarity: "Common", price: 1, combinable: false, usable: true, description: "its french bread"},
    2: {id: 2, name: "Fish", emoji: "🐟", type: "Food", stackable: true, maxStack: 10, rarity: "Uncommon", price: 2, combinable: false, usable: true, description: "fiiiish"},
    3: {id: 3, name: "Mouse", emoji: "🐀", type: "Food", stackable: true, maxStack: 10, rarity: "Uncommon", price: 2, combinable: false, usable: true, description: "Its just a toy, right?"},
    4: {id: 4, name: "Cherries", emoji: "🍒", type: "Food", stackable: true, maxStack: 10, rarity: "Rare", price: 5, combinable: false, usable: true, description: "Delicious Cherries."},
    5: {id: 5, name: "Potato", emoji: "🥔", type: "Food", stackable: true, maxStack: 10, rarity: "Common", price: 1, combinable: false, usable: true, description: "Its a potato!"},
    6: {id: 6, name: "Shrimp", emoji: "🍤", type: "Food", stackable: true, maxStack: 10, rarity: "Uncommon", price: 2, combinable: false, usable: true, description: "A tasty treat for your cat."},
    7: {id: 7, name: "Sushi", emoji: "🍣", type: "Food", stackable: true, maxStack: 10, rarity: "Legendary", price: 10, combinable: false, usable: true, description: "A rare delicious fishy treat, your cat or any human will love it!"},
    8: {id: 8, name: "Watermelon slice", emoji: "🍉", type: "Food", stackable: true, maxStack: 10, rarity: "Epic", price: 7, combinable: false, usable: true, description: "A juicy mouth watering treat, perfect for hot days."},

    // Toy items
    100: {id: 100, name: "Ball", emoji: "🔴", type: "Toy", stackable: true, maxStack: 3, rarity: "Mythic", price: 20, combinable: false, usable: true, description: "small red ball"},
    101: {id: 101, name: "Ball of yarn", emoji: "🧶", type: "Toy", stackable: true, maxStack: 3, rarity: "Uncommon", price: 2, combinable: false, usable: true, description: "its a ball made of yarn, Cats love it!"},
    102: {id: 102, name: "Quacker", emoji: "🦆", type: "Toy", stackable: true, maxStack: 999, rarity: "Common", price: 1, combinable: true, usable: true, description: "Quack!, Collect them all!"},
    103: {id: 103, name: "Skateboard", emoji: "🛹", type: "Toy", stackable: false, maxStack: 1, rarity: "Rare", price: 5, combinable: false, usable: true, description: "Its a skateboard, your kitty can do a kickflip, can you?"},

    // Quest items
    200: {id: 200, name: "Mysterious key", emoji: "🗝️", type: "Quest", stackable: false, maxStack: 1, rarity: "Epic", price: 7, combinable: false, usable: false, description: "A key to somewhere... hold on to this."},
    201: {id: 201, name: "Battery", emoji: "🔋", type: "Quest", stackable: false, maxStack: 1, rarity: "Rare", price: 5, combinable: true, usable: false, description: "Its a brand new AA Battery, perhaps its needed for something"},
    202: {id: 202, name: "A treasure map", emoji: "🗺️", type: "Quest", stackable: false, maxStack: 1, rarity: "Uncommon", price: 2, combinable: false, usable: true, description: "It's a treasure map, i wonder where it leads."},
    203: {id: 203, name: "Raccoon", emoji: "🦝", type: "Quest", stackable: false, maxStack: 1, rarity: "Mythic", price: 1337, combinable: false, usable: false, description: "The one and ONLY!!!"},
    204: {id: 204, name: "Toolbox", emoji: "🧰", type: "Quest", stackable: false, maxStack: 1, rarity: "Epic", price: 7, combinable: true, usable: false, description: "A toolbox full of useful tools."},
    205: {id: 205, name: "Flashlight", emoji: "🔦", type: "Quest", stackable: false, maxStack: 1, rarity: "Uncommon", price: 3, combinable: false, usable: false, description: "A battery powered flashlight."},

    // Misc items
    300: {id: 300, name: "Old boot", emoji: "👢", type: "Misc", stackable: true, maxStack: 10, rarity: "Common", price: 1, combinable: false, usable: false, description: "An old boot, where is the other one?"},
    301: {id: 301, name: "Dice", emoji: "🎲", type: "Misc", stackable: true, maxStack: 10, rarity: "Uncommon", price: 3, combinable: false, usable: false, description: "A single dice"},
    302: {id: 302, name: "Paper clip", emoji: "🧷", type: "Misc", stackable: true, maxStack: 10, rarity: "Common", price: 1, combinable: false, usable: false, description: "Its a paper clip, not much use..."},
    304: {id: 304, name: "Button", emoji: "🔘", type: "Misc", stackable: true, maxStack: 10, rarity: "Common", price: 1, combinable: false, usable: false, description: "A small button"},
    305: {id: 305, name: "Evil eye", emoji: "🧿", type: "Misc", stackable: true, maxStack: 10, rarity: "Rare", price: 5, combinable: false, usable: false, description: "A protective talisman believed to ward off evil."},
    306: {id: 306, name: "Soap", emoji: "🧼", type: "Misc", stackable: true, maxStack: 10, rarity: "Uncommon", price: 2, combinable: false, usable: false, description: "A bar of soap, smells nice and clean. Is kitty trying to tell you something?"},

    // Powerup items
    400: {id: 400, name: "Energy drink", emoji: "🧃", type: "Powerup", stackable: true, maxStack: 3, rarity: "Uncommon", price: 2, combinable: false, usable: true, description: "Boosts energy!, not for the cat i hope"},
    401: {id: 401, name: "Star", emoji: "⭐️", type: "Powerup", stackable: true, maxStack: 3, rarity: "Mythic", price: 20, combinable: false, usable: true, description: "THATS A STAR!!, How??"},
    402: {id: 402, name: "Catnip", emoji: "🌿", type: "Powerup", stackable: true, maxStack: 3, rarity: "Rare", price: 5, combinable: false, usable: true, description: "Makes cats go crazy!, dont overdo it."},

    // Trophy items
    500: {id: 500, name: "Three leaf clover", emoji: "☘️", type: "Trophy", stackable: false, maxStack: 1, rarity: "Rare", price: 5, combinable: true, usable: false, description: "A lucky clover?, perhaps you can combine it with something."},
    501: {id: 501, name: "Four leaf clover", emoji: "🍀", type: "Trophy", stackable: false, maxStack: 1, rarity: "Legendary", price: 10, combinable: false, usable: true, description: "A four leaf clover!, Lucky you!"},
    502: {id: 502, name: "Gold medal", emoji: "🥇", type: "Trophy", stackable: false, maxStack: 1, rarity: "Legendary", price: 10, combinable: false, usable: false, description: "A Golden medal, what a spectacular kitty you have"},
    503: {id: 503, name: "Silver medal", emoji: "🥈", type: "Trophy", stackable: false, maxStack: 1, rarity: "Epic", price: 7, combinable: false, usable: false, description: "A Silver medal, your kitty is getting better!"},
    504: {id: 504, name: "Bronze medal", emoji: "🥉", type: "Trophy", stackable: false, maxStack: 1, rarity: "Rare", price: 5, combinable: false, usable: false, description: "A Bronze medal, your kitty is doing good!"},
    505: {id: 505, name: "Golden disc", emoji: "💽", type: "Trophy", stackable: false, maxStack: 1, rarity: "Mythic", price: 20, combinable: false, usable: false, description: "A Goden music disc, its got your kitty's name on it, is your kitty a DJ by night?"},
    506: {id: 506, name: "Golden bell", emoji: "🔔", type: "Trophy", stackable: false, maxStack: 1, rarity: "Mythic", price: 100, combinable: false, usable: true, description: "A shiny Golden bell, used for summoning a Duck!"},

    // Valuable items
    600: {id: 600, name: "Crown", emoji: "👑", type: "Valuable", stackable: false, maxStack: 1, rarity: "Legendary", price: 10, combinable: false, usable: false, description: "Its a gilded crown!"},
    601: {id: 601, name: "Purse", emoji: "👛", type: "Valuable", stackable: false, maxStack: 1, rarity: "Rare", price: 5, combinable: false, usable: true, description: "A purse?!, who does it belong to?"},
    602: {id: 602, name: "Diamond", emoji: "💎", type: "Valuable", stackable: true, maxStack: 1, rarity: "Epic", price: 7, combinable: false, usable: false, description: "A shiny diamond, what if you combine it with another?"},
    603: {id: 603, name: "Present", emoji: "🎁", type: "Valuable", stackable: false, maxStack: 1, rarity: "Epic", price: 7, combinable: false, usable: true, description: "A gift from your Kitty, I wonder whats inside."},
    604: {id: 604, name: "Cash", emoji: "💵", type: "Valuable", stackable: true, maxStack: 5, rarity: "Rare", price: 5, combinable: false, usable: true, description: "A stack of Cash :O"},
    
    // Notifications
    995: {id: 995, name: "Used", emoji: "", type: "Notif", stackable: false, maxStack: 1, rarity: "Special", combinable: false, usable: false, description: "Item used successfully."},
    996: {id: 996, name: "Cant combine!", emoji: "❌", type: "Notif", stackable: false, maxStack: 1, rarity: "Special", combinable: false, usable: false, description: "Cant combine these items."},
    997: {id: 997, name: "Coins", emoji: "💰", type: "Notif", stackable: false, maxStack: 1, rarity: "Special", combinable: false, usable: false, description: "its money"},
    998: {id: 998, name: "Not enough coins!", emoji: "❗", type: "Notif", stackable: false, maxStack: 1, rarity: "Special", combinable: false, usable: false, description: "You don't have enough coins."},
    999: {id: 999, name: "Inventory full!", emoji: "❗", type: "Notif", stackable: false, maxStack: 1, rarity: "Special", combinable: false, usable: false, description: "No space left in inventory."},

}

// Inventory data storage
let inventoryItems = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];

let questPocket = [
  null,
  null,
  null,
  null,
  null
];

// Inventory data storage
const invBtn = document.getElementById('invBtn');
const inventoryOverlay = document.getElementById('invOverlay');
const closeInvBtn = document.getElementById('closeInvBtn');
const inventoryGrid = document.getElementById('invGrid');
const contextMenu = document.getElementById('itemContextMenu');
let contextMenuSlot = null;
let luckyRollsRemaining = 0; // lucky roll counter


// Initialize inventory grid
function initializeInventory() {
  if (!inventoryGrid) return;
  inventoryGrid.innerHTML = '';
  inventoryItems.forEach((item, index) => {
    const slot = document.createElement('div');
    slot.className = 'inv-slot';
    if (item) {
      const meta = ITEM_DB[item.id];
      slot.classList.add('filled');
      // Add rarity class (lowercase)
      if (meta.rarity) {
        slot.classList.add('rarity-' + meta.rarity.toLowerCase());
      }
      slot.innerHTML = `
        <span class="item-emoji">${meta?.emoji ?? '❓'}</span>
        ${item.qty > 1 ? `<span class="stack-count">${item.qty}</span>` : ''}
      `;
      slot.title = `${meta.name}\n${meta.description}`;
    }
    slot.addEventListener('click', (e) => {
      e.preventDefault();
      handleInvSlotClick(index, 'left');
    });
    slot.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      handleInvSlotClick(index, 'right', e);
    });
    inventoryGrid.appendChild(slot);
  });
}

function handleInvSlotClick(index, button, event) {
  const item = inventoryItems[index];
  if (!item) return;

  if (button === 'left') {
    const meta = ITEM_DB[item.id];
    if (meta.usable) {
      useItem(index);
    } else {
      // Show item not usable message
    }
  } else if (button === 'right') {
    showItemContextMenu(index, event); // Show context menu
  }
}

function toggleInventory() {
  const isHidden = inventoryOverlay.style.display === 'none';
  inventoryOverlay.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    initializeInventory();
  }
}

// Event listeners for inventory
invBtn.addEventListener('click', toggleInventory);
closeInvBtn.addEventListener('click', toggleInventory);

// Close inventory when clicking overlay background
inventoryOverlay.addEventListener('click', (e) => {
  if (e.target === inventoryOverlay) {
    toggleInventory();
  }
});


// Find first empty slot in inventory and stack items
function findEmptySlot() {
  return inventoryItems.findIndex(slot => slot === null);
}


function addItemById(id, qty = 1) {
  const meta = ITEM_DB[id];
  if (!meta) return false;

  // If it's a quest item and inventory is full, use quest pocket
  if (meta.type === "Quest") {
    // Try to add to inventory first
    const empty = findEmptySlot();
    if (empty !== -1) {
      for (let i = 0; i < inventoryItems.length && qty > 0; i++) {
        const slot = inventoryItems[i];
        if (slot && slot.id === id && slot.qty < meta.maxStack) {
          const space = meta.maxStack - slot.qty;
          const add = Math.min(space, qty);
          slot.qty += add;
          qty -= add;
        }
      }

      while (qty > 0) {
        const empty = findEmptySlot();
        if (empty === -1) {
          console.log("Inventory full!");
          showNotif(999); // Show inventory full notification
          return false;
        }
        const take = meta.stackable ? Math.min(meta.maxStack, qty) : 1;
        inventoryItems[empty] = { id, qty: take };
        qty -= take;
      }

      initializeInventory();
      return true;
    } else {
      // Inventory full, add to quest pocket instead
      questPocket.push({ id, qty });
      showNotif(id, qty, "Stored in Quest Pocket!");
      updateQuestPocketDisplay();
      return true;
    }
  }

  if (meta.stackable) {
    for (let i = 0; i < inventoryItems.length && qty > 0; i++) {
      const slot = inventoryItems[i];
      if (slot && slot.id === id && slot.qty < meta.maxStack) {
        const space = meta.maxStack - slot.qty;
        const add = Math.min(space, qty);
        slot.qty += add;
        qty -= add;
      }
    }
  }

  while (qty > 0) {
    const empty = findEmptySlot();
    if (empty === -1) {
      console.log("Inventory full!");
      showNotif(999); // Show inventory full notification
      return false;
    }
    const take = meta.stackable ? Math.min(meta.maxStack, qty) : 1;
    inventoryItems[empty] = { id, qty: take };
    qty -= take;
  }

  initializeInventory();
  return true;
}

// Update quest pocket display
function updateQuestPocketDisplay() {
  const row = document.getElementById('questPocketRow');
  const grid = document.getElementById('questPocketGrid');
  if (!row || !grid) return;
  if (questPocket.length === 0) {
    row.style.display = 'none';
    grid.innerHTML = '';
    return;
  }
  row.style.display = 'block';
  grid.innerHTML = '';
  questPocket.forEach(item => {
    const meta = ITEM_DB[item.id];
    const slot = document.createElement('div');
    slot.className = 'inv-slot';
    slot.innerHTML = `
      <span class="item-emoji">${meta?.emoji ?? '❓'}</span>
      ${item.qty > 1 ? `<span class="stack-count">${item.qty}</span>` : ''}
    `;
    slot.title = `${meta.name}\n${meta.description}`;
    grid.appendChild(slot);
  });
}


// shop inventory (items available for purchase)
let shopInventory = [
  {id: 1, price: 5},
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null
];

// shop data storage
const shopBtn = document.getElementById('shopBtn');
const shopOverlay = document.getElementById('shopOverlay');
const closeShopBtn = document.getElementById('closeShopBtn');
const shopGrid = document.getElementById('shopGrid');
let shopContextMenuSlot = null;

// Toggle shop overlay
function toggleShop() {
  const isHidden = shopOverlay.style.display === 'none';
  shopOverlay.style.display = isHidden ? 'flex' : 'none';
  if (isHidden) {
    initializeShop();
  }
}

// Event listeners for shop
shopBtn.addEventListener('click', toggleShop);
closeShopBtn.addEventListener('click', toggleShop);

// Initialize shop grid
function initializeShop() {
  if (!shopGrid) return;
  shopGrid.innerHTML = '';
  shopInventory.forEach((item, index) => {
    const slot = document.createElement('div');
    slot.className = 'shop-slot';
    if (item) {
      const meta = ITEM_DB[item.id];
      slot.innerHTML = `
        <span class="item-emoji">${meta?.emoji ?? '❓'}</span>
        <span class="price-badge">${item.price}💰</span>
      `;
      slot.title = `${meta.name}\n${meta.description}\nPrice: ${item.price} coins`;
    }
    slot.addEventListener('click', (e) => {
      e.preventDefault();
      handleShopSlotClick(index, 'left');
    });
    slot.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      handleShopSlotClick(index, 'right', e);
    });
    shopGrid.appendChild(slot);
  });
}

function handleShopSlotClick(index, button, event) {
  const item = shopInventory[index];
  if (!item) return; 
  if (button === 'left') {
    if (coins >= item.price) {
      const added = addItemById(item.id, 1);
      if (added) {
        coins -= item.price;
        updateCoinsDisplay();
        showNotif(item.id, +1);
        showNotif(997, -item.price); // Show coins spent notification
      } else {
        showNotif(999); // Inventory full notification
      }
    } else {
      showNotif(998); // Not enough coins notification
    } 
  } else if (button === 'right') {
      showShopContextMenu(index, event); // Show context menu
  }
}
// event listener to close shop context menu
document.addEventListener('click', (e) => {
  if (!shopContextMenu.contains(e.target)) {
    shopContextMenu.style.display = 'none';
    shopContextMenuSlot = null;
  }
});

//close shop on clicking outside
shopOverlay.addEventListener('click', (e) => {
  if (e.target === shopOverlay) {
    toggleShop();
  }
});

function showShopContextMenu(slotIndex, event) {
  shopContextMenuSlot = slotIndex;
  const item = shopInventory[slotIndex];
  const meta = item ? ITEM_DB[item.id] : null;

  document.getElementById('shopCtxItemTitle').textContent = meta.name;
  document.getElementById('shopCtxItemDesc').textContent = meta.description;
  document.getElementById('shopCtxItemPrice').textContent = `Price: ${item.price} coins`;

  const shopContextMenu = document.getElementById('shopContextMenu');
  shopContextMenu.style.display = 'block';
  shopContextMenu.style.left = event.pageX + 'px';
  shopContextMenu.style.top = event.pageY + 'px';
}

// Shop context menu Buy button
document.getElementById('shopBuyBtn').onclick = () => {
  if (shopContextMenuSlot !== null) {
    // Simulate left-click on the shop slot
    handleShopSlotClick(shopContextMenuSlot, 'left');
  }
  // Hide the shop context menu
  document.getElementById('shopContextMenu').style.display = 'none';
  shopContextMenuSlot = null;
};

// Item rarity definitions
const rarity = [
  {id: "Common", weight: 50},
  {id: "Uncommon", weight: 30},
  {id: "Rare", weight: 15},
  {id: "Epic", weight: 5},
  {id: "Legendary", weight: 1},
  {id: "Mythic", weight: 0.25},
  {id: "Notif", weight: 0}
];

// picks an entry (object) from entries array using .weight and returns that entry
function pickWeighted(entries) {
  const total = entries.reduce((s, e) => s + e.weight, 0);
  let roll = Math.random() * total;
  for (const e of entries) {
    roll -= e.weight;
    if (roll <= 0) return e; // returns chosen entry object
  }
  return entries[entries.length - 1];
}

// Given a pool array of item ids, returns a chosen item id by rarity weights
function rollLoot(poolIds) {
  const entries = poolIds.map(id => {
    let weight = rarityWeights[ITEM_DB[id]?.rarity] ?? 1;
    // If lucky, boost weight (e.g., double it)
    if (luckyRollsRemaining > 0) {
      weight *= 2; // or any multiplier you want
    }
    return { id, weight };
  });
  const pick = pickWeighted(entries);
  // After rolling, decrement luck if active
  if (luckyRollsRemaining > 0) luckyRollsRemaining--;
  return pick?.id;
}

const EXCLUDED_LOOT_TYPES = ["Quest", "Notif"]; // Excluded types from loot pools

// Build loot pools by item type
const LOOT_POOLS = {};
for (const item of Object.values(ITEM_DB)) {
  if (item.type && !EXCLUDED_LOOT_TYPES.includes(item.type)) {
    if (!LOOT_POOLS[item.type]) LOOT_POOLS[item.type] = [];
    LOOT_POOLS[item.type].push(item.id);
  }
}

// Helper to get rarity weight by name
const rarityWeights = Object.fromEntries(rarity.map(r => [r.id, r.weight]));

// Roll from a named loot pool and add to inventory
function giveLoot(poolName) {
  const pool = LOOT_POOLS[poolName];
  if (!pool) return false;
  const itemId = rollLoot(pool);
  if (itemId) {
    const added = addItemById(itemId, 1);
    if (added) {
      showNotif(itemId, +1);
    }
    // If not added, addItemById already shows the "Inventory Full" notification
    return itemId;
  }
  return false;
}

function showItemContextMenu(slotIndex, event) {
  contextMenuSlot = slotIndex;
  const item = inventoryItems[slotIndex];
  const meta = item ? ITEM_DB[item.id] : null;

  // Get context menu buttons
  const useBtn = document.getElementById('ctxUseBtn');
  const combineBtn = document.getElementById('ctxCombineBtn');

  // Usable button
  if (meta && meta.usable) {
    useBtn.classList.remove('ctx-btn-disabled');
    useBtn.disabled = false;
  } else {
    useBtn.classList.add('ctx-btn-disabled');
    useBtn.disabled = true;
  }

  // Combinable button
  if (meta && meta.combinable) {
    combineBtn.classList.remove('ctx-btn-disabled');
    combineBtn.disabled = false;
  } else {
    combineBtn.classList.add('ctx-btn-disabled');
    combineBtn.disabled = true;
  }

  document.getElementById('ctxItemTitle').textContent = meta.name;
  document.getElementById('ctxItemDesc').textContent = meta.description;

  // Add price to Sell button
const sellBtnPrice = document.getElementById('ctxSellBtnPrice');
if (sellBtnPrice) {
  sellBtnPrice.innerHTML = meta.price
    ? ` <span class="coin-emoji">💰</span> ${meta.price}`
    : '';
}

  contextMenu.style.display = 'block';
  contextMenu.style.left = event.pageX + 'px';
  contextMenu.style.top = event.pageY + 'px';
}

document.addEventListener('click', (e) => {
  if (!contextMenu.contains(e.target)) {
    contextMenu.style.display = 'none';
    contextMenuSlot = null;
  }
});

document.getElementById('ctxUseBtn').onclick = () => {
  if (contextMenuSlot !== null) useItem(contextMenuSlot);
  contextMenu.style.display = 'none';
};
document.getElementById('ctxCombineBtn').onclick = () => {
  if (contextMenuSlot !== null) combineItem(contextMenuSlot);
  contextMenu.style.display = 'none';
};
document.getElementById('ctxSellBtn').onclick = () => {
  if (contextMenuSlot !== null) sellItem(contextMenuSlot);
  contextMenu.style.display = 'none';
};


// ---------------------------- Item action functions ----------------------------
// Use item function
function useItem(index) {
  const item = inventoryItems[index];
  if (!item) return;
  const meta = ITEM_DB[item.id];
  if (!meta || !meta.usable) return;
    if (item.id === 603) { // Special case for Present
    const possibleGifts = [500, 501, 502, 503, 504, 600, 601, 602, 604];
    const giftId = possibleGifts[Math.floor(Math.random() * possibleGifts.length)];
    const added = addItemById(giftId, 1);
    }
  if (item.id === 601) { // Special case for Purse
    const cashAmount = Math.floor(Math.random() * 10) + 1;
    addItemById(604, cashAmount); // Add Cash item
    showNotif(604, cashAmount, "Found in Purse!");
  }
  if (item.id === 604) { // Special case for Cash
    const price = 5; // Each Cash item gives 5 coins
    coins += item.qty * price;
    showNotif(997, +(item.qty * price)); // Show coins gained notification
    inventoryItems[index] = null;
    updateCoinsDisplay();
    initializeInventory();
    return;
  }  if (item.id === 402) { // Special case for Catnip
    love += 20;
    showNotif(402,`${catsName} is veeeery happy!`);
    updateGameState();
  }  if (item.id === 102) { // Special case for Quacker
    const audio = new Audio('sounds/quack.mp3');
    audio.play();
  }  if (item.id === 506) { // Special case for Golden bell
    addItemById(102, 1); // Add Quacker item
    showNotif(102, 1, "A Quacker appeared!");
    const audio = new Audio('sounds/quack.mp3');
    audio.play();
  }  if (item.id === 400) { // Special case for Energy drink
    energy += 25;
    updateGameState();
    showNotif(400, "Energy boosted!");
  }  if (item.id === 501) { // Special case for Four leaf clover
    luckyRollsRemaining += 3;
    showNotif(501, "Fortune smiles upon you! +3 Lucky Rolls");
  }  if (item.id === 1) { // Special case for baguette
    fullness += 2;
    showNotif(1, `${catsName} wasn't too pleased with bread. +2 fullness`);
    updateGameState();
  }  if (item.id === 2) { // Special case for fish
    fullness += 5;
    showNotif(2, `${catsName} enjoyed the fish! +5 fullness`);
    updateGameState();
  }  if (item.id === 3) { // Special case for mouse
    fullness += 8;
    joy += 5;
    energy -= 5;
    showNotif(3, `${catsName} loved the mouse! +8 fullness`);
    updateGameState();
  }  if (item.id === 4) { // Special case for cherries
    fullness += 1;
    joy += 10;
    showNotif(4, `${catsName} is delighted by the cherries! +1 fullness, +10 joy`);
    updateGameState();
  } if (item.id === 5) { // Special case for potato
    fullness += 1;
    showNotif(5, `${catsName} nibbled the potato, not too thrilled. +1 fullness`);
    updateGameState();
  } if (item.id === 6) { // Special case for shrimp
    fullness += 4;
    joy += 3;
    love += 2;
    showNotif(6, `${catsName} savored the shrimp! +4 fullness`);
    updateGameState();
  } if (item.id === 7) { // Special case for sushi
    fullness += 10;
    joy += 5;
    love += 5;
    showNotif(7, `${catsName} is ecstatic with the sushi! +10 fullness`);
    updateGameState();
  } if (item.id === 8) { // Special case for watermelon slice
    fullness += 3;
    joy += 7;
    showNotif(8, `${catsName} enjoyed the watermelon slice! +3 fullness`);
    updateGameState();
  } if (item.id === 100) { // Special case for Ball
    joy += 5;
    showNotif(100, `${catsName} is having a blast with the ball! +5 joy`);
    updateGameState();
  } if (item.id === 101) { // Special case for Ball of yarn
    joy += 8;
    showNotif(101, `${catsName} is entertained by the ball of yarn! +8 joy`);
    updateGameState();
  } if (item.id === 103) { // Special case for Skateboard
    joy += 10;
    showNotif(103, `${catsName} does a kickflip! +10 joy`);
    updateGameState();
  }

  item.qty -= 1;
  if (item.qty <= 0) inventoryItems[index] = null;
  initializeInventory();
  showNotif(item.id, -1);
}

// Combine item function
function combineItem(index) {
  const item = inventoryItems[index];
  if (!item) return;

  // List of hardcoded combinations: each entry is { check, combine }
  const combinations = [
    {
      // Example: two 3-leaf clovers -> one 4-leaf clover
      check: () => item.id === 500 && countItemsById(500) >= 2,
      combine: () => {
        removeItemsById(500, 2);
        addItemById(501, 1);
        showNotif(501, 1, "Combined!");
      }
    },
    {
      check: () => item.id === 504 && countItemsById(504) >= 2,
      combine: () => {
        removeItemsById(504, 2);
        addItemById(503, 1);
        showNotif(503, 1, "Combined!");
      }
    },
    {
      check: () => item.id === 503 && countItemsById(503) >= 2,
      combine: () => {
        removeItemsById(503, 2);
        addItemById(502, 1);
        showNotif(502, 1, "Combined!");
      }
    },
    {
      check: () => item.id === 102 && countItemsById(102) >= 10,
      combine: () => {
        removeItemsById(102, 10);
        addItemById(506, 1);
        showNotif(506, 1, "Combined!");
      }
    },
    {
      check: () => item.id === 201 && countItemsById(201) >= 1 && countItemsById(204) >=1,
      combine: () => {
        removeItemsById(201, 1);
        removeItemsById(204, 1);
        addItemById(205, 1);
        showNotif(205, 1, "Combined!");
      }
    }

  ];

  // Helper: count total of an item in inventory
  function countItemsById(id) {
    return inventoryItems.filter(i => i && i.id === id).reduce((sum, i) => sum + i.qty, 0);
  }

  // Try all combinations
  for (const combo of combinations) {
    if (combo.check()) {
      combo.combine();
      return;
    }
  }

  // If no valid combination
  showNotif(996, '', "Missing requirements to combine!");
}

// Helper: Remove up to qty of a given item from inventory (across all slots)
function removeItemsById(id, qty) {
  let toRemove = qty;
  for (let i = 0; i < inventoryItems.length && toRemove > 0; i++) {
    const slot = inventoryItems[i];
    if (slot && slot.id === id) {
      if (slot.qty > toRemove) {
        slot.qty -= toRemove;
        toRemove = 0;
      } else {
        toRemove -= slot.qty;
        inventoryItems[i] = null;
      }
    }
  }
  initializeInventory();
}

// Sell item function
function sellItem(index) {
  const item = inventoryItems[index];
  if (!item) return;
  const meta = ITEM_DB[item.id];
  if (!meta || !meta.price) return;
  const totalValue = meta.price * item.qty;
  coins += totalValue;
  showNotif(997, +totalValue); // Show coins gained notification
  inventoryItems[index] = null;
  initializeInventory();
  showNotif(item.id, -item.qty);
  updateCoinsDisplay();
}
function updateCoinsDisplay() {
  const coinsValueEl = document.getElementById('coinsValue');
  if (coinsValueEl) {
    coinsValueEl.textContent = coins;
  }
}

