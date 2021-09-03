const { assign } = require("./util");
const Requests = require("../Network/IO/Requests");
const Subscriber = require("../Models/Subscriber/Subscriber");

module.exports = class SubscriberManager {
  /**
   * @type {import("../Client")}
   */
  #Client;

  /**
   * Create a new Subscriber Manager
   * @param {import("../Client")} client
   */
  constructor(client) {
    this.#Client = client;
  }

  /**
   * Get a Subscriber by their ID
   * @param {number} id the id of the subscriber
   * @param {boolean} extended fetch the extended portion of the subscriber profile
   * @param {boolean} subscribe subscribe to updates to this subscriber's profile
   * @returns {Subscriber}
   */
  GetSubscriber = async (id, extended = false, subscribe = false) => {
    try {
      const response = await Requests.SubscriberProfile(this.#Client.V3, id, extended, subscribe);
      const sub = assign(new Subscriber(), response.body);
      this.#Client.On.Subscriber.Fetched(sub);
      return sub;
    } catch (e) {
      return null;
    }
  };

  /**
   * Get Subscribers by their IDs
   * @param {number[]} idList the id of the subscriber
   * @param {boolean} extended fetch the extended portion of the subscriber profile
   * @param {boolean} subscribe subscribe to updates to this subscriber's profile
   * @returns {Subscriber[]}
   */
  GetSubscribers = async (idList, extended = false, subscribe = false) => {
    try {
      const response = await Requests.SubscriberProfiles(this.#Client.V3, idList, extended, subscribe);
      const subs = response.map((t) => assign(new Subscriber(), t));
      subs.forEach((sub) => this.#Client.On.Subscriber.Fetched(sub));
      return response.map((t) => assign(new Subscriber(), t));
    } catch (e) {
      return [];
    }
  };

  /**
   * Get Subscriber Settings
   */
  GetSettings = async () => {
    try {
      return await Requests.SubscriberSettings(this.#Client.V3);
    } catch (e) {
      return null;
    }
  };

  /**
   * Update the Current Client's Subscriber's Profile
   * @param {{nickname?: string, status?: string, extended?: { name?: string, about?: string, gender?: number, lookingFor?: number, relationship?: number, langugae?: number, urls?: string[], dateOfBirth?: number}}} data
   */
  UpdateSubscriber = async (data) => {
    try {
      await Requests.SubscriberUpdate(this.#Client.V3, data);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Get block list
   * @param {boolean} subscribe subscribe to updates to this subscriber's profile
   */
  BlockList = async (subscribe = true) => {
    try {
      const response = await Requests.SubscriberBlockList(this.#Client.V3, subscribe);
      return response.body;
    } catch (e) {
      return null;
    }
  };

  /**
   * Block subscriber
   * @param {number} id the id of the subscriber
   */
  BlockAdd = async (id) => {
    try {
      await Requests.SubscriberBlockAdd(this.#Client.V3, id);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Delete block from subscriber
   * @param {number} id the id of the subscriber
   */
  BlockDelete = async (id) => {
    try {
      await Requests.SubscriberBlockDelete(this.#Client.V3, id);
      return true;
    } catch (e) {
      return false;
    }
  };
};
