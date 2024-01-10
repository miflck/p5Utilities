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
