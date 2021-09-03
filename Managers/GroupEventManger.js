const { assign } = require("./util");
const Client = require("../Client");
const Requests = require("../Network/IO/Requests");
const GroupEvent = require("../Models/GroupEvent");

module.exports = class GroupEventManger {
  /**
   * @type {Client}
   */
  #Client;

  /**
   * Create a new Message Manager
   * @param {Client} client
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
      let GroupEvents = response.map((x) => {
        return assign(new GroupEvent(), x);
      });
      return GroupEvents;
    } catch {
      return null;
    }
  };

  /**
   * Create an event
   * @param {event} eventData the data of event
   */
  CreateEvent = async (eventData) => {
    try {
      const response = await Requests.GroupEventCreate(this.#Client.V3, eventData);

      return response.body;
    } catch {
      return null;
    }
  };

  /**
   * Update an event
   * @param {object} eventInfo the event info
   */
  UpdateEvent = async (eventInfo) => {
    try {
      const response = await Requests.GroupEventUpdate(this.#Client.V3, eventInfo);

      return response.body;
    } catch {
      return null;
    }
  };

  /**
   * Cancel an Event
   * @param {number} id the id of event
   */
  CancelEvent = async (id) => {
    try {
      const response = await Requests.GroupEventUpdate(this.#Client.V3, { id, isRemoved: true });

      return response;
    } catch {
      return null;
    }
  };

  /**
   * Subscribe to an event
   * @param {number} id the id of event
   */
  SubscribeToEvent = async (id) => {
    try {
      const response = await Requests.SubscriberGroupEventAdd(this.#Client.V3, id);
      console.log(response);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Unsubscribe to an event
   * @param {number} id the id of event
   */
  UnsubscribeToEvent = async (id) => {
    try {
      const response = await Requests.SubscriberGroupEventDelete(this.#Client.V3, id);
      console.log(response);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Get group events list
   * @param {number} id the id for group
   * @param {boolean} subscribe subscribe to the group event info
   */
  EventList = async (id, subscribe) => {
    try {
      const response = await Requests.GroupEventList(this.#Client.V3, id, subscribe);

      return response.body;
    } catch {
      return null;
    }
  };
};
