export default function parseStringToBoolean(value) {
  if (typeof value === "string") {
    return value.toLocaleLowerCase() === "true";
  }
  return undefined;
}
