import { faBahai } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import './SignIn.css'
import { useState } from 'react';
import axios from 'axios';

const SignIn = ()=> {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const handleOnSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        
        try {
            const response = await axios.post(import.meta.env.VITE_SIGNIN, values, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.data.access_token) {
                localStorage.setItem('accessToken', response.data.access_token)
                navigate('/')
            }
            
        } catch(error) {
            throw new Error('Failed in Sign in')
        }
    }

  return (
    <>
    <section className='signInSection'>
        <h1>Welcome to the  <p className='payDayIconSignUp'><FontAwesomeIcon icon={faBahai} className='bahaiIcon'/>PayDay Bank</p></h1>
        <div className='signInFullForm'>
            <form action="" className='signForm' onSubmit={handleOnSubmit}>
                <div className='allSignUpFields'>
              
                <div className='signUpField'>
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" name='email' onChange={handleOnChange}/>
                </div>
                <div className='signUpField'>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name='password' onChange={handleOnChange}/>
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