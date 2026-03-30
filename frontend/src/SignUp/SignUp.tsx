import './SignUp.css'
import { faBahai } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const SignUp = ()=> {
  return (
    <>
    <section className='signUpSection'>
        <h1>Welcome to the  <p className='payDayIconSignUp'><FontAwesomeIcon icon={faBahai} className='bahaiIcon'/>PayDay Bank</p></h1>
            <form action="" className='signUpForm'>
                <div className='allSignUpFields'>

                <div className='signUpField'>
                    <label htmlFor="name">Firstname</label>
                    <input id="name" type="text" />
                </div>
                <div className='signUpField'>
                    <label htmlFor="surname">Surname</label>
                    <input id="surname" type="text" />
                </div>
                <div className='signUpField'>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" />
                </div>
                <div className='signUpField'>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" />
                </div>
                  <div className='signUpField'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" />
                </div>
                </div>

                <div className='aboutSignUp'>
                    <button className='signUpBtn'>Sign Up</button>
                    <Link to="/signin" className='isAccount'><p>Have you already had an account?</p></Link>
                </div>
            </form>

    </section>

    </>
  )
}

export default SignUp