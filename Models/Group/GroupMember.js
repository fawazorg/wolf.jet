class GroupMemberAdditionalInformation {
  /**
   * @type {string}
   */
  Hash;

  /**
   * @type {string}
   */
  NicknameShort;

  /**
   * @type {number}
   */
  OnlineState;

  /**
   * @type {number}
   */
  Privileges;
}

module.exports = class GroupMember {
  /**
   * @type {number}
   */
  Id;

  /**
   * @type {number}
   */
  Capabilities;

  /**
   * @type {GroupMemberAdditionalInformation}
   */
  AdditionalInfo = new GroupMemberAdditionalInformation();
};
