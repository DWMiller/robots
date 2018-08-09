const state = {
  occupiedLocations: new Set(),
  touchedLocations: new Set(),
  deliveries: 0,
  robots: [],
  turnCounter: 0,
};

exports.initialize = (robotCount = 1) => {
  console.log(robotCount);
  state.robots = Array.from({ length: robotCount }).map((x, i) => ({
    name: `Robot ${i + 1}`,
    pos: {
      x: 0,
      y: 0,
    },
  }));
};

const movementFunctions = {
  '^': obj => obj.pos.y--,
  v: obj => obj.pos.y++,
  '<': obj => obj.pos.x--,
  '>': obj => obj.pos.x++,
};

exports.step = command => {
  const robot = state.robots[state.turnCounter % state.robots.length];
  state.turnCounter++;

  state.occupiedLocations.delete(JSON.stringify(robot.pos));

  movementFunctions[command](robot);
  const newLocation = JSON.stringify(robot.pos);
  const canDeliver = !state.occupiedLocations.has(newLocation);

  if (canDeliver) {
    state.deliveries++;
  }

  state.touchedLocations.add(newLocation);
  state.occupiedLocations.add(newLocation);

  return {
    robot,
    command,
    delivered: canDeliver,
  };
};

exports.getState = () => state;
