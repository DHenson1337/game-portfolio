// Handle platforms, player, and backgrounds using utility functions

import { createPlatforms } from "../utils/platforms";
import { createPlayer, addPlayerAnimations } from "../utils/player";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    //The Order matters, Load background first so player appears infront of it!

    // Add parallax layers in the refined order
    this.sky = this.add
      .tileSprite(400, 300, 800, 600, "10_Sky")
      .setScrollFactor(0);

    this.backgroundForest = this.add
      .tileSprite(400, 300, 800, 600, "09_Forest")
      .setScrollFactor(0.1);
    this.distantForest = this.add
      .tileSprite(400, 300, 800, 600, "08_Forest")
      .setScrollFactor(0.2);
    this.midgroundForest = this.add
      .tileSprite(400, 300, 800, 600, "07_Forest")
      .setScrollFactor(0.3);
    this.nearMidgroundForest = this.add
      .tileSprite(400, 300, 800, 600, "06_Forest")
      .setScrollFactor(0.4);
    this.foregroundForest = this.add
      .tileSprite(400, 300, 800, 600, "04_Forest")
      .setScrollFactor(0.5);

    this.bushes = this.add
      .tileSprite(400, 300, 800, 600, "02_Bushes")
      .setScrollFactor(0.6);
    this.particles1 = this.add
      .tileSprite(400, 300, 800, 600, "03_Particles")
      .setScrollFactor(0.7);
    this.particles2 = this.add
      .tileSprite(400, 300, 800, 600, "05_Particles")
      .setScrollFactor(0.8);

    this.mist = this.add
      .tileSprite(400, 300, 800, 600, "01_Mist")
      .setScrollFactor(0.9);
    this.mist.setAlpha(0.7); // Reduce opacity for a softer effect

    // Add platforms
    this.platforms = createPlatforms(this);

    // Add player
    this.player = createPlayer(this);
    addPlayerAnimations(this);

    //Play idle animation by default
    this.player.play("idle");

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
    this.sky.tilePositionX += 0.01; // Static far background (slowest movement)

    this.backgroundForest.tilePositionX += 0.1;
    this.distantForest.tilePositionX += 0.2;
    this.midgroundForest.tilePositionX += 0.3;
    this.nearMidgroundForest.tilePositionX += 0.4;
    this.foregroundForest.tilePositionX += 0.5;

    this.bushes.tilePositionX += 0.6; // Fast-moving foreground
    this.particles1.tilePositionX += 0.8; // Fast-moving particles
    this.particles2.tilePositionX += 0.9; // Even faster particles

    this.mist.tilePositionX += 1.0; // Closest and fastest layer

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
