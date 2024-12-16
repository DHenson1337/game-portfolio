//Centralize all asset-loading logic.

export const loadAssets = (scene) => {
  // Load the map
  scene.load.tilemapTiledJSON("mossy-map", "/assets/maps/mossy-map.json");

  //  paths for Mossy tilesets
  scene.load.image(
    "mossy-ground",
    "/assets/game-resources/tilesets/mossy/Mossy - TileSet.png"
  );
  scene.load.image(
    "mossy-background",
    "/assets/game-resources/tilesets/mossy/Mossy - BackgroundDecoration.png"
  );
  scene.load.image(
    "mossy-hazards",
    "/assets/game-resources/tilesets/mossy/Mossy - Decorations&Hazards.png"
  );
  scene.load.image(
    "mossy-hanging",
    "/assets/game-resources/tilesets/mossy/Mossy - HangingPlants.png"
  );

  scene.load.image(
    "mossy-hills",
    "/assets/game-resources/tilesets/mossy/Mossy - MossyHills.png"
  );

  scene.load.image(
    "mossy-floating",
    "/assets/game-resources/tilesets/mossy/Mossy - FloatingPlatforms.png"
  );

  // Load parallax background layers
  const basePath = "/assets/game-resources/parallax-backgrounds/forest/";
  const layers = [
    "01_Mist",
    "02_Bushes",
    "03_Particles",
    "04_Forest",
    "05_Particles",
    "06_Forest",
    "07_Forest",
    "08_Forest",
    "09_Forest",
    "10_Sky",
  ];

  layers.forEach((layer) => {
    scene.load.image(layer, `${basePath}${layer}.png`);
  });

  // Load player frames
  for (let i = 0; i <= 19; i++) {
    const frameNumber = i.toString().padStart(5, "0");
    scene.load.image(
      `blueWizardIdleFrame${i + 1}`,
      `/assets/characters/BlueWizard/2BlueWizardIdle/Chara - BlueIdle${frameNumber}.png`
    );
  }

  // Load walk frames
  for (let i = 0; i <= 19; i++) {
    const frameNumber = i.toString().padStart(5, "0");
    scene.load.image(
      `blueWizardWalkFrame${i}`,
      `/assets/characters/BlueWizard/2BlueWizardWalk/Chara_BlueWalk${frameNumber}.png`
    );
  }

  // Load jump frames
  for (let i = 0; i <= 7; i++) {
    const frameNumber = i.toString().padStart(5, "0");
    scene.load.image(
      `blueWizardJumpFrame${i}`,
      `/assets/characters/BlueWizard/2BlueWizardJump/CharaWizardJump_${frameNumber}.png`
    );
  }

  // Load dash frames
  for (let i = 0; i <= 15; i++) {
    const frameNumber = i.toString().padStart(5, "0");
    scene.load.image(
      `blueWizardDashFrame${i}`,
      `/assets/characters/BlueWizard/DashEffect/BlueWizardDash_${frameNumber}.png`
    );
  }
};
