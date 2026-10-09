export interface Country {
  names: {
    common: string;
    native: Record<string, { common: string; official: string }>;
  };
  codes: { alpha_3: string };
  capitals: { name: string }[];
  flag: { url_svg: string };
  region: string;
  subregion: string;
  borders: string[];
  currencies: { code: string; name: string; symbol: string }[];
  languages: { name: string; native_name: string }[];
  population: number;
  tlds: string[];
}