/**
 * Animator class for handling animations with easing functions.
 * @class
 */
class Animator {
  /**
   * Constructor for the Animator class.
   * @param {number} initialX - Initial x-coordinate of the animation.
   * @param {number} initialY - Initial y-coordinate of the animation.
   * @param {number} duration - Duration of the animation in milliseconds.
   * @param {string} easingFunctionName - Name of the easing function to be used.
   */
  constructor(initialX, initialY, duration, easingFunctionName) {
    // Initial position
    this.x = initialX;
    this.y = initialY;

    // Starting position used for interpolation
    this.startX = initialX;
    this.startY = initialY;

    // Duration of the animation
    this._duration = duration;

    // Timestamp when the animation started
    this.startTime = 0;

    // Easing function
    this.easingFunction =
      Animator.EasingFunctions[easingFunctionName] ||
      Animator.EasingFunctions.easeInOutSine;

    // Target position for the animation
    this.newX = initialX;
    this.newY = initialY;

    // Flag indicating if the animation is running
    this._running = false;
  }

  /* ---- ANIMATION CONTROL ---- */

  /**
   * Starts the animation.
   * @function
   */
  start() {
    this.startTime = millis();
    this._running = true;
  }

  /**
   * Stops the animation.
   * @function
   */
  stop() {
    this._running = false;
  }

  /**
   * Updates the animation state.
   * @function
   */
  update() {
    if (!this._running) return;

    // Calculate the percentage of completion based on elapsed time
    let elapsedTime = millis() - this.startTime;
    let percent = min(elapsedTime / this._duration, 1);

    // Use the easing function to calculate the current position
    this.x = this.easingFunction(
      percent,
      this.startX,
      this.newX - this.startX,
      1
    );
    this.y = this.easingFunction(
      percent,
      this.startY,
      this.newY - this.startY,
      1
    );

    // Stop the animation after reaching the final position
    if (percent === 1) {
      this._running = false;
      this.startX = this.x;
      this.startY = this.y;
    }
  }

  /* ---- POSITION MANAGEMENT ---- */

  /**
   * Gets the current position of the animation.
   * @returns {Object} - Object with x and y properties representing the current position.
   */
  getCurrentPosition() {
    return { x: this.x, y: this.y };
  }

  /**
   * Sets the start position of the animation.
   * @param {number} newX - New x-coordinate for the start position.
   * @param {number} newY - New y-coordinate for the start position.
   * @function
   */
  setStartPosition(newX, newY) {
    this.x = newX;
    this.startX = newX;
    this.y = newY;
    this.startY = newY;
  }

  /**
   * Sets the target position for the animation.
   * @param {number} newX - New x-coordinate for the target position.
   * @param {number} newY - New y-coordinate for the target position.
   * @function
   */
  setTargetPosition(newX, newY) {
    this.newX = newX;
    this.newY = newY;
  }

  /* ---- DURATION MANAGEMENT ---- */

  /**
   * Sets the duration of the animation.
   * @param {number} newDuration - New duration for the animation in milliseconds.
   * @function
   */
  set duration(newDuration) {
    this._duration = newDuration;
  }

  /**
   * Gets the duration of the animation.
   * @returns {number} - Duration of the animation in milliseconds.
   * @function
   */
  get duration() {
    return this._duration;
  }

  /* ---- TIME MANAGEMENT ---- */

  /**
   * Gets the elapsed time since the animation started.
   * @returns {number} - Elapsed time in milliseconds.
   * @function
   */
  getElapsed() {
    if (this._running) {
      return millis() - this.startTime;
    } else {
      return 0;
    }
  }

  /**
   * Gets the remaining time until the animation completes.
   * @returns {number} - Remaining time in milliseconds.
   * @function
   */
  getRemaining() {
    if (this._running) {
      return max(0, this._duration - (millis() - this.startTime));
    } else {
      return 0;
    }
  }

  /* ---- ANIMATION STATE ---- */

  /**
   * Checks if the animation is currently running.
   * @returns {boolean} - True if the animation is running, false otherwise.
   * @function
   */
  get isRunning() {
    return this._running;
  }

  /**
   * Sets the running state of the animation.
   * @param {boolean} bool - Flag indicating whether the animation is running or not.
   * @function
   */
  set isRunning(bool) {
    this._running = bool;
  }
}

/**
 * Static property containing easing functions.
 * @type {Object}
 * @static
 */
Animator.EasingFunctions = {
  easeLinear(t, b, c, d) {
    return (c * t) / d + b;
  },

  easeInQuad(t, b, c, d) {
    t /= d;
    return c * t * t + b;
  },

  easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  },

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  },

  easeInSine(t, b, c, d) {
    return -c * cos((t / d) * (PI / 2)) + c + b;
  },

  easeOutSine(t, b, c, d) {
    return c * sin((t / d) * (PI / 2)) + b;
  },

  easeInOutSine(t, b, c, d) {
    return (-c / 2) * (cos((PI * t) / d) - 1) + b;
  },

  easeInCubic(t, b, c, d) {
    t /= d;
    return c * t * t * t + b;
  },
  easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },

  easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  },

  easeInQuartic(t, b, c, d) {
    t /= d;
    return c * t * t * t * t + b;
  },
  easeInQuintic(t, b, c, d) {
    t /= d;
    return c * t * t * t * t * t + b;
  },
  easeOutQuartic(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  },
  easeInOutQuartic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
  },
  easeOutQuintic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
  },
  easeInOutQuintic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t * t * t + 2) + b;
  },
  easeOutBounce(t, b, c, d) {
    if ((t /= d) < 1 / 2.75) {
      return c * (7.5625 * t * t) + b;
    } else if (t < 2 / 2.75) {
      return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
    } else if (t < 2.5 / 2.75) {
      return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
    } else {
      return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
    }
  },
  easeInElastic(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    let s;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * PI)) * Math.asin(c / a);
    }
    return -(a * pow(2, 10 * (t -= 1)) * sin(((t * d - s) * (2 * PI)) / p)) + b;
  },

  easeOutElastic(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    let s;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * PI)) * Math.asin(c / a);
    }
    return a * pow(2, -10 * t) * sin(((t * d - s) * (2 * PI)) / p) + c + b;
  },

  easeInOutElastic(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d / 2) === 2) return b + c;
    if (!p) p = d * (0.3 * 1.5);
    let s;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * PI)) * Math.asin(c / a);
    }
    if (t < 1) {
      return (
        -0.5 * (a * pow(2, 10 * (t -= 1)) * sin(((t * d - s) * (2 * PI)) / p)) +
        b
      );
    }
    return (
      a * pow(2, -10 * (t -= 1)) * sin(((t * d - s) * (2 * PI)) / p) * 0.5 +
      c +
      b
    );
  },
};

/**
 * Gets an array of easing function names.
 * @returns {string[]} - Array of easing function names.
 * @static
 * @function
 */
Animator.getEasingFunctionNames = function () {
  return Object.keys(Animator.EasingFunctions);
};
