export interface WalletDto {
    id: number
    userId: number
    balance: number
    cardIndex: string
    cardNumber: string
    createdAt: Date
    updatedAt: Date
    currency: string
    userWallet: WalletDtoUserWallet
}

export interface WalletDtoUserWallet {
    firstName: string
    surName: string
}

export interface WalletData {
    id: number
    userId: number
    cardNumber: string
    cardIndex: string
    currency: string
    balance: number
    createdAt: Date
    updatedAt: Date
    useWallet: WalletDataUserScope
}
export interface WalletDataUserScope {
    firstName: string
    surName: string
}