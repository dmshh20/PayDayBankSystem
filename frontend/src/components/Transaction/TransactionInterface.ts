import type { Transaction } from "../../types/transaction.interface"

export interface TransactionHelperProps {
  record: Transaction
  userProfile: TransactionHelperPropsUserProfile
  recipientCurrency: string | undefined

}

export interface TransactionHelperPropsUserProfile {
  id: number

}