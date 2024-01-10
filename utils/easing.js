/**
 * Easing class for handling animations with easing functions.
 * @class
 */
class Easing {
  /**
   * Constructor for the Easing class.
   * @param {Object} config - Configuration object for the animation.
   * @param {Object} [config.values={x: 0}] - Initial named values for the animation.
   * @param {Object} [config.endValues=config.values] - Target named values for the animation.
   * @param {number} [config.duration=1000] - Duration of the animation in milliseconds.
   * @param {string} [config.easingFunctionName='easeInOutSine'] - Name of the easing function to be used.
   * @throws Will throw an error if the provided values or targetValues are not arrays.
   * @throws Will throw an error if the dimension of targetValues doesn't match the dimension of values.
   */
  constructor(config) {
    // Default values
    const {
      values = { x: 0 },
      endValues = values,
      duration = 1000,
      easingFunctionName = "easeInOutSine",
    } = config;

    // Validate values and endValues
    if (typeof values !== "object" || typeof endValues !== "object") {
      throw new Error(
        "Invalid values or targetValues. Please provide objects."
      );
    }

    const valueKeys = Object.keys(values);
    const endValueKeys = Object.keys(endValues);

    // Initialize properties
    this.valueKeys = valueKeys;
    this.values = { ...values };
    this.endValues = { ...endValues };
    this.duration = duration;
    this.dimension = valueKeys.length;
    this.easingFunction =
      Easing.EasingFunctions[easingFunctionName] ||
      Easing.EasingFunctions.easeInOutSine;

    // Set initial and target values
    this.currentValues = { ...values };

    // Animation state
    this._running = false;
    this.startTime = 0;
  }

  /* ---- ANIMATION CONTROL ---- */

  /**
   * Starts the animation.
   * @function
   */
  start() {
    this.startTime = performance.now();
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
    let elapsedTime = performance.now() - this.startTime;
    let percent = Math.min(elapsedTime / this._duration, 1);

    // Update each dimension separately
    for (let key of this.valueKeys) {
      this.currentValues[key] = this.easingFunction(
        percent,
        this.values[key],
        this.endValues[key] - this.values[key],
        1
      );
    }

    // Stop the animation after reaching the final position
    if (percent === 1) {
      this._running = false;
      this.values = { ...this.currentValues };
    }
  }

  /* ---- POSITION MANAGEMENT ---- */

  /**
   * Gets the current values of the animation.
   * @returns {Object} - Current values of the animation.
   * @function
   */
  getCurrentValues() {
    return { ...this.currentValues };
  }

  /**
   * Gets the start values of the animation.
   * @returns {number[]} - start values of the animation.
   * @function
   */
  getValues() {
    return { ...this.values };
  }

  /**
   * Gets the end values of the animation.
   * @returns {Object} - End values of the animation.
   * @function
   */
  getEndValues() {
    return { ...this.endValues };
  }

  /**
   * Sets the start values for the animation.
   * @param {Object} newValues - New start values for the animation.
   * @throws Will throw an error if the keys of newValues do not match the original keys.
   * @function
   */
  setStartValues(newValues) {
    const newKeys = Object.keys(newValues);

    // Check if the keys of newValues match the original keys
    if (Object.keys(newValues).length !== this.dimension) {
      throw new Error("Invalid start values dimension.");
    }

    // Set the new values
    this.values = { ...newValues };

    // Update the current values to match the new values
    this.currentValues = { ...newValues };

    // Update the dimension
    this.dimension = newKeys.length;
  }
  /**
   * Sets the target values for the animation.
   * @param {Object} newValues - New target values for the animation.
   * @throws Will throw an error if the keys of newValues do not match the original keys.
   * @function
   */
  setEndValues(newValues) {
    const newKeys = Object.keys(newValues);

    // Check if the keys of newValues match the original keys
    if (Object.keys(newValues).length !== this.dimension) {
      throw new Error("Invalid start values dimension.");
    }

    // Set the new values
    this.endValues = { ...newValues };
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
      return performance.now() - this.startTime;
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
      return Math.max(0, this._duration - (performance.now() - this.startTime));
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
Easing.EasingFunctions = {
  easeLinear(t, b, c, d) {
    return (c * t) / d + b;
  },

  easeInSine(t, b, c, d) {
    return -c * Math.cos((t / d) * (Math.PI / 2)) + c + b;
  },

  easeInQuad(t, b, c, d) {
    t /= d;
    return c * t * t + b;
  },

  easeInCubic(t, b, c, d) {
    t /= d;
    return c * t * t * t + b;
  },
  easeInQuartic(t, b, c, d) {
    t /= d;
    return c * t * t * t * t + b;
  },
  easeInQuintic(t, b, c, d) {
    t /= d;
    return c * t * t * t * t * t + b;
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
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    return (
      -(
        a *
        Math.pow(2, 10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p)
      ) + b
    );
  },

  easeOutSine(t, b, c, d) {
    return c * Math.sin((t / d) * (Math.PI / 2)) + b;
  },

  easeOutQuad(t, b, c, d) {
    t /= d;
    return -c * t * (t - 2) + b;
  },
  easeOutCubic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  },
  easeOutQuartic(t, b, c, d) {
    t /= d;
    t--;
    return -c * (t * t * t * t - 1) + b;
  },
  easeOutQuintic(t, b, c, d) {
    t /= d;
    t--;
    return c * (t * t * t * t * t + 1) + b;
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

  easeOutElastic(t, b, c, d, a, p) {
    if (t === 0) return b;
    if ((t /= d) === 1) return b + c;
    if (!p) p = d * 0.3;
    let s;
    if (!a || a < Math.abs(c)) {
      a = c;
      s = p / 4;
    } else {
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    return (
      a * Math.pow(2, -10 * t) * Math.sin(((t * d - s) * (2 * Math.PI)) / p) +
      c +
      b
    );
  },

  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  },

  easeInOutSine(t, b, c, d) {
    return (-c / 2) * (Math.cos((Math.PI * t) / d) - 1) + b;
  },

  easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t + 2) + b;
  },

  easeInOutQuartic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t + b;
    t -= 2;
    return (-c / 2) * (t * t * t * t - 2) + b;
  },

  easeInOutQuintic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t * t * t * t + b;
    t -= 2;
    return (c / 2) * (t * t * t * t * t + 2) + b;
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
      s = (p / (2 * Math.PI)) * Math.asin(c / a);
    }
    if (t < 1) {
      return (
        -0.5 *
          (a *
            Math.pow(2, 10 * (t -= 1)) *
            Math.sin(((t * d - s) * (2 * Math.PI)) / p)) +
        b
      );
    }
    return (
      a *
        Math.pow(2, -10 * (t -= 1)) *
        Math.sin(((t * d - s) * (2 * Math.PI)) / p) *
        0.5 +
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
Easing.getEasingFunctionNames = function () {
  return Object.keys(Easing.EasingFunctions);
};
