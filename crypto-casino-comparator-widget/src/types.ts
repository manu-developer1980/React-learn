export interface Bonus {
  amount_label: string;
  wagering_req: string;
}

export interface CryptoQuotes {
  base_currency: string;
  quotes: Record<string, number>;
  last_updated_at: string;
}

export interface BonusValueFiat {
  amount_fiat_label: string;
  uses_quote_ticker: string | null;
}

export interface Casino {
  id: string;
  name: string;
  logo_url: string;
  rating: number;
  bonus: Bonus;
  min_deposit: string;
  features: string[];
  payment_methods: string[];
  accepted_cryptos: string[];
  accepted_networks: string[];
  license_region: string;
  withdrawal_speed: number; // in minutes
  no_kyc: boolean;
  pros: string[];
  cons: string[];
  promo_code?: string;
  affiliate_link: string;
  terms_link: string;
  crypto_quotes: CryptoQuotes;
  bonus_value_fiat: BonusValueFiat;
}

export type ThemeMode = 'light' | 'dark' | 'auto';
export type Density = 'compact' | 'normal';

export interface AppSettings {
  licenseKey: string;
  apiBaseUrl: string;
  useLocalData: boolean;
  cacheTtl: number;
  theme: ThemeMode;
  density: Density;
  visibleColumns: string[];
  customCasinos: Casino[];
}
