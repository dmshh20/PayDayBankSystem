import type { TransactionHelperProps } from './TransactionInterface'


export const TransactionHelper = ({record, userProfile, recipientCurrency}: TransactionHelperProps) => {
    const whoIsUser = record.recipientId !== userProfile?.id
  
  return {
    fullName: 
    whoIsUser 
        ? `To ${record?.recipient.userWallet.firstName} ${record?.recipient.userWallet.surName}`
        : `Got from ${record?.sender.userWallet.firstName} ${record?.sender.userWallet.surName}`,
    kindOfTransfer: whoIsUser ? record?.recipientLastFour : record?.senderLastFour,
    amount: `${whoIsUser? '-' : '+'}${recipientCurrency === 'USD' ? '$': '€'}$${record.convertedSum}`
  }
}

export default TransactionHelper