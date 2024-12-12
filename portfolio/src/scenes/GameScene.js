export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene"); // Name of this scene
  }

  create() {
    // === CREATE PLAYER SPRITE ===
    // Add the BlueWizard sprite using the first idle frame
    const player = this.add.sprite(100, 300, "blueWizardIdleFrame1");

    // === DYNAMICALLY DEFINE ANIMATION FRAMES ===
    const idleFrames = [];
    for (let i = 1; i <= 20; i++) {
      idleFrames.push({ key: `blueWizardIdleFrame${i}` });
    }

    // === DEFINE ANIMATIONS ===
    this.anims.create({
      key: "idle", // Name of the animation
      frames: idleFrames, // Use the dynamically created frames
      frameRate: 10, // Frames per second
      repeat: -1, // Loop indefinitely
    });

    // Play the Idle animation
    player.play("idle");
  }
}
