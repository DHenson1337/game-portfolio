// Handle platforms, player, and backgrounds using utility functions

import { createPlatforms } from "../utils/platforms";
import { createPlayer, addPlayerAnimations } from "../utils/player";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    //The Order matters, Load background first so player appears infront of it!

    // Add parallax backgrounds
    this.background1 = this.add
      .tileSprite(400, 300, 800, 600, "background1")
      .setScrollFactor(0);
    this.background2 = this.add
      .tileSprite(400, 300, 800, 600, "background2")
      .setScrollFactor(0);
    this.background3 = this.add
      .tileSprite(400, 300, 800, 600, "background3")
      .setScrollFactor(0);
    this.background4a = this.add
      .tileSprite(400, 300, 800, 600, "background4a")
      .setScrollFactor(0);

    // Add platforms
    this.platforms = createPlatforms(this);

    // Add player
    this.player = createPlayer(this);
    addPlayerAnimations(this);

    // Add controls
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
    });

    // Collisions
    this.physics.add.collider(this.player, this.platforms);
  }

  update() {
    // Scroll parallax background
    this.background1.tilePositionX += 0.1;
    this.background2.tilePositionX += 0.3;
    this.background3.tilePositionX += 0.6;
    this.background4a.tilePositionX += 1.0;

    // Player movement
    const speed = 160;
    const jumpPower = -330;

    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.keys.jump.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(jumpPower);
    }
  }
}
