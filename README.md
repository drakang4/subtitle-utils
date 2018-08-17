# subtitle-utils

A simple utils for subtitle such as SRT, WebVTT.

[![Build Status](https://travis-ci.org/drakang4/subtitle-utils.svg?branch=master)](https://travis-ci.org/drakang4/subtitle-utils)
[![codecov](https://codecov.io/gh/drakang4/subtitle-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/drakang4/subtitle-utils)

## Example

```javascript
const Subtitle = require('subtitle-utils');

const exampleSRT = `
  1
  00:02:17,440 --> 00:02:20,375
  Senator, we're making
  our final approach into Coruscant.

  2
  00:02:20,476 --> 00:02:22,501
  Very good, Lieutenant.

`;

Subtitle.fromSRT(exampleSRT).toVTT();
  
```

## Installation

```bash
npm install subtitle-utils
```

## API

### `static Subtitle.fromSRT(data: string): Subtitle`

Create a Subtitle instance from SubRip SRT subtitle.

### `static Subtitle.fromVTT(data: string): Subtitle`

Create a Subtitle instance from WebVTT subtitle.

### `Subtitle.subtitles: ISubtitle[]`

Get array of subtitle object.

### `Subtitle.toSRT(data: string): string`

Returns SubRip SRT subtitle value.

### `Subtitle.toVTT(data: string): string`

Returns WebVTT subtitle value;
