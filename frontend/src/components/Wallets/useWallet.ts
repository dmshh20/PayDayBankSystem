import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const useWallet = () => {
    const [userWallet, setUserWallet] = useState<any>()
    
    const savedCurrency = localStorage.getItem("currencyParam");
    const currency = savedCurrency || "USD";

    useEffect(() => {

    const definedCurrentCurrency = async (currency: string) =>  {
        const token = localStorage.getItem('accessToken')
        const response = await axios.get(`http://localhost:3000/wallet/info?currency=${currency}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            
            }
        })
            
         setUserWallet(response.data)
    }
    definedCurrentCurrency(currency)
    }, [currency])

    const selectCurrency = (newCurrency: string) => {
        localStorage.setItem('currencyParam', newCurrency)
        
    }

    return {
        userWallet,
        currency,
        selectCurrency
    }

}