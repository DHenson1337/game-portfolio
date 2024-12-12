export default class PreloadScene extends Phaser.Scene {
  constructor() {
    super("PreloadScene"); // Name of this scene for later use
  }

  preload() {
    // Load all 20 frames for the BlueWizard's idle animation
    for (let i = 0; i <= 19; i++) {
      const frameNumber = i.toString().padStart(5, "0");
      const filePath = `assets/characters/BlueWizard/2BlueWizardIdle/Chara - BlueIdle${frameNumber}.png`;
      console.log(`Loading: ${filePath}`); // Log file paths for verification
      this.load.image(`blueWizardIdleFrame${i + 1}`, filePath);
    }
  }
  // Add all the frames for idle animation in the same pattern

  // === LOAD OTHER ASSETS AS NEEDED (e.g., platforms, backgrounds) ===
  // Example: this.load.image('sky', 'assets/backgrounds/sky.png');

  create() {
    // Transition to the GameScene after loading all assets
    this.scene.start("GameScene");
  }
}
