import type { VercelRequest, VercelResponse } from "@vercel/node";

const API_URL = "https://api.restcountries.com/countries/v5";
const PAGE_SIZE = 100;
const MAX_OFFSET = 500;

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

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.RESTCOUNTRIES_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key is not configured" });
  }

  const offset = Number(req.query.offset ?? 0);
  const isValidOffset =
    Number.isInteger(offset) &&
    offset >= 0 &&
    offset <= MAX_OFFSET &&
    offset % PAGE_SIZE === 0;

  if (!isValidOffset) {
    return res.status(400).json({ error: "Invalid offset" });
  }

  try {
    const url = new URL(API_URL);
    url.searchParams.set("limit", String(PAGE_SIZE));
    url.searchParams.set("offset", String(offset));
    url.searchParams.set("response_fields", FIELDS);

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    const data = await response.json();

    res.setHeader(
      "Cache-Control",
      response.ok
        ? "public, s-maxage=3600, stale-while-revalidate=86400"
        : "no-store",
    );

    return res.status(response.status).json(data);
  } catch {
    res.setHeader("Cache-Control", "no-store");
    return res.status(500).json({ error: "Failed to fetch countries" });
  }
}