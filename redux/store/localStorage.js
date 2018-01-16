import {AsyncStorage} from 'react-native'

export const loadState = async () => {
alert("loading state1");
var serializedState;
  try {
        alert("getting state");
        serializedState = await AsyncStorage.getItem('state');
        alert("serizalized "+JSON.parse(serializedState));
        if(serializedState === null) {
          alert("state not found in AsyncStorage");
          return undefined;
        }
        // alert("serializedstae = "+serializedState);
        alert("serizalized "+JSON.parse(serializedState));
    return JSON.parse(serializedState);
  } catch (er){
    alert("asyncstate not found " + er);
  }
};

export const saveState = (state) => {
  try {
    alert("saving state")
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem('state',serializedState);
  } catch (err) {
    alert("savingerror = "+err);
  }
};
