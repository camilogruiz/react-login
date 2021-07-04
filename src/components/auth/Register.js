import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { authActions } from '../../actions/authActions'
import { Search } from '../search/Search'
import './Register.css'

function Register () {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid }
  } = useForm({
    mode: 'onBlur'
  })

  const dispatch = useDispatch()

  useEffect(() => {
  }, [])

  const [country, setCountry] = useState([])

  const onSubmit = (data) => {
    const newUser = data
    console.log(isValid + ' ' + isDirty)
    newUser.country = country.name
    newUser.province = country.capital

    dispatch(authActions.register(newUser))
  }

  return (
    <div>
      <h3>{t('messages.newuser')}</h3>
      <p>
        {t('messages.haveaccount')}{' '}
        <Link to='/login'>{t('layout.login')}</Link>
      </p>

      <div>
        <div>
          <form noValidate onSubmit={handleSubmit(onSubmit)} className='frm'>
            {/* Name */}
            <div className='row'>
              <label className='label' htmlFor='name'>{t('data.name')}:</label>
              <div>
                <input
                  type='text'
                  id='name'
                  {...register('name',
                    {
                      required: t('validations.required'),
                      maxLength: {
                        value: 30,
                        message: t('validations.thirtynminlenght')
                      }
                    }
                  )}
                /><br />
                {errors.name && (
                  <span className='alert' role='alert'>{errors.name.message}</span>
                )}
              </div>
            </div>

            {/* LastName */}
            <div className='row'>
              <label className='label' htmlFor='lastname'>{t('data.lastname')}:</label>
              <div>
                <input
                  type='text'
                  id='lastname'
                  {...register('lastname',
                    {
                      required: t('validations.required'),
                      maxLength: {
                        value: 30,
                        message: t('validations.thirtynminlenght')
                      }
                    }
                  )}
                /><br />
                {errors.lastname && (
                  <span className='alert' role='alert'>{errors.lastname.message}</span>
                )}
              </div>

            </div>

            {/* Country */}
            <div className='row'>
              <label className='label' htmlFor='country'>{t('data.country')}:</label>
              <div>
                <Search
                  value={setCountry}
                />
              </div>
            </div>

            {/* Email */}
            <div className='row'>
              <label className='label' htmlFor='email'>{t('data.email')}:</label>
              <div>
                <input
                  type='email'
                  id='email'
                  {...register('email',
                    {
                      required: t('validations.required'),
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: t('validations.emailpattern')
                      }
                    }
                  )}
                /><br />
                {errors.email && (
                  <span className='alert' role='alert'>{errors.email.message}</span>
                )}
              </div>
            </div>

            {/* Phone */}
            <div className='row'>
              <label className='label' htmlFor='phone'>{t('data.phone')}:</label>
              <div>
                <input
                  type='number'
                  id='phone'
                  {...register('phone',
                    {
                      required: t('validations.required'),
                      minLength: {
                        value: 6,
                        message: t('validations.sixminlenght')
                      },
                      maxlength: {
                        value: 10,
                        message: t('validations.tenmaxlenght')
                      }
                    }
                  )}
                /><br />
                {errors.phone && (
                  <span className='alert' role='alert'>{errors.phone.message}</span>
                )}
              </div>
            </div>

            {/* Password */}
            <div className='row'>
              <label className='label' htmlFor='password'>{t('data.password')}:</label>
              <div>
                <input
                  type='password'
                  id='password'
                  {...register('password',
                    {
                      required: t('validations.required'),
                      minLength: {
                        value: 6,
                        message: t('validations.sixminlenght')
                      }
                    }
                  )}
                /><br />
                {errors.password && (
                  <span className='alert' role='alert'>{errors.password.message}</span>
                )}
              </div>

            </div>

            {/* Confirm password */}
            <div className='row'>
              <label className='label' htmlFor='password2'>{t('data.confirm')}:</label>
              <div>
                <input
                  type='password'
                  id='password2'
                  {...register('password2',
                    {
                      required: t('validations.required'),
                      minLength: {
                        value: 6,
                        message: t('validations.sixminlenght')
                      },
                      validate: value => value === watch('password') || t('validations.passnomatch')
                    }
                  )}
                /><br />
                {errors.password2 && (
                  <span className='alert' role='alert'>{errors.password2.message}</span>
                )}
              </div>
            </div>

            {/* Conditions */}
            <div className='row'>
              <div className='label' />
              <div>
                <input
                  type='checkbox'
                  id='conditions'
                  data-testid='conditions'
                  {...register('conditions', { required: t('validations.required') })}
                />
                <Link to='/terms'>{t('data.conditions')}</Link>
                <br />
                {errors.conditions && (
                  <span className='alert' role='alert'>{errors.conditions.message}</span>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div>
              <button
                className='buttons'
                disabled={!isDirty || !isValid}
                type='submit'
              >
                <span>{t('layout.signup')}</span>
              </button>
            </div>
          </form>
        </div>

        <div />
      </div>
    </div>
  )
}

export default Register
