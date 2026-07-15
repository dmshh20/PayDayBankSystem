import type { Transaction } from '../../types/transaction.interface'

interface TransactionHelperProps {
  record: Transaction
  userId: number | undefined
}

export const TransactionHelper = ({record, userId}: TransactionHelperProps) => {
    const whoIsUser = record.recipient.id !== userId

  return {
    fullName: 
    whoIsUser 
        ? `To ${record?.recipient.userWallet.firstName} ${record?.recipient.userWallet.surName}`
        : `Got from ${record?.sender.userWallet.firstName} ${record?.sender.userWallet.surName}`,
    kindOfTransfer: whoIsUser ? record?.recipientLastFour : record?.senderLastFour,
    amount: `${whoIsUser? '-' : '+'}$${record.sum}`
  }
}

export default TransactionHelper