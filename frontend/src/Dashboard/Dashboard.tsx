import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faBell } from '@fortawesome/free-solid-svg-icons'
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
  const [isExitModalOpen, setIsExitModalOpen] = useState<boolean>(false)
  const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState<boolean>(false)
  const [userName, setUserName] = useState<[] | any>(null)
  const token = localStorage.getItem('accessToken')

    useEffect(() => {
      document.body.style.overflow = 'hidden'

      return () => {
        document.body.style.overflow ? 'hidden' : 'unset'
      }
    }, [])

  useEffect( () => {
      return () => {
        const recognizeUser = async () => {
          await isAuthorized()
        }
        recognizeUser()
      }
  }, [])

  const isAuthorized = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_ME, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'          
        }
      })
      
      setUserName(response.data)
    } catch(error: any) {
      throw new Error('Failed in getting user data')
    }
  }

  const handleButtons = () => {
    setIsExitModalOpen(true)
  }

  const handleExit = () => {
    localStorage.removeItem('accessToken')
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
                        <h4>Artem Dmysh</h4>
                    </div>  
                    <p className='userCardNumber'>1234 5678 9012 3456</p>
                </div>

                <div className='transfer'>
                    <h1>Send Money</h1>
                    <div className='cardType'>
                      <div className='cardInfo'>
                        <img src={visaLogo} alt="Visa Card" className='bankImage'/>
                        <p className='bankName'>Visa Card</p>
                      </div>
                      <div className='currentSumOfTheCurrentBank'>
                        <p className='sumOfTheCurrentCard'><FontAwesomeIcon icon={faDollar} className='faDollar'/>10.680</p>
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
                    <input type="number" className='amountOfTransfer' placeholder='1000'/>
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
                    <input type="text" placeholder='1234 5678 9123 4567' className='cardNumberInput'/>
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
                </div>
           
            </div>


        </div>
    </section>
  )
}

export default Dashboard