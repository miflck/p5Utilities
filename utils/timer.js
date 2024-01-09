/**
 * Timer class for handling interval-based callback execution.
 * @class
 */
class Timer {
  /**
   * Constructor for the Timer class.
   * @param {function} callback - Callback function to be executed at each interval.
   * @param {number} interval - Interval duration in milliseconds.
   */
  constructor(callback, interval) {
    // Callback function to be executed
    this.callback = callback;

    // Interval duration in milliseconds
    this.interval = interval;

    // Timer reference, initially set to null
    this.timer = null;

    // Flag indicating if the timer is running
    this._isRunning = false;

    // Timestamp when the timer was last started
    this.startTime = 0;
  }

  /* ---- TIMER CONTROL ---- */

  /**
   * Starts the timer.
   * @function
   */
  start() {
    // Clear any existing timer
    clearInterval(this.timer);

    // Set the timestamp when the timer is started
    this.startTime = Date.now();

    // Set a new interval-based timer
    this.timer = setInterval(this.callback, this.interval);

    // Set the running state to true
    this.isRunning = true;
  }

  /**
   * Stops the timer.
   * @function
   */
  stop() {
    // Clear the interval-based timer
    clearInterval(this.timer);

    // Set the running state to false
    this.isRunning = false;
  }

  /* ---- TIMER STATE ---- */

  /**
   * Checks if the timer is currently running.
   * @returns {boolean} - True if the timer is running, false otherwise.
   * @function
   */
  get isRunning() {
    return this._isRunning;
  }

  /**
   * Sets the running state of the timer.
   * @param {boolean} bool - Flag indicating whether the timer is running or not.
   * @function
   */
  set isRunning(bool) {
    this._isRunning = bool;
  }

  /* ---- TIME MANAGEMENT ---- */

  /**
   * Gets the elapsed time since the timer started.
   * @returns {number} - Elapsed time in milliseconds.
   * @function
   */
  get elapsedTime() {
    if (this.isRunning) {
      return Date.now() - this.startTime;
    } else {
      return 0;
    }
  }

  /**
   * Gets the remaining time until the next interval.
   * @returns {number} - Remaining time in milliseconds.
   * @function
   */
  get remainingTime() {
    if (this.isRunning) {
      return Math.max(
        0,
        this.interval - ((Date.now() - this.startTime) % this.interval)
      );
    } else {
      return 0;
    }
  }
}
