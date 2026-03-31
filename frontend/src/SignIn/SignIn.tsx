import { faBahai } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import './SignIn.css'
import { useState } from 'react';

const SignIn = ()=> {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
  return (
    <>
    <section className='signInSection'>
        <h1>Welcome to the  <p className='payDayIconSignUp'><FontAwesomeIcon icon={faBahai} className='bahaiIcon'/>PayDay Bank</p></h1>
        <div className='signInFullForm'>
            <form action="" className='signForm'>
                <div className='allSignUpFields'>
              
                <div className='signUpField'>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" />
                </div>
                <div className='signUpField'>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" />
                </div>
                 
                </div>

                <div className='aboutSignUp'>
                    <button className='signUpBtn'>Sign In</button>
                    <Link to="/signup" className='isAccount'><p>Haven't had an account yet?</p></Link>
                </div>
            </form>
        </div>

    </section>

    </>
  )
}

export default SignIn