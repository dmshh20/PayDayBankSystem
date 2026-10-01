export interface userWalletProvider {
    id: string
    userId: string
    balance: number
    cardIndex: string
    cardNumber: string
    createdAt: Date
    updatedAt: Date
    currency: string
    decryptCurrentCardNumber: string
}