/*

How to use it

// Example 1D animation with default values
const easing1D = new Easing({
  values: [50],
  duration: 1000,
  easingFunctionName: "easeInOutSine",
});

// Example 2D animation with specified values and targetValues
const easing2D = new Easing({
  values: [50, 100],
  targetValues: [200, 300],
  duration: 1500,
  easingFunctionName: "easeInOutQuad",
});

// Example 3D animation
const easing3D = new Easing({
  values: [50, 100, 150],
  targetValues: [200, 300, 250],
  duration: 2000,
  easingFunctionName: "easeInOutCubic",
});

// Configuration object for a 4D animation
const config4D = {
  values: [50, 100, 150, 200],
  targetValues: [200, 300, 250, 150],
  duration: 2500,
  easingFunctionName: 'easeInOutQuartic',
};

// Initialize the Easing with the config object
const easing4D = new Easing(config4D);
*/

let t; // Timer instance
let easings = []; // Array to store Easing instances
const easingFunctionNames = Easing.getEasingFunctionNames(); // Array of easing function names
const numberOfEasingFunctions = easingFunctionNames.length; // Number of easing functions

function setup() {
  createCanvas(600, 600);
  background(0);

  // Initialize and start the timer
  t = new Timer(callback, 2000);
  t.start();

  console.log(easingFunctionNames);

  // Create Easing instances based on the number of easing functions
  for (let i = 0; i < numberOfEasingFunctions; i++) {
    // Calculate initial Y position for each Easing
    let initialY = map(i, 0, numberOfEasingFunctions - 1, 50, height - 50);
    // Get the current easing function name
    let easingFunctionName = easingFunctionNames[i % numberOfEasingFunctions];
    // Create an Easing with initial config object
    let easing = new Easing({
      values: { x: 150, y: initialY },
      endValues: { x: width - 50, y: initialY },
      duration: 1000,
      easingFunctionName: easingFunctionName,
    });
    easing.start();
    easings.push(easing); // Add Easing to the array
  }
}

function draw() {
  background(0, 50); // Semi-transparent background for trails

  // Update each Easing's state
  easings.forEach((easing, index) => {
    easing.update();
  });

  // Draw each Easing's current position and display easing function name
  easings.forEach((easing, index) => {
    let currentPosition = easing.getCurrentValues();
    fill(255);
    ellipse(currentPosition.x, currentPosition.y, 10, 10);
    let easingFunctionName =
      easingFunctionNames[index % numberOfEasingFunctions];
    text(easingFunctionName, 10, currentPosition.y);
  });
}

function keyPressed() {
  // Toggle the timer on "s" key press
  if (key == "s") {
    console.log("timer", t.isRunning);
    if (t.isRunning) {
      t.stop();
    } else {
      t.start();
    }
  }

  // Trigger a single Easing's movement on "t" key press
  if (key == "t") {
    let newX = random(width);
    let newY = random(height);
    let newDuration = 500;
    easings[0].duration = newDuration;
    easings[0].setTargetPosition(newX, newY);
    easings[0].start();
  }

  // Reset and animate all Easings on "r" key press
  if (key == "r") {
    easings.forEach((easing, index) => {
      let initialY = map(index, 0, easings.length - 1, 50, height - 50);
      let startX = easing.getCurrentValues().x;
      let targetX = 150;

      // Set start and target positions, duration, and start the animation
      easing.setStartValues({ x: startX, y: initialY });
      easing.setEndValues({ x: targetX, y: initialY });
      easing.duration = max(t.remainingTime - 150, 0);
      easing.start();
    });
  }
}

// Callback function for the timer tick
function callback() {
  console.log("tick");
  easings.forEach((easing, index) => {
    let initialY = map(index, 0, easings.length - 1, 50, height - 50);

    let startX = easing.getCurrentValues().x === width - 50 ? width - 50 : 150;
    let targetX = easing.getCurrentValues().x === 150 ? width - 50 : 150;

    // Set start and target positions, duration, and start the animation
    easing.setStartValues({ x: startX, y: initialY });
    easing.setEndValues({ x: targetX, y: initialY });
    easing.duration = 1500;
    easing.start();
  });
}
