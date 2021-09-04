const Requests = require("../Network/IO/Requests");

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

    this.LoginSuccess = this.#OnLoginSuccess;
  }

  /**
   * Raise an event when login to wolf failed
   * @param {(subcode: number)} fn
   */
  set LoginFailed(fn) {
    this.#Emitter.on("security login failed", fn);
  }

  /**
   * Raise an event when logged in successfully
   * @param {(subscriber: import("../Models/Subscriber/Subscriber")) => void} fn
   */
  set LoginSuccess(fn) {
    this.#Emitter.on("security login success", fn);
  }

  /**
   * Raise an event when the Cognito Token is refreshed
   * @param {(cognito: { identity: string, token: string}) => void} fn
   */
  set TokenRefreshed(fn) {
    this.#Emitter.on("security token refreshed", fn);
  }

  /**
   * Emit the Security Login Failed Event
   * @returns {(subcode: number) => boolean}
   */
  get LoginFailed() {
    return (subcode) => this.#Emitter.emit("security login failed", subcode);
  }

  /**
   * Emit the Secuirty Login Success Event
   * @returns {(subscriber: import("../Models/Subscriber/Subscriber")) => boolean}
   */
  get LoginSuccess() {
    return (subscriber) => this.#Emitter.emit("security login success", subscriber);
  }

  /**
   * Emit the Security Token Refreshed Event
   * @returns {(cognito: { identity: string, token: string}) => boolean}
   */
  get TokenRefreshed() {
    return (cognito) => this.#Emitter.emit("security token refreshed", cognito);
  }

  /**
   * Handle the OnLoginSuccess Stuff
   * @param {import("../Models/Subscriber/Subscriber")} subscriber
   */
  #OnLoginSuccess = async () => {
    try {
      // Subscribe to Messages
      await Requests.MessageGroupSubscribe(this.#Client.V3);
      await Requests.MessagePrivateSubscribe(this.#Client.V3);
      await Requests.TipGroupSubscribe(this.#Client.V3);
      await Requests.TipPrivateSubscribe(this.#Client.V3);

      // Emit the Ready Event
      this.#Client.On.SDK.Ready();
    } catch (e) {
      console.log(e);
    }
  };
};
