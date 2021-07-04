import axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import { alertActions } from './alertActions'
import { userConstants } from '../utils/userConst'
import { history } from '../utils/history'

const LOGIN_URL = 'https://private-8e8921-woloxfrontendinverview.apiary-mock.com/login'
const SIGNUP_URL = 'https://private-8e8921-woloxfrontendinverview.apiary-mock.com/signup'

export const authActions = {
  login,
  logout,
  register
}

function login (userData, from) {
  return dispatch => {
    dispatch(request(userData))
    axios
      .post(LOGIN_URL, userData)
      .then(
        res => {
          dispatch(success(res))
          const { token } = res.data
          localStorage.setItem('sessionToken', token)
          setAuthToken(token)
          history.push(from)
          dispatch(alertActions.success('messages.welcome'))
        },
        error => {
          dispatch(failure(error.toString()))
          dispatch(alertActions.error(error.toString()))
        })
  }

  function request (user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success (user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure (error) { return { type: userConstants.LOGIN_FAILURE, error } }
};

function register (userData) {
  return dispatch => {
    dispatch(request(userData))
    axios
      .post(SIGNUP_URL, userData)
      .then(res => {
        dispatch(success())
        history.push('/login')
        dispatch(alertActions.success('messages.registersuccess'))
      },
      error => {
        dispatch(failure(error.toString()))
        dispatch(alertActions.error(error.toString()))
      })
  }

  function request (user) { return { type: userConstants.REGISTER_REQUEST, user } }
  function success (user) { return { type: userConstants.REGISTER_SUCCESS, user } }
  function failure (error) { return { type: userConstants.REGISTER_FAILURE, error } }
};

function logout () {
  localStorage.removeItem('sessionToken')
  setAuthToken(false)
  return { type: userConstants.LOGOUT }
};
