declare module "subtitle-utils" {
  export = Subtitle;
}

declare class Subtitle {
  subtitles: Subtitle.ISubtitle[];

  constructor(subtitles: Subtitle.ISubtitle[]);

  static fromSRT(data: string): Subtitle;

  static fromVTT(data: string): Subtitle;

  toSRT(): string;

  toVTT(): string;
}

declare namespace Subtitle {
  interface ISubtitle {
    startTime: number;
    endTime: number;
    texts: string[];
  }
}
