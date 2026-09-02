import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { faEuroSign } from '@fortawesome/free-solid-svg-icons'
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
import ExitModel from '../Modals/ExitModal/ExitModal'
import  visaLogo  from '../image/visa-logo.png'
import defaultUserLogo from '../image/default-user-logo.png'
import SendMoneyModal from '../Modals/SendMoneyModal/SendMoneyModal'
import boltLogo from '../image/bolt.png'
import TransactionsItem from '../components/Transaction/TransactionsItem'
import TransactionHelper from '../components/Transaction/TransactionHelper'
import { formatCardNumber } from '../utils/cardFormatter'
import { useDashboard } from '../utils/useDashboard'
import { hiddenScroll } from '../utils/hiddenScroll'
import { useSubmitTransfer } from '../utils/submitTransfer'
import type { Transaction } from '../types/transaction.interface'

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
  const [sumTransfer, setSumTransfer] = useState<string>()
  const [cardNumber, setCardNumber] = useState('');
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false)
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState<boolean>(false)
  const { userBankAccount, userRecentTransaction, refresh, userProfile } = useDashboard()
  const { handleCardNumberSubmit, process, error, resetMessages } = useSubmitTransfer(refresh)
  const userCurrency = userProfile?.userWallet[0].currency === 'USD'    
  const userBalance =  userProfile?.userWallet[0].balance
  hiddenScroll()
  
  useEffect(() => {
    if (!isSendMoneyModalOpen) {
      setCardNumber('')
      resetMessages()
      setSumTransfer('')
    }
  }, [isSendMoneyModalOpen])


  const handleButtons = () => {
    setIsExitModalOpen(true)
  }

  const handleExit = () => {
    localStorage.removeItem('accessToken')
  }

  const handeSubmitTransfer = () => {
    handleCardNumberSubmit(cardNumber, String(sumTransfer))

  }
  

  return (
    <section className='dashboard'>
        <div className='personalUserInfo'>
          <FontAwesomeIcon icon={faBell} className='faBell'/>
            <div className='myAccount'>
              {userProfile === null
              ?
              <Link to='/signup' className='signUp'>
                 <p className='signUp' >sign up</p>
              </Link>
              :
              <p className='isAuthorized'>{userProfile?.firstName}</p>
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
                      <div className='userCardInfo'> 
                          <p>Name</p>
                          <h4>{userProfile?.firstName} {userProfile?.surName}</h4>
                      </div>
                         <p className='userCurrency'>{userProfile?.userWallet[0].currency}</p>
                    </div>  
                    <p className='userCardNumber'>{userBankAccount}</p>
                </div>

                <div className='transfer'>
                    <h1>Send Money</h1>
                    <div className='cardType'>
                      <div className='cardInfo'>
                        <img src={visaLogo} alt="Visa Card" className='bankImage'/>
                        <p className='bankName'>Visa Card</p>
                      </div>
                      <div className='currentSumOfTheCurrentBank'>
                        <p className='sumOfTheCurrentCard'>
                          {userCurrency 
                          ? <FontAwesomeIcon icon={faDollar} className='faDollar'/> 
                          : <FontAwesomeIcon icon={faEuroSign} className='faDollar'/>}
                          {
                userBalance === undefined ? 0 : userBalance

                          }
                        </p>

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
                    <p className='sumOfTheCurrentCard'>
                      {userCurrency
                      ?  <FontAwesomeIcon icon={faDollar} className='faDollarInput'/>
                      :  <FontAwesomeIcon icon={faEuroSign} className='faDollarInput'/>
                      }
                     </p>
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
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      maxLength={19}
                      />
                    </div>

                      <button onClick={handeSubmitTransfer} className='handleTransferMoney'>Transfer</button>
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
                           userRecentTransaction?.map((record: Transaction) => { 
                           const currency = record.recipient?.currency 
                            
                            const [date] = record.createdAt.split('T')
                            
                            const {fullName, kindOfTransfer, amount} = TransactionHelper({record, userProfile, currency})
                            
                            return ( 
                          <>
                            <TransactionsItem
                              key={record.id}
                              date={date}
                              boltLogo={boltLogo}
                              fullName={fullName}
                              kindOfTransfer={kindOfTransfer}
                              amount={amount}
                            />
                          </>

                                )
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