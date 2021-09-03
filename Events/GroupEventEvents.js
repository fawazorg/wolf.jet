const { EventEmitter } = require("events");
const Client = require("../Client");
const { assign } = require("../Managers/util");
const GroupEvent = require("../Models/GroupEvent");
module.exports = class Events {
  /**
   * @type {Client}
   */
  #Client;

  /**
   * @type {EventEmitter}
   */
  #Emitter;

  /**
   * Create new Events Handler
   * @param {Client} client
   * @param {EventEmitter} emitter
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
