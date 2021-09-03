const { assign } = require("./util");
const Requests = require("../Network/IO/Requests");
const Message = require("../Models/Message/Message");

module.exports = class MessageManager {
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
   * Send a Message
   * @param {number} recipient the recipient of the message
   * @param {boolean} isGroup is the message ment for a group
   * @param {string | Buffer} data the data to be sent
   * @param {string} mimeType the mimetype of the message
   * @returns {boolean}
   */
  SendMessage = async (recipient, isGroup, data, mimeType) => {
    try {
      const resp = await Requests.MessageSend(this.#Client.V3, recipient, isGroup, data, mimeType);

      const { uuid: id, timestamp } = resp.body;

      const mesg = assign(new Message(), {
        id,
        timestamp,
        recipient: { id: recipient, hash: "" },
        originator: { id: this.#Client.CurrentUser.Id, hash: this.#Client.CurrentUser.Hash },
        isGroup,
        data,
        mimeType,
      });

      this.#Client.On.Message.Sent(mesg);

      return true;
    } catch (e) {
      return false;
    }
  };
};
