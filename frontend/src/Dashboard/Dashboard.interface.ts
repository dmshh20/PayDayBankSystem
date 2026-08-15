
export interface DashboardRecentTransactioRecipientUserWalletProps {
    firstName: string
    surName: string
}

export interface DashboardRecentTransactioRecipientProps {
    id: number
    cardNumber: string
    createdAt: string
    userWallet: DashboardRecentTransactioRecipientUserWalletProps[]
}

export interface DashboardRecentTransactioRecipientSenderProps {
    cardNumber: string
    userWallet: DashboardRecentTransactioRecipientUserWalletProps[]
}
export interface DashboardRecentTransactionProps {
    id: number
    createdAt: string
    updatedAt: string
    method: string
    recipientId: number
    senderId: number
    recipientLastFour: string
    senderLastFour: string
    statusCode: number
    sum: number
    url: string
    recipient: DashboardRecentTransactioRecipientProps
    sender: DashboardRecentTransactioRecipientSenderProps
}