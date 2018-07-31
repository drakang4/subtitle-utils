const Subtitle = require("../dist/bundle.cjs");

test("make Subtitle instance from SRT", () => {
  const exampleSRT = `
  1
  00:02:17,440 --> 00:02:20,375
  Senator, we're making
  our final approach into Coruscant.
  
  2
  00:02:20,476 --> 00:02:22,501
  Very good, Lieutenant.
  
  `;

  const subtitle = Subtitle.fromSRT(exampleSRT);

  expect(subtitle).toBeInstanceOf(Subtitle);
  expect(subtitle.subtitles.length).toEqual(2);

  expect(subtitle.subtitles[0].start).toEqual("00:02:17,440");
  expect(subtitle.subtitles[0].end).toEqual("00:02:20,375");
  expect(subtitle.subtitles[0].text).toEqual(
    "Senator, we're making\nour final approach into Coruscant."
  );

  expect(subtitle.subtitles[1].start).toEqual("00:02:20,476");
  expect(subtitle.subtitles[1].end).toEqual("00:02:22,501");
  expect(subtitle.subtitles[1].text).toEqual("Very good, Lieutenant.");
});
