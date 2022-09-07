import * as types from './types';
import {
  apiKey,
  baseUrl,
  isConnectedToInternet,
} from '../../assets/constants/constants';
import {connectionCheck, fetchHotelDetail, homeLoad} from './home';

export const registerUser = (data, success, error) => {
  return async dispatch => {
    const net = isConnectedToInternet();
    console.log('.............', net, '............');
    isConnectedToInternet().then(onResolved => {
      // Some task on success
      if (onResolved) {
        try {
          var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow',
          };

          fetch(`${baseUrl}/register.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(authLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(authLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(authLoad(false));
              console.log(error);
            });
        } catch (err) {
          dispatch(authLoad(false));
          console.log(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(authLoad(false));
      }
    });
  };
};

export const loginUser = (data, successLogin, error) => {
  return async dispatch => {
    const net = isConnectedToInternet();
    console.log('.............', net, '............');
    isConnectedToInternet().then(onResolved => {
      // Some task on success
      if (onResolved) {
        try {
          dispatch(connectionCheck(true));
          var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow',
          };

          fetch(`${baseUrl}/login.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(authLoad(false));
              console.log(response);
              if (response.status === 'success') {
                successLogin(response.response);
                dispatch(loginSuccess(response));
              } else {
                dispatch(authLoad(false));
                error(response);
              }
            })
            .catch(error => console.log('error', error));
        } catch (err) {
          dispatch(authLoad(false));
          console.log('err');
          console.warn('err');
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(authLoad(false));
      }
    });
  };
};

export const verifyPhone = (data, successLogin, error) => {
  return async dispatch => {
    const net = isConnectedToInternet();
    console.log('.............', net, '............');
    isConnectedToInternet().then(onResolved => {
      // Some task on success
      if (onResolved) {
        try {
          dispatch(connectionCheck(true));
          var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow',
          };

          fetch(`${baseUrl}/verify-user.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(authLoad(false));
              console.log(response);
              if (response.status === 'success') {
                successLogin(response);
              } else {
                dispatch(authLoad(false));
                error(response);
              }
            })
            .catch(error => console.log('error', error));
        } catch (err) {
          dispatch(authLoad(false));
          console.log(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(authLoad(false));
      }
    });
  };
};

export const checkNum = (data, successLogin, error) => {
  return async dispatch => {
    const net = isConnectedToInternet();
    console.log('.............', net, '............');
    isConnectedToInternet().then(onResolved => {
      // Some task on success
      if (onResolved) {
        try {
          dispatch(connectionCheck(true));
          var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow',
          };

          fetch(`${baseUrl}/phone-check.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(authLoad(false));
              console.log(response);
              if (response.status === 'success') {
                successLogin(response);
              } else {
                dispatch(authLoad(false));
                error(response);
              }
            })
            .catch(error => console.log('error', error));
        } catch (err) {
          dispatch(authLoad(false));
          console.log(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(authLoad(false));
      }
    });
  };
};

export const resetpassword = (data, successLogin, error) => {
  return async dispatch => {
    const net = isConnectedToInternet();
    console.log('.............', net, '............');
    isConnectedToInternet().then(onResolved => {
      // Some task on success
      if (onResolved) {
        try {
          dispatch(connectionCheck(true));
          var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow',
          };

          fetch(`${baseUrl}/forget-password.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(authLoad(false));
              console.log(response);
              if (response.status === 'success') {
                successLogin(response);
              } else {
                dispatch(authLoad(false));
                error(response);
              }
            })
            .catch(error => console.log('error', error));
        } catch (err) {
          dispatch(authLoad(false));
          console.log(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(authLoad(false));
      }
    });
  };
};

export const emailVerify = (data, onSuccess) => {
  return async dispatch => {
    const net = isConnectedToInternet();
    console.log('.............', net, '............');
    isConnectedToInternet().then(onResolved => {
      // Some task on success
      if (onResolved) {
        try {
          dispatch(connectionCheck(true));
          var config = {
            method: 'post',
            url: `${baseUrl}send_email_verification_code_to_user.php`,
            headers: {},
            data,
          };

          var requestOptions = {
            method: 'POST',
            body: data,
            redirect: 'follow',
          };

          fetch(
            `${baseUrl}send_email_verification_code_to_user.php`,
            requestOptions,
          )
            .then(response => response.json())
            .then(response => {
              dispatch(authLoad(false));
              console.log(response);
              if (response.state === 'OK') {
                onSuccess(true);
              } else {
                onSuccess(false);
              }
            })
            .catch(error => console.log('error', error));

          // axios(config)
          //   .then(function (response) {
          //     dispatch(authLoad(false));
          //     console.log(response.data);
          //     if (response.data.state === 'OK') {
          //       onSuccess(true);
          //     }
          //   })
          //   .catch(function (error) {
          //     console.log(error);
          //   });
        } catch (err) {
          dispatch(authLoad(false));
          console.log(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(authLoad(false));
      }
    });
  };
};

// helping functions

export const authLoad = data => {
  return {
    type: types.AUTH_LOADING,
    payload: data,
  };
};

export const signupSuccess = data => {
  return {
    type: types.SIGNUP_SUCCESS,
    payload: data,
  };
};

export const loginSuccess = data => {
  return {
    type: types.LOGIN_SUCCESS,
    payload: data,
  };
};

export const logout = data => {
  return {
    type: types.LOGOUT_SUCCESS,
    payload: data,
  };
};

export const checkInternet = data => {
  return {
    type: types.CHECK_INTERNET,
    payload: data,
  };
};

const saveToken = data => {
  return {
    type: types.SAVE_TOKEN,
    payload: data,
  };
};

export const updateCallAPIstate = data => {
  return {
    type: types.CHANGE_CALL,
    payload: data,
  };
};

export const dollarRate = data => {
  return {
    type: types.DOLLAR_RATE,
    payload: data,
  };
};
