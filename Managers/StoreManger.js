const { assign } = require("./util");
const Client = require("../Client");
const Requests = require("../Network/IO/Requests");

module.exports = class StoreManger {
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
   * get store credit balance
   * @returns {number}
   */
  CreditBalance = async (subscribe) => {
    try {
      const response = await Requests.StoreCreditBalance(this.#Client.V3, subscribe);

      return response.body.balance;
    } catch {
      return null;
    }
  };
};
