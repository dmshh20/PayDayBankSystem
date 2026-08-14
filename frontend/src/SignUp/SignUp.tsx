import './SignUp.css'
import { faBahai } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ()=> {
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const [values, setValues] = useState({
        firstName: '',
        surName: '',
        email: '',
        password: '',
        confirmPassword: '',
        currency: ''
    })

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (values.password !== values.confirmPassword) {
            setError('Password dont match')
            return
        }

        try {
            const response = await axios.post(import.meta.env.VITE_SIGNUP, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if (response.data.email) {
                navigate('/signin')
            }

        } catch(error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || 'Server Error')
            } else {
                setError('Invalid user data')
            }}
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
                <div className='signUpField'>
                    <label htmlFor="cardCurrency">Card Currency</label>
                    <input id="cardCurrency" type="text" name="currency" value={values.currency} onChange={handleOnChange} list='currencyOptions'/>

                    <datalist id="currencyOptions">
                        <option value="USD">🇺🇸 USD - US Dollar</option>
                        <option value="EUR">🇪🇺 EUR - Euro</option>
                    </datalist>
                </div>
                </div>

                <div className='aboutSignUp'>
                    <button className='signUpBtn'>Sign Up</button>
                    <Link to="/signin" className='isAccount'><p>Have you already had an account?</p></Link>
                    <b className='handleError'>{error}</b>
                </div>
            </form>

    </section>

    </>
  )
}

export default SignUp