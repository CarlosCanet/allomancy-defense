# Allomancy Defense

## [Play the Game!](https://carloscanet.github.io/allomancy-defense/)

# Description
**Allomancy Defense** is a game developed in a week for the M1 project of the Ironhack web development bootcamp, in July 2025. It is based in the Mistborn series of *Brandon Sanderson*, because the Cosmere is where we all live in.

**Allomancy defense** is a game where you need to gather resources to build your rebellion. To do this, you have two options: get resources from your base and build new structures, but over time your efficiency decreases. At any time, you can make an incursion into Luthadel and get even more resources, but the Lord Ruler’s guards are looking for you! If they catch you, you lose resources and buildings, and if you have 0 buildings left, your rebellion fails.


# Main functionalities
- Idle game
 - 5 different resources
 - 5 different buildings, each one produce one resource at a certain rate
 - You can start incursions at any time
- Incursion game
 - You can move and shoot coins if you have enough coins and steel
 - You should avoid the guards, as they will chase you on sight
 - You can search for areas where resources are produced. The bigger the area, the more resources you get
 - You can escape at any time, or when the timer runs out
 - If you are caught, you lose resources and your most recently building(s)

# Backlog functionalities
- Bring allies to the game. Types:
  - Smokers: The guards cannot detect you if you are inside their coppercloud
  - Tineyes: You can see through the mist if the area around them
  - More allomancers...
- [Idle] Recruit allies
- [Incursion] Put allies as "towers" for a limited time
- [Incursion] You can choose other kinds of allomancers (instead of a Coinshot)
- [New mode] A mode where all the enemies target the player (vampire-surviror-like)

# Technologies used
HTML, CSS, Javascript, Typescript, DOM manipulation, local storage, audio, classes and subclasses, static attributes and abstract classes.

# States
- Start screen (with a modal to load a previous game)
- Idle game screen
- Incursion game screen
- Game over screen

# Project structure
## Class structure
- AllomancyDefenseGame
- MenuSection
- Game
  - GameIdle
  - GameIncursion
- GameObject
  - Building
    - House
      - HouseVenture
      - HouseCett
      - HouseLekal
      - HouseHasting
      - HouseElariel
  - Character
    - Enemy
  - Projectile
## File structure
The `main.ts` file contains the main DOM containers, creates the main  _AllomancyDefenseGame_ class instance and starts the game.

In the `AllomancyDefenseGame.ts` we have the constants and nodes needed for the entire game, as well as the main loop.

We also have a separate file for each class and auxiliary constants.

# Extra links

### Sketch
[Link](https://excalidraw.com/#json=qskDjdUa9zdjsRGBUpQl7,CqFXQCyGOM8kNgy7fETUXA)

### Project management
[Link](https://github.com/users/CarlosCanet/projects/11)

### Deploy
[Link](https://carloscanet.github.io/allomancy-defense/)