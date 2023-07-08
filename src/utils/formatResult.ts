/**
 * Format string or number to decimal places
 * or just return the string if it is not a
 * number
 */
export default function formatResult(
  value: string | number,
  n: number = 3,
): string {
  if (typeof value === "number") {
    return String(value.toFixed(n));
  }

  if (!isNaN(Number(value))) {
    return String(Number(value).toFixed(n));
  }

  return value;
}
