import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import './NotFound.scss'
import { GlobalActions } from 'redux/slices/globalSlice'
import { useDispatch } from 'react-redux'

export default function NotFound() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(GlobalActions.showLoading())
        setTimeout(() => {
            dispatch(GlobalActions.showLoading())
        }, 1200)
    }, [])

    return (
        <div className="container not-found-content">
            <h1>Page Not Found</h1>
            <p>We can't find the page you're looking.</p>
            <p>You can either return to the previous page, visit our homepage.</p>
            <NavLink to='/login'><button className="btn">Back to Home</button></NavLink>
        </div>
    )
}
