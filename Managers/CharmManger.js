const { assign } = require("./util");
const Client = require("../Client");
const Requests = require("../Network/IO/Requests");
const Charm = require("../Models/Charm");
module.exports = class AchievementManager {
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
   * Get all charms by language id
   * @param {number} languageId the id of language
   * @returns {Charm[]}
   */
  CharmList = async (languageId) => {
    try {
      let response = await Requests.CharmList(this.#Client.V3, languageId);
      let Charms = response.body.map((t) => {
        return assign(new Charm(), t);
      });
      return Charms;
    } catch {
      return null;
    }
  };

  /**
   * Get charm info by id
   * @param {number} id the id of charms
   * @param {number} languageId the id of language
   * @returns
   */
  GetCharm = async (id, languageId) => {
    try {
      let response = await Requests.Charm(this.#Client.V3, id, languageId);
      let charm = assign(new Charm(), response.body[0]);
      return charm;
    } catch {
      return null;
    }
  };

  /**
   * Get all starred list
   * @returns
   */
  StarredList = async () => {
    try {
      let response = await Requests.StarredList(this.#Client.V3);
      return response.body;
    } catch {
      return null;
    }
  };

  /**
   * Get all Active charms
   * @param {number} id the id of subscriber
   * @param {number} limit how many charms should be returned
   * @param {number} offset index where the returned charms should start
   * @returns
   */
  ActiveList = async (id, limit, offset) => {
    try {
      let response = await Requests.ActiveList(this.#Client.V3, id, limit, offset);
      return response.body;
    } catch {
      return null;
    }
  };

  /**
   * get all Expired charms
   * @param {number} id the id of subscriber
   * @param {number} limit how many charms should be returned
   * @param {number} offset index where the returned charms should start
   * @returns
   */
  ExpiredList = async (id, limit, offset) => {
    try {
      let response = await Requests.ExpiredList(this.#Client.V3, id, limit, offset);
      return response.body;
    } catch {
      return null;
    }
  };

  /**
   * Set charm to subscriber profile
   * @param {number} charmID the id of charm
   * @returns {boolean}
   */
  setCharm = async (charmID) => {
    try {
      let response = await Requests.SetSelected(this.#Client.V3, charmID);
      return true;
    } catch {
      return false;
    }
  };

  /**
   * Get the summary list
   * @param {number} id the id of subscriber
   * @param {number} limit how many charms should be returned
   * @param {number} offset index where the returned charms should start
   * @returns
   */
  SummaryList = async (id, limit, offset) => {
    try {
      let response = await Requests.SummaryList(this.#Client.V3, id);
      return response.body;
    } catch {
      return null;
    }
  };

  /**
   * get all Statistics charm for the subscriber
   * @param {number} id the is of subscriber
   * @param {boolean} extended extended info?
   * @returns
   */
  Statistics = async (id, extended) => {
    try {
      let response = await Requests.Statistics(this.#Client.V3, id, extended);
      return response.body;
    } catch {
      return null;
    }
  };
};
