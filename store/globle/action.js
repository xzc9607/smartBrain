import {RESETUSERDATA} from './actionTypes';
import {RESETADDLIST} from './actionTypes';

const resetData = data => ({type: RESETUSERDATA, data});
const resetaddList = data => ({type: RESETADDLIST, data});

export {resetData, resetaddList};
