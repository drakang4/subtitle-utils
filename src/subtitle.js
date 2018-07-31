import ISubtitle from "./interface";
import { stripIndents } from "common-tags";

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

    const splited = stripIndents(data)
      .trim()
      .replace(/\r\n/g, "\n")
      .replace(/\n{3,}/g, "\n\n")
      .split("\n\n");

    const timeReg = /^((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3}) --> ((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3})(?: (.*))?$/;

    const subtitles = splited.map(subtitle => {
      const rows = subtitle.split("\n");
      const [_, time, ...texts] = rows;

      const parsedTime = timeReg.exec(time);

      const text = texts.join("\n");

      return new ISubtitle(parsedTime[1], parsedTime[2], text);
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
    return new Subtitle([]);
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
    const subtitles = this.subtitles;

    return subtitles
      .map((subtitle, index) => {
        subtitle.removeStyle();

        return stripIndents`
          ${index + 1}
          ${subtitle.start} --> ${subtitle.end}
          ${subtitle.text}
        `;
      })
      .join("\n\n");
  }

  /**
   *
   *
   * @returns {string}
   * @memberof Subtitle
   */
  toVTT() {
    return "";
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
