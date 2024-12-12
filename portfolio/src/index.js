import Phaser from "phaser";
import PreloadScene from "./scenes/PreloadScene"; // Import your PreloadScene
import GameScene from "./scenes/GameScene"; // Import your GameScene

// === CONFIGURATION FOR THE GAME ===
const config = {
  type: Phaser.AUTO, // Automatically use WebGL or Canvas depending on the browser
  width: 800, // Width of the game canvas
  height: 600, // Height of the game canvas
  physics: {
    default: "arcade", // Use Phaser's Arcade physics
    arcade: { gravity: { y: 300 }, debug: false }, // Add gravity for jumping
  },
  scene: [PreloadScene, GameScene], // List of scenes, in the order they load
};

// === INITIALIZE THE PHASER GAME ===
const game = new Phaser.Game(config);
