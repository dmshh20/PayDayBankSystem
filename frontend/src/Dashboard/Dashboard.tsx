import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'

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


  return (
    <section className='dashboard'>
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
                        <img src="#" alt="" className='bankImage'/>
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
                    <img src="#" alt="" className='bankImage'/>
                    <p className='amountDesc'>Enter the amount</p>
                  </div>
                  <div className='enterTheAmountInInput'>
                    <p className='sumOfTheCurrentCard'><FontAwesomeIcon icon={faDollar} className='faDollarInput'/></p>
                    <input type="number" className='amountOfTransfer'/>
                  </div>
                </div>

                <div className='recipient'>
                  <div className='recipientInfo'>
                    <img src="#" alt="w" />
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