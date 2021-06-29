import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { GlobalActions } from 'redux/slices/globalSlice'
import LogoImg from 'asserts/img/livef-logo.png'

import './LoginPage.scss'

export default function LoginPage(props) {
    const dispatch = useDispatch()
    const history = useHistory()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('')

    const handleLogin = (e) => {
        e.preventDefault();
        if (username !== '' && password !== '') {
            if (username === 'admin' && password === 'admin') {
                localStorage.setItem('username', username)
                localStorage.setItem('password', password)
                console.log('login success')
                history.push('/')  
            } else { 
                setMsg("Please enter correct username & password")
            }
        }
    }

    useEffect(() => {
        dispatch(GlobalActions.showLoading())
        setTimeout(() => {
            dispatch(GlobalActions.showLoading())
        }, 1200)
    }, [])

    return (
        <div className="login-form fadeInDown">
            <div className="formContent">
                <img className="formContent__icon" src={LogoImg} id="icon" alt="User Icon" />
                <h1 className="login-form__title"> Sign In </h1>
                <form>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} id="login" className="fadeIn second" name="login" placeholder="username" required />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} id="password" className="fadeIn third" name="login" placeholder="password" required />
                    <button className="fadeIn fourth btn" onClick={handleLogin}>Log In</button>
                </form>
                <span className='errorMsg'>{msg}</span>
            </div>
        </div>
    )
}
