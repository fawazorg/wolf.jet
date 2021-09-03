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

    this.#Client.V3.Conn.on("group update", this.#OnUpdate);
  }

  /**
   * Raise an event when a group is fetched
   * @param {(group: import("../Models/Group/Group")) => void} fn
   */
  set Fetched(fn) {
    this.#Emitter.on("group profile", fn);
  }

  /**
   * Raise an event when a group is updated
   * @param {(groupId: number) => void} fn
   */
  set Updated(fn) {
    this.#Emitter.on("group update", fn);
  }

  /**
   * Emit the Group Fetched Event
   * @returns {(group: import("../Models/Group/Group")) => boolean}}
   */
  get Fetched() {
    return (group) => this.#Emitter.emit("group profile", group);
  }

  /**
   * Emit the Group Updated Event
   * @returns {(groupId: number) => booleam}
   */
  get Updated() {
    return (groupId) => this.#Emitter.emit("group update", groupId);
  }

  #OnUpdate = async (data) => {
    const { id } = data.body;

    this.Updated(id);
  };
};
