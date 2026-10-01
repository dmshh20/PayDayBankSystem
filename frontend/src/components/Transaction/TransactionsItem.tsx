import React from 'react'

interface TransactionsItemProps {
    boltLogo: any
    fullName: string
    date: string
    kindOfTransfer: string
    amount: string
}

const TransactionsItem = ({boltLogo, fullName, date, kindOfTransfer, amount}: TransactionsItemProps) => {
    
  return ( 
        <li className='listOfRecentTransactions' >
            <div className='recentTransactionsBlockAboutUser'>
                <img src={boltLogo} alt='here' className='recentTransactionsImage'></img>
                <p className='userRecentTransactionsFullName'>{fullName}</p>
            </div>
            <p className='recentTransactionsTime'>{date}</p>
            <p className='recentTransactionsCard'>****{kindOfTransfer}</p>

            <p>{amount}</p>
            <p className='recentTransactionStatusOfTheOperation'>status</p>

            </li>
                                )
}

export default TransactionsItem