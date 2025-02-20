import { combineReducers } from 'redux';
import user from './user'
import loader from './loader';
import galleries from './galleries';

const allReducers = combineReducers({
    user,
    loader,
    galleries
});

export default allReducers;