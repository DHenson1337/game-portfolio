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
          // Load background
          this.load.image("sky", "/assets/backgrounds/sky.png");

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
          // Add background
          this.add.image(400, 300, "sky");

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
