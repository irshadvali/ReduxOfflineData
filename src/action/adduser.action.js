import { NetInfo } from 'react-native';

//add user by url from ACTION_QUEUE(which are saved in offline)
export function addUserByUrl({ url }) {
  return async (dispatch, getState, api) => {
   const { isConnected } = getState();
   
    try {
      const result = await api.get(url);
      const resultJson = await result.json();
      if (resultJson.success === false) {
        throw new Error(resultJson.message);
      }
          dispatch({ type: 'SAVE_USER', person: resultJson});
          dispatch({ type: 'REMOVE_PERSON_FROM_ACTION_QUEUE', payload: url });
    
    } 
     catch (e) {

    }  
  };
}

//add user in Online
export function addUser(firstname,lastname,username,password,Email) {
  return async (dispatch, getState, api) => {
   const { isConnected } = getState();
   newUserUrl=`action=addUser&fname=`+firstname+`&lname=`+lastname+`&username=`+username+`&password=`+password+`&activeflag=1&email=`+Email+``;
    if (isConnected != 'NONE') {

 
    try {
      const result = await api.get(newUserUrl);
      const resultJson = await result.json();
      if (resultJson.success === false) {
        throw new Error(resultJson.message);
      }
          dispatch({ type: 'SAVE_USER', result: resultJson.error.errCode });
          dispatch({ type: 'REMOVE_PERSON_FROM_ACTION_QUEUE', payload: newUserUrl });
    
    } 
     catch (e) {
     dispatch({ type: 'ADD_PERSON_TO_ACTION_QUEUE', payload: newUserUrl });
    }
    }
  else{
      dispatch({ type: 'ADD_PERSON_TO_ACTION_QUEUE', payload: newUserUrl });
  }
  };
}

//Check the internet connection
export const connectionState = ({ status }) => {
  return { type: 'CHANGE_CONNECTION_STATUS', isConnected: status };
};


//Reset the values
export function reset() {
  return {
    type: 'RESET',
  };
};

