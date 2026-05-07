import axios from "axios";
import { useEffect, useState } from "react";
import type {  RecentTransactionResponse } from "../types/transaction.interface";
import { formatCardNumber } from "./cardFormatter";
import type { DashBoardUserFullNameDisplay } from "../types/dashboard.interface";

export const useDashboard =  () => {
    const [userBankAccount, setUserBankAccount] = useState<string | number>()
    const [currentUserSum, setCurrentUserSum] = useState<number>(0)
    const [userRecentTransaction, setUserRecentTransaction] = useState<RecentTransactionResponse | null>()
    const [userId, setUserId] = useState<number>()
    const [userName, setUserName] = useState<DashBoardUserFullNameDisplay>()
    const token = localStorage.getItem('accessToken')
    const [error, setError] = useState<string>()

        const fetchDashboardData = async () => {
        if (!token) return;

                
        try {

            const userResponse = await axios.get(import.meta.env.VITE_ME, {
            headers: {
            Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'          
                }
            })
            setCurrentUserSum(userResponse.data.balance)
            setUserId(userResponse.data.id)
            setUserName(userResponse.data) 

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

        } catch(error: unknown) {
            if (typeof error === 'string') {
                setError(error?.toUpperCase())
            } else if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Server Error')
            }
            setError('Something went wrong')
        } 
        }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    return {
        userBankAccount,
        currentUserSum,
        userRecentTransaction,
        userId,
        userName,
        refresh: fetchDashboardData
    }

}