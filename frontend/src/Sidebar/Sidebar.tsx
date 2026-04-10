import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBahai } from '@fortawesome/free-solid-svg-icons'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import { faGear } from '@fortawesome/free-solid-svg-icons'

import './Sidebar.css'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <section className='sidebar'>
        <div className='aboutBank'>
            <FontAwesomeIcon icon={faBahai} className='bahaiIcon'/>
            <h1>PayDay</h1>

        </div>
        
        <nav className='navOptions'>
            <ul className='optionsList'>

                <NavLink to="/" className={({isActive}) => isActive ? 'option active' : 'option'}><li className='option'><FontAwesomeIcon icon={faHouse} className='optionIcon'/> Dashboard</li></NavLink>
                <NavLink to="/inbox" className={({isActive}) => isActive ? 'option active' : 'option'}><li className='option'><FontAwesomeIcon icon={faEnvelope} className='optionIcon'/> Inbox</li></NavLink>
                <NavLink to="/wallets" className={({isActive}) => isActive ? 'option active' : 'option'}><li className='option'><FontAwesomeIcon icon={faWallet} className='optionIcon'/> My Wallets</li></NavLink>
            </ul>
        </nav>
        
        <footer className='offtop'>
                <NavLink to="/help" className={({isActive}) => isActive ? 'option active' : 'option'}><li className='option'><FontAwesomeIcon icon={faCircleQuestion} className='optionIcon'/>Get Help</li></NavLink>
                <NavLink to="/settings" className={({isActive}) => isActive ? 'option active' : 'option'}><li className='option'><FontAwesomeIcon icon={faGear} className='optionIcon'/>Setting</li></NavLink>
            
        </footer>
    </section>
  )
}

export default Sidebar