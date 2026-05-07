import axios from "axios";
import { useState } from "react";

export const useSubmitTransfer = (refreshFromDashboard: () => void) => {
    const [currentSumAccount, setCurrentSumAccount] = useState<number>(0)
    const [process, setProcess] = useState<string>('')


        const token = localStorage.getItem('accessToken')

    const handleCardNumberSubmit = async (cardNumber: string, sumTransfer: string | undefined) => {
         if (!token) {
                throw new Error('token is not valid')
            }

                
        try {
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
        } catch(error: any) {
            console.log(error);
            
        }
    }
  
    return {
        handleCardNumberSubmit,
        process,
        currentSumAccount
    }
}