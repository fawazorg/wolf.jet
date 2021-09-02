const IO = require("../IO");

module.exports = class ContactRequests {
  /**
   *
   * @param {IO} io
   * @param {boolean} subscribe
   * @returns
   */
  static SubscriberContactList = async (io, subscribe) => await io.Emit("subscriber contact list", { body: { subscribe } });

  /**
   *
   * @param {IO} io
   * @param {number} id
   * @returns
   */
  static SubscriberContactAdd = async (io, id) => await io.Emit("subscriber contact add", { body: { id } });

  /**
   *
   * @param {IO} io
   * @param {number} Id
   * @returns
   */
  static SubscriberContactDelete = async (io, id) => await io.Emit("subscriber contact delete", { body: { id } });
};
