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

  expect(subtitle.subtitles[0].start).toEqual({
    hour: "00",
    minute: "02",
    second: "17",
    millisecond: "440"
  });
  expect(subtitle.subtitles[0].end).toEqual({
    hour: "00",
    minute: "02",
    second: "20",
    millisecond: "375"
  });
  expect(subtitle.subtitles[0].text).toEqual(
    "Senator, we're making\nour final approach into Coruscant."
  );

  expect(subtitle.subtitles[1].start).toEqual({
    hour: "00",
    minute: "02",
    second: "20",
    millisecond: "476"
  });
  expect(subtitle.subtitles[1].end).toEqual({
    hour: "00",
    minute: "02",
    second: "22",
    millisecond: "501"
  });
  expect(subtitle.subtitles[1].text).toEqual("Very good, Lieutenant.");
});

test("parse VTT subtitle", () => {
  const subtitle = Subtitle.fromVTT(exampleVTT);

  expect(subtitle).toBeInstanceOf(Subtitle);
  expect(subtitle.subtitles.length).toEqual(2);

  expect(subtitle.subtitles[0].start).toEqual({
    hour: "00",
    minute: "02",
    second: "17",
    millisecond: "440"
  });
  expect(subtitle.subtitles[0].end).toEqual({
    hour: "00",
    minute: "02",
    second: "20",
    millisecond: "375"
  });
  expect(subtitle.subtitles[0].text).toEqual(
    "Senator, we're making\nour final approach into Coruscant."
  );

  expect(subtitle.subtitles[1].start).toEqual({
    hour: "00",
    minute: "02",
    second: "20",
    millisecond: "476"
  });
  expect(subtitle.subtitles[1].end).toEqual({
    hour: "00",
    minute: "02",
    second: "22",
    millisecond: "501"
  });
  expect(subtitle.subtitles[1].text).toEqual("Very good, Lieutenant.");
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
