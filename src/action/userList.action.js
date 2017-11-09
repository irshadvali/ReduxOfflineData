import { NetInfo } from 'react-native';

//check the connection state
export const connectionState = ({ status }) => {
  return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
};

//fetch the userlist
export function fetchUserList() {
  return async (dispatch, getState, api) => {
    const { isConnected } = getState();

    if (isConnected != 'NONE') {

      try {
        const result = await api.get('action=allusers');
        const resultJson = await result.json();
        if (resultJson.success === false) {
          throw new Error(resultJson.message);
        }
        dispatch({ type: 'FETCH_USER', resultJson });

      } catch (e) {
        dispatch({ type: 'FETCH_USER_FAILURE', payload: 'error' });
      }
    }
    else {
      dispatch({ type: 'FETCH_USER_FAILURE', payload: 'error' });
    }
  };
}