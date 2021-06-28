import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'
// import thunk from 'redux-thunk'
// import { createStore, applyMiddleware } from "redux";
import rootReducer from './rootReducer'

const middleware = [...getDefaultMiddleware(), logger]

const store = configureStore({
    reducer: rootReducer,
    middleware
});

// const middleware = [thunk];

// if (process.env.NODE_ENV === "development") {
//     middleware.push(logger);
// }

// const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;

