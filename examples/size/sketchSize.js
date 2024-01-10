const easingFunctionNames = Easing.getEasingFunctionNames(); // Array of easing function names

// Create an instance of Easing
const easing = new Easing({
  values: { width: 20 }, // Initial width of the rectangle
  endValues: { width: 200 }, // Target width of the rectangle
  duration: 500, // Animation duration in milliseconds
  easingFunctionName: "easeOutBounce", // Easing function to be used
});

function setup() {
  createCanvas(400, 200);
  console.log(easingFunctionNames);
}

function draw() {
  background(220);

  // Update the easing in each frame
  easing.update();

  // Get the current width from the easing
  const currentWidth = easing.getCurrentValues().width;

  // Draw the rectangle with the current width
  fill(0, 150, 255);
  rect(100, 50, currentWidth, 100);

  // Check if the animation is still running
  if (!easing.isRunning) {
    easing.stop(); // Stop looping once the animation is complete
  }
}

function mousePressed() {
  // Start the animation when the mouse is pressed

  let startSize = easing.getCurrentValues().width === 20 ? 20 : 200;
  let endSize = easing.getCurrentValues().width === 200 ? 20 : 200;

  easing.setStartValues({ width: startSize });
  easing.setEndValues({ width: endSize });

  easing.start();
}
