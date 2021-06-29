import React from 'react'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import './GlobalLoading.scss'

export default function GlobalLoading() {
    const loading = useSelector(state => state.GlobalReducer.isLoading);

    if(loading){
        return (
            <div className="loading-content">
                <div className="loading-content__bg-loading"></div>
                <CircularProgress color='primary' size='3rem' className="loading-content__icon" />
            </div>
        )
    }
    return null
}
