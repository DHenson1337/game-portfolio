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

          // Dynamically generate idle animation
          const idleFrames = [];
          for (let i = 1; i <= 20; i++) {
            idleFrames.push({ key: `blueWizardIdleFrame${i}` });
          }

          // Create the player sprite and animation
          const player = this.physics.add.sprite(
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
          player.play("idle");
          player.setCollideWorldBounds(true);
        },

        update: function () {
          // Scroll the parallax background layers
          this.background1.tilePositionX += 0.1; // Slowest
          this.background2.tilePositionX += 0.3;
          this.background3.tilePositionX += 0.6;
          this.background4a.tilePositionX += 1.0; // Fastest
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
