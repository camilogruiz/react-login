import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import yoda from '../../imgs/yoda.png'
import babyyoda from '../../imgs/baby-yoda.jpg'
import './style.css'

function Landing () {
  const authenticated = useSelector(state => state.authentication.authenticated)

  const { t } = useTranslation()
  return (
    <div className='landing-container'>
      {!authenticated && (
        <div>
          <div className='login-buttons'>
            {/* Register */}
            <Link to='/register'>{t('layout.register')}</Link>
            {/* Login */}
            <Link to='/login'>{t('layout.login')}</Link>
          </div>
        </div>
      )}
      <br />
      <div>
        {authenticated && (
          <img className='responsive-image img' src={yoda} alt='home' />
        )}
        {!authenticated && (
          <img className='responsive-image img' src={babyyoda} alt='login' />
        )}
      </div>

    </div>
  )
}

export default Landing
