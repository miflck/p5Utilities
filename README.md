# P5 Utilities

this is a collection of usefull functions and classes for p5 projects

Made by lovely people at Data Design + Art, HSLU Luzern Switzerland

Animator is a JavaScript class for handling animations with easing functions. It provides an easy-to-use interface to create animations with customizable easing functions.

## Installation

No installation is required. Simply include the Animator class in your JavaScript project.

## Usage

### Step 1: Include Animator Class

Include the Animator class in your html file or project.

```html
<script src="path/to/easing.js"></script>
```

### Step 2: Create an Animator Instance

Create an instance of Animator with initial values.

```javascript
const animator = new Animator({
  values: { x: 0, y: 100 },
  endValues: { x: 300, y: 0 },
  duration: 2000, // Animation duration in milliseconds
  easingFunctionName: "easeInOutQuad", // Easing function to be used
});
```

**Explanation of the Config Object:**

- `values`: An object representing the initial values of the animation. you could do n dimensions. In this example, we do two dimentions. the objec sets the initial position to `{ x: 0, y: 100 }`.
- `endValues`: An object representing the target values of the animation. Here, it sets the target position to `{ x: 300, y: 0 }`. this object has to have the same keys as the values object
- `duration`: The duration of the animation in milliseconds. In this case, it's set to `2000` milliseconds (or 2 seconds).
- `easingFunctionName`: The name of the easing function to be used. In this example, it's set to `'easeInOutQuad'`.

**Easing Functions**
The Animator class comes with various easing functions. You can explore and choose the one that fits your animation style. Here are some examples:

- easeInOutQuad
- easeInOutSine
- easeInOutCubic
  For a full list of available easing functions, check the **Animator.getEasingFunctionNames()** method. Its static, you dont need to have an instance to get all easing functions

```javascript
// Get an array of all available easing function names
const allEasingFunctions = Animator.getEasingFunctionNames();

// Log the array of easing function names
console.log(allEasingFunctions);
```

**Animating One Dimension like size:**
To animate just one dimension, you can specify only the relevant property in the values and endValues objects. For example:

```javascript
const animatorLength = new Animator({
  values: { size: 0 },
  endValues: { size: 100 },
  duration: 1000,
  easingFunctionName: "easeInOutQuad",
});
```

**Animating Three Dimensions x, y, z:**
Similarly, for three dimensions:

```javascript
const animatorXYZ = new Animator({
  values: { x: 0, y: 0, z: 0 },
  endValues: { x: 100, y: 50, z: 20 },
  duration: 2000,
  easingFunctionName: "easeInOutQuad",
});
```

Start and stop the animation as needed.

```javascript
// Start the animation
animator.start();

// Stop the animation
animator.stop();
```

Update the animation state in your animation loop.

```javascript
draw(){
  animator.update();
}
```

Get the current values during the animation:

```javascript
const currentValuesDuringAnimation = animator.getCurrentValues();
console.log("Current Values During Animation:", currentValuesDuringAnimation);
```

Check if the animation is running:

```javascript
const running = animator.isRunning;
console.log("Is Running:", running);
```

Get elapsed and remaining time:

```javascript
// Get the elapsed time
const elapsed = animator.getElapsed();
console.log("Elapsed Time:", elapsed, "ms");

// Get the remaining time
const remaining = animator.getRemaining();
console.log("Remaining Time:", remaining, "ms");
```

Set new start values:

```javascript
const newStartValues = { x: 50, y: 150 };
animator.setStartValues(newStartValues);
```

Set new target values:

```javascript
const newTargetValues = { x: 200, y: 50 };
animator.setEndValues(newTargetValues);
```

Get start and end values:

```javascript
const startValues = animator.getValues();
const endValues = animator.getEndValues();
```

Set and get duration:

```javascript
// Get the initial duration
const initialDuration = animator.duration;
console.log("Initial Duration:", initialDuration);

// Set a new duration
const newDuration = 3000; // New duration in milliseconds
animator.duration = newDuration;
```
