const IO = require("../IO");

module.exports = class GroupEventRequests {
  /**
   *
   * @param {IO} io
   * @param {number[]} id
   */
  static GroupEvent = async (io, idList) => await io.Emit("group event", { body: { idList } });

  /**
   *
   * @param {IO} io
   * @param {event} eventData
   */
  static GroupEventCreate = async (io, eventData) => await io.Emit("group event create", { body: { eventData } });

  /**
   *
   * @param {IO} io
   * @param {event} eventInfo
   */
  static GroupEventUpdate = async (io, eventInfo) => await io.Emit("group event update", { body: eventInfo });

  /**
   *
   * @param {IO} io
   * @param {number} id
   */
  static SubscriberGroupEventAdd = async (io, id) => await io.Emit("subscriber group event add", { body: { id } });

  /**
   *
   * @param {IO} io
   * @param {number} id
   */
  static SubscriberGroupEventDelete = async (io, id) => await io.Emit("subscriber group event delete", { body: { id } });

  /**
   *
   * @param {IO} io
   * @param {number} id
   * @param {boolean} subscribe
   */
  static GroupEventList = async (io, id, subscribe = true) =>
    await io.Emit("group event list", {
      headers: { version: 3 },
      body: { id, subscribe },
    });
};
