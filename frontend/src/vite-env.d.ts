interface ImportMetaEnv {
  readonly VITE_SIGNUP: string
  readonly VITE_SIGNIN: string
  readonly VITE_INBOX_CATEGORIES: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}