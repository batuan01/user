export function TruncateText(text, maxLength) {
  if (typeof text !== "string") {
    return "";
  }
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "...";
  }
  return text;
}
