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


/* ------------------------- Story/Event Overlay ------------------------- */
// Define story beats, type: main, side, event, filler.
const storyBeats = [
  {
    id: "beach_intro",
    type: "filler",
    backdrop: "images/Backdrops/beach.png",
    miniImg: "images/StoryBeat-Icons/seashell.png",
    dialogue: [
      "You arrive at the ¬beach¬. The waves are gentle and the sun is warm.",
    ],
    question: [ "What would you like to do?" ],
    options: [
      { 
        title: "Take a stroll", 
        description: "Walk along the shoreline and enjoy the scenery.",
        action: () => { showStoryOverlay(getStoryId("Beach_stroll")); }
      },
      { 
        title: "Go back home", 
        description: "Return to your cozy house.",
        action: () => { hideStoryOverlay(); }
      }
    ]
  },
  {
    id: "Beach_stroll",
    type: "filler",
    backdrop: "images/Backdrops/beach2.png",
    miniImg: "images/StoryBeat-Icons/footprints.png",
    dialogue: "You walk along the shore, feeling the sand between your toes and the breeze on your face.",
    question: "Do you want to collect seashells?",
    options: [ 
    {
        title: "Yes", 
        description: "Look for beautiful seashells along the beach.",
        action: () => { /* next beat or effect */ }
      },
      { 
        title: "No", 
        description: "Just enjoy the walk without collecting anything.",
        action: () => { hideStoryOverlay(); }
      }
    ]
        
  }
  // ...more beats
];

// ========================= Story Overlay System =========================
function getStoryId(id) {
  return storyBeats.find(beat => beat.id === id);
}
function getRandomEventBeat() {
  const events = storyBeats.filter(beat => beat.type === "event" || beat.type === "filler");
  return events[Math.floor(Math.random() * events.length)];
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

  // Fade in overlay
  overlay.style.display = "flex";
  setTimeout(() => overlay.classList.remove('hide'), 10);

    // Show dialogue (multi-line with typeText)
  dialogueText.innerHTML = "";
  optionsBox.classList.remove('visible'); // Hide buttons initially

  if (Array.isArray(storyBeat.dialogue)) {
    for (const line of storyBeat.dialogue) {
      await typeText(dialogueText, line);
    }
  } else {
    await typeText(dialogueText, storyBeat.dialogue);
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