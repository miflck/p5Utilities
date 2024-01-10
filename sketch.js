/*

How to use it

// Example 1D animation with default values
const animator1D = new Animator({
  values: [50],
  duration: 1000,
  easingFunctionName: "easeInOutSine",
});

// Example 2D animation with specified values and targetValues
const animator2D = new Animator({
  values: [50, 100],
  targetValues: [200, 300],
  duration: 1500,
  easingFunctionName: "easeInOutQuad",
});

// Example 3D animation
const animator3D = new Animator({
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

// Initialize the Animator with the config object
const animator4D = new Animator(config4D);
*/

let t; // Timer instance
let animators = []; // Array to store Animator instances
const easingFunctionNames = Animator.getEasingFunctionNames(); // Array of easing function names
const numberOfEasingFunctions = easingFunctionNames.length; // Number of easing functions

function setup() {
  createCanvas(600, 600);
  background(0);

  // Initialize and start the timer
  t = new Timer(callback, 2000);
  t.start();

  console.log(easingFunctionNames);

  // Create Animator instances based on the number of easing functions
  for (let i = 0; i < numberOfEasingFunctions; i++) {
    // Calculate initial Y position for each Animator
    let initialY = map(i, 0, numberOfEasingFunctions - 1, 50, height - 50);
    // Get the current easing function name
    let easingFunctionName = easingFunctionNames[i % numberOfEasingFunctions];
    // Create an Animator with initial config object
    let animator = new Animator({
      values: { x: 150, y: initialY },
      endValues: { x: width - 50, y: initialY },
      duration: 1000,
      easingFunctionName: easingFunctionName,
    });
    animator.start();
    animators.push(animator); // Add Animator to the array
  }
}

function draw() {
  background(0, 50); // Semi-transparent background for trails

  // Update each Animator's state
  animators.forEach((animator, index) => {
    animator.update();
  });

  // Draw each Animator's current position and display easing function name
  animators.forEach((animator, index) => {
    let currentPosition = animator.getCurrentValues();
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

  // Trigger a single Animator's movement on "t" key press
  if (key == "t") {
    let newX = random(width);
    let newY = random(height);
    let newDuration = 500;
    animators[0].duration = newDuration;
    animators[0].setTargetPosition(newX, newY);
    animators[0].start();
  }

  // Reset and animate all Animators on "r" key press
  if (key == "r") {
    animators.forEach((animator, index) => {
      let initialY = map(index, 0, animators.length - 1, 50, height - 50);
      let startX = animator.getCurrentValues().x;
      let targetX = 150;

      // Set start and target positions, duration, and start the animation
      animator.setStartValues({ x: startX, y: initialY });
      animator.setEndValues({ x: targetX, y: initialY });
      animator.duration = max(t.remainingTime - 150, 0);
      animator.start();
    });
  }
}

// Callback function for the timer tick
function callback() {
  console.log("tick");
  animators.forEach((animator, index) => {
    let initialY = map(index, 0, animators.length - 1, 50, height - 50);

    let startX =
      animator.getCurrentValues().x === width - 50 ? width - 50 : 150;
    let targetX = animator.getCurrentValues().x === 150 ? width - 50 : 150;

    // Set start and target positions, duration, and start the animation
    animator.setStartValues({ x: startX, y: initialY });
    animator.setEndValues({ x: targetX, y: initialY });
    animator.duration = 1500;
    animator.start();
  });
}
