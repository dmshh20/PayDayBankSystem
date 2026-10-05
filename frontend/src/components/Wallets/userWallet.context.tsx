import axios from 'axios';
import { useState, createContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const UserWalletContext = createContext<any>(0);

interface UserWalletProviderProps {
  children: React.ReactNode;
}

export const UserWalletProvider: React.FC<UserWalletProviderProps> = ({children}) => {
  const [refreshUserWallet, setRefreshUserWallet] = useState<boolean>(false)
  const [userWallet, setUserWallet] = useState<any>()
  const savedCurrency = localStorage.getItem("currencyParam");
  const currency = savedCurrency || "USD";
  let location = useLocation()  

  useEffect(() => {
     const definedCurrentCurrency = async (currency: string) =>  {
          
        const token = localStorage.getItem('accessToken')
        const response = await axios.get(`${import.meta.env.VITE_WALLET_SELECT_CURRENCY}=${currency}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
         setUserWallet(response.data)
    }
    
    definedCurrentCurrency(currency)
    }, [currency, location, refreshUserWallet])

    const refetchUserWallet = () => {
      setRefreshUserWallet((r) => !r)
    }

  return (
    <UserWalletContext.Provider value={{userWallet, refetchUserWallet}}>
      {children}
    </UserWalletContext.Provider>
  );
}