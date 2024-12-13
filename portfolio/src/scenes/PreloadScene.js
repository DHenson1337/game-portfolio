//handle all asset loading using a utility function for consistency.
import { loadAssets } from "../utils/assets";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene"); // Name of this scene for later use
  }

  preload() {
    // Load all game assets using utility
    loadAssets(this);
  }

  create() {
    // Transition to the GameScene after loading all assets
    this.scene.start("GameScene");
  }
}
