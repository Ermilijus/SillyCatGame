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
    let speed = options.speed || 35; // Default speed per character (lower is faster)


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
	await typeText(dialogueText, `${catsName} ~happily~ munches the food. Meow, nom nom!, what a good kitty! isn't that right?, isn't it ~delicious~?, purr..., would you like more? Yaaaaaaaaaa...`);
});

document.getElementById('play-btn').addEventListener('click', async () => {
	await typeText(dialogueText, `${catsName} pounces around ¬excitedly!¬`);
    showStoryOverlay(getRandomEventBeat());
});

document.getElementById('rest-btn').addEventListener('click', async () => {
	await typeText(dialogueText, `${catsName} curls up and takes a nap. Zzz...`);
});

let raccoonFed = false;
let raccoon3Complete = false;
let raccoonDisapointed = false;
let raccoonComplete = false;

/* ------------------------- Story/Event Overlay ------------------------- */
// Define story beats, type: main, continuation side, event, filler.
const storyBeats = [
  { // -------------------------- vvvv Beach Storyline vvvv ------------------------
    id: "beach1",
    type: "event",
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
  },  // -------------------------- ^^^^ Beach Storyline ^^^^ ------------------------

  {  // ------------------------- vvvv Raccoon Storyline vvvv ------------------------
    id: "raccoon1",
    type: "story",
    requirement: () => !raccoonFed && !raccoonDisapointed,
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
            showStoryOverlay(getStoryId("raccoon2"));
            removeItemById(8, 1); // Remove one watermelon
            showNotif(8, -1);
            raccoonFed = true;
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
    id: "raccoon2",
    type: "continuation",
    backdrop: "images/Backdrops/forest.png",
    miniImg: "images/raccoon1.png",
    dialogue: "The raccoon has lost its wallet! it looks at you hopefully.",
    question: "Will you help the raccoon find its wallet?",
    options: [ 
      {
          title: "Help the raccoon",
          description: "Ask the raccoon where it last saw its wallet.",
          action: () => { 
            showStoryOverlay(getStoryId("raccoon3"));

          }
      }, 
      {
          title: "Dont help the raccoon",
          description: "Leave the raccoon alone and go back home.",
          action: () => { raccoonDisapointed = true; hideStoryOverlay(); }
      }
   ]
  },
  {
    id: "raccoon3",
    type: "continuation",
    backdrop: "images/Backdrops/forest.png",
    miniImg: "images/raccoon2.png",
    dialogue: "The raccoon tells you it last saw its wallet near the big oak tree by the river.",
    question: "Keep an eye out for a big oak tree next time you visit the forest?",
    options: {
          title: "Go home",
          description: "you will keep an eye out next time, but for now you must go home.",
          action: () => { 
            raccoon3Complete = true;
            hideStoryOverlay(); 
          }
    }
  },
  {
    id: "raccoon4",
    type: "side",
    requirement: () => !raccoonComplete,
    backdrop: "images/Backdrops/forestoak.png",
    miniImg: "images/wallet.png",
    dialogue: "You find the raccoon's wallet near the oak tree.",
    question: "You decide to return the wallet right away.",
    options: [
      {
        title: "Visit the raccoon",
        description: "You go visit the raccoon right away",
        action: () => {
          addItemById(206); // wallet
          showNotif(206, 1);
          showStoryOverlay(getStoryId("raccoon5"));
        }
      }
    ]
  },
  {
    id: "raccoon5",
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
            questRewardItem(203, 1, "You received a Raccoon Mask for helping the raccoon!"); // Raccoon Mask reward
            raccoonComplete = true;
          }
        }
     ]  
  }

// ------------------------- ^^^^ Raccoon Storyline ^^^^ ------------------------

]; // End of storyBeats array

// ========================= Story Overlay System =========================

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
  let questionFadeTime = 700; // match your .story-question animation
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
  storyBeat.options.forEach((opt, idx) => {
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

// Example usage:
// showStoryOverlay(getStoryId("beach_intro"));
// To close: hideStoryOverlay();


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
});