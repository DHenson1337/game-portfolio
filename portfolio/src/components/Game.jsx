import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const Game = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 300 }, debug: false },
      },
      scene: {
        preload: function () {
          //Load the tileset
          this.load.image(
            "tileset",
            "/assets/game-resources/tilesets/tileset1.png"
          );

          // Load parallax background layers
          this.load.image(
            "background1",
            "/assets/game-resources/parallax-backgrounds/caves/option1/background1.png"
          );
          this.load.image(
            "background2",
            "/assets/game-resources/parallax-backgrounds/caves/option1/background2.png"
          );
          this.load.image(
            "background3",
            "/assets/game-resources/parallax-backgrounds/caves/option1/background3.png"
          );
          this.load.image(
            "background4a",
            "/assets/game-resources/parallax-backgrounds/caves/option1/background4a.png"
          );

          // Load player animation frames
          for (let i = 0; i <= 19; i++) {
            const frameNumber = i.toString().padStart(5, "0");
            this.load.image(
              `blueWizardIdleFrame${i + 1}`,
              `/assets/characters/BlueWizard/2BlueWizardIdle/Chara - BlueIdle${frameNumber}.png`
            );
          }
        },

        create: function () {
          const platforms = this.physics.add.staticGroup();

          // Add ground and platforms
          platforms.create(400, 580, "tileset").setScale(2).refreshBody(); // Ground
          platforms.create(200, 450, "tileset");
          platforms.create(600, 350, "tileset");
          platforms.create(400, 250, "tileset");

          this.platforms = platforms; // Store reference for later use

          // Add parallax background layers
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

          // Custom Keys for Controls
          this.keys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.SPACE,
          });

          // Dynamically generate idle animation
          const idleFrames = [];
          for (let i = 1; i <= 20; i++) {
            idleFrames.push({ key: `blueWizardIdleFrame${i}` });
          }

          // Create the player sprite and animation
          this.player = this.physics.add.sprite(
            100,
            450,
            "blueWizardIdleFrame1"
          );
          this.anims.create({
            key: "idle",
            frames: idleFrames,
            frameRate: 10,
            repeat: -1,
          });

          // Play the idle animation
          this.player.play("idle");
          this.player.setBounce(0.2); // Slight bounce when landing
          this.player.setCollideWorldBounds(true);

          // Add Collision Between Character and Platform
          this.physics.add.collider(this.player, this.platforms);
        },
        update: function () {
          // Scroll the parallax background layers
          this.background1.tilePositionX += 0.1; // Slowest
          this.background2.tilePositionX += 0.3;
          this.background3.tilePositionX += 0.6;
          this.background4a.tilePositionX += 1.0; // Fastest

          const speed = 160; // Movement speed
          const jumpPower = -330; // Jump height

          if (this.keys.left.isDown) {
            this.player.setVelocityX(-speed); // Move left
          } else if (this.keys.right.isDown) {
            this.player.setVelocityX(speed); // Move right
          } else {
            this.player.setVelocityX(0); // Stop moving when no key is pressed
          }

          if (this.keys.jump.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(jumpPower); // Jump when touching the ground
          }

          //debugging to see if the correct keys are detected
          if (this.keys.left.isDown) console.log("Moving Left");
          if (this.keys.right.isDown) console.log("Moving Right");
          if (this.keys.jump.isDown) console.log("Jumping");
        },
      },
      parent: gameContainer.current, // Attach Phaser to this DOM node
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true); // Clean up Phaser on unmount
    };
  }, []);

  return (
    <div ref={gameContainer} style={{ width: "800px", height: "600px" }} />
  );
};

export default Game;
