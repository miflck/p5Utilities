// Instance mode function
const swingsketch = function (p5) {
  let t; // Timer instance
  let easings = []; // Array to store Easing instances
  const easingFunctionNames = Easing.getEasingFunctionNames(); // Array of easing function names
  const numberOfEasingFunctions = easingFunctionNames.length; // Number of easing functions

  p5.setup = function () {
    p5.createCanvas(600, 600);
    p5.background(0);

    // Initialize and start the timer
    t = new Timer(callback, 2000);
    t.start();

    console.log(easingFunctionNames);

    // Create Easing instances based on the number of easing functions
    for (let i = 0; i < numberOfEasingFunctions; i++) {
      // Calculate initial Y position for each Easing
      let initialY = p5.map(
        i,
        0,
        numberOfEasingFunctions - 1,
        50,
        p5.height - 50
      );
      // Get the current easing function name
      let easingFunctionName = easingFunctionNames[i % numberOfEasingFunctions];
      // Create an Easing with initial config object
      let easing = new Easing({
        values: { x: 150, y: initialY },
        endValues: { x: p5.width - 50, y: initialY },
        duration: 1000,
        easingFunctionName: easingFunctionName,
      });
      easing.start();
      easings.push(easing); // Add Easing to the array
    }
  };

  p5.draw = function () {
    p5.background(0, 50); // Semi-transparent background for trails

    // Update each Easing's state
    easings.forEach((easing, index) => {
      easing.update();
    });

    // Draw each Easing's current position and display easing function name
    easings.forEach((easing, index) => {
      let currentPosition = easing.getCurrentValues();
      p5.fill(255);
      p5.ellipse(currentPosition.x, currentPosition.y, 10, 10);
      let easingFunctionName =
        easingFunctionNames[index % numberOfEasingFunctions];
      p5.text(easingFunctionName, 10, currentPosition.y);
    });
  };

  p5.keyPressed = function () {
    // Toggle the timer on "s" key press
    if (p5.key == "s") {
      console.log("timer", t.isRunning);
      if (t.isRunning) {
        t.stop();
      } else {
        t.start();
      }
    }

    // Trigger a single Easing's movement on "t" key press
    if (p5.key == "t") {
      let newX = p5.random(p5.width);
      let newY = p5.random(p5.height);
      let newDuration = 500;
      easings[0].duration = newDuration;
      easings[0].setTargetPosition(newX, newY);
      easings[0].start();
    }

    // Reset and animate all Easings on "r" key press
    if (p5.key == "r") {
      easings.forEach((easing, index) => {
        let initialY = p5.map(index, 0, easings.length - 1, 50, p5.height - 50);
        let startX = easing.getCurrentValues().x;
        let targetX = 150;

        // Set start and target positions, duration, and start the animation
        easing.setStartValues({ x: startX, y: initialY });
        easing.setEndValues({ x: targetX, y: initialY });
        easing.duration = p5.max(t.remainingTime - 150, 0);
        easing.start();
      });
    }
  };

  // Callback function for the timer tick
  function callback() {
    console.log("tick");
    easings.forEach((easing, index) => {
      let initialY = p5.map(index, 0, easings.length - 1, 50, p5.height - 50);

      let startX =
        easing.getCurrentValues().x === p5.width - 50 ? p5.width - 50 : 150;
      let targetX = easing.getCurrentValues().x === 150 ? p5.width - 50 : 150;

      // Set start and target positions, duration, and start the animation
      easing.setStartValues({ x: startX, y: initialY });
      easing.setEndValues({ x: targetX, y: initialY });
      easing.duration = 1500;
      easing.start();
    });
  }
};

// Create an instance of the first sketch
new p5(swingsketch, "sketch-container-1");

const sizesketch = (p) => {
  // Instance of Easing
  const easing = new Easing({
    values: { width: 20 },
    endValues: { width: 200 },
    duration: 500,
    easingFunctionName: "easeOutBounce",
  });

  p.setup = () => {
    p.createCanvas(400, 200);
  };

  p.draw = () => {
    p.background(220);

    // Update the easing in each frame
    easing.update();

    // Get the current width from the easing
    const currentWidth = easing.getCurrentValues().width;

    // Draw the rectangle with the current width
    p.fill(0, 150, 255);
    p.rect(100, 50, currentWidth, 100);

    // Check if the animation is still running
    if (!easing.isRunning) {
      easing.stop(); // Stop looping once the animation is complete
    }
  };

  p.mousePressed = () => {
    // Start the animation when the mouse is pressed

    let startSize = easing.getCurrentValues().width === 20 ? 20 : 200;
    let endSize = easing.getCurrentValues().width === 200 ? 20 : 200;

    easing.setStartValues({ width: startSize });
    easing.setEndValues({ width: endSize });

    easing.start();
  };
};

// Create an instance of the first sketch
new p5(sizesketch, "sketch-container-2");
