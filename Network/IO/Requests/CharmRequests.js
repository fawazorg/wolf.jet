module.exports = class CharmRequests {
  /**
   *
   * @param {import("../IO")} io
   * @param {number} languageId
   */
  static CharmList = async (io, languageId = 1) => await io.Emit("charm list", { body: { languageId } });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} id
   * @param {number} languageId
   * @returns
   */
  static Charm = async (io, id, languageId = 1) => await io.Emit("charm list", { body: { id, languageId } });

  /**
   *
   * @param {import("../IO")} io
   */
  static StarredList = async (io) => await io.Emit("charm starred list");

  /**
   *
   * @param import("../IO") io
   * @param {number} id
   * @param {number} limit
   * @param {number} offset
   */
  static ActiveList = async (io, id, limit = 25, offset = 0) => await io.Emit("charm subscriber active list", { body: { id, limit, offset } });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} id
   * @param {number} limit
   * @param {number} offset
   */
  static ExpiredList = async (io, id, limit = 25, offset = 0) => await io.Emit("charm subscriber expired list", { body: { id, limit, offset } });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} charmId
   * @returns
   */
  static SetSelected = async (io, charmId) => await io.Emit("charm subscriber set selected", { body: { selectedList: [{ charmId, position: 0 }] } });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} id
   * @param {number} limit
   * @param {number} offset
   * @returns
   */
  static SummaryList = async (io, id, limit, offset) => await io.Emit("charm subscriber summary list", { body: { id, limit, offset } });

  /**
   *
   * @param {import("../IO")} io
   * @param {number} id
   * @param {boolean} extended
   * @returns
   */
  static Statistics = async (io, id, extended = false) => await io.Emit("charm subscriber statistics", { body: { id, extended } });
};
