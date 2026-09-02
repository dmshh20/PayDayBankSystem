
interface RecipientResponse {
  id: number
  cardNumber: string
  createdAt: string
  userWallet: UserWallet
}
interface SenderResponse {
  cardNumber: string
  userWallet: UserWallet
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
  convertedSum: number
  updatedAt: string
  url: string
  user: SenderResponse 
  recipientLastFour: string
  senderLastFour: string
}


export interface UserWallet {
  firstName: string
  surName: string
}



