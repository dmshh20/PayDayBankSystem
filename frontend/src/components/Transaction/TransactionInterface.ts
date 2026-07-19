import type { Transaction } from "../../types/transaction.interface"

export interface TransactionHelperProps {
  record: Transaction
  userProfile: TransactionHelperPropsUserProfile
}

export interface TransactionHelperPropsUserProfile {
  id: number
}