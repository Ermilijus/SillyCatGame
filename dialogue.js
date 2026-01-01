/* ============================
dialogue.js
Story & text control
============================ */


const dialogueText = document.getElementById('dialogue-text');
function showDialogue(text) {
  dialogueText.innerHTML = formatDialogue(text);
}

let isTyping = false;
function typeText(element, text, options = {}) {
    let speed = options.speed || 35; // speed per character (lower is faster)


    return new Promise((resolve) => {
        let index = 0;
        let skipped = false;

		if (isTyping) return Promise.resolve(); // Prevent overlapping typing and resolve immediately
		isTyping = true;
        element.textContent = "";
		disableAllButtons();

        function skip() {
            skipped = true;
            element.innerHTML = formatDialogue(text);
            document.removeEventListener("click", skip);
            enableAllButtons();
            isTyping = false;
            resolve();
        }
	setTimeout(() => {
    	document.addEventListener("click", skip);
	}, 0);

        function typeFrame() {
            if (skipped) return;
			element.innerHTML = formatDialogue(text.slice(0, index));
			if (index < text.length) {
			index++;

			setTimeout(typeFrame, speed);
        	}	else {
			document.removeEventListener("click", skip);
			enableAllButtons();
			isTyping = false;
			resolve();
			}
		}

        typeFrame();
    });
}

function formatDialogue(text) {
  // Replace ~text~ with <span class="highlight">text</span>
  text = text.replace(/~(.*?)~/g, '<span class="highlight">$1</span>');
  // Replace ¬text¬ with <span class="important">text</span>
  text = text.replace(/¬(.*?)¬/g, '<span class="important">$1</span>');
  // Add more shortcuts as needed
  return text;
}

// Or in your typeText function, use formatDialogue before rendering each chunk

 document.getElementById('feed-btn').addEventListener('click', async () => {
	await typeText(dialogueText, `${catsName} ¬happily¬ munches on some basic cat food.`);
});

document.getElementById('play-btn').addEventListener('click', async () => {
  if (energy <= 25 || fullness <= 25) {
    await typeText(dialogueText, `${catsName} looks too ¬tired¬ or ¬hungry¬ to ¬play¬ right now...`);
    return; // Prevent playing if energy or fullness is too low
  } else {
	await showStoryOverlay(getStoryId("Hub"));
  }
});

document.getElementById('rest-btn').addEventListener('click', async () => {
	await typeText(dialogueText, `${catsName} curls up and takes a nap. Zzz...`);
});

let RaccoonFed = false;
let Raccoon3Complete = false;
let RaccoonDisapointed = false;
let RaccoonComplete = false;
let CatMeet = false;
let StrayFed = false;
let Stray3 = false;
let TreasureFound = false;

function hasItem(id, qty = 1) {
  return Array.isArray(inventoryItems) && inventoryItems.some(item => item && item.id === id && item.qty >= qty);
}

/* ------------------------- Story/Event Overlay ------------------------- */
// Define story beats, type: main, continuation, event, filler.
const storyBeats = [
  {
  id: "Hub",
  type: "event",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/house.png",
  dialogue: "What would you like to do today?",
  question: "Choose your next adventure:",
  get options() {
    return getRandomHubOptions();
  }
  },  // Hub

  { // -------------------------- vvvv Beach filler vvvv ------------------------
    id: "Beach1",
    type: "filler",
    location: "Beach",
    backdrop: "images/Backdrops/beach.png",
    miniImg: "images/palmtree.png",
    dialogue: "You arrive at the beach. The waves are gentle and the sun is warm.",
    question: "What would you like to do?",
    options: [
      { 
        title: "Take a stroll", 
        description: "Walk along the shoreline and enjoy the scenery.",
        action: () => { showStoryOverlay(getStoryId("Beach2")); }
      },
      { 
        title: "Go back home", 
        description: "Return to your cozy house.",
        action: () => { hideStoryOverlay(); }
      }
    ]
  },
  {
    id: "Beach2",
    type: "continuation",
    backdrop: "images/Backdrops/beach2.png",
    miniImg: "images/seashell.png",
    dialogue: "You walk along the shore, feeling the sand between your toes and the breeze on your face.",
    question: "Do you want to collect seashells?",
    options: [ 
    {
        title: "Yes", 
        description: "Look for beautiful seashells along the beach.",
        action: () => { 
          addItemById(307, 1); // Seashell item
          showNotif(307, 1);
          hideStoryOverlay();
          updateGameState();
         }
      },
      { 
        title: "No", 
        description: "Just enjoy the walk and go back home.",
        action: () => { hideStoryOverlay(); }
      }
    ]
  }, 
  {
    id: "BeachFiller",
    type: "filler",
    location: "Beach",
    backdrop: "images/Backdrops/beach3.png",
    miniImg: "images/surfboard.png",
    dialogue: [
    "You spend some relaxing time at the beach, soaking up the sun and listening to the waves.",
    `In the shade of some trees, you sit with ${catsName} and watch the surfers in the distance.`
    ],
    question: "After a while, you decide to head back home.",
    options: [
      { 
        title: "Go home",
        description: "Return to your cozy house.",
        action: () => { 
          hideStoryOverlay();
          giveLoot("Misc", 2);
          let random = Math.floor(Math.random() * 6);
          joy += random;
          random = Math.floor(Math.random() * 11);
          energy += random;
          random = Math.floor(Math.random() * 16);
          fullness -= random;
          random = Math.floor(Math.random() * 11);
          love += random;
       }
      }
    ]
  },
  // -------------------------- ^^^^ Beach filler ^^^^ ------------------------

  {  // ------------------------- vvvv Raccoon Storyline vvvv ------------------------
    id: "RaccoonStart",
    type: "story",
    location: "Forest",
    requirement: () => !RaccoonFed && !RaccoonDisapointed,
    backdrop: "images/Backdrops/forest.png",
    miniImg: "images/raccoon.png",
    dialogue: [
      "As you explore the forest, a curious raccoon appears on the path ahead.",
      "It looks at you with bright eyes, seemingly unafraid."
    ],
    question: "How do you want to interact with the raccoon?",
    options: [
      { 
        title: "Offer food", 
        description: "offer the Raccoon some watermelon from your inventory.",
        action: () => {
          if (inventoryItems.some(item => item && item.id === 8 && item.qty > 0)) {
            showStoryOverlay(getStoryId("Raccoon2"));
            removeItemsById(8, 1); // Remove one watermelon
            showNotif(8, -1);
            RaccoonFed = true;
          } else {
            showNotif(8, 0, "You don't have any watermelon to offer."); // No watermelon notification"
          }
        }
      },
      { 
        title: "Maybe next time", 
        description: "Go back home and leave the raccoon alone, maybe next time.",
        action: () => { hideStoryOverlay();  }
      }
    ]
  },
  {
    id: "Raccoon2",
    type: "side",
    backdrop: "images/Backdrops/forest.png",
    miniImg: "images/raccoon.png",
    dialogue: [
      `The raccoon gleefully accepts the watermelon and munches on it happily.`,
      `After finishing the food, it looks up at you with worried eyes, after a back and forth with ${catsName},`,
      "Apparently the raccoon has lost its wallet! it looks at you hopefully.",
    ],
    question: "Will you help the raccoon find its wallet?",
    options: [ 
      {
          title: "Help the raccoon",
          description: "Ask the raccoon where it last saw its wallet.",
          action: () => { 
            showStoryOverlay(getStoryId("Raccoon3"));

          }
      }, 
      {
          title: "Dont help the raccoon",
          description: "Appolagise to the raccoon, maybe next time.",
          action: () => { RaccoonDisapointed = true; hideStoryOverlay(); }
      }
   ]
  },
  {
    id: "Raccoon3",
    type: "continuation",
    backdrop: "images/Backdrops/forest.png",
    miniImg: "images/raccoon2.png",
    dialogue: [
      `The raccoon tells ${catsName} where it last saw its wallet,`,
      `With all the cute little gestures and expressions, you kind of understand it's near the big oak tree by the river.`,
      ],
    question: "Keep an eye out for a big oak tree next time you visit the forest?",
    options: [
          {
          title: "Go home",
          description: "make your way home for now.",
          action: () => { 
            Raccoon3Complete = true;
            hideStoryOverlay(); 
          }
        }
      ]
  },

  {
    id: "LookForWallet",
    type: "event",
    location: "Forest",
    requirement: () => RaccoonFed && !RaccoonComplete && Raccoon3Complete,
    backdrop: "images/Backdrops/forestoak.png",
    miniImg: "images/oak.png",
    dialogue: "As you explore the forest, you spot a big oak tree by the river.",
    question: "Do you investigate further?",
    options: [
      {
        title: "Yes",
        description: "You decide to check it out.",
        action: () => {
          showStoryOverlay(getStoryId("Raccoon4"));
        }
      },
      {
        title: "No",
        description: "You decide to leave continue on the walk then head back home.",
        action: () => {
          hideStoryOverlay();
        }
      }
    ]
  },
  {
    id: "Raccoon4",
    type: "continuation",
    backdrop: "images/Backdrops/forestoak.png",
    miniImg: "images/wallet.png",
    dialogue: "You find the raccoon's wallet near the oak tree.",
    question: "You decide to return the wallet right away.",
    options: [
      {
        title: "Visit the raccoon",
        description: "You visit the raccoon on your way back home.",
        action: () => {
          addItemById(206); // wallet
          showNotif(206, 1);
          showStoryOverlay(getStoryId("Raccoon5"));
        }
      }
    ]
  },
  {
    id: "Raccoon5",
    type: "continuation",
    backdrop: "images/Backdrops/forest.png",
    miniImg: "images/raccoon2.png",
    dialogue: [
      "The raccoon is overjoyed to have its wallet back! It thanks you profusely.",
      "The raccoon goes rummaging through its things and pulls out a small gift for you."
    ],
    question: "You feel happy about your good deed and decide to head home.",
    options: [
        {
          title: "Go home",
          description: "Return home with your new gift.",
          action: () => { 
            hideStoryOverlay(); 
            questRewardItem(603, 1, "you received a gift!"); // Raccoon Gift reward
            questRewardItem(200, 1, "you also received a Mysterious Key!"); // Mysterious Key reward
            removeItemsById(206, 1); // remove wallet from inventory
            RaccoonComplete = true;
          }
        }
     ] 
      
  },

  {
    id: "ForestFiller",
    type: "filler",
    location: "Forest",
    backdrop: "images/Backdrops/forest2.png",
    miniImg: "images/flower.png",
    dialogue: [
      "You take a peaceful walk through the forest, enjoying the sights and sounds of nature.",
      `${catsName} sniffs the flowers and chases after butterflies as you stroll along the path.`
    ],
    question: "After some time, you decide what to do next.",
    options: [
      {
        title: "Go directly home",
        description: "Return to your cozy house right away.",
        action: () => { hideStoryOverlay(); }
      },
      {
        title: "Explore a new path",
        description: "Take a different route and see where it leads on the way home.",
        action: () => { showStoryOverlay(getStoryId("ForestFiller2")); }
      }
    ]
  },

  {
    id: "ForestFiller2",
    type: "continuation",
    backdrop: "images/Backdrops/forest3.png",
    miniImg: "images/treasuremap.png",
    dialogue: [
      "You venture down a new path and discover a small clearing with a sparkling stream.",
      `You and ${catsName} take a moment to relax by the water before ${catsName} starts scratching at the ground.`,
      `After some digging, ${catsName} uncovers a small buried box! Inside, you find what looks like a treasure map!.`
    ],
    question: "Excited about the find, you decide to head back home.",
    options: [
      {
        title: "Go home",
        description: "Return home with the treasure map.",
        action: () => {
          const random = Math.floor(Math.random() * 6);
          if (random < 3) {
            addItemById(202, 1); // Treasure Map
          }
          hideStoryOverlay();
          joy += 5;
          energy -= 5;
          fullness -= 7;
        }
      } 
    ]
  },

  {
    id: "TreasureMap",
    type: "event",
    location: "Forest",
    requirement: () => hasItem(202) && !TreasureFound,
    backdrop: "images/Backdrops/forest4.png",
    miniImg: "images/treasurechest.png",
    dialogue: [
      "Using the treasure map you found earlier, you set out to find the treasure.",
      `With ${catsName}'s help, you navigate through the forest to the marked spot.`,
      "After some digging, you uncover a small treasure chest buried beneath the leaves!"
    ],
    question: "do you open the treasure chest?",
    options: [
      {
        title: "Open the chest",
        description: "Open the treasure chest to see what's inside.",
        requirement: () => hasItem(200), // Requires Mysterious Key
        action: () => { 
          showStoryOverlay(getStoryId("TreasureFound"));
          TreasureFound = true;
        }
      },
      {
        title: "Leave it be",
        description: "Decide not to open the chest and leave it buried, for someone else to find.",
        action: () => { hideStoryOverlay(); }
      }
    ]
  },
  {
    id: "TreasureFound",
    type: "continuation",
    backdrop: "images/Backdrops/forest4.png",
    miniImg: "images/treasurechest.png",
    dialogue: [
      "You open the treasure chest to find it filled with glittering coins and precious Valuables!",
      `You and ${catsName} celebrate your successful treasure hunt. What an adventure!`
    ],
    question: "What would you like to do next?",
    options: [
      {
        title: "Go home",
        description: "Return home with your newfound treasure.",
        action: () => { 
          hideStoryOverlay(); 
          coins += 100;
          showNotif(997, 100, "You found 100 coins!");
          giveLoot("Epic", 2);
          giveLoot("Valuable", 1);
          giveLoot("Valuable", 1);
          addItemById(203, 1); // raccoon mask
          giveLoot("Powerup", 1);
          removeItemsById(202, 1); // Remove Treasure Map
          updateGameState();
          joy += 15;
          energy -= 8;
          fullness -= 8;
        }
      }
    ]
  },

  {
    id: "ForestFiller3",
    type: "Event",
    location: "Forest",
    backdrop: "images/Backdrops/forest.png",
    miniImg: "images/cherries.png",
    dialogue: [
      "You wander through the forest and come a clearing, you spot a cherry tree!.",
      `${catsName} seems interested in some bright red cherries dangling from the branches.`,
    ],
    question: "Do you pick some cherries for a snack?",
    options: [
      {
        title: "Pick cherries",
        description: "You pick some cherries from the tree.",
        action: () => {
          const cherriesPicked = Math.floor(Math.random() * 8) + 1;
          addItemById(4, cherriesPicked); // 1 to 8 cherries
          hideStoryOverlay();
          joy += 3;
          energy -= 2;
          fullness -= 4;
        }
      },
      {
        title: "Leave them be",
        description: "Decide not to pick any cherries and continue your walk.",
        action: () => { hideStoryOverlay(); }
      }
    ]
  },

  {
    id: "ForestFiller4",
    type: "filler",
    location: "Forest",
    backdrop: "images/Backdrops/forest2.png",
    miniImg: "images/dice.png",
    dialogue: [
      "You take a peaceful walk through the forest, enjoying the sights and sounds of nature.",
      `${catsName} seems playful and energetic, darting between the trees and chasing after leaves.`
    ],
    question: "After some time, you decide to head home.",
    options: [ 
      {
        title: "Go home",
        description: "Return to your cozy house.",
        action: () => { 
          hideStoryOverlay();
          giveLoot("Common", 2);
          addItemById(301, 1); // Forest Dice item
          let random = Math.floor(Math.random() * 6);
          joy += random;
          random = Math.floor(Math.random() * 11);
          energy -= random;
          random = Math.floor(Math.random() * 16);
          fullness -= random;
          random = Math.floor(Math.random() * 4);
          love += random;
        }
      }
    ]
  },

// ------------------------- ^^^^ Raccoon Storyline ^^^^ ------------------------  

// ------------------------- vvvv Playground/Stray event vvvv ------------------------
  {
    id: "PlaygroundStart",
    type: "event",
    location: "Park",
    backdrop: "images/Backdrops/playground.png",
    miniImg: "images/slide.png",
    dialogue: [
      "You arrive at the park. you see a playground with a slide and swings.",
      `You notice a stray cat sitting alone on a bench, it's looking right at you and ${catsName}.`
    ],
    question: "What would you like to do?",
    options: [
      {
          title: "Approach the cat",
          description: "Go over and see if the cat is friendly.",
          requirement: () => CatMeet,
          action: () => { showStoryOverlay(getStoryId("Stray")); }
      },
      {
          title: `Play with ${catsName}`,
          description: `Go and play with ${catsName} by the picnic table.`,
          action: () => { showStoryOverlay(getStoryId("Playground2")); }
      },
      {
          title: "Take a walk" ,
          description: "Take a nice relaxing stroll around the park and enjoy the scenery.",
          action: () => { hideStoryOverlay(); }
      }
    ],
  },

  {
    id: "Playground2",
    type: "continuation",
    backdrop: "images/Backdrops/picnictable.png",
    miniImg: "images/feather.png",
    dialogue: [
      `You and ${catsName} move over to the picnic table, on the way you spot a long feather with a fluffy top.`,
      `${catsName} seems very interested in it, so you grab it and use it to play with ${catsName}.`,
      `${catsName} pounces and bats at the fluffy feather, clearly enjoying the hunt, after some time in the sun, ${catsName} seems content and happy.`
    ],
    question: "After some time, you decide to head home.",
    options: [
      {
        title: "Go home",
        description: "Return home after a fun day at the park.",
        action: () => { hideStoryOverlay(); addItemById(305, 1); } // Feather Toy item
      }
    ],
  },

  {
    id: "Stray",
    type: "continuation",
    backdrop: "images/Backdrops/playground.png",
    miniImg: "images/stray.png",
    dialogue: [
      `You approach the stray cat cautiously. It seems wary but once it notices ${catsName} it relaxes.`,
      `The stray cat seems to greet ${catsName} and bows slightly.`,
      "you notice this stray looks similar to one you saw earlier in the alleyway."
    ],
    question: "Do you want to share some food with the stray cat?",
    options: [
      {
          title: "Share fish",
          description: "Offer some fish from your inventory to the stray cat.",
          action: () => {
            if (inventoryItems.some(item => item && item.id === 2 && item.qty > 0)) {    
              removeItemsById(2, 1);
              showNotif(2, -1);
              if (CatMeet) {
                showStoryOverlay(getStoryId("Stray3"));
                StrayFed = true;
              } else {
                showStoryOverlay(getStoryId("Stray2"));
                StrayFed = true;
              }
            } else {
              showNotif(2, 0, "You don't have any fish"); // No fish notification
            }
        }
      },
      {
          title: "Maybe next time",
          description: "pet the cat and leave.",
          action: () => { hideStoryOverlay(); }
      }
    ],
  },
  {
    id: "Stray2",
    type: "continuation",
    backdrop: "images/Backdrops/playground.png",
    miniImg: "images/stray.png",
    dialogue: [
      " the stray cat eagerly eats the fish you offered. It seems very grateful.",
      "After finishing the fish, the stray cat rubs against your leg and purrs loudly."
    ],
    question: "feeling happy about that and decide to head home.",
    options: [
        {
          title: "Go home",
          description: "Return home after a rewarding encounter.",
          action: () => { hideStoryOverlay();  }
        }
    ]
  },
  {
    id: "Stray3",
    type: "continuation",
    backdrop: "images/Backdrops/playground.png",
    miniImg: "images/stray.png",
    dialogue: [
      "The stray cat eagerly eats the fish you offered. It seems very grateful.",
      `After finishing the fish, the stray looks at ${catsName} and they seem to have a conversation.`,
      "after some time the stray cat seems to nod with a final Meow and walks off into the park."
    ],
    question: "You wonder to yourself what that was all about.",
    options: [
        {
          title: "Go home",
          description: "Return home after a rewarding encounter.",
          action: () => { hideStoryOverlay(), Stray3 = true; }
        }
    ]
  },

  {
    id: "ParkSpecialEvent",
    type: "event",
    location: "Park",
    backdrop: "images/Backdrops/playground.png",
    miniImg: "images/stray.png",
    requirement: () => Stray3,
    dialogue: [
      "As you explore the park, you notice a familiar stray cat sitting by the playground.",
      `It seems to be waiting for you and ${catsName}, as you approach`,
      `The Stray goes behind the bench and comes back with a small box, it drops it at your feet then wanders off.`
    ],
    question: "Do you take the gift?",
    options: [
      {
          title: "Take the gift",
          description: "You graciously accept the gift.",
          action: () => { 
            questRewardItem(603, 1, "You received a gift from the stray cat!");
            hideStoryOverlay();
          }
      },
      {
          title: "Leave it be",
          description: "You decide not to take the gift and leave it there.",
          action: () => { hideStoryOverlay(); }
      }
    ]
  },
// ------------------------- ^^^^ Playground/Stray Storyline ^^^^ ------------------------

// -------------------------- vvvv shopping event vvvv ------------------------
{
  id: "ShoppingEvent",
  type: "event",
  requirement: () => !CatMeet,
  location: "Shop",
  backdrop: "images/Backdrops/bazaar.png",
  miniImg: "images/shoppingbag.png",
  dialogue: [
    "Arriving, you browse through the various shops, admiring the colorful displays and delicious aromas.",
    `After some browsing you notice ${catsName} is watching two cats walk around the corner into an alleyway.`
  ],
  question: "After some browsing what do you want to do?",
  options: [
    {
      title: "Go back home",
      description: "Finish shopping and return to your cozy house.",
      action: () => { 
        giveLoot("Food", Math.floor(Math.random() * 3) + 1); // 1-3 random food items
        showNotif(null, null, `You got some food while browsing!`);
        updateGameState();
        hideStoryOverlay();
      }
    },
    {
      title: "Follow the cats",
      description: "Curious about where the cats went, you decide to follow them into the alleyway.",
      requirement: () => !CatMeet,
      action: () => { showStoryOverlay(getStoryId("CatMeet"));  }
    }
  ]
},
{
    id: "CatMeet",
    type: "continuation",
    backdrop: "images/Backdrops/alley.png",
    miniImg: "images/stray.png",
    dialogue: [
      `You decide to follow the cats into the alleyway. As you turn the corner, you see 4 cats sitting together.`,
      `They seem to be having a Meeting with a destinct air of importance. One of the cats looks up and meets your gaze.`,
      `For just a moment, everything stills — then, as if practiced, the cats scatter in different directions, leaving the alley empty`
    ],
    question: "You wonder what that was all about.",
    options: [
        {
          title: "Go back to shopping",
          description: "Return back to the main street.",
          action: () => { 
            giveLoot("Food", Math.floor(Math.random() * 3) + 1); // 1-3 random food items
            showNotif(null, null, `You got some food while browsing!`);
            updateGameState();
            hideStoryOverlay();
            CatMeet = true;
          }
        },
        {
          title: "Go home",
          description: "Return home after a curious encounter.",
          action: () => { 
            hideStoryOverlay();
            CatMeet = true;
          }
        }
    ]
},


{
  id: "ShoppingFiller",
  type: "filler",
  location: "Shop",
  backdrop: "images/Backdrops/Bazaar.png",
  miniImg: "images/shoppingbag.png",
  dialogue: [
    `You do some grocery shopping, picking up some essentials and treats for yourself and ${catsName}.`,
  ],
  question: "You make your purchases and head back home.",
  options: [
    {
      title: "Go home",
      description: "Finish shopping and return to your cozy house.",
      action: () => { 
        hideStoryOverlay(); 
        giveLoot("Food", Math.floor(Math.random() * 3) + 1); // 1-3 random food items
        giveLoot("Toys", Math.floor(Math.random() * 2) + 1); // 1-2 random toy items
        showNotif(null, null, `You got some food and toys while shopping!`);
        updateGameState();
      }
    },
    {
      title: "Long way home",
      description: "Take a longer route home, enjoying the sights along the way.",
      action: () => {
        hideStoryOverlay();
        giveLoot("Food", Math.floor(Math.random() * 3) + 1); // 1-3 random food items
        giveLoot("Toys", Math.floor(Math.random() * 2) + 1); // 1-2 random toy items
        showNotif(null, null, `You got some food and toys while shopping!`);
        giveLootChance("Valuable", 85); // 15% chance to get a trophy
        updateGameState();
        }
    }
  ]
},

{
  id: "Shopping",
  type: "event",
  location: "Shop",
  backdrop: "images/Backdrops/bazaar2.png",
  miniImg: "images/shopping.png",
  dialogue: [
    "while doing your shopping, you encounter a great deal on some cat toys.",
  ],
  question: "Do you want to buy some toys for your cat?",
  options: [
    { 
      title: "Yes -10 coins",
      description: "Buy some toys to keep your cat entertained.",
      action: () => { 
        if (coins >= 10) {
          coins -= 10;
          giveLoot("Toys", 3); // Give 3 toys
        } else {
          showNotif(998, null, null); // Not enough coins notification
        }
        updateGameState();
        hideStoryOverlay();
      }
    },
    { 
      title: "No",
      description: "Decide to save your coins for now.",
      action: () => { 
        hideStoryOverlay();
        giveLootChance("Food", 50); // 50% chance to get a Food item
        giveLootChance("Toys", 30); // 70% chance to get a Toy item
        updateGameState();
      }
    }
  ]
},

{
  id: "ShoppingSpecialOffer",
  type: "event",
  location: "Shop",
  backdrop: "images/Backdrops/bazaar.png",
  miniImg: "images/fourleafclover.png",
  dialogue: [
    "While browsing the shops, you come across a special offer",
    "several items are bundled together at a discounted price."
  ],
  question: "Do you want to take advantage of the special offer?",
  options: [
    { 
      title: "Food Bundle",
      description: "Special bundle of food items for only 20 coins!.",
      action: () => { 
        if (coins >= 20) {
          coins -= 20;
          giveLoot("Food", Math.floor(Math.random() * 3) + 1); // Give 1-3 food items
          giveLoot("Food", Math.floor(Math.random() * 3) + 1); // Give 1-3 food items
          giveLoot("Food", Math.floor(Math.random() * 3) + 1); // Give 1-3 food items
          updateGameState();
          hideStoryOverlay();
        } else {
          showNotif(998, null, null); // Not enough coins notification
        }
      }
    },
    { 
      title: "Toy Bundle",
      description: "Special bundle of cat toys for only 25 coins!.",
      action: () => { 
        if (coins >= 25) {
          coins -= 25;
          giveLoot("Toys", Math.floor(Math.random() * 2) + 1); // Give 1-2 toy items
          giveLoot("Toys", Math.floor(Math.random() * 2) + 1); // Give 1-2 toy items
          giveLoot("Toys", Math.floor(Math.random() * 2) + 1); // Give 1-2 toy items
          updateGameState();
          hideStoryOverlay();
        } else {
          showNotif(998, null, null); // Not enough coins notification
        }
      }
    },
    {
      title: "Powerup Bundle",
      description: "Special bundle of powerup items for only 30 coins!.",
      action: () => { 
        if (coins >= 30) {
          coins -= 30;
          giveLoot("Powerup", Math.floor(Math.random() * 2) + 1); // Give 1-2 powerup items
          giveLoot("Powerup", Math.floor(Math.random() * 2) + 1);
          updateGameState();
          hideStoryOverlay();
        } else {
          showNotif(998, null, null); // Not enough coins notification
        }
      }
    },
    {
      title: "Super Duper MEGA Bundle",
      description: "Get a mix of food, toys, and powerups for only 60 coins!.",
      action: () => {
        if (coins >= 60) {
          coins -= 60;
          giveLoot("Food", Math.floor(Math.random() * 3) + 1); // Give 1-3 food items
          giveLoot("Food", Math.floor(Math.random() * 3) + 1);
          giveLoot("Toys", Math.floor(Math.random() * 2) + 1); // Give 1-2 toy items
          giveLoot("Toys", Math.floor(Math.random() * 2) + 1);
          giveLoot("Powerup", Math.floor(Math.random() * 2) + 1);
          giveLoot("Powerup", Math.floor(Math.random() * 2) + 1);
        }
        else {
          showNotif(998, null, null); // Not enough coins notification
        }
      }
    },
    {
      title: "No thanks",
      description: "Decide not to take advantage of the special offer.",
      action: () => { 
        hideStoryOverlay();
      }
    }
  ]
},
// -------------------------- ^^^^ shopping filler ^^^^ ------------------------


// -------------------------- vvvv Freelance filler vvvv ------------------------
{
  id: "FreelanceWorkFiller",
  type: "filler",
  location: "Freelance", 
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/laptop.png",
  dialogue: [
    "You set up your laptop and start working on some freelance projects.",
  ],
  question: "After a productive session, what do you want to do next?",
  options: [
    {
      title: "Finish for the day",
      description: "Shut down your laptop and relax for the rest of the day.",
      action: () => { 
        const earnings = Math.floor(Math.random() * 31) + 20; // Earn between $20 and $50
        coins += earnings;
        showNotif(604, earnings, `You earned some pay from your freelance work!`);
        updateGameState();
        hideStoryOverlay();
      }
    }
  ]
},

{
  id: "FreelanceBreak",
  type: "filler",
  location: "Freelance",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/coffee.png",
  dialogue: [
    "You work away for some time, making good progress on your tasks.",
    "You decide to take a break from your freelance work to enjoy a cup of coffee.",
    `As you sip your coffee, ${catsName} hops onto the desk clearly seeking attention.`,
  ],
  question: "Spend your break how?",
  options: [
    {
      title: "Continue working",
      description: "Finish your coffee quickly and get back to work.",
      action: () => { 
        hideStoryOverlay();
        joy -= 5;
        const earnings = Math.floor(Math.random() * 31) + 20; // Earn between $20 and $50
        coins += earnings;
        showNotif(604, earnings, `You earned some pay from your freelance work!`);
        updateGameState();
        hideStoryOverlay();
       }
    },
    {
      title: `Play with ${catsName}`,
      description: `Take some time to play with ${catsName} during your break.`,
      action: () => { 
        hideStoryOverlay(); 
        joy += 10;
        love += 3;
        const earnings = Math.floor(Math.random() * 31) + 20; // Earn between $20 and $50
        coins += earnings;
        showNotif(604, earnings, `You earned some pay from your freelance work!`);
        updateGameState();
        hideStoryOverlay();
      }
    }
  ]
},

{
  id: "FreelanceSmallJob",
  type: "filler",
  location: "Freelance",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/document.png",
  dialogue: [
    "You receive a small freelance job that needs to be completed quickly.",
  ],
  question: "Get to to it or refuse?",
  options: [
    {
      title: "Accept the job",
      description: "Complete the small job for some quick pay.",
      action: () => {
        const earnings = Math.floor(Math.random() * 16) + 10; // Earn between $10 and $25
        coins += earnings;
        showNotif(604, earnings, `You earned some pay from your freelance work!`);
        updateGameState();
        hideStoryOverlay();
      }
    },
    {
      title: "Refuse the job",
      description: "Turn down the small job and take a break instead.",
      action: () => {
        hideStoryOverlay();
      }
    }
  ]
},

{
  id: "FreelanceItemFind",
  type: "event",
  location: "Freelance",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/Cat-Playful.jpg",
  dialogue: [
    "While working on your freelance tasks, you realise time flew by.",
    `realising its been way too peaceful all day, wondering what ${catsName} has been up to`,
    `As you wonder ${catsName} waddled in and left you something in the center of the room.`,
  ],
  question: `You pick up the item ${catsName} brought back.`,
  options: [
    {
      title: "Inspect the item",
      description: `You take a closer look at what ${catsName} has brought back.`,
      action: () => {
        const earnings = Math.floor(Math.random() * 16) + 10; // Earn between $10 and $25
        coins += earnings;
        showNotif(604, earnings, `You earned some pay from your freelance work!`);
        giveLoot("Misc", 2); // Give 2 Misc items
        giveLoot("Food", 1); // Give 1 Food item
        giveLootChance("Toys", 70); // 30% chance to get a Toy item
        giveLootChance("Valuable", 90); // 10% chance to get a Valuable item
        updateGameState();
        hideStoryOverlay();
      }
    }
  ]
},
// -------------------------- ^^^^ Freelance filler ^^^^ ------------------------

// -------------------------- vvvv stay home beats vvvv -------------------------
{
  id: "catPlay",
  type: "filler",
  location: "CatPlay",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/yarnball.png",
  dialogue: [ 
    `You decide to stay home and have a relaxing day indoor with ${catsName}.`,
    `You take out some of ${catsName}'s favorite toys and throughout the day you both have a great time playing together.`,
    `By evening, ${catsName} is all tuckered out and happy napping on your lap as you watch a movie.`
  ],
  question: "After a relaxing day indoors, you go to bed",
  options: [
    {
      title: "Go to bed",
      description: "End the day and head to bed.",
      action: () => { hideStoryOverlay(); }
    }
  ]
},

{
  id: "catPlay2",
  type: "event",
  requirement: () => hasItem(402, 1), // Requires catnip in inventory
  location: "CatPlay",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/catnip.png",
  dialogue: [
    `You decide to stay home and have a relaxing day indoor with ${catsName}.`,
    `You take out some catnip from your inventory and sprinkle it on ${catsName}'s favorite toy.`,
    `${catsName} goes wild with excitement, pouncing and rolling around in the catnip-infused toy!`
  ],
  question: "After a fun-filled day with catnip, you go to bed",
  options: [
    {
      title: "Go to bed",
      description: "End the day and head to bed.",
      action: () => { 
        hideStoryOverlay(); 
        removeItemsById(402, 1); // Use one catnip
        showNotif(402, -1);
        joy += 15;
        love += 5;
        energy -= 10;
        fullness -= 15;
      }
    }
  ],
},

{
  id: "catPlay3",
  type: "filler",
  location: "CatPlay",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/house.png",
  dialogue: [
    `You decide to stay home and have a relaxing day indoor with ${catsName}.`,
    `You set up a little obstacle course using household items for ${catsName} to navigate through.`,
    `${catsName} eagerly takes on the challenge, jumping over cushions and weaving through boxes with impressive agility!`
  ],
  question: "After a fun-filled day indoors, what would you like to do?",
  options: [
    {
      title: "Go to bed",
      description: "End the day and head to bed.",
      action: () => { 
       hideStoryOverlay();
       joy += 5;
       energy -= 10;
       fullness -= 10;
       love += 2;
       }
    },
    {
      title: "Go out for a walk",
      description: `Go out for an evening walk with ${catsName}.`,
      action: () => {
        showStoryOverlay(getRandomEventBeat());
        joy += 10;
        energy -= 15;
        fullness -= 10;
        love += 3;
       }
    }
  ]
},

{
  id: "catPlay4",
  type: "filler",
  location: "CatPlay",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/laserpointer.png",
  dialogue: [
    `You decide to stay home and have a relaxing day indoor with ${catsName}.`,
    `You grab a laser pointer and start moving the red dot around the room.`,
  ],
  question: "After a fun-filled day indoors, what would you like to do?",
  options: [
    {
      title: "Go to bed",
      description: "End the day and head to bed.",
      action: () => { 
        hideStoryOverlay();
        let random = Math.floor(Math.random() * 11);
        joy += random;
        random = Math.floor(Math.random() * 16);
        energy -= random;
        random = Math.floor(Math.random() * 16);
        fullness -= random;
        random = Math.floor(Math.random() * 6);
        love += random;
       }
    }
  ]
},
{
  id: "catPlayItemFind",
  type: "event",
  location: "CatPlay",
  backdrop: "images/Backdrops/livingroom.png",
  miniImg: "images/Cat-Neutral.jpg",
  dialogue: [
    `You decide to stay home and have a relaxing day indoors However ${catsName} decides to go out for a solo adventure.`,
  ],
  question: `After some time, ${catsName} returns with something in its mouth.`,
  options: [
    {
      title: "Inspect the item",
      description: `You take a closer look at what ${catsName} has brought back.`,
      action: () => { 
        giveLoot("Misc", 3); // Give 3 Misc items
        giveLootChance("Valuable", 80); // 20% chance to get a Valuable item
        giveLootChance("Toys", 50); // 50% chance to get a Toy item
        updateGameState();
        hideStoryOverlay(); 
        energy -= 7;
        fullness -= 6;
       }
    }
  ]
},
// -------------------------- ^^^^ stay home beats ^^^^ -------------------------


]; // End of storyBeats array

// ========================= Story Overlay System =========================

function getRandomHubOptions() {
  // Define all possible hub options
  const allOptions = [
    {
    title: "Visit the Park",
    description: "Take a stroll in the park.",
    action: () => {
    const parkBeat = getRandomStoryBeatByLocation("Park");
    if (parkBeat) {
      showStoryOverlay(parkBeat);
      storyBeatsStarted += 1;
        }
      }
    },
    {
      title: "Visit the Forest",
      description: "Explore the mysterious forest.",
      action: () => {
      const forestBeat = getRandomStoryBeatByLocation("Forest");
      if (forestBeat) {
      showStoryOverlay(forestBeat);
      storyBeatsStarted += 1;
        }
      }
    },
    {
      title: "Go Shopping",
      description: "Check out the local shops.",
      action: () => {
      const shopBeat = getRandomStoryBeatByLocation("Shop");
      if (shopBeat) {
      showStoryOverlay(shopBeat);
      storyBeatsStarted += 1;
        }
      }
    },
    {
      title: "Stay Home and Play",
      description: "Spend time playing with your cat, from the comfort of your home.",
      action: () => {
      const catPlayBeat = getRandomStoryBeatByLocation("CatPlay");
      if (catPlayBeat) {
      showStoryOverlay(catPlayBeat);
      storyBeatsStarted += 1;
        }
      }
    },
    {
      title: "Freelance Work",
      description: "Get some freelance work done.",
      action: () => {
      const freelanceBeat = getRandomStoryBeatByLocation("Freelance");
      if (freelanceBeat) {
      showStoryOverlay(freelanceBeat);
      storyBeatsStarted += 1;
        }
      }
    },
    {
      title: "Visit the Beach",
      description: "Relax by the seaside.",
      action: () => {
      const beachBeat = getRandomStoryBeatByLocation("Beach");
      if (beachBeat) {
      showStoryOverlay(beachBeat);
      storyBeatsStarted += 1;
        }
      }
    }
    // Add more options as needed
  ];
  const shuffled = allOptions.sort(() => Math.random() - 0.5);
  const count = Math.floor(Math.random() * 4) + 3; // 3 to 6 options
  return shuffled.slice(0, count);
}

function getRandomStoryBeatByLocation(location) {
  const beats = storyBeats.filter(beat =>
    beat.location === location &&
    (typeof beat.requirement !== "function" || beat.requirement())
  );
  if (beats.length === 0) return null;
  return beats[Math.floor(Math.random() * beats.length)];
}

const storyBeatRarity = [
  {type: "side", weight: 4},
  {type: "event", weight: 10},
  {type: "filler", weight: 16}
]

function getStoryId(id) {
  return storyBeats.find(beat => beat.id === id);
}
function getRandomEventBeat() {
  const weightedPool = [];
  for (const rarity of storyBeatRarity) {
    const beats = storyBeats.filter(beat => {
      // Only include if canAppear is not defined or returns true
      if (typeof beat.requirement === "function" && !beat.requirement()) return false;
      return beat.type === rarity.type;
    });
    for (const beat of beats) {
      for (let i = 0; i < rarity.weight; i++) {
        weightedPool.push(beat);
      }
    }
  }
  if (weightedPool.length === 0) return null;
  return weightedPool[Math.floor(Math.random() * weightedPool.length)];
}
const randomEvent = getRandomEventBeat();



// Show the overlay with a given story beat
async function showStoryOverlay(storyBeat) {
  const overlay = document.getElementById('storyOverlay');
  const backdrop = document.getElementById('storyBackdrop');
  const miniImgBox = document.getElementById('storyMiniImg');
  const miniImgTag = document.getElementById('storyMiniImgTag');
  const dialogueText = document.getElementById('storyDialogueText');
  const optionsBox = document.getElementById('storyOptions');

  // Set backdrop image
  backdrop.style.backgroundImage = `linear-gradient(rgba(30,30,40,0.7),rgba(30,30,40,0.7)), url('${storyBeat.backdrop || "images/story_default_bg.jpg"}')`;

  // Set mini image
  if (storyBeat.miniImg) {
    miniImgTag.src = storyBeat.miniImg;
    miniImgBox.style.display = "";
  } else {
    miniImgBox.style.display = "none";
  }

  // wait for user click to proceed in dialogue
function waitForUserClick() {
  return new Promise(resolve => {
    function onClick() {
      document.removeEventListener('click', onClick);
      resolve();
    }
    document.addEventListener('click', onClick);
  });
}

  // Fade in overlay
  overlay.style.display = "flex";
  setTimeout(() => overlay.classList.remove('hide'), 10);

    // Show dialogue (multi-line with typeText)
  dialogueText.innerHTML = "";
  optionsBox.classList.remove('visible'); // Hide buttons initially
  optionsBox.innerHTML = ""; // Clear old options immediately
  tooltip.classList.remove('active'); // Hide tooltip when after button click

if (Array.isArray(storyBeat.dialogue)) {
  for (const line of storyBeat.dialogue) {
    await typeText(dialogueText, line);
    await waitForUserClick(); // Wait for user to click before next line
  }
} else {
  await typeText(dialogueText, storyBeat.dialogue);
  await waitForUserClick();
}

  // Show question after dialogue
  let questionFadeTime = 700;
  let questionElements = [];
  if (storyBeat.question) {
    if (Array.isArray(storyBeat.question)) {
      for (const q of storyBeat.question) {
        dialogueText.innerHTML += `<br><span class="story-question">${q}</span>`;
      }
      questionElements = Array.from(dialogueText.querySelectorAll('.story-question'));
    } else {
      dialogueText.innerHTML += `<br><span class="story-question">${storyBeat.question}</span>`;
      questionElements = [dialogueText.querySelector('.story-question')];
    }
  } else {
    questionFadeTime = 0;
  }

  // Set options/buttons after dialogue and question
optionsBox.innerHTML = "";
storyBeat.options
  .filter(opt => !opt.requirement || opt.requirement())
  .forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'story-option-btn';
    btn.textContent = opt.title;
    btn.type = "button";
    btn.tabIndex = 0;
    btn.dataset.description = opt.description || "";
    btn.addEventListener('click', () => {
      if (typeof opt.action === "function") opt.action();
    });
    optionsBox.appendChild(btn);
  });

optionsBox.classList.add('visible');
}

// Hide the overlay
function hideStoryOverlay() {
  const overlay = document.getElementById('storyOverlay');
  overlay.classList.add('hide');
  setTimeout(() => { overlay.style.display = "none"; }, 400);
}

const tooltip = document.getElementById('storyBtnTooltip');

  // Delegate tooltip logic to all story-option-btns
  document.addEventListener('mouseover', function(e) {
    if (e.target.classList.contains('story-option-btn')) {
      const desc = e.target.dataset.description;
      if (desc) {
        tooltip.textContent = desc;
        tooltip.style.display = "block";
        tooltip.classList.add('active');
      }
    }
  });
  document.addEventListener('mousemove', function(e) {
    if (tooltip.style.display === "block") {
      // Offset so it doesn't cover the cursor
      tooltip.style.left = (e.clientX + 18) + "px";
      tooltip.style.top = (e.clientY + 12) + "px";
    }
  });
  document.addEventListener('mouseout', function(e) {
    if (e.target.classList.contains('story-option-btn')) {
      tooltip.style.display = "none";
      tooltip.classList.remove('active');
    }
  })
