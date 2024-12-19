//handle all asset loading using a utility function for consistency.
import { loadAssets } from "../utils/assets";

export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene"); // Name of this scene for later use
  }

  preload() {
    // Load assets from Phaser Editor's asset-pack.json
    this.load.pack("asset-pack", "src/scenes/phaser-editor/asset-pack.json");

    // Load additional assets using the utility function
    // loadAssets(this);
  }

  create() {
    // Transition to the GameScene after loading all assets
    this.scene.start("GameScene");
  }
}
