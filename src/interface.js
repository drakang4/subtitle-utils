/**
 * ISubtitle is an interface representation of a single line of subtitle.
 *
 * @class ISubtitle
 */
export default class ISubtitle {
  /**
   * Creates an instance of ISubtitle.
   *
   * @param {number} start
   * @param {number} end
   * @param {string} text
   * @memberof ISubtitle
   */
  constructor(start, end, text) {
    this.start = start;
    this.end = end;
    this.text = text;
  }

  /**
   * removeStyle is a method that removes styles of subtitle such as italic, bold, underline.
   *
   * @memberof ISubtitle
   */
  removeStyle() {
    const textWithoutStyle = this.text;
    this.text = textWithoutStyle;
  }
}
