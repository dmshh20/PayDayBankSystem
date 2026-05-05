import axios from "axios";
import { useEffect, useState } from "react";
import type { RecentTransactionResponse } from "../types/transaction.interface";
import { formatCardNumber } from "./cardFormatter";

export const useDashboard =  () => {
    const [userBankAccount, setUserBankAccount] = useState<string | number>()
    const [currentUserSum, setCurrentUserSum] = useState<number>(0)
    const [userRecentTransaction, setUserRecentTransaction] = useState<RecentTransactionResponse | null>()
    const [loading, setLoading] = useState<boolean>(false)

    const token = localStorage.getItem('accessToken')
        

        const fetchDashboardData = async () => {
        if (!token) return;

        setLoading(true)
                
        try {

            const userResponse = await axios.get(import.meta.env.VITE_ME, {
            headers: {
            Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'          
                }
            })
            setCurrentUserSum(userResponse.data.balance)

            const decryptResponse = await axios.post(import.meta.env.VITE_DECRYPT, 
                {cardNumber: userResponse.data.cardNumber},
                {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
                }
            )
            
            setUserBankAccount(formatCardNumber(decryptResponse.data))
        
            const recentTransactionsResponse = await axios.get(import.meta.env.VITE_RECENT_TRANSACTIONS, {
            headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
                }
            })
            setUserRecentTransaction(recentTransactionsResponse.data.message || recentTransactionsResponse.data)

        } catch(error: any) {
            console.log(error);
        } finally {
            setLoading(false)
        }
        }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return {
        userBankAccount,
        currentUserSum,
        userRecentTransaction,
        loading,
        refresh: fetchDashboardData
    }

}