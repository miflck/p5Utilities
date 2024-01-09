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
    // Create an Animator with initial parameters
    let animator = new Animator(150, initialY, 1000, easingFunctionName);
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
    let currentPosition = animator.getCurrentPosition();
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
      let startX = animator.getCurrentPosition().x;
      let targetX = 150;

      // Set start and target positions, duration, and start the animation
      animator.setStartPosition(startX, initialY);
      animator.setTargetPosition(targetX, initialY);
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
      animator.getCurrentPosition().x === width - 50 ? width - 50 : 150;
    let targetX = animator.getCurrentPosition().x === 150 ? width - 50 : 150;

    // Set start and target positions, duration, and start the animation
    animator.setStartPosition(startX, initialY);
    animator.setTargetPosition(targetX, initialY);
    animator.duration = 1500;
    animator.start();
  });
}
