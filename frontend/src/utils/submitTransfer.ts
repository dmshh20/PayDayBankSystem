import axios from "axios";
import { useState } from "react";

export const useSubmitTransfer = (refreshFromDashboard: () => void) => {
    const [currentSumAccount, setCurrentSumAccount] = useState<number>(0)
    const [process, setProcess] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [transferResponse] = useState<string>()

    const token = localStorage.getItem('accessToken')

    const resetMessages = () => {
        setError('')
        setProcess('')
    }

    const handleCardNumberSubmit = async (cardNumber: string, sumTransfer: string | undefined) => {
        resetMessages()
        if (!sumTransfer) {
           setError('Enter sum of money you want to send')
           return
        }
         if (!token) {
                throw new Error('token is not valid')
        }

             const body = {
                cardNumber,
                sum: Number(sumTransfer)
            }
            
          

             const userRecipientIdentityResponse = await axios.post(import.meta.env.VITE_TRANSFER_IDENTITY, body, {
                 headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
          
            const recipientInfo = userRecipientIdentityResponse.data
            
            const bodyConvert = {
                senderCurrency: recipientInfo.sender.currency,
                recipientCurrency: recipientInfo.recipientCurrency
            }
            
            
            const convertCurrency = await axios.get(
            `https://api.frankfurter.dev/v2/rate/${bodyConvert.senderCurrency}/${bodyConvert.recipientCurrency}`)

           
            const amount = recipientInfo.sumToSend * convertCurrency.data.rate
            
             const bodyTransfer = {
                sumToSend: amount, 
                sender: recipientInfo.sender,
                recipientCard: recipientInfo.recipientCard,

            }
                
             const transferResponse = await axios.post(import.meta.env.VITE_TRANSFER, bodyTransfer , {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            })
            
            
            const newBalance = transferResponse.data.userSender.balance
            
            await refreshFromDashboard()
            setCurrentSumAccount(newBalance.toFixed(2) ?? 0)

            setProcess(transferResponse.data.message)

    }
  
    return {
        handleCardNumberSubmit,
        process,
        error,
        currentSumAccount,
        resetMessages,
        transferResponse
    }
}