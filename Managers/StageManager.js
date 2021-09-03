const Requests = require("../Network/IO/Requests");

module.exports = class StageManager {
  /**
   * @type {import("../Client")}
   */
  #Client;

  /**
   * Create a new StageManager
   * @param {import("../Client")} client
   */
  constructor(client) {
    this.#Client = client;
  }

  JoinStage = (groupId, slotId, offerSdp) =>
    // eslint-disable-next-line no-async-promise-executor
    new Promise(async (resolve) => {
      const response = await Requests.GroupAudioBroadcast(this.#Client.V3, groupId, slotId, offerSdp);
      resolve(response.body.sdp);
    });

  StageSlots = async (groupId) => {
    const response = await Requests.GroupAudioSlotList(this.#Client.V3, groupId);
    // console.log(response);
    return response.body;
  };

  StageDisconnect = async (id, slotId, occupierId) => {
    const resp = await Requests.GroupAudioBroadcastDisconnect(this.#Client.V3, id, slotId, occupierId);
    return resp;
  };
};
