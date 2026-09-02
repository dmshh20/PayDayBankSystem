import type { Transaction } from "../../types/transaction.interface"

export interface TransactionHelperProps {
  record: Transaction
  userProfile: TransactionHelperPropsUserProfile
  currency: string | undefined

}

export interface TransactionHelperPropsUserProfile {
  id: number

}