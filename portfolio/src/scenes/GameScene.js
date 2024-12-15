// Handle platforms, player, and backgrounds using utility functions

import { createPlatforms } from "../utils/platforms";
import { createPlayer, addPlayerAnimations } from "../utils/player";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    //The Order matters, Load background first so player appears infront of it!

    // Set the world bounds larger than the visible screen

    this.physics.world.setBounds(0, 0, 1800, 800); // Adjust width and height as needed
    this.cameras.main.setBounds(0, 0, 1800, 800); // Adjust camera bounds to match the world

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
    // this.platforms = createPlatforms(this);
    // Load the tilemap and tileset
    const map = this.make.tilemap({ key: "test-map" }); // Make sure "test-map" matches your map key
    const tileset = map.addTilesetImage("test-tileset", "test-tileset"); // Key in assets.js

    // Create layers from the map
    const groundLayer = map.createLayer(
      "Ground",
      tileset,
      0,
      0,
      this.game.config.height - map.heightInPixels
    );
    const obstacleLayer = map.createLayer("Obstacles", tileset);

    // Add collision properties
    groundLayer.setCollisionByProperty({ collides: true });
    obstacleLayer.setCollisionByProperty({ collides: true });

    //Debugging ground layer collisions
    /*     groundLayer.renderDebug(this.add.graphics(), {
      tileColor: null, // Non-colliding tiles will not be rendered
      collidingTileColor: new Phaser.Display.Color(255, 0, 0, 200), // Red for colliding tiles
      faceColor: new Phaser.Display.Color(0, 255, 0, 200), // Green for tile edges
    }); */

    // Add player
    this.player = createPlayer(this);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1); // Smooth follow effect
    this.cameras.main.setBounds(
      0,
      0,
      this.physics.world.bounds.width,
      this.physics.world.bounds.height
    );

    //Sets player starting position
    this.player.setPosition(100, this.game.config.height - 200); // Adjust the y value accordingly

    //Add Player Collision with Ground and Obstacle Layer
    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.player, obstacleLayer);

    //Collision Debugging
    console.log(groundLayer.hasTileAtWorldXY(this.player.x, this.player.y)); // Check tile collision
    console.log(map.layers); // Log all layers and verify the layer exists

    addPlayerAnimations(this);

    //Player Additional Jump
    this.jumpCount = 0; // Track jumps
    this.maxJumps = 2; // Allow double jumps

    //Player Dash

    //Player Dash limits
    this.lastDashLeft = 0; // Track double press for left
    this.lastDashRight = 0; // Track double press for right
    this.dashCount = 2; // Allow 2 dashes
    this.dashCooldown = false; // Track cooldown

    // //Play idle animation by default
    // this.player.play("idle");

    // Player Controls
    this.keys = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      right: Phaser.Input.Keyboard.KeyCodes.D,
      jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
      dash: Phaser.Input.Keyboard.KeyCodes.E,
      // dash: Phaser.Input.Keyboard.KeyCodes.DD,
    });

    // Collisions

    // Enable collision between the player and platforms
    this.physics.add.collider(this.player, this.platforms);

    this.player.body.setGravityY(300); // Apply gravity to the player
  }

  update() {
    // Synchronize parallax background positions with camera scroll
    this.sky.tilePositionX = this.cameras.main.scrollX * 0.01;
    this.backgroundForest.tilePositionX = this.cameras.main.scrollX * 0.1;
    this.distantForest.tilePositionX = this.cameras.main.scrollX * 0.2;
    this.midgroundForest.tilePositionX = this.cameras.main.scrollX * 0.3;
    this.nearMidgroundForest.tilePositionX = this.cameras.main.scrollX * 0.4;
    this.foregroundForest.tilePositionX = this.cameras.main.scrollX * 0.5;
    this.bushes.tilePositionX = this.cameras.main.scrollX * 0.6;
    this.particles1.tilePositionX = this.cameras.main.scrollX * 0.7;
    this.particles2.tilePositionX = this.cameras.main.scrollX * 0.8;
    this.mist.tilePositionX = this.cameras.main.scrollX * 0.9;

    /*  // Scroll parallax background
    this.sky.tilePositionX += 0.01;
    this.backgroundForest.tilePositionX += 0.1;
    this.distantForest.tilePositionX += 0.2;
    this.midgroundForest.tilePositionX += 0.3;
    this.nearMidgroundForest.tilePositionX += 0.4;
    this.foregroundForest.tilePositionX += 0.5;
    this.bushes.tilePositionX += 0.6;
    this.particles1.tilePositionX += 0.8;
    this.particles2.tilePositionX += 0.9;
    this.mist.tilePositionX += 1.0; */

    // === PLAYER MOVEMENT AND ANIMATION LOGIC ===

    const speed = 260; // Horizontal movement speed
    const dashSpeed = 1420; // Speed multiplier for dashing
    const jumpPower = -430; // Vertical force for jumping

    // Skip movement logic if dashing
    if (this.isDashing) {
      return;
    }

    // === WALKING AND IDLE LOGIC ===
    if (this.keys.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = true; // Flip sprite to face left
      if (this.player.body.blocked.down) {
        if (
          !this.player.anims.isPlaying ||
          this.player.anims.currentAnim.key !== "walk"
        ) {
          this.player.play("walk", true); // Play walking animation
        }
      }
    } else if (this.keys.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.flipX = false; // Default sprite direction is right
      if (this.player.body.blocked.down) {
        if (
          !this.player.anims.isPlaying ||
          this.player.anims.currentAnim.key !== "walk"
        ) {
          this.player.play("walk", true); // Play walking animation
        }
      }
    } else if (this.player.body.blocked.down) {
      // Stop horizontal movement and play idle animation if grounded
      this.player.setVelocityX(0);
      if (
        !this.player.anims.isPlaying ||
        this.player.anims.currentAnim.key !== "idle"
      ) {
        this.player.play("idle", true);
      }
    }

    // === JUMPING LOGIC ===
    if (
      Phaser.Input.Keyboard.JustDown(this.keys.jump) &&
      this.jumpCount < this.maxJumps
    ) {
      this.player.setVelocityY(jumpPower); // Apply vertical force for the jump
      this.player.play("jump", true); // Play the jumping animation
      this.jumpCount++; // Increment the jump count
    }

    // Reset jump count when the player lands
    if (this.player.body.blocked.down) {
      this.jumpCount = 0; // Reset jump count when grounded
    }

    // === DASH LOGIC ===
    if (Phaser.Input.Keyboard.JustDown(this.keys.dash) && this.dashCount > 0) {
      this.player.setVelocityX(this.player.flipX ? -dashSpeed : dashSpeed); // Apply horizontal velocity
      this.player.play("dash", true); // Play the dash animation
      this.isDashing = true; // Set dashing flag
      this.dashCount--; // Decrease available dashes
      this.time.delayedCall(300, () => {
        this.isDashing = false; // Allow normal movement after 300ms
      });
      if (this.dashCount === 0) {
        this.createDashCooldownTimer(); // Show cooldown
      }
    }

    // === DASH COOLDOWN LOGIC ===
    if (!this.dashCooldown && this.dashCount <= 0) {
      this.dashCooldown = true;
      this.time.delayedCall(1500, () => {
        this.dashCount = 2; // Reset dashes after cooldown
        this.dashCooldown = false; // End cooldown
      });
    }
  }

  // === HELPER FUNCTION: DASH COOLDOWN TIMER ===
  createDashCooldownTimer() {
    // If the cooldownText already exists, avoid creating a duplicate
    if (this.cooldownText) return;

    // Add a cooldown timer display below the player
    this.cooldownText = this.add.text(
      this.player.x,
      this.player.y + 20,
      "Cooldown",
      {
        fontSize: "12px",
        color: "#FF0000",
        align: "center",
      }
    );

    // Update the position of the text in sync with the player
    this.time.addEvent({
      delay: 50, // Update every 50ms
      callback: () => {
        if (this.cooldownText) {
          this.cooldownText.setPosition(
            this.player.x - this.cooldownText.width / 2,
            this.player.y + 20
          );
        }
      },
      repeat: 29, // Repeat for 1.5 seconds (30 calls total)
    });

    // Remove the text after 1.5 seconds
    this.time.delayedCall(1500, () => {
      if (this.cooldownText) {
        this.cooldownText.destroy(); // Remove text
        this.cooldownText = null; // Clear reference
      }
    });
  }
}
