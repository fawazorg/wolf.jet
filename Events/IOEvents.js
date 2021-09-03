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
   * Raise an Event when Connected to WOLF
   * @param {() => void} fn
   */
  set Connected(fn) {
    this.#Client.V3.Conn.on("connect", fn);
  }

  /**
   * Raise an Event when Connected to WOLF
   * @param {(reason: string) => void} fn
   */
  set Disconnected(fn) {
    this.#Client.V3.Conn.on("disconnect", fn);
  }

  /**
   * Raise an Event when Connected to WOLF
   * @param {(attempt: number) => void} fn
   */
  set Reconnected(fn) {
    this.#Client.V3.Conn.on("reconnect", fn);
  }
};
