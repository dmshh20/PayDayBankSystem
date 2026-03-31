import './SignUp.css'
import { faBahai } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = ()=> {
    const [values, setValues] = useState({
        firstName: '',
        surName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
    }

    const signUp = () => {
        console.log('res', values)
    }

  return (
    <>
    <section className='signUpSection'>
        <h1>Welcome to the  <p className='payDayIconSignUp'><FontAwesomeIcon icon={faBahai} className='bahaiIcon'/>PayDay Bank</p></h1>
            <form action="" className='signUpForm' onSubmit={handleSubmit}>
                <div className='allSignUpFields'>

                <div className='signUpField'>
                    <label htmlFor="name">Firstname</label>
                    <input id="name" type="text" name="firstName" value={values.firstName} onChange={handleOnChange} />
                </div>
                <div className='signUpField'>
                    <label htmlFor="surname">Surname</label>
                    <input id="surname" type="text" name="surName" value={values.surName} onChange={handleOnChange}/>
                </div>
                <div className='signUpField'>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name="email" value={values.email} onChange={handleOnChange}/>
                </div>
                <div className='signUpField'>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password"name="password" value={values.password} onChange={handleOnChange}/>
                </div>
                  <div className='signUpField'>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input id="confirmPassword" type="password" name="confirmPassword" value={values.confirmPassword} onChange={handleOnChange}/>
                </div>
                </div>

                <div className='aboutSignUp'>
                    <button className='signUpBtn' onClick={signUp} >Sign Up</button>
                    <Link to="/signin" className='isAccount'><p>Have you already had an account?</p></Link>
                </div>
            </form>

    </section>

    </>
  )
}

export default SignUp