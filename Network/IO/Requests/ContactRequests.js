module.exports = class ContactRequests {
  /**
   *
   * @param {import("../IO")} io
   * @param {boolean} subscribe
   * @returns
   */
  static SubscriberContactList = async (io, subscribe) => await io.Emit("subscriber contact list", { body: { subscribe } });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} id
   * @returns
   */
  static SubscriberContactAdd = async (io, id) => await io.Emit("subscriber contact add", { body: { id } });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} Id
   * @returns
   */
  static SubscriberContactDelete = async (io, id) => await io.Emit("subscriber contact delete", { body: { id } });
};
