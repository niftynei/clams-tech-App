import type { Auth } from './types'
import { BitcoinDenomination, FiatDenomination, Language, type Settings } from './types'

export const DEV = import.meta.env.DEV
export const MODE = import.meta.env.MODE

export const lnsocketProxy = 'wss://lnsocket.clams.tech'

export const COIN_GECKO_PRICE_ENDPOINT = `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=${Object.keys(
  FiatDenomination
).join(',')}`

export const COINBASE_PRICE_ENDPOINT = 'https://api.coinbase.com/v2/exchange-rates?currency=BTC'

export const SEC_IN_MS = 1000
export const MIN_IN_MS = 60 * 1000
export const MIN_IN_SECS = 60

export const DEFAULT_INVOICE_EXPIRY = 15 * MIN_IN_SECS

export const DEFAULT_SETTINGS: Settings = {
  language: (navigator?.languages
    ? navigator.languages[0]
    : navigator.language || Language['en-US']) as Language,
  fiatDenomination: FiatDenomination.usd,
  bitcoinDenomination: BitcoinDenomination.sats,
  primaryDenomination: BitcoinDenomination.sats,
  secondaryDenomination: FiatDenomination.usd,
  invoiceExpiry: DEFAULT_INVOICE_EXPIRY,
  sendMaxFeePercent: 0.5,
  sendTimeoutSeconds: 120,
  notifications: true,
  darkmode: false
}

export const AUTH_INTITIAL_STATE: Auth = {
  address: '',
  token: '',
  sessionSecret: ''
}

export const AUTH_STORAGE_KEY = 'clams-app:auth'
export const SETTINGS_STORAGE_KEY = 'clams-app:settings'

export const DOCS_LINK = 'https://clams.tech/docs'
export const DOCS_CONNECT_LINK = 'https://clams.tech/docs/connect'
export const DOCS_RUNE_LINK = 'https://clams.tech/docs/runes'
export const TWITTER_LINK = 'https://twitter.com/clamstech'
export const GITHUB_LINK = 'https://github.com/clams-tech'
export const DISCORD_LINK = '@TODO'
