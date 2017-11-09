import _ from 'lodash';

const initialState = {
  result: '',
  actionQueue: [],
  isConnected: false,
};

const adduser = (state = initialState, action) =>{
  switch (action.type) {
      case 'RESET':
      return Object.assign({}, state, {
          result: '',         
      });
    case 'SAVE_USER':
      return Object.assign({}, state, {
        result: action.result,
      });
    case 'CHANGE_CONNECTION_STATUS':
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });
    case 'ADD_PERSON_TO_ACTION_QUEUE':
      return Object.assign({}, state, {
        actionQueue: state.actionQueue.concat([action.payload]),
        result: 'added offline',
      });
    case 'REMOVE_PERSON_FROM_ACTION_QUEUE':
      return Object.assign({}, state, {
        actionQueue: _.without(state.actionQueue, action.payload),
      });
    default:
      return state;
  }
}

export default adduser;
