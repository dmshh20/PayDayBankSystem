import axios from "axios";
import { useEffect, useState } from "react";
import type {  RecentTransactionResponse } from "../types/transaction.interface";
import { formatCardNumber } from "./cardFormatter";

export interface userProfileData {
    id: number
    firstName: string
    surName: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    userWallet: UserWalletData
}

export interface UserWalletData {
    id: number
    userId: number
    cardNumber: string
    cardIndex: string
    currency: string
    balance: number
    createdAt: Date
    updatedAt: Date
}

export const useDashboard =  () => {
    const [userProfile, setUserProfile] = useState<userProfileData | any>()
    const [userBankAccount, setUserBankAccount] = useState<string | number>()
    const [userRecentTransaction, setUserRecentTransaction] = useState<RecentTransactionResponse | null>()
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
            setUserProfile(userResponse.data) 
            
            const decryptResponse = await axios.post(import.meta.env.VITE_DECRYPT, 
                {cardNumber: userResponse.data.userWallet[0]?.cardNumber},
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
        userProfile,
        userBankAccount,
        userRecentTransaction,
        refresh: fetchDashboardData
    }

}