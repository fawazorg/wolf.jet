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
    this.#Client.V3.Conn.on("group event create", this.#OnCreate);
    this.#Client.V3.Conn.on("group event update", this.#OnUpdate);
  }

  /**
   * Raise an event when a group event is created
   * @param {(groupEvent: object) => void} fn
   */
  set Created(fn) {
    this.#Emitter.on("group event create", fn);
  }

  /**
   * Raise an event when a group event is updated
   * @param {(groupEvent: object) => void} fn
   */
  set Updated(fn) {
    this.#Emitter.on("group event update", fn);
  }

  /**
   * Emit the GroupEvent Created event
   * @returns {object}
   */
  get Created() {
    return (groupEvent) => this.#Emitter.emit("group event create", groupEvent);
  }

  /**
   * Emit the GroupEvent Updated event
   * @returns {object}
   */
  get Updated() {
    return (groupEvent) => this.#Emitter.emit("group event update", groupEvent);
  }

  #OnCreate = ({ body }) => {
    this.Created(body);
  };

  #OnUpdate = ({ body }) => {
    this.Updated(body);
  };
};
