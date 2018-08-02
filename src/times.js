const timestampRegex = /^((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3}) --> ((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3})(?: (.*))?$/;
const timeRegex = /(\d{2,})?:?(\d{2}):(\d{2})[,.](\d{3})/;

export function parseTimestamps(timestamps) {
  const match = timestampRegex.exec(timestamps);

  return { start: parseTime(match[1]), end: parseTime(match[2]) };
}

export function parseTime(time) {
  const match = timeRegex.exec(time);

  return {
    hour: match[1] || "00",
    minute: match[2] || "00",
    second: match[3] || "00",
    millisecond: match[4] || "000"
  };
}

export function toSRTTime({ hour, minute, second, millisecond }) {
  return `${hour}:${minute}:${second},${millisecond}`;
}

export function toVTTTime({ hour, minute, second, millisecond }) {
  return `${minute}:${second}.${millisecond}`;
}
