import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import { Line } from 'react-chartjs-2'
import revenue from '../data/revenue.json'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Link, NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ExitModel from '../Modals/ExitModal/ExitModal'
import  visaLogo  from '../image/visa-logo.png'
import defaultUserLogo from '../image/default-user-logo.png'
import SendMoneyModal from '../Modals/SendMoneyModal/SendMoneyModal'
import boltLogo from '../image/bolt.png'
import type { RecentTransactionResponse } from '../types/transaction.interface'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Dashboard = () => {
  const [currentSumAccount, setCurrentSumAccount] = useState<number>(0)
  const [sumTransfer, setSumTransfer] = useState<string>()
  const [cardNumber, setCardNumber] = useState('');
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false)
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState<boolean>(false)
  const [userName, setUserName] = useState<[] | any>(null)
  const [process, setProcess] = useState<string>('')
  const [error, setError] = useState<string>()
  const [userCardNumberForDecrypt, setUserCardNumberForDecrypt] = useState<string>('')
  const [cardNumberInTheBankScreen, setCardNumberInTheBankScreen] = useState<string | number>()
  const [userRecentTransaction, setUserRecentTransaction] = useState<any | null | string>()
  const [userId, setUserId] = useState<number>()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow ? 'hidden' : 'unset'
    }
    }, [])
  
  useEffect( () => {
    const init = async () => {

      const auth = await isAuthorized()

      if (auth) {
        await decryptCardNumber(auth.cardNumber)
        await recentTransaction()
      }
    }
    init()

  }, [userCardNumberForDecrypt])
  

  useEffect(() => {
    if (!isSendMoneyModalOpen) {
      setCardNumber('')
      setError('')
      setProcess('')
    }
  }, [isSendMoneyModalOpen])


  function handleCardNumber(cardNumber: any) {
   let cn = String(cardNumber).replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()
   
   setCardNumberInTheBankScreen(cn)
   
  }

  function enteringCardNumber(card: string) {
    if (card != null) {
      card = card.replace(/[^\d]/g, '').replace(/(.{4})/g, '$1 ').trim()
        } 
    
    return card;
  }


  const handleButtons = () => {
    setIsExitModalOpen(true)
  }

  const handleExit = () => {
    localStorage.removeItem('accessToken')
  }

   const isAuthorized = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await axios.get(import.meta.env.VITE_ME, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'          
        }
      })
      const cardNumber = response.data.cardNumber
      const currSum = response.data.balance

      setUserCardNumberForDecrypt(cardNumber)
      setCurrentSumAccount(currSum)
      setUserId(response.data.id)
      setUserName(response.data)
      return response.data
    } catch(error: any) {
      throw new Error('Failed in getting user data')
    }
  }

  const handleCardNumberSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('accessToken')
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
      const currentSum = response.data.sender.balance
      currentSum === undefined ? setCurrentSumAccount(0) : setCurrentSumAccount(currentSum)
      setProcess(response.data.message) 
      return response.data
    } catch(error: any) {
      if (error.response.status === 400) {
        setError('Insuffienct funds')        
      }
    }
  }
 
  const decryptCardNumber = async (decryptedCardNumber: string) => {
    try {
        const token = localStorage.getItem('accessToken')
        if (!token) {
          throw new Error('token is not valid')
        }
        const response = await axios.post(import.meta.env.VITE_DECRYPT, 
        {cardNumber: decryptedCardNumber},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      )
      handleCardNumber(response.data)
      return response.data
    } catch(error: any) {
        throw new Error('failed in decrypt')
    }
  }

  const recentTransaction = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      
      const response = await axios.get(import.meta.env.VITE_RECENT_TRANSACTIONS, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      
       {response.data.message 
        ?
        setUserRecentTransaction(response.data.message)
        :
        setUserRecentTransaction(response.data)
       }

      return response.data
    } catch(error: any) {
      throw new Error('Failed recent transaction')      
    }
  }

  return (
    <section className='dashboard'>
        <div className='personalUserInfo'>
          <FontAwesomeIcon icon={faBell} className='faBell'/>
            <div className='myAccount'>
              {userName === null
              ?
              <Link to='/signup' className='signUp'>
                 <p className='signUp' >sign up</p>
              </Link>
              :
              <p className='isAuthorized'>{userName?.firstName}</p>
              }

              <b className='userProfile' onClick={handleButtons}>exit</b>
            </div>
        </div>


          {isExitModalOpen && <ExitModel setIsModalOpen={setIsExitModalOpen}> 
            <div className='exitBlock'>
              <h3>Do you really want to exit?</h3>
              <div className='exitButtons'>
                  <button onClick={() => setIsExitModalOpen(false)} className='stayButton'>Stay</button>
                  <NavLink to='/signin' onClick={handleExit}>
                     <button className='exitButton'>Exit</button>
                  </NavLink>
              </div>
            </div> </ExitModel>}

        <h1 className='myCard'>My Card</h1>
        <div className='dashboardSection'>
            <div className='userInfo'>
                <div className='userCard'>
                    <div className='userCardName'>
                        <p>Name</p>
                        <h4>{userName?.firstName} {userName?.surName}</h4>
                    </div>  
                    <p className='userCardNumber'>{cardNumberInTheBankScreen}</p>
                </div>

                <div className='transfer'>
                    <h1>Send Money</h1>
                    <div className='cardType'>
                      <div className='cardInfo'>
                        <img src={visaLogo} alt="Visa Card" className='bankImage'/>
                        <p className='bankName'>Visa Card</p>
                      </div>
                      <div className='currentSumOfTheCurrentBank'>
                        <p className='sumOfTheCurrentCard'><FontAwesomeIcon icon={faDollar} className='faDollar'/>{currentSumAccount}</p>
                       <FontAwesomeIcon icon={faAngleDown} className='faAngleDown'/>
                      </div>
                    </div>
                </div>

                <div className='enterTheAmount'>
                  <div className='cardInfo cardInfoAmount'>
                    <img src={visaLogo} alt="#" className='bankImage'/>
                    <p className='amountDesc'>Enter the amount</p>
                  </div>
                  <div className='enterTheAmountInInput'>
                    <p className='sumOfTheCurrentCard'><FontAwesomeIcon icon={faDollar} className='faDollarInput'/></p>
                    <input type="number"
                      className='amountOfTransfer'
                      placeholder='1000'
                      required
                      value={sumTransfer}
                      onChange={(e) => setSumTransfer(e.target.value)}
                      />
                  </div>
                </div>

                <div className='recipient'>
                  <div className='recipientInfo'>
                    <img src={defaultUserLogo} alt="#" className='defaultUserLogo'/>
                    <p className='recipientUserName'>Enter user card number</p>
                  </div>
                  <FontAwesomeIcon icon={faPlus} className='addRecipient' />
                </div>

                <div className='sendingMoneySection'>
                  <button className='sendMoneyButton' onClick={() => setIsSendMoneyModalOpen(true)}>Send Money</button>
                </div>
            </div>

              {isSendMoneyModalOpen && <SendMoneyModal setIsSendMoneyModalOpen={setIsSendMoneyModalOpen}>
                <div className='transferForm'>
                  <h1>Enter Card Number You want to send money</h1>

                  <div className='transferFormDetails'>
                    <h4>Card Number</h4>
                    <div className='cardInputBlock'>

                    <FontAwesomeIcon icon={faCreditCard} className='creditCardIcon' />
                      <input type="text" 
                      placeholder='1234 5678 9123 4567' 
                      className='cardNumberInput'
                      value={cardNumber}
                      onChange={(e) => setCardNumber(enteringCardNumber(e.target.value))}
                      maxLength={19}
                      />
                    </div>

                      <button onClick={handleCardNumberSubmit} className='handleTransferMoney'>Transfer</button>
                      <p className='successfulOperation'>{process}</p>
                      <p className='error'>{error}</p>
                  </div>
                </div>
                </SendMoneyModal>}
             

            <div className='theOutsideSecondBlock'>

            <div className='theSecondBlock'>
              
            <div className='chart'>
              <h1>Money Flow</h1>
              <Line
                id="revenue-chart"
                data={{
                  labels: revenue.map((item) => item.label),
                  datasets: [
                    {
                      label: 'Revenue',
                      data: revenue.map((item) => item.revenue),
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: "#064FF0"
                    }
                  ]
                }}
              />
            </div>
            
            <div className='recentContacts'>
              <div className='recentContactsInfo'>
                <div className='searchRecentContacts'>
                  <h1>Recent Contacts</h1>
                  <FontAwesomeIcon icon={faMagnifyingGlass} className='mangifyingGlass'/>
                </div>
                <p>19 recipients</p>  
              </div>
              <div className='recentContactsFullList'>
                <ul className='recentContactsCurrentList'>
                  <li className='currentRecentContact'><FontAwesomeIcon icon={faUser} className='faUser' /></li>
                  <li className='currentRecentContact'><FontAwesomeIcon icon={faUser} className='faUser' /></li>
                  <li className='currentRecentContact'><FontAwesomeIcon icon={faUser} className='faUser' /></li>
                  <li className='currentRecentContact'><FontAwesomeIcon icon={faUser} className='faUser' /></li>
                  <li className='currentRecentContact'><FontAwesomeIcon icon={faUser} className='faUser' /></li>

                  <li className='currentRecentContact'><FontAwesomeIcon icon={faAngleRight} className='faArrowRight'/></li>
                
                </ul>
              </div>
            </div>

            </div>
                <div className='recentTransactionsBlock'>
                  <div className='recentTransactionsInfo'>
                    <h1>Recent Transactions</h1>
                    <div className='checkAllTransactions'>

                      <p>View All</p>
                      <li style={{listStyle: 'none'}}><FontAwesomeIcon icon={faAngleRight} className='faArrowRight'/></li>

                    
                  </div>
                  </div>
                      <ul className='listsOfRecentTransactions'>
                          {
                           typeof userRecentTransaction !== 'string'
                           ? 
                           userRecentTransaction?.lastRecords.map((user: any) => { 
                          
                             const [data] = user.recipient.createdAt.split('T')
                             const whoIsUser = user.recipient.id !== userId
                            const kindOfTransfer = whoIsUser ? user?.recipientLastFour : user?.senderLastFour

                            const userFullName = whoIsUser 
                              ? `To ${user?.recipient.firstName} ${user?.recipient.surName}`
                              : `Got from ${user?.sender.firstName} ${user?.sender.surName}`
                            
                            return ( <li className='listOfRecentTransactions' key={user.id}>
                                <div className='recentTransactionsBlockAboutUser'>
                                  <img src={boltLogo} alt='here' className='recentTransactionsImage'></img>
                                  <p className='userRecentTransactionsFullName'>{userFullName}</p>
                                </div>
                                  <p className='recentTransactionsTime'>{data}</p>
                                  <p className='recentTransactionsCard'>****{kindOfTransfer}</p>

                                  <p>{whoIsUser? '-' : '+'}${user.sum}</p>
                                  <p className='recentTransactionStatusOfTheOperation'>status</p>

                                </li>)
                                })
                                : <p className='notifyUserAboutNoTransactionsYet'>{userRecentTransaction}</p>
                               }
                        
                        
                      </ul>
                </div>
           
            </div>


        </div>
    </section>
  )
}

export default Dashboard