module.exports = class AchievementRequests {
  /**
   *
   * @param {import("../IO")} io
   * @param {Number} languageId
   */
  static AchievementList = async (io, languageId) => await io.Emit("achievement list", { body: { languageId } });

  /**
   *
   * @param {import("../IO")} io
   * @param {Number} id
   */
  static AchievementSubscriberList = async (io, id) => await io.Emit("achievement subscriber list", { body: { id } });
};
