import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import PreloadScene from "../scenes/PreloadScene";
import GameScene from "../scenes/GameScene";

const Game = () => {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: { gravity: { y: 300 }, debug: true },
      },
      scene: [PreloadScene, GameScene], // Include both scenes
      parent: gameContainer.current,
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
