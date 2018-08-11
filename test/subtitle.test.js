const Subtitle = require("../lib/index.js");

const exampleSRT = `1
00:02:17,440 --> 00:02:20,375
Senator, we're making
our final approach into Coruscant.

2
00:02:20,476 --> 00:02:22,501
Very good, Lieutenant.

`;

const exampleVTT = `WEBVTT

02:17.440 --> 02:20.375
Senator, we're making
our final approach into Coruscant.

02:20.476 --> 02:22.501
Very good, Lieutenant.

`;

test("parse SRT subtitle", () => {
  const subtitle = Subtitle.fromSRT(exampleSRT);

  expect(subtitle).toBeInstanceOf(Subtitle);
  expect(subtitle.subtitles.length).toEqual(2);

  expect(subtitle.subtitles[0].startTime).toEqual(137440);
  expect(subtitle.subtitles[0].endTime).toEqual(140375);
  expect(subtitle.subtitles[0].texts).toEqual([
    "Senator, we're making",
    "our final approach into Coruscant."
  ]);

  expect(subtitle.subtitles[1].startTime).toEqual(140476);
  expect(subtitle.subtitles[1].endTime).toEqual(142501);
  expect(subtitle.subtitles[1].texts).toEqual(["Very good, Lieutenant."]);
});

test("parse VTT subtitle", () => {
  const subtitle = Subtitle.fromVTT(exampleVTT);

  expect(subtitle).toBeInstanceOf(Subtitle);
  expect(subtitle.subtitles.length).toEqual(2);

  expect(subtitle.subtitles[0].startTime).toEqual(137440);
  expect(subtitle.subtitles[0].endTime).toEqual(140375);
  expect(subtitle.subtitles[0].texts).toEqual([
    "Senator, we're making",
    "our final approach into Coruscant."
  ]);

  expect(subtitle.subtitles[1].startTime).toEqual(140476);
  expect(subtitle.subtitles[1].endTime).toEqual(142501);
  expect(subtitle.subtitles[1].texts).toEqual(["Very good, Lieutenant."]);
});

test("transform subtitle to SRT", () => {
  expect(Subtitle.fromSRT(exampleSRT).toSRT()).toEqual(exampleSRT);
  expect(Subtitle.fromVTT(exampleVTT).toSRT()).toEqual(exampleSRT);
});

test("transform subtitle to VTT", () => {
  expect(Subtitle.fromVTT(exampleVTT).toVTT()).toEqual(exampleVTT);
  expect(Subtitle.fromSRT(exampleSRT).toVTT()).toEqual(exampleVTT);
});

test("throw error if not a valid VTT", () => {
  expect(() => {
    Subtitle.fromVTT(exampleSRT);
  }).toThrow("does not have a valid WebVTT header");

  expect(() => {
    Subtitle.fromVTT("WEBVT");
  }).toThrow("WebVTT data is too short");
});
