const toMilliseconds = require("@sindresorhus/to-milliseconds");
const parseMs = require("parse-ms");

const timestampRegex = /^((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3}) --> ((?:\d{2,}:)?\d{2}:\d{2}[,.]\d{3})(?: (.*))?$/;
const timeRegex = /(\d{2,})?:?(\d{2}):(\d{2})[,.](\d{3})/;

export function parseTimestamps(timestamps) {
  const match = timestampRegex.exec(timestamps);

  return { startTime: parseTime(match[1]), endTime: parseTime(match[2]) };
}

export function parseTime(time) {
  const match = timeRegex.exec(time);

  return toMilliseconds({
    hours: parseInt(match[1], 10) || 0,
    minutes: parseInt(match[2], 10) || 0,
    seconds: parseInt(match[3], 10) || 0,
    milliseconds: parseInt(match[4], 10) || 0
  });
}

export function toSRTTime(ms) {
  const { days, hours, minutes, seconds, milliseconds } = parseMs(ms);
  return `${(days * 24 + hours)
    .toString()
    .padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")},${milliseconds.toString().padStart(3, "0")}`;
}

export function toVTTTime(ms) {
  const { days, hours, minutes, seconds, milliseconds } = parseMs(ms);

  return `${(days * 24 + hours * 60 + minutes)
    .toString()
    .padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
}
