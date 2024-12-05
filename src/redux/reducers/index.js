import { combineReducers } from 'redux';
import user from './user'
import loader from './loader';

const allReducers = combineReducers({
    user,
    loader
});

export default allReducers;