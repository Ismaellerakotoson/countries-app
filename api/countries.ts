
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const url = new URL(
      "https://api.restcountries.com/countries/v5",
    );

    const allowedParams = [
      "limit",
      "offset",
      "response_fields",
    ];

    for (const key of allowedParams) {
      const value = req.query[key];

      if (typeof value === "string") {
        url.searchParams.set(key, value);
      }
    }

    const apiKey = process.env.RESTCOUNTRIES_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "API key is not configured",
      });
    }

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({
      error: "Failed to fetch countries",
    });
  }
}
