import type { Country } from "../types/country";

const API_URL = "https://api.restcountries.com/countries/v5";
const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_KEY;
const PAGE_SIZE = 100;

const FIELDS = [
  "names.common",
  "names.native",
  "codes.alpha_3",
  "flag.url_svg",
  "population",
  "region",
  "subregion",
  "capitals",
  "tlds",
  "currencies",
  "languages",
  "borders",
].join(",");

const CACHE_KEY = "countries-cache-v1";
const CACHE_DURATION = 60 * 60 * 1000;

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

// Talks to the API
async function fetchAllCountries(): Promise<Country[]> {
  const countries: Country[] = [];
  let offset = 0;
  let more = true;

  while (more) {
    const url = `${API_URL}?limit=${PAGE_SIZE}&offset=${offset}&response_fields=${FIELDS}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });

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

// Reads the cached data from the browser. Returns null if it is missing,
// expired, or invalid.
function readCache(): Country[] | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (raw === null) return null;

    const cached: CachedCountries = JSON.parse(raw);

    if (typeof cached.savedAt !== "number" || !Array.isArray(cached.countries)) {
      return null;
    }

    const isFresh = Date.now() - cached.savedAt < CACHE_DURATION;
    return isFresh ? cached.countries : null;
  } catch {
    return null;
  }
}

// Stores the list in the browser, along with the current date.
function writeCache(countries: Country[]) {
  try {
    const cached: CachedCountries = { savedAt: Date.now(), countries };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  } catch {
    // Storage is full or blocked: continue without using the cache.
  }
}

// The only exported function: uses the cache if it is valid, otherwise calls the API.
export async function getAllCountries(): Promise<Country[]> {
  const cached = readCache();
  if (cached !== null) return cached;

  const countries = await fetchAllCountries();
  writeCache(countries);
  return countries;
}