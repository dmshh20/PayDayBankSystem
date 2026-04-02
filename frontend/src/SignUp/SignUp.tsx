import './SignUp.css'
import { faBahai } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = ()=> {
    const navigate = useNavigate()
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

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (values.password !== values.confirmPassword) {
            throw new Error('Password dont match')
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

        } catch(error) {
            throw new Error('Failed in Sign up')            
        }
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
                    <button className='signUpBtn'>Sign Up</button>
                    <Link to="/signin" className='isAccount'><p>Have you already had an account?</p></Link>
                </div>
            </form>

    </section>

    </>
  )
}

export default SignUp