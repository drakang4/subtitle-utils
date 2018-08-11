export as namespace SubtitleUtils;

export default Subtitle;

declare class Subtitle {
  subtitles: Subtitle.ISubtitle[];

  constructor(subtitles: Subtitle.ISubtitle[]);

  static fromSRT(data: string): Subtitle;

  static fromVTT(data: string): Subtitle;

  toSRT(): string;

  toVTT(): string;
}

declare namespace Subtitle {
  export interface ITime {
    hour: string;
    minute: string;
    second: string;
    millisecond: string;
  }

  export interface ISubtitle {
    start: ITime;
    end: ITime;
    text: string;
  }
}
