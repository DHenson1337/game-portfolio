//Create and animate the Player

export const createPlayer = (scene) => {
  const player = scene.physics.add.sprite(100, 450, "blueWizardIdleFrame1");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  return player;
};

export const addPlayerAnimations = (scene) => {
  // Idle Animation
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

  //Walking Animation
  const walkFrames = [];
  for (let i = 0; i <= 19; i++) {
    walkFrames.push({ key: `blueWizardWalkFrame${i}` });
  }
  scene.anims.create({
    key: "walk",
    frames: walkFrames,
    frameRate: 14,
    repeat: -1,
  });

  //Jumping Animation
  const jumpFrames = [];
  for (let i = 0; i <= 7; i++) {
    jumpFrames.push({ key: `blueWizardJumpFrame${i}` });
  }
  scene.anims.create({
    key: "jump",
    frames: jumpFrames,
    frameRate: 10,
    repeat: 0, // Play once
  });

  // Dashing Animation
  const dashFrames = [];
  for (let i = 0; i <= 15; i++) {
    dashFrames.push({ key: `blueWizardDashFrame${i}` });
  }
  scene.anims.create({
    key: "dash",
    frames: dashFrames,
    frameRate: 20,
    repeat: 0, // Play once
  });
};
