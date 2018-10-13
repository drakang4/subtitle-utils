declare module "subtitle-utils" {
  import ISubtitle = Subtitle.ISubtitle;
  export default Subtitle;
  export { ISubtitle }
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
  export interface ISubtitle {
    startTime: number;
    endTime: number;
    texts: string[];
  }
}
