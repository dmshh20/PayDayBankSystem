import { useEffect, useState } from 'react'
import './Wallets.css'
import axios from 'axios'
import OpenWalletModal from './OpenWalletModal'

export interface WalletData {
    id: number
    userId: number
    cardNumber: string
    cardIndex: string
    currency: string
    balance: number
    createdAt: Date
    updatedAt: Date
    useWallet: WalletDataUserScope
}
export interface WalletDataUserScope {
    firstName: string
    surName: string
}

const Wallets = () => {
    const [userWallets, setUserWallets] = useState<WalletData | any>([])
    const [error, setError] = useState<string>()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const token = localStorage.getItem('accessToken')

    useEffect(() => {
             getUserWallets()
    }, [])

    const getUserWallets = async () => {
        try {    
            const response = await axios.get(import.meta.env.VITE_WALLET, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
            setUserWallets(response.data)
            
            return response.data
        } catch(error: unknown) {
            if (axios.isAxiosError(error)) {
                setError('Failed to fetch wallets')
            } else {
             setError('An unknown error occured')            
            }
        }
    }

    const toggleModal = () => {
        setIsOpen((prev) => !prev)
    }

    const openNewWallet = async (userNewWallet: string) => {
        try {
            const body = {userNewWallet: userNewWallet}
            const response = await axios.post(import.meta.env.VITE_WALLET_CREATE, body, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })

            return response.data
        } catch(error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error?.response?.data?.message)            
            } else if (error instanceof Error) {
                setError(error.message)
            } else {
                setError('An unknown error occured')
            }
        }
    }

  return (
    <section className='wallets'>
        <h2 className='wallets-title'>All your available cards</h2>

            <div className='openingNewCard'>
                
                <button className='openCardBtn' onClick={toggleModal}>Open new credit card</button>
                 {isOpen && 
                <OpenWalletModal setIsOpen={setIsOpen}>
                        <div className='openWalletScreenChooseCurrency'>

                            <p onClick={() => setIsOpen(false)}>exit</p>

                            <div className='availableCurrencyList'>
                                <h3>Choose New Card Currency</h3>
                                <div className='currencyList'>
                                    <p onClick={() => openNewWallet('USD')} className='currency'>🇺🇸 USD - US Dollar</p>
                                    <p onClick={() => openNewWallet('EUR')} className='currency'>🇪🇺 EUR - Euro</p>   
                                    <p>error: {error}</p> 
                                </div>
                                      
                            </div>
                        </div>
                    
                    </OpenWalletModal>}
               
            </div>

        <div className='wallets-cards'>
          {userWallets.map((record: any) => {
            const currency = record.currency === 'EUR' ? '€' : '$'
            return (
            <div className='userWallet'>
                <div className="userWalletBlock">
                     <div className='userCardInfo'> 
                          <p>Name</p>
                          <h4>{record.userWallet.firstName} {record.userWallet.surName}</h4>
                      </div>
                      <div className='userCurrencyBlock'>
                         <p className='userCurrency'>{record.currency}</p>
                         <p className='userBalance'><b>{currency}</b>{record.balance}</p>
                      </div>
                </div>

            </div>
    )})}
        </div>

    </section>
  )
}

export default Wallets