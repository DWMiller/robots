const { prompt } = require('inquirer');

const reader = require('./reader');
const simulation = require('./simulation');
const ui = require('./ui');

let done = false;

async function step(runUntilDone = true) {
  const nextInput = await reader.next();

  if (!nextInput) {
    done = true;
    return;
  }

  const report = simulation.step(nextInput);

  if (runUntilDone) {
    process.nextTick(step);
  } else {
    ui.printRobotMovement(report);
  }
}

const commands = {
  step() {
    step(false);
  },
  displayRobot: ui.printRobotPositions,
  displayPresentCount: ui.printHousesWithPresents,
  displayDeliveryCount: ui.printDeliveryCount,
  run() {
    step(true);
  },
  exit() {
    process.exit();
  },
};

async function promptUser() {
  choices = done
    ? ui.inputOptions.filter(choice => !choice.hideOnCompletion)
    : ui.inputOptions;

  console.log('\r\n');
  const { choice } = await prompt({
    type: 'list',
    name: 'choice',
    default: 0,
    choices,
  });

  const commandFunction = commands[choice];

  await commandFunction(simulation.getState());

  if (choice === 'run') {
    done = true;
  }

  process.nextTick(promptUser);
}

function start({ robotCount = 1, inputPath = 'inputs.txt' } = {}) {
  simulation.initialize(robotCount);

  reader.open(inputPath).then(promptUser);
}

prompt(ui.startUpQuestions).then(start);
// start(); // uncomment to run with default params
