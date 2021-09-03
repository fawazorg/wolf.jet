const Requests = require("../Network/IO/Requests");

module.exports = class StoreManger {
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
   * get store credit balance
   * @param {boolean} subscribe subscribe to Credit Balance
   * @returns {number} credit balance
   */
  CreditBalance = async (subscribe) => {
    try {
      const response = await Requests.StoreCreditBalance(this.#Client.V3, subscribe);

      return response.body.balance;
    } catch (e) {
      return null;
    }
  };
};
