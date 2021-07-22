import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import './LazyLoad.scss'
 
function LazyLoad(props) {
    return (
        <div className="loading-content">
            <div className="loading-content__bg-loading"></div>
            <CircularProgress color='primary' size='3rem' className="loading-content__icon" />
        </div>
    );
}

export default LazyLoad;