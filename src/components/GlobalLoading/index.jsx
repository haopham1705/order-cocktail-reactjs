import React from 'react'
import { useSelector } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress';
import './GlobalLoading.scss'

export default function GlobalLoading() {
    const loading = useSelector(state => state.GlobalReducer.isLoading);

    if(loading){
        return <div className="loading-content">
            <CircularProgress color='primary' size='3rem' />
            </div>
    }
    return null
}
