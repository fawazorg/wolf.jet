const { assign } = require("./util");
const Requests = require("../Network/IO/Requests");
const GroupEvent = require("../Models/GroupEvent");

module.exports = class GroupEventManger {
  /**
   * @type {import("../Client")}
   */
  #Client;

  /**
   * Create a new Message Manager
   * @param {import("../Client")} client
   */
  constructor(client) {
    this.#Client = client;
  }

  /**
   * Get events info by idList
   * @param {number[]} idList id of events
   * @returns {GroupEvents[]}
   */
  GroupEvent = async (idList) => {
    try {
      const response = await Requests.GroupEvent(this.#Client.V3, idList);
      const GroupEvents = response.map((x) => assign(new GroupEvent(), x));
      return GroupEvents;
    } catch (e) {
      return null;
    }
  };

  /**
   * Create an event
   * @param {object} eventData the data of event
   * @returns {GroupEvent}
   */
  CreateEvent = async (eventData) => {
    try {
      const response = await Requests.GroupEventCreate(this.#Client.V3, eventData);

      return response.body;
    } catch (e) {
      return null;
    }
  };

  /**
   * Update an event
   * @param {object} eventInfo the event info
   * @returns {object}
   */
  UpdateEvent = async (eventInfo) => {
    try {
      const response = await Requests.GroupEventUpdate(this.#Client.V3, eventInfo);

      return response.body;
    } catch (e) {
      return null;
    }
  };

  /**
   * Cancel an Event
   * @param {number} id the id of event
   * @returns {object}
   */
  CancelEvent = async (id) => {
    try {
      const response = await Requests.GroupEventUpdate(this.#Client.V3, { id, isRemoved: true });

      return response;
    } catch (e) {
      return null;
    }
  };

  /**
   * Subscribe to an event
   * @param {number} id the id of event
   * @returns {boolean}
   */
  SubscribeToEvent = async (id) => {
    try {
      await Requests.SubscriberGroupEventAdd(this.#Client.V3, id);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Unsubscribe to an event
   * @param {number} id the id of event
   * @returns {boolean}
   */
  UnsubscribeToEvent = async (id) => {
    try {
      await Requests.SubscriberGroupEventDelete(this.#Client.V3, id);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Get group events list
   * @param {number} id the id for group
   * @param {boolean} subscribe subscribe to the group event info
   * @returns {object}
   */
  EventList = async (id, subscribe) => {
    try {
      const response = await Requests.GroupEventList(this.#Client.V3, id, subscribe);

      return response.body;
    } catch (e) {
      return null;
    }
  };
};
