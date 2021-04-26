const Client = require("../Client");
const Requests = require("../Network/IO/Requests");
module.exports = class StageManager {
  /**
   * @type {Client}
   */
  #Client;

  /**
   * Create a new StageManager
   * @param {Client} client
   */
  constructor(client) {
    this.#Client = client;
  }

  JoinStage = (groupId, slotId, offerSdp) => {
    return new Promise(async (resolve) => {
      let response = await Requests.GroupAudioBroadcast(
        this.#Client.V3,
        groupId,
        slotId,
        offerSdp
      );
      resolve(response.body.sdp);
    });
  };

  StageSlots = async (groupId) => {
    let response = await Requests.GroupAudioSlotList(this.#Client.V3, groupId);
    //console.log(response);
    return response.body;
  };
};
