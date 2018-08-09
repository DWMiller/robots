exports.startUpQuestions = [
  {
    type: 'input',
    name: 'inputs.txt',
    default: 'inputs.txt',
    message: 'Path to inputs file (inputs.txt is default)',
  },
  {
    type: 'input',
    name: 'robotCount',
    default: 1,
    message: 'How many robots to use (1 is default)',
  },
];

exports.inputOptions = [
  { value: 'step', hideOnCompletion: true, name: 'Step through one turn' },
  { value: 'displayRobot', name: 'Display robot positions' },
  {
    value: 'displayPresentCount',
    name: 'Display houses with presents count',
  },
  {
    value: 'displayDeliveryCount',
    name: 'Display presents delivered count',
  },
  { value: 'run', hideOnCompletion: true, name: 'Run simulation' },
  { value: 'exit', name: 'Exit' },
];

exports.printRobotPositions = async ({ robots }) => {
  const robotStrings = robots
    .map(({ name, pos: { x, y } }) => `${name}: X: ${x}, Y: ${y}`)
    .join('\r\n');

  console.log(robotStrings);
};

exports.printHousesWithPresents = async ({ touchedLocations }) => {
  const houseswithPresents = touchedLocations.size;
  console.log(`${houseswithPresents} houses have received deliveries.`);
};

exports.printDeliveryCount = async ({ deliveries }) => {
  const deliveryCount = deliveries;
  console.log(`Total Deliveries: ${deliveryCount}`);
};

const directionLabels = {
  '^': 'north',
  v: 'south',
  '<': 'west',
  '>': 'east',
};

exports.printRobotMovement = ({robot, command, delivered}) => {
  delivered = delivered ? 'delivered' : 'did not deliver';
  console.log(
    `${robot.name} moved ${
      directionLabels[command]
    } and ${delivered} a present.`
  );
};
