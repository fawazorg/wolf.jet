const { assign } = require("./util");
const Client = require("../Client");
const Requests = require("../Network/IO/Requests");
module.exports = class ContactManger {
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
   * get all Contact member
   * @returns {}
   */
  ContactList = async () => {
    try {
      let response = await Requests.SubscriberContactList(this.#Client.V3);

      return response.body;
    } catch {
      return null;
    }
  };

  /**
   * Add contact member
   * @param {number} id the id of subscriber
   * @returns {boolean}
   */
  ContactAdd = async (id, languageId) => {
    try {
      let response = await Requests.SubscriberContactAdd(this.#Client.V3, id);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Delete contact member
   * @param {number} id the id of subscriber
   * @returns {boolean}
   */
  ContactDelete = async (id) => {
    try {
      let response = await Requests.SubscriberContactDelete(this.#Client.V3, id);
      return true;
    } catch {
      return false;
    }
  };
};
