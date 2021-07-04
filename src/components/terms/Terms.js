import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function Terms () {
  const { t } = useTranslation()

  return (
    <div>
      <div>
        <div>
          <Link to='/register'>{t('layout.back')}</Link>
        </div>
        <div>
          <p id='terms'>{t('terms')}</p>
        </div>
      </div>
    </div>
  )
}

export default Terms
