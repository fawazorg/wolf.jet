const Requests = require("../Network/IO/Requests");

module.exports = class TipingManger {
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
   * Adding tip
   * @param {number} subscriberId
   * @param {number} groupId
   * @param {{id: number, quantity: number}[]} charmList
   * @param {{type: "stage"|"message", id: number}} context
   * @returns {boolean}
   */
  TipAdd = async (subscriberId, groupId, charmList, context) => {
    try {
      await Requests.TipAdd(this.#Client.V3, subscriberId, groupId, charmList, context);
      return true;
    } catch (e) {
      return false;
    }
  };

  /**
   * Tip Summary for a message
   * @param {number} groupId
   * @param {number} timestamp
   * @param {number} limit
   * @param {number} offset
   * @returns {{id: number,charmList: { id: number, quantity: number, credits: number } [],version: number}}
   */
  TipSummary = async (groupId, timestamp, limit, offset) => {
    try {
      const response = await Requests.TipSummary(this.#Client.V3, groupId, timestamp, limit, offset);
      return response.body;
    } catch (e) {
      return null;
    }
  };

  /**
   * Tip Detail for a message
   * @param {number} groupId
   * @param {number} timestamp
   * @param {number} limit
   * @param {number} offset
   * @returns {{id: number,charmList: { id: number, quantity: number, credits: number } [],version: number}}
   */
  TipDetail = async (groupId, timestamp, limit, offset) => {
    try {
      const response = await Requests.TipDetail(this.#Client.V3, groupId, timestamp, limit, offset);
      return response.body;
    } catch (e) {
      return null;
    }
  };

  /**
   * Tip Leaderboard Group
   * @param {number} groupId
   * @param {('charm'|'subscriber'|'group')} type
   * @param {("sent" |"received")} tipDirection
   * @param {("day"|"week"|"month"|"alltime")} period
   */
  LeaderboardGroup = async (groupId, type, tipDirection, period) => {
    try {
      // eslint-disable-next-line no-param-reassign
      if (type === "charm") tipDirection = undefined;
      const response = await Requests.TipLeaderboardGroup(this.#Client.V3, groupId, type, tipDirection, period);
      return response.body;
    } catch (e) {
      return null;
    }
  };

  /**
   * Tip Leaderboard Group Summary
   * @param {number} groupId
   * @param {('charm'|'subscriber'|'group')} type
   * @param {("sent" |"received")} tipDirection
   * @param {("day"|"week"|"month"|"alltime")} period
   */
  LeaderboardGroupSummary = async (groupId, type, tipDirection, period) => {
    try {
      // eslint-disable-next-line no-param-reassign
      if (type === "charm") tipDirection = null;
      const response = await Requests.TipLeaderboardGroupSummary(this.#Client.V3, groupId, type, tipDirection, period);
      return response.body;
    } catch (e) {
      return null;
    }
  };

  /**
   * Tip Leaderboard Global
   * @param {('charm'|'subscriber'|'group')} type
   * @param {("sent" |"received")} tipDirection
   * @param {("day"|"week"|"month"|"alltime")} period
   */
  LeaderboardGlobal = async (type, tipDirection, period) => {
    try {
      // eslint-disable-next-line no-param-reassign
      if (type === "charm") tipDirection = undefined;
      const response = await Requests.TipLeaderboardGlobal(this.#Client.V3, type, tipDirection, period);
      return response.body;
    } catch (e) {
      return null;
    }
  };

  /**
   * Tip Leaderboard Global Summary
   * @param {{"day"|"week"|"month"|"alltime"}} period
   */
  TipLeaderboardGlobalSummary = async (period) => {
    try {
      const response = await Requests.TipLeaderboardGlobalSummary(this.#Client.V3, period);
      return response.body;
    } catch (e) {
      return null;
    }
  };
};
