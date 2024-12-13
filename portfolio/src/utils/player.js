//Create and animate the Player

export const createPlayer = (scene) => {
  const player = scene.physics.add.sprite(100, 450, "blueWizardIdleFrame1");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  return player;
};

export const addPlayerAnimations = (scene) => {
  const idleFrames = [];
  for (let i = 1; i <= 20; i++) {
    idleFrames.push({ key: `blueWizardIdleFrame${i}` });
  }
  scene.anims.create({
    key: "idle",
    frames: idleFrames,
    frameRate: 10,
    repeat: -1,
  });
};
