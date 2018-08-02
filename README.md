# subtitle-utils

A simple utils for subtitle such as SRT, WebVTT.

## Example

```javascript
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

Working
