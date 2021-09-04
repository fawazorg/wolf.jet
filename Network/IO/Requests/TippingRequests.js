module.exports = class TippingRequests {
  /**
   *
   * @param {import("../IO")} io
   * @param {number} subscriberId
   * @param {number} groupId
   * @param {{id: number, quantity: number}[]} charmList
   * @param {{type: "stage"|"message", id: number}} context
   */
  static TipAdd = async (io, subscriberId, groupId, charmList, context) => await io.Emit("tip add", { subscriberId, groupId, charmList, context });

  /**
   *
   * @param {import("../IO")} io
   */
  static TipGroupSubscribe = async (io) => await io.Emit("tip group subscribe");

  /**
   *
   * @param {import("../IO")} io
   */
  static TipPrivateSubscribe = async (io) => await io.Emit("tip private subscribe");

  /**
   *
   * @param {import("../IO")} io
   * @param {number} groupId
   * @param {number} timestamp
   * @param {number} limit
   * @param {number} offset
   */
  static TipSummary = async (io, groupId, timestamp, limit = 25, offset = 0) =>
    await io.Emit("tip summary", { groupId, contextType: "message", id: timestamp, limit, offset });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} groupId
   * @param {number} timestamp
   * @param {number} offset
   * @param {number} limit
   */
  static TipDetail = async (io, groupId, timestamp, limit = 25, offset = 0) =>
    await io.Emit("tip detail", { groupId, contextType: "message", id: timestamp, limit, offset });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} groupId
   * @param {('charm'|'subscriber'|'group')} type
   * @param {{"sent" |"received"}} tipDirection
   * @param {{"day"|"week"|"month"|"alltime"}} period
   */
  static TipLeaderboardGroup = async (io, groupId, type, tipDirection, period) =>
    await io.Emit("tip leaderboard group", { groupId, type, tipDirection, period });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} id
   * @param {{"charm"|"subscriber"|"group"}} type
   * @param {{"sent" |"received"}} tipDirection
   * @param {{"day"|"week"|"month"|"alltime"}} period
   */
  static TipLeaderboardGroupSummary = async (io, id, type, tipDirection, period) =>
    await io.Emit("tip leaderboard group summary", { id, type, tipDirection, period });

  /**
   *
   * @param {import("../IO")} io
   * @param {{"charm"|"subscriber"|"group"}} type
   * @param {{"sent" |"received"}} tipDirection
   * @param {{"day"|"week"|"month"|"alltime"}} period
   */
  static TipLeaderboardGlobal = async (io, type, tipDirection, period) => await io.Emit("tip leaderboard global", { type, tipDirection, period });

  /**
   *
   * @param {import("../IO")} io
   * @param {{"day"|"week"|"month"|"alltime"}} period
   */
  static TipLeaderboardGlobalSummary = async (io, period) => await io.Emit("tip leaderboard global summary", { period });
};
