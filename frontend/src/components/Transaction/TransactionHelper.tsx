import type { TransactionHelperProps } from './TransactionInterface'


export const TransactionHelper = ({record, userProfile}: TransactionHelperProps) => {
    const whoIsUser = record.recipientId !== userProfile?.id
  
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