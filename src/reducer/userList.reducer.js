import _ from 'lodash';

const initialState = {
 
  User: [],
  isConnected: false,
  error:'',
};

const adduser = (state = initialState, action) =>{
  switch (action.type) {
    case 'FETCH_USER':
      return Object.assign({}, state, {
        User: action.resultJson.results,
      });
    case 'FETCH_USER_FAILURE':
      return Object.assign({}, state, {
       error:'Error while fetching'
      });
     case 'CHANGE_CONNECTION_STATUS':
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });
    default:
      return state;
  }
}

export default adduser;
