//Centralize all asset-loading logic.

export const loadAssets = (scene) => {
  // Load the map
  // Load the new tilemap
  scene.load.tilemapTiledJSON("new-map", "/assets/maps/new-map.json");

  // Load tilesets
  scene.load.image(
    "TX Tileset Ground",
    "/assets/game-resources/tilesets/TX Tileset Ground.png"
  );
  scene.load.image(
    "TX Village Props",
    "/assets/game-resources/tilesets/TX Village Props.png"
  );

  // Load animated tilesets as spritesheets
  scene.load.spritesheet(
    "TX Chest Animation",
    "/assets/game-resources/tilesets/TX Chest Animation.png",
    {
      frameWidth: 32,
      frameHeight: 32,
    }
  );
  scene.load.spritesheet(
    "TX FX Torch Flame",
    "/assets/game-resources/tilesets/TX FX Torch Flame.png",
    {
      frameWidth: 32,
      frameHeight: 32,
    }
  );
  scene.load.spritesheet(
    "TX FX Flame",
    "/assets/game-resources/tilesets/TX FX Flame.png",
    {
      frameWidth: 32,
      frameHeight: 32, // Manually set this even if the sprite isn't exactly aligned
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

//==================================OLD CODE =========================

/*   // Load parallax background layers
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
  }); */
