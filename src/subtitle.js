import { stripIndents } from "common-tags";
import { parseTimestamps, toSRTTime, toVTTTime } from "./times";

/**
 * @typedef {Object} Time
 * @property {string} hour
 * @property {string} minute
 * @property {string} second
 * @property {string} millisecond
 */

/**
 * @typedef {Object} ISubtitle
 * @property {Time} start
 * @property {Time} end
 * @property {string} text
 */

/**
 * Subtitle is a data structure of a full subtitle file.
 *
 * @class Subtitle
 */
export default class Subtitle {
  /**
   *Creates an instance of Subtitle.

   * @param {ISubtitle[]} subtitles
   * @memberof Subtitle
   */
  constructor(subtitles) {
    this.subtitles = subtitles;
  }

  /**
   * fromSRT makes an instance of Subtitle from SRT.
   *
   * @static
   * @param {string} data
   * @returns {Subtitle}
   * @memberof Subtitle
   */
  static fromSRT(data) {
    if (!data) {
      return new Subtitle([]);
    }

    const transformed = stripIndents(data)
      .trim()
      .replace(/\u0000/g, "\uFFFD")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n");

    const splited = transformed.split("\n\n");

    const subtitles = splited.map(subtitle => {
      const rows = subtitle.split("\n");
      const [_, time, ...texts] = rows;

      const { start, end } = parseTimestamps(time);

      const text = texts.join("\n");

      return { start, end, text };
    });

    return new Subtitle(subtitles);
  }

  /**
   * fromVTT makes an instance of Subtitle from VTT.
   *
   * @static
   * @param {string} data
   * @returns {Subtitle}
   * @memberof Subtitle
   */
  static fromVTT(data) {
    if (!data) {
      return new Subtitle([]);
    }

    const transformed = stripIndents(data)
      .trim()
      .replace(/\u0000/g, "\uFFFD")
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .replace(/\n{3,}/g, "\n\n");

    if (transformed.length < 6) {
      throw new Error("WebVTT data is too short");
    } else if (transformed.slice(0, 6) !== "WEBVTT") {
      throw new Error("does not have a valid WebVTT header");
    }

    const splited = transformed
      .slice(6)
      .trim()
      .split("\n\n");

    const subtitles = splited.map(subtitle => {
      const rows = subtitle.split("\n");
      const [time, ...texts] = rows;

      const { start, end } = parseTimestamps(time);

      const text = texts.join("\n");

      return { start, end, text };
    });

    return new Subtitle(subtitles);
  }

  // /**
  //  * fromSMI makes an instance of Subtitle from SMI.
  //  *
  //  * @static
  //  * @param {string} data
  //  * @returns {Subtitle}
  //  * @memberof Subtitle
  //  */
  // static fromSMI(data) {
  //   return new Subtitle([]);
  // }

  /**
   * toSRT
   *
   * @returns {string}
   * @memberof Subtitle
   */
  toSRT() {
    if (!this.subtitles || this.subtitles.length === 0) {
      throw new Error("Cannot stringify empty subtitle");
    }

    const stringified = this.subtitles
      .map((subtitle, index) => {
        return stripIndents`
          ${index + 1}
          ${toSRTTime(subtitle.start)} --> ${toSRTTime(subtitle.end)}
          ${subtitle.text}
        `;
      })
      .join("\n\n")
      .concat("\n\n");

    return stringified;
  }

  /**
   *
   *
   * @returns {string}
   * @memberof Subtitle
   */
  toVTT() {
    if (!this.subtitles || this.subtitles.length === 0) {
      throw new Error("Cannot stringify empty subtitle");
    }

    const stringified = "WEBVTT\n\n".concat(
      this.subtitles
        .map(subtitle => {
          return stripIndents`
            ${toVTTTime(subtitle.start)} --> ${toVTTTime(subtitle.end)}
            ${subtitle.text}
          `;
        })
        .join("\n\n")
        .concat("\n\n")
    );

    return stringified;
  }

  // /**
  //  *
  //  *
  //  * @returns {string}
  //  * @memberof Subtitle
  //  */
  // toSMI() {
  //   return "";
  // }
}
