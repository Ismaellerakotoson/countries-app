import type { Country } from "../types/country";

export function getNativeName(country: Country): string {
  const names = Object.values(country.names.native).map((n) => n.common);
  return names.length > 0
    ? [...new Set(names)].join(", ")
    : country.names.common;
}