import React from 'react'

export const TransactionHelper = ({record, userId}: any) => {
    const whoIsUser = record.recipient.id !== userId

  return {
    fullName: 
    whoIsUser 
        ? `To ${record?.recipient.firstName} ${record?.recipient.surName}`
        : `Got from ${record?.sender.firstName} ${record?.sender.surName}`,
    kindOfTransfer: whoIsUser ? record?.recipientLastFour : record?.senderLastFour,
    amount: `${whoIsUser? '-' : '+'}$${record.sum}`
  }
}

export default TransactionHelper