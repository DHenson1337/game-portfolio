//Create and manage platforms.

export const createPlatforms = (scene) => {
  const platforms = scene.physics.add.staticGroup();
  platforms.create(400, 580, "tileset").setScale(2).refreshBody();
  platforms.create(200, 450, "tileset");
  platforms.create(600, 350, "tileset");
  platforms.create(400, 250, "tileset");
  return platforms;
};
