const timeReg = /^((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3}) --> ((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3})(?: (.*))?$/;

export default function parseTimestamps(time) {
  const match = timeReg.exec(time);

  return { start: match[1], end: match[2] };
}
