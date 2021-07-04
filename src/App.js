import React, { useEffect, Suspense } from 'react'
import { Router, Route, Switch, Link } from 'react-router-dom'
import setAuthToken from './utils/setAuthToken'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { history } from './utils/history'
import { alertActions } from './actions/alertActions'
import logo from './logo.svg'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Terms from './components/terms/Terms'
import { authActions } from './actions/authActions'
import './App.css'

function App () {
  const { t, i18n } = useTranslation()
  let token = null
  const dispatch = useDispatch()

  const authenticated = useSelector(state => state.authentication.authenticated)
  const alert = useSelector(state => state.alert)

  if (localStorage.sessionToken) {
    token = localStorage.sessionToken
    setAuthToken(token)
  }

  const changeLanguage = lng => {
    i18n.changeLanguage(lng)
  }

  useEffect(() => {
    history.listen((location, action) => {
      setTimeout(function () {
        dispatch(alertActions.clear())
      }, 7000)
    })
  }, [])

  const logout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div className='App'>
      <Router history={history}>
        <header className='App-header'>
          <Link className='home' to='/react-login'><img src={logo} className='App-logo' alt='logo' /></Link>
          <div className='buttons-container'>
            <button className='buttons' onClick={() => changeLanguage('es')}><span>es</span></button>
            <button className='buttons' onClick={() => changeLanguage('en')}><span>en</span></button>
            {authenticated && <button onClick={() => logout()}>{t('layout.logout')}</button>}
          </div>
        </header>
        <div>
          {alert.message &&
            <div className={`alert-${alert.type}`}>{t(alert.message)}</div>}
          <Switch>
            <Route exact path='/react-login' component={Landing} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/terms' component={Terms} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

// here app catches the suspense from page in case translations are not yet loaded
export default function WrappedApp () {
  return (
    <Suspense fallback='...is loading'>
      <App />
    </Suspense>
  )
}
