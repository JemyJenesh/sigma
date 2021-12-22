import React, {createContext, useEffect, useReducer} from 'react';
import useNotificationStore from '../hooks/useNotificationStore';
import {axios, setAuthToken} from '../utils/axios';
import {getToken, removeToken} from '../utils/tokenHelper';

const authContext = createContext();
const {Provider} = authContext;

const initialState = {
  isLoading: true,
  isLoggedIn: false,
  user: null,
  orderDetailTitle: '',
  agencyTitle: '',
  categoryTitle: '',
  token: null,
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const APP_LOADED = 'APP_LOADED';
const CHANGE_ORDER_DETAIL_TITLE = 'CHANGE_ORDER_DETAIL_TITLE';
const CHANGE_AGENCY_TITLE = 'CHANGE_AGENCY_TITLE';
const CHANGE_CATEGORY_TITLE = 'CHANGE_CATEGORY_TITLE';
const CHANGE_CART_COUNT = 'CHANGE_CART_COUNT';

const reducer = (state, action) => {
  const {type, payload} = action;
  switch (type) {
    case APP_LOADED:
      return {...state, isLoading: false};
    case LOGIN:
      return {
        ...state,
        user: payload.user,
        isLoggedIn: true,
        isLoading: false,
        token: payload.token,
      };
    case LOGOUT:
      removeToken();
      return {...state, user: null, isLoggedIn: false, isLoading: false};
    case CHANGE_ORDER_DETAIL_TITLE:
      return {...state, orderDetailTitle: payload.title};
    case CHANGE_AGENCY_TITLE:
      return {...state, agencyTitle: payload.title};
    case CHANGE_CATEGORY_TITLE:
      return {...state, categoryTitle: payload.title};
    case CHANGE_CART_COUNT:
      return {
        ...state,
        user: {...state.user, carts_count: payload.amount},
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: payload,
      };
    default:
      return state;
  }
};

const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const setUnreadnotificationsCount = useNotificationStore(
    (state) => state.setUnreadnotificationsCount,
  );
  const checkToken = async () => {
    const token = await getToken();
    if (token) {
      setAuthToken(token);
      await axios
        .get('/api/user')
        .then((res) => {
          if (res.status === 200) {
            dispatch({type: LOGIN, payload: {user: res.data, token: token}});
            setUnreadnotificationsCount(res.data.unreadnotifications_count);
          }
        })
        .catch((err) => {
          if (err.response) {
            console.log(err.response);
          }
        });
    } else {
      dispatch({type: APP_LOADED});
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return <Provider value={{state, dispatch}}>{children}</Provider>;
};

export {authContext, AuthContextProvider};
