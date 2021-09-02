const IO = require("../IO");

module.exports = class CreditRequests {
  /**
   *
   * @param {IO} io
   * @param {boolean} subscribe
   * @returns
   */
  static StoreCreditBalance = async (io, subscribe = true) => await io.Emit("store credit balance", { body: { subscribe } });
};
