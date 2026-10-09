import type { Country } from "../types/country";

const API_URL = "/api/countries";
const PAGE_SIZE = 100; // doit rester identique à PAGE_SIZE dans api/countries.ts

const CACHE_KEY = "countries-cache-v1";
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure

interface CountriesPage {
  data: {
    objects: Country[];
    meta: { more: boolean };
  };
}

interface CachedCountries {
  savedAt: number;
  countries: Country[];
}

// Fetches all countries page by page through the server-side API.
async function fetchAllCountries(): Promise<Country[]> {
  const countries: Country[] = [];
  let offset = 0;
  let more = true;

  while (more) {
    const res = await fetch(`${API_URL}?offset=${offset}`);

    if (!res.ok) {
      throw new Error(`Erreur API : ${res.status}`);
    }

    const json: CountriesPage = await res.json();

    countries.push(...json.data.objects);

    more = json.data.meta.more;
    offset += PAGE_SIZE;
  }

  return countries.filter((country) => country.flag.url_svg !== "");
}

// Reads the cached countries from localStorage.
function readCache(): Country[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);

    if (raw === null) return null;

    const cached: CachedCountries = JSON.parse(raw);

    if (
      typeof cached.savedAt !== "number" ||
      !Array.isArray(cached.countries)
    ) {
      return null;
    }

    const isFresh = Date.now() - cached.savedAt < CACHE_DURATION;

    return isFresh ? cached.countries : null;
  } catch {
    return null;
  }
}

// Stores the countries in localStorage.
function writeCache(countries: Country[]): void {
  try {
    const cached: CachedCountries = { savedAt: Date.now(), countries };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch {
    // Continue without caching if storage is blocked or full.
  }
}

// Returns the cached countries, or fetches them if the cache is missing or old.
export async function getAllCountries(): Promise<Country[]> {
  const cached = readCache();

  if (cached !== null) {
    return cached;
  }

  const countries = await fetchAllCountries();

  writeCache(countries);

  return countries;
}