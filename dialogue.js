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
});

document.getElementById('rest-btn').addEventListener('click', async () => {
	await typeText(dialogueText, `${catsName} curls up and takes a nap. Zzz...`);
});
