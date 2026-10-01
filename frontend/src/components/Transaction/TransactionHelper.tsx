import type { TransactionHelperProps } from './TransactionInterface'


export const TransactionHelper = ({record, userProfile, currency}: TransactionHelperProps) => {
  const whoIsUser = record.recipientId !== userProfile?.id
  const userCurrency = currency === 'USD' ? '$': '€'
  return {
    fullName: 
    whoIsUser 
        ? `To ${record?.recipient.userWallet.firstName} ${record?.recipient.userWallet.surName}`
        : `Got from ${record?.sender.userWallet.firstName} ${record?.sender.userWallet.surName}`,
    kindOfTransfer: whoIsUser ? record?.recipientLastFour : record?.senderLastFour,
    amount: `${whoIsUser? '-' : '+'}${userCurrency}${record.convertedSum}`
  }
}

export default TransactionHelper