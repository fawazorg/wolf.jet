const IO = require("../IO");

module.exports = class AchievementRequests {
  /**
   *
   * @param {IO} io
   * @param {Number} languageId
   */
  static AchievementList = async (io, languageId) => await io.Emit("achievement list", { body: { languageId } });

  /**
   *
   * @param {IO} io
   * @param {Number} id
   */
  static AchievementSubscriberList = async (io, id) => await io.Emit("achievement subscriber list", { body: { id } });
};
