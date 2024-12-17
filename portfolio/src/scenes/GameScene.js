// Handle platforms, player, and backgrounds using utility functions

import { createPlatforms } from "../utils/platforms";
import { createPlayer, addPlayerAnimations } from "../utils/player";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    //The Order matters, Load background first so player appears infront of it!

    // Load the new tilemap
    const map = this.make.tilemap({ key: "new-map" });

    // Add tilesets
    const tilesetGround = map.addTilesetImage(
      "TX Tileset Ground",
      "TX Tileset Ground"
    );
    const tilesetProps = map.addTilesetImage(
      "TX Village Props",
      "TX Village Props"
    );

    // Create Layers
    const groundLayer = map.createLayer("Ground", tilesetGround, 0, 0);
    const floatingPlatformsLayer = map.createLayer(
      "FloatingPlatforms",
      tilesetGround,
      0,
      0
    );
    const backgroundPropsLayer = map.createLayer(
      "BackgroundProps",
      tilesetProps,
      0,
      0
    );
    const obstaclesLayer = map.createLayer("Obstacles", tilesetProps, 0, 0);
    const animationsLayer = map.createLayer("Animations", tilesetGround, 0, 0);

    // Set Collision on Ground, Floating Platforms, and Obstacles
    groundLayer.setCollisionByProperty({ collides: true });
    floatingPlatformsLayer.setCollisionByProperty({ collides: true });
    obstaclesLayer.setCollisionByProperty({ collides: true });

    // Debugging collision (optional)
    floatingPlatformsLayer.renderDebug(this.add.graphics(), {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(255, 0, 0, 200),
    });

    // Set the world bounds larger than the visible screen
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Add Player
    this.player = createPlayer(this);
    this.physics.add.collider(this.player, groundLayer);
    this.physics.add.collider(this.player, floatingPlatformsLayer);
    this.physics.add.collider(this.player, obstaclesLayer);

    // Camera Follow
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // Depth Sorting
    backgroundPropsLayer.setDepth(0); // Background Props
    groundLayer.setDepth(1); // Main Ground
    floatingPlatformsLayer.setDepth(2); // Platforms
    obstaclesLayer.setDepth(3); // Obstacles
    this.player.setDepth(4); // Player

    //Sets player starting position
    this.player.setPosition(0, map.heightInPixels - 1380);

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

//=======================================OLD CODE ===========================================
// Add parallax layers dynamically
/*  this.sky = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "10_Sky")
 .setOrigin(0, 0)
 .setScrollFactor(0);

this.backgroundForest = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "09_Forest")
 .setOrigin(0, 0)
 .setScrollFactor(0.1);

this.distantForest = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "08_Forest")
 .setOrigin(0, 0)
 .setScrollFactor(0.2);

this.midgroundForest = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "07_Forest")
 .setOrigin(0, 0)
 .setScrollFactor(0.3);

this.nearMidgroundForest = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "06_Forest")
 .setOrigin(0, 0)
 .setScrollFactor(0.4);

this.foregroundForest = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "04_Forest")
 .setOrigin(0, 0)
 .setScrollFactor(0.5);

this.bushes = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "02_Bushes")
 .setOrigin(0, 0)
 .setScrollFactor(0.6);

this.particles1 = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "03_Particles")
 .setOrigin(0, 0)
 .setScrollFactor(0.7);

this.particles2 = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "05_Particles")
 .setOrigin(0, 0)
 .setScrollFactor(0.8);

this.mist = this.add
 .tileSprite(0, 0, this.scale.width, this.scale.height, "01_Mist")
 .setOrigin(0, 0)
 .setScrollFactor(0.9)
 .setAlpha(0.7); // Reduce opacity for a softer effect
 */
// Add platforms
// this.platforms = createPlatforms(this);

// // Add collision properties
// groundLayer.setCollisionByProperty({ collides: true });
// hazardsLayer.setCollisionByProperty({ collides: true });

/* 

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

/* 
    const map = this.make.tilemap({ key: "mossy-map" });

    // Add tilesets (these names match Tiled tileset names)
    const mossyBackground = map.addTilesetImage(
      "MossyBackground",
      "mossy-background"
    );
    const mossyFloatingPlatforms = map.addTilesetImage(
      "MossyFloatingPlatforms",
      "mossy-floating"
    );
    const mossyGround = map.addTilesetImage("MossyGround", "mossy-ground");
    const mossyHangingPlants = map.addTilesetImage(
      "MossyHangingPlants",
      "mossy-hanging"
    );
    const mossyHazards = map.addTilesetImage("MossyHazards", "mossy-hazards");
    const mossyHills = map.addTilesetImage("MossyHills", "mossy-hills");

    const mossyDecorations = map.addTilesetImage(
      "MossyHazards", // Tiled tileset name
      "mossy-decorations" // Texture key from PreloadScene.js
    ); */
