import * as types from '../actions/types';
import {Platform} from 'react-native';
import {baseUrl, isConnectedToInternet} from '../../assets/constants/constants';
import {dollarRate, loginSuccess} from './auth';

export const activeScreen = params => ({
  type: types.ACTIVE_SCREEN,
  payload: params,
});

//HomeScreen APIs
export const balanceDetail = (data, success) => {
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

          fetch(`${baseUrl}/get-user-balance.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const getTransactions = (data, success) => {
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

          fetch(`${baseUrl}/get-user-transactions.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const transactionDetail = (data, success, error) => {
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

          fetch(`${baseUrl}/get-transaction-details.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const fetchNews = (success, error) => {
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
            redirect: 'follow',
          };

          fetch(`${baseUrl}/news.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const getProfileInfo = (data, success) => {
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

          fetch(`${baseUrl}/get-user-profile.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const updateUserInfo = (data, success, error) => {
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

          fetch(`${baseUrl}/update-user-profile.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const scamProtest = (data, success, error) => {
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

          fetch(`${baseUrl}/scam-protest.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

/// tickets  APIs
export const ticketList = (data, success, error) => {
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

          fetch(`${baseUrl}/get-user-tickets.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const createTicket = (data, success, error) => {
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

          fetch(`${baseUrl}/create-user-ticket.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const fetchConversation = (data, success, error) => {
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

          fetch(`${baseUrl}/get-ticket-conversation.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const replyTicket = (data, success, error) => {
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

          fetch(`${baseUrl}/send-ticket-reply.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

// verification
export const checkVerify = (data, success, error) => {
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

          fetch(`${baseUrl}/check-identity-verification.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const checkAddressVerify = (data, success, error) => {
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

          fetch(`${baseUrl}/check-address-verification.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const checkIdentitySubmission = (data, success, error) => {
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

          fetch(`${baseUrl}/check-identity-submission.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const checkIAddressSubmission = (data, success, error) => {
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

          fetch(`${baseUrl}/check-address-submission.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const submitIdentity = (data, sendIdentitySuccess, error) => {
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

          fetch(`${baseUrl}/check-identity-submission.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendIdentitySuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const submitAddress = (data, sendIdentitySuccess, error) => {
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

          fetch(`${baseUrl}/submit-address-kyc.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendIdentitySuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const fetchPaypalFees = (sendIdentitySuccess, error) => {
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
            redirect: 'follow',
          };

          fetch(`${baseUrl}/get-paypal-fee.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendIdentitySuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const fetchcoinPaymentFees = (sendIdentitySuccess, error) => {
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
            redirect: 'follow',
          };

          fetch(`${baseUrl}/get-coinpayments-fee.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendIdentitySuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const fetchWidthdrawFees = (sendIdentitySuccess, error) => {
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
            redirect: 'follow',
          };

          fetch(`${baseUrl}/withdrawl-fees.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendIdentitySuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const transferMoney = (data, sendSuccess, error) => {
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

          fetch(`${baseUrl}/transfer.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendSuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const paypalAPIs = (data, sendIdentitySuccess, error) => {
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

          fetch(
            `${baseUrl}/payment_gateways/paypal/process.php`,
            requestOptions,
          )
            .then(response => response.text())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendIdentitySuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const updatePassword = (data, success, error) => {
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

          fetch(`${baseUrl}/update-user-password.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const updatePicture = (data, success, error) => {
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

          fetch(`${baseUrl}/update-user-picture.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                success(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const widthdrawlSetting = (data, sendSuccess, error) => {
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

          fetch(`${baseUrl}/get-withdraw-setting.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendSuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

export const deleteWidthdrawlSetting = (data, sendSuccess, error) => {
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

          fetch(`${baseUrl}/delete-withdraw-setting.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendSuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const addWidthdrawlSetting = (data, sendSuccess, error) => {
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

          fetch(`${baseUrl}/add-withdraw-setting.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendSuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const createWidthdrawl = (data, sendSuccess, error) => {
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

          fetch(`${baseUrl}/create-withdraw.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendSuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};
export const fetchCountry = (sendSuccess, error) => {
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

            redirect: 'follow',
          };

          fetch(`${baseUrl}/getCountries.php`, requestOptions)
            .then(response => response.json())
            .then(response => {
              console.log('..........................');
              dispatch(homeLoad(false));
              console.log(response);
              if (response.status === 'success') {
                sendSuccess(response);
              } else {
                dispatch(homeLoad(false));
                error(response);
              }
            })
            .catch(function (error) {
              dispatch(homeLoad(false));
              console.log(error);
            });
        } catch (err) {
          error(err);
        }
      } else {
        dispatch(connectionCheck(false));
        dispatch(homeLoad(false));
      }
    });
  };
};

// helping functions
export const homeLoad = data => {
  return {
    type: types.HOME_LOADING,
    payload: data,
  };
};

export const addimages = data => {
  return {
    type: types.ADD_IMAGES,
    payload: data,
  };
};

export const setUserData = data => {
  return {
    type: types.USER_DATA,
    payload: data,
  };
};

export const docVerify = data => {
  return {
    type: types.DOC_VERIFY,
    payload: data,
  };
};

export const addressVerify = data => {
  return {
    type: types.ADDRESS_VERIFY,
    payload: data,
  };
};

export const reset = data => {
  return {
    type: types.RESET,
    payload: data,
  };
};

export const homeScreenData = data => {
  return {
    type: types.HOME_DATA,
    payload: data,
  };
};

export const storeConversation = data => {
  return {
    type: types.STORE_CONVERSATION,
    payload: data,
  };
};

export const setLanguage = data => {
  return {
    type: types.SET_LANGUAGE,
    payload: data,
  };
};

export const changeCurrency = data => {
  return {
    type: types.CHNAGE_CURRENCY,
    payload: data,
  };
};

export const connectionCheck = data => {
  return {
    type: types.CONNECTION,
    payload: data,
  };
};
