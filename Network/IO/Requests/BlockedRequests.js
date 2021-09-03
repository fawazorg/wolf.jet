module.exports = class BlockedRequests {
  /**
   *
   * @param {import("../IO")} io
   * @param {boolean} subscribe
   */
  static SubscriberBlockList = async (io, subscribe = true) => await io.Emit("subscriber block list", { body: { subscribe } });

  /**
   *
   * @param {import("../IO")} io
   * @param {Number} id
   */
  static SubscriberBlockAdd = async (io, id) => await io.Emit("subscriber block add", { body: { id } });

  /**
   *
   * @param {import("../IO")} io
   * @param {Number} id
   */
  static SubscriberBlockDelete = async (io, id) => await io.Emit("subscriber block delete", { body: { id } });
};
