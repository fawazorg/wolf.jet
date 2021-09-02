const IO = require("../IO");

module.exports = class BlockedRequests {
  /**
   *
   * @param {IO} io
   * @param {boolean} subscribe
   */
  static SubscriberBlockList = async (io, subscribe = true) => await io.Emit("subscriber block list", { body: { subscribe } });

  /**
   *
   * @param {IO} io
   * @param {Number} id
   */
  static SubscriberBlockAdd = async (io, id) => await io.Emit("subscriber block add", { body: { id } });

  /**
   *
   * @param {IO} io
   * @param {Number} id
   */
  static SubscriberBlockDelete = async (io, id) => await io.Emit("subscriber block delete", { body: { id } });
};
