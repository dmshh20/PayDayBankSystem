import axios from "axios";
import { useState } from "react";

export const useSubmitTransfer = (refreshFromDashboard: () => void) => {
    const [currentSumAccount, setCurrentSumAccount] = useState<number>(0)
    const [process, setProcess] = useState<string>('')
    const [error, setError] = useState<string>('')
    

    const token = localStorage.getItem('accessToken')

    const resetMessages = () => {
        setError('')
        setProcess('')
    }

    const handleCardNumberSubmit = async (cardNumber: string, sumTransfer: string | undefined) => {
        resetMessages()
        
         if (!token) {
                throw new Error('token is not valid')
            }

                
             const body = {
                cardNumber,
                sum: Number(sumTransfer)
            }
            
            const response = await axios.post(import.meta.env.VITE_TRANSFER, body , {
                headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
                }
            })
           
            setProcess(response.data.message);
            const newBalance = response.data.sender.balance;
            setCurrentSumAccount(newBalance ?? 0);

            await refreshFromDashboard()
            return response.data
    }
  
    return {
        handleCardNumberSubmit,
        process,
        error,
        currentSumAccount,
        resetMessages
    }
}