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
    this.#Client.V3.Conn.on("tip add", this.#OnAdd);
  }

  // {subscriberId:Number,sourceSubscriberId:number,groupId:number,charmList:{ id: number, quantity:number, credits: number, magnitude: number }[],context:{ type: string, id: number }}
  /**
   * Raise an event when a tip added is created
   * @param {(tip:{subscriberId:number,sourceSubscriberId:number,groupId:number,charmList:{ id: number, quantity:number, credits: number, magnitude: number }[],context:{ type: string, id: number }}) => void} fn
   */
  set Added(fn) {
    this.#Emitter.on("tip add", fn);
  }

  /**
   * Emit the GroupEvent Created event
   * @returns {(tip:{subscriberId:number,sourceSubscriberId:number,groupId:number,charmList:{ id: number, quantity:number, credits: number, magnitude: number }[]},context:{ type: string, id: number }) => boolean}
   */
  get Added() {
    return (tip) => this.#Emitter.emit("tip add", tip);
  }

  #OnAdd = ({ body }) => {
    this.Added(body);
  };
};
