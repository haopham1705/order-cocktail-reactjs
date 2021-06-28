import { combineReducers } from 'redux'
import { GlobalReducer } from './slices/globalSlice'
// import productReducer from './reducer'

const rootReducer = combineReducers({
    GlobalReducer
});

export default rootReducer;