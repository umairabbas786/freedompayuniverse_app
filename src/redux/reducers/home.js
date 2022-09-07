import {useTranslation} from 'react-i18next';
import * as types from '../actions/types';
const initialState = {
  homeData: [],
  homeLoading: false,
  dollar: 1,
  currency: 'USD',
  images: [],
  rooms: [],
  conversation: [],
  userData: [],
  docVerified: false,
  addressVerified: false,
  connection: true,
};
export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_LOADING: {
      return {
        ...state,
        homeLoading: action.payload,
      };
    }
    case types.USER_DATA: {
      return {
        ...state,
        userData: action.payload,
      };
    }
    case types.ADD_IMAGES: {
      return {
        ...state,
        images: action.payload,
      };
    }
    case types.DOC_VERIFY: {
      return {
        ...state,
        docVerified: action.payload,
      };
    }
    case types.ADDRESS_VERIFY: {
      return {
        ...state,
        addressVerified: action.payload,
      };
    }
    case types.EDIT_ROOM_DATA: {
      return {
        ...state,
        roomData: action.payload,
      };
    }
    case types.ROOMS_DATA: {
      return {
        ...state,
        rooms: action.payload,
      };
    }
    case types.RESET: {
      return {
        ...state,
        roomData: state.default,
        images: [],
      };
    }
    case types.SET_LANGUAGE: {
      return {
        ...state,
        languages: action.payload,
      };
    }
    case types.DOLLAR_RATE: {
      return {
        ...state,
        dollar: action.payload,
        currency: 'SDG',
      };
    }
    case types.CHNAGE_CURRENCY: {
      return {
        ...state,
        currency: action.payload,
      };
    }

    case types.CONNECTION: {
      return {
        ...state,
        connection: action.payload,
      };
    }

    default:
      return state;
  }
};
