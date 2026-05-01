
interface RecipientResponse {
  cardNumber: string
  createdAt: string
  firstName: string
  surName: string
}
interface SenderResponse {
  firstName: string
  surName: string
}

interface Transaction {
  id: number
  method: string
  recipient: RecipientResponse
  createdAt: string
  recipientId: number
  senderId: number
  statusCode: number
  sum: number
  updatedAt: string
  url: string
  user: SenderResponse 
}

export interface RecentTransactionResponse {
  recentTransaction: Transaction[]
  knownLastFourNumbers: string
}
