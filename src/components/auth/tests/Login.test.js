import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store'
import { MemoryRouter } from 'react-router-dom'
import Login from '../Login'

import { render, screen, cleanup, fireEvent, waitFor, act } from '@testing-library/react'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

const mockLogin = jest.fn((email, password) => {
  return Promise.resolve({ email, password })
})

describe('Login Render Page', () => {
  afterEach(cleanup)
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Login onSubmit={mockLogin} />
        </MemoryRouter>
      </Provider>
    )
  })

  test('should display required error when value is invalid', async () => {
    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(2)
    expect(mockLogin).not.toBeCalled()
  })

  test('should display matching error when email is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'user'
      }
    })

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: '12345678'
      }
    })

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(mockLogin).not.toBeCalled()
    expect(screen.getByRole('textbox', { name: /email/i }).value).toBe('user')
    expect(screen.getByLabelText(/password/i).value).toBe('12345678')
  })

  test('should display min length error when password is invalid', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: {
        value: 'user@wolox.com.ar'
      }
    })

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: {
        value: '123'
      }
    })

    fireEvent.submit(screen.getByRole('button'))

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(mockLogin).not.toBeCalled()
    expect(screen.getByRole('textbox', { name: /email/i }).value).toBe('user@wolox.com.ar')
    expect(screen.getByLabelText(/password/i).value).toBe('123')
  })

  test('should not display error when value is valid', async () => {
    await act(async () => {
      fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
        target: {
          value: 'user@wolox.com.ar'
        }
      })

      fireEvent.input(screen.getByLabelText(/password/i), {
        target: {
          value: '12345678'
        }
      })
    })

    await fireEvent.submit(screen.getByRole('button'))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0))
  })
})
