import React from 'react'
import './Dashboard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { faDollar } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

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
        </div>

    </section>
  )
}

export default Dashboard