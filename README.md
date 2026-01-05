# 🐾 [SillyCatGame]

A small narrative-driven virtual pet game built in JavaScript, featuring stat management, inventory systems, branching story events, and some hidden worldbuilding.

## Overview

This project is a browser-based virtual pet experience created as a learning and experimentation project.

The player cares for a cat through feeding, playing, resting, and interacting with dynamic story events.  
Several interconnected systems are used to add depth to what is otherwise a simple gameplay loop.

This is **not a commercial product**, but a completed personal project focused on:
- Systems design
- UI interaction
- Narrative structuring
- Learning JavaScript through practical implementation

## How to Run

1. Clone or download the repository
2. Open `main.html` in a modern web browser
3. No build steps or dependencies required

## Features

- 🐱 Virtual stat system (Energy, Joy, etc.)
- 🎒 Inventory system with stacking, rarity, and randomised loot pools
- 🧠 Story events with branching outcomes
- ⌨️ Typewriter-style dialogue with skip functionality
- 🎭 Hidden narrative threads and recurring story beats
- 🧪 Debug tools for testing stats and progression (CTRL + F1)

## Project Structure

- `main.html` – Main game layout and UI
- `styles.css` – UI styling and visual theming
- `ui.js` – Core game loop and stat updates
- `dialogue.js` – Dialogue handling and typewriter effect
- `visuals.js` - Visuals and effects
- `achievements.js` - Tracking of special conditions, achievment system
- `items.js` – Inventory system, shop system, item database, loot pools etc..
- `debug.js` – Debug menu and testing utilities

  Structure isnt perfect, I would do it differently knowing more and having learned a lot from this project

## Design Notes

This project intentionally prioritizes:
- Learning Javascript, along with how HTML and CSS all interact and function together
- Readability over optimization
- Narrative implication rather than explicit exposition
- Understanding workflows and systems creation/planning
- Generative AI was used for "Asset" creation (icons, backgrounds etc..)

Some mechanics (such as story events and item usage) are designed to be repeated and provide "Filler" or "Padding" for a sense of depth and repeatability.

## Development Notes

This project evolved organically as features were added and understanding deepened.

There was no prebuilt plan or formal set of requirements. Development started with a simple core idea, and systems such as inventory, dialogue, achievements, and story events were added and reshaped iteratively as the scope evolved.

Rather than rewriting large sections late in development, some structural decisions were intentionally left as-is to preserve the learning process and reflect real-world iteration.

A self-imposed deadline of New Year’s night was used as a “launch day” to encourage completion and prevent endless refinement, allowing the project to reach a finished and playable state.

Narrative systems were designed to favor implication and recurring story beats over explicit exposition. Events are intentionally reusable, sometimes ending early or branching based on inventory and state, to create a sense of an ongoing world rather than a strictly linear story.

## Known Issues & Limitations

- UI was built with only Desktop web-browsers in mind, (Not intended for other Devices such as Phones, Tablets, Unconventional aspect ratios, etc..)
- Debug features are intentionally left accessible
- Not all items and loot pools are fully populated
- Balance was not fine tuned, some things are intended to be "busted" such as the "Golden Bell"
- NOT a bug free "release", there are several Known defects in this build, left intentionally for QA purposes

These defects were left in place intentionally, as this project was built as a learning exercise rather than a polished product.

## Final Notes

This project was created for personal learning and exploration.

Thanks for taking the time ♥
