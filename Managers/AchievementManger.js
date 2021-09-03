const { assign } = require("./util");
const Requests = require("../Network/IO/Requests");
const Achievement = require("../Models/Achievement");

module.exports = class AchievementManager {
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
   * Get achievements List
   * @param {number} languageId the id of language
   * @returns {achievements[]}
   */
  GetAchievements = async (languageId) => {
    try {
      const response = await Requests.AchievementList(this.#Client.V3, languageId);
      const achievements = response.body.map((t) =>
        assign(new Achievement(), {
          id: t.id,
          typeId: t.typeId,
          parentId: t.parentId,
          name: t.name,
          description: t.description,
          imageUrl: t.imageUrl,
          notificationPhraseId: t.notificationPhraseId || null,
          weight: t.weight,
          isSecret: t.isSecret,
          client: t.client,
          children: !t.children ? [] : t.children.map((a) => assign(new Achievement(), { a })),
        })
      );

      return achievements;
    } catch (e) {
      return null;
    }
  };

  /**
   * Get subscribe Achievements List
   * @param {number} subscriberId the id of language
   */
  GetSubscriberAchievements = async (subscriberId) => {
    try {
      const response = await Requests.AchievementSubscriberList(this.#Client.V3, subscriberId);
      // TODO: Marge Subscriber Achievements with general Achievements
      return response.body;
    } catch (e) {
      return null;
    }
  };
};
