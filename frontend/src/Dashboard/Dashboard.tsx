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
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
  const [userName, setUserName] = useState<[] | any>(null)
  const token = localStorage.getItem('accessToken')
  const [isOpen, setIsOpen] = useState(false)
    useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
  }, [isOpen])

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
      console.log(error);
      
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
                 <p className='signUp' onClick={() => setIsOpen(!isOpen)}>sign up</p>
              </Link>
              :
              <p className='isAuthorized'>{userName?.firstName}</p>
              }

              <b className='userProfile'>exit</b>
            </div>
        </div>
       
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
                        <img src="#" alt="#" className='bankImage'/>
                        <p className='bankName'>Visa Card</p>
                      </div>
                      <div className='currentSumOfTheCurrentBank'>
                        <p className='sumOfTheCurrentCard'><FontAwesomeIcon icon={faDollar} className='faDollar'/>10.680</p>
                       <FontAwesomeIcon icon={faAngleDown} className='faAngleDown'/>
                      </div>
                    </div>
                </div>

                <div className='enterTheAmount'>
                  <div className='cardInfo'>
                    <img src="#" alt="#" className='bankImage'/>
                    <p className='amountDesc'>Enter the amount</p>
                  </div>
                  <div className='enterTheAmountInInput'>
                    <p className='sumOfTheCurrentCard'><FontAwesomeIcon icon={faDollar} className='faDollarInput'/></p>
                    <input type="number" className='amountOfTransfer'/>
                  </div>
                </div>

                <div className='recipient'>
                  <div className='recipientInfo'>
                    <img src="#" alt="#" />
                    <p className='recipientUserName'>Enter user card number</p>
                  </div>
                  <FontAwesomeIcon icon={faPlus} className='addRecipient' />
                </div>

                <div className='sendingMoneySection'>
                  <button className='sendMoneyButton'>Send Money</button>
                </div>
            </div>
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