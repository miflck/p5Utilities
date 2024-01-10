# P5 Utilities

this is a collection of usefull functions and classes for p5 projects

Made by lovely people at Data Design + Art, HSLU Luzern Switzerland

Animator is a JavaScript class for handling animations with easing functions. It provides an easy-to-use interface to create animations with customizable easing functions.

## Installation

No installation is required. Simply include the Animator class in your JavaScript project.

```html
<script src="path/to/easing.js"></script>
```

## Usage

### Step 1: Include Animator Class

Include the Animator class in your JavaScript file or project.

### Step 2: Create an Animator Instance

Create an instance of Animator with initial values.

```javascript
// Your JavaScript code here
const animator = new Animator({
  values: { x: 0, y: 100 },
  endValues: { x: 300, y: 0 },
  duration: 2000, // Animation duration in milliseconds
  easingFunctionName: "easeInOutQuad", // Easing function to be used
});
```
