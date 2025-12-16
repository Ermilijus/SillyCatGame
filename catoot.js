'use strict';

/* ============================
visual.js
Handles cat behaviour visually
============================ */


// Example placeholder logic
console.log("Visual system ready");




/* ============================
ui.js
Handles buttons and stats
============================ */


const hungerValue = document.getElementById('hunger-value');
const joyValue = document.getElementById('joy-value');
const energyValue = document.getElementById('energy-value');


let hunger = 50;
let joy = 50;
let energy = 50;


document.getElementById('feed-btn').addEventListener('click', () => {
hunger = Math.max(0, hunger - 10);
hungerValue.textContent = hunger;
});




document.getElementById('play-btn').addEventListener('click', () => {
joy = Math.min(100, joy + 10);
energy = Math.max(0, energy - 5);
joyValue.textContent = joy;
energyValue.textContent = energy;
});




document.getElementById('rest-btn').addEventListener('click', () => {
energy = Math.min(100, energy + 15);
energyValue.textContent = energy;
});




/* ============================
dialogue.js
Story & text control
============================ */


const dialogueText = document.getElementById('dialogue-text');


document.getElementById('feed-btn').addEventListener('click', () => {
dialogueText.textContent = "Your cat happily munches the food. Meow~";
});


document.getElementById('play-btn').addEventListener('click', () => {
dialogueText.textContent = "Your cat pounces around excitedly!";
});