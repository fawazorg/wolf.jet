module.exports = class Events {
  /**
   * @type {import("../Client")}
   */
  #Client;

  /**
   * @type {import("events").EventEmitter}
   */
  #Emitter;

  /**
   * Create new Events Handler
   * @param {import("../Client")} client
   * @param {import("events").EventEmitter} emitter
   */
  constructor(client, emitter) {
    this.#Client = client;
    this.#Emitter = emitter;
  }

  /**
   * Rasie an event when the SDK is ready
   * @param {() => void} fn
   */
  set Ready(fn) {
    this.#Emitter.on("sdk ready", fn);
  }

  /**
   * Emit the SDK Ready Event
   */
  get Ready() {
    return () => this.#Emitter.emit("sdk ready");
  }
};
