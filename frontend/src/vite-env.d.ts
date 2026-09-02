interface ImportMetaEnv {
  readonly VITE_SIGNUP: string
  readonly VITE_SIGNIN: string
  readonly VITE_INBOX_CATEGORIES: string
  readonly VITE_USER: string
  readonly VITE_TRANSFER: string
  readonly VITE_DECRYPT: string
  readonly VITE_RECENT_TRANSACTIONS: string
  readonly VITE_INBOX_CATEGORIES: string
  readonly VITE_INBOX_LETTER: string
  readonly VITE_WALLET: string
  readonly VITE_WALLET_CREATE: string
  readonly VITE_TRANSFER_IDENTITY: string


}

interface ImportMeta {
  readonly env: ImportMetaEnv
}