const { assign } = require("./util");
const Client = require("../Client");
const Requests = require("../Network/IO/Requests");
const Achievement = require("../Models/Achievement");
module.exports = class AchievementManager {
  /**
   * @type {Client}
   */
  #Client;

  /**
   * Create a new Message Manager
   * @param {Client} client
   */
  constructor(client) {
    this.#Client = client;
  }

  /**
   * Get achievements List
   * @param {number} languageId the id of language
   */
  GetAchievements = async (languageId) => {
    try {
      let response = await Requests.AchievementList(this.#Client.V3, languageId);
      let achievements = response.body.map((t) => {
        return assign(new Achievement(), {
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
          children: !t.children
            ? []
            : t.children.map((a) => {
                return assign(new Achievement(), { a });
              }),
        });
      });

      return achievements;
    } catch {
      return null;
    }
  };
  /**
   * Get subscribe Achievements List
   * @param {number} subscriberId the id of language
   */
  GetSubscriberAchievements = async (subscriberId) => {
    try {
      let response = await Requests.AchievementSubscriberList(this.#Client.V3, subscriberId);
      //TODO: Marge Subscriber Achievements with general Achievements
      return response.body;
    } catch {
      return null;
    }
  };
};
