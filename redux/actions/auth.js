import axios from 'axios';
import Alert from 'react-native';

export const login = (email, password, token) => {
    return {
        type: 'LOGIN',
        email: email,
        password: password,
        token: token
    };
};

export const logout = () => {
    return {
        type: 'LOGOUT'
    };
};

export const signup = () => {
    return  {
      type: 'SIGNUP'
    };
};

export function submitNewUser(userObj){
alert("sending obk");
alert(JSON.stringify(userObj));
  return (dispatch) => {
    axios.post('http://192.168.1.16:8080/signup' , userObj).then(
      function (response) {
        alert(response);
        if(response.data.error){
          alert(response.data.error);
          // dispatch(showErrorBox(response.data.error));
        }
        if (response.data.token){
          axios.defaults.headers.common['jwtoken'] = response.data.token;
          dispatch(login(userObj.email, null, response.data.token));
        }
      }
  ).catch( (err) => alert(err));
  };
}

export function loginUser(creds) {
  return (dispatch) => {
alert(JSON.stringify(creds));
    axios({
      url: 'http://192.168.1.16:8080/login',
      timeout: 20000,
      method: 'post',
      data: {creds}
    })
      // When the response is received, dispatch the data (via action creator)

      .then( (resp) => {
        console.log(resp);
        if(resp.data.error){
          //dispatch(showErrorBox(resp.data.error));
        }

        if(resp.data.token){
          // console.log(resp.data.user);
          axios.defaults.headers.common['jwtoken'] = resp.data.token;
          dispatch(login(creds.email, null));
        }

      }).catch( (err) => alert(err));
  };
}


export function setUserPassword(value){
  return {
    type: SET_USER_PASSWORD,
    value
  };
}
