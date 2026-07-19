
export interface userProfileData {
    id: number
    firstName: string
    surName: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    userWallet: UserWalletData
}

export interface UserWalletData {
    id: number
    userId: number
    cardNumber: string
    cardIndex: string
    currency: string
    balance: number
    createdAt: Date
    updatedAt: Date
}
