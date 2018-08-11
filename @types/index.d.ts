export as namespace SubtitleUtils;

export = Subtitle;

declare class Subtitle {
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
