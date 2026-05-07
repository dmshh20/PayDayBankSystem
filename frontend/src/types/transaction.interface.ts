
interface RecipientResponse {
  id: number
  cardNumber: string
  createdAt: string
  firstName: string
  surName: string
}
interface SenderResponse {
  firstName: string
  surName: string
}

export interface Transaction {
  id: number
  method: string
  recipient: RecipientResponse
  createdAt: string
  recipientId: number
  sender: SenderResponse
  senderId: number
  statusCode: number
  sum: number
  updatedAt: string
  url: string
  user: SenderResponse 
  recipientLastFour: string
  senderLastFour: string
}

export interface RecentTransactionResponse {
  // recentTransaction: Transaction[]
  lastRecords: []
}



