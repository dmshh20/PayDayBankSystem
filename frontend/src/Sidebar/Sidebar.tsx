import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBahai } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'

import './Sidebar.css'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <section className='sidebar'>
        <div className='aboutBank'>
            <FontAwesomeIcon icon={faBahai} className='bahaiIcon'/>
            <h1>PayDay</h1>

        </div>
        
        <nav className='navOptions'>
            <ul className='optionsList'>

                <Link to="/" className='option'><li className='option'><FontAwesomeIcon icon={faHouse} className='optionIcon'/> Dashboard</li></Link>
                <Link to="/inbox" className='option'><li className='option'><FontAwesomeIcon icon={faEnvelope} className='optionIcon'/> Inbox</li></Link>
                <Link to="/wallets" className='option'><li className='option'><FontAwesomeIcon icon={faWallet} className='optionIcon'/> My Wallets</li></Link>
            </ul>
        </nav>
        
        <footer className='offtop'>
                <Link to="/help" className='option'><li className='option'><FontAwesomeIcon icon={faCircleQuestion} className='optionIcon'/>Get Help</li></Link>
                <Link to="/settings" className='option'><li className='option'><FontAwesomeIcon icon={faGear} className='optionIcon'/>Setting</li></Link>
            
        </footer>
    </section>
  )
}

export default Sidebar