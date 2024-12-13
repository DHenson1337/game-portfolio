//Centralize all asset-loading logic.

export const loadAssets = (scene) => {
  // Load tileset
  scene.load.image("tileset", "/assets/game-resources/tilesets/tileset1.png");

  // Load parallax background layers
  ["background1", "background2", "background3", "background4a"].forEach(
    (key) => {
      scene.load.image(
        key,
        `/assets/game-resources/parallax-backgrounds/caves/option1/${key}.png`
      );
    }
  );

  // Load player frames
  for (let i = 0; i <= 19; i++) {
    const frameNumber = i.toString().padStart(5, "0");
    scene.load.image(
      `blueWizardIdleFrame${i + 1}`,
      `/assets/characters/BlueWizard/2BlueWizardIdle/Chara - BlueIdle${frameNumber}.png`
    );
  }
};
