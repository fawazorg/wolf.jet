module.exports = class Achievement {
  /**
   * @type {number}
   */
  id;

  /**
   * @type {number}
   */
  typeId;

  /**
   * @type {number}
   */
  parentId;

  /**
   * @type {string}
   */
  name;

  /**
   * @type {string}
   */
  description;

  /**
   * @type {string}
   */
  imageUrl;

  /**
   * @type {number}
   */
  notificationPhraseId;

  /**
   * @type {number}
   */
  weight;

  /**
   * @type {boolean}
   */
  isSecret;

  /**
   * @type {number}
   */
  client;

  /**
   * @type {Achievement[]}
   */
  children = [];
};
