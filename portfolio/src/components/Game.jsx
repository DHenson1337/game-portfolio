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
          this.load.image("sky", "assets/backgrounds/sky.png");
          this.load.image("ground", "assets/platforms/ground.png");
          this.load.spritesheet("player", "assets/characters/blue-wizard.png", {
            frameWidth: 32,
            frameHeight: 48,
          });
        },
        create: function () {
          this.add.image(400, 300, "sky");
          const player = this.physics.add.sprite(100, 450, "player");
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
