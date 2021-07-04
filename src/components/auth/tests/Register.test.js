import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store'
import { MemoryRouter } from 'react-router-dom'
import Register from '../Register'

import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

const mockRegister = jest.fn()
describe('Register Render Page', () => {
  afterEach(cleanup)
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Register onSubmit={mockRegister} />
        </MemoryRouter>
      </Provider>
    )
  })

  test('should render the basic fields', () => {
    expect(
      screen.getAllByRole('textbox', { name: /name/i })[0]
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /lastname/i })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', { name: /email/i })
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument()
    expect(
      screen.getByLabelText(/confirm/i)
    ).toBeInTheDocument()
    expect(
      screen.getByRole('spinbutton', { name: /phone/i })
    ).toBeInTheDocument()

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should invalid name with value max 30 characters', async () => {
    fireEvent.input(screen.getAllByRole('textbox', { name: /name/i })[0], {
      target: { value: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod' }
    })

    expect(screen.queryAllByRole('textbox', { name: /name/i })[0].value.length).not.toBe(30)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should valid name with value max 30 characters', async () => {
    fireEvent.input(screen.getAllByRole('textbox', { name: /name/i })[0], {
      target: { value: 'Nam liber tempor cum soluta no' }
    })

    expect(screen.queryAllByRole('textbox', { name: /name/i })[0].value.length).toBe(30)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should invalid lastname with value max 30 characters', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /lastname/i }), {
      target: { value: 'Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod' }
    })

    expect(screen.queryByRole('textbox', { name: /lastname/i }).value.length).not.toBe(30)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should valid lastname with value max 30 characters', async () => {
    fireEvent.input(screen.getByRole('textbox', { name: /lastname/i }), {
      target: { value: 'Nam liber tempor cum soluta no' }
    })

    expect(screen.queryByRole('textbox', { name: /lastname/i }).value.length).toBe(30)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should valid phone with value min 6 characters', async () => {
    fireEvent.input(screen.getByRole('spinbutton', { name: /phone/i }), {
      target: { value: '123456' }
    })

    expect(screen.queryByRole('spinbutton', { name: /phone/i }).value.length).toBe(6)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should valid phone with value max 10 characters', async () => {
    fireEvent.input(screen.getByRole('spinbutton', { name: /phone/i }), {
      target: { value: '1234567890' }
    })

    expect(screen.queryByRole('spinbutton', { name: /phone/i }).value.length).toBe(10)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  test('should submit correct form data', async () => {
    fireEvent.input(screen.getAllByRole('textbox', { name: /name/i })[0], {
      target: { value: 'Joe' }
    })

    fireEvent.input(screen.getByRole('textbox', { name: /lastname/i }), {
      target: { value: 'Doe' }
    })

    fireEvent.input(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'joe.doe@gmail.com' }
    })

    fireEvent.input(screen.getByLabelText(/password/i), {
      target: { value: 'abc12345678' }
    })

    fireEvent.input(screen.getByLabelText(/confirm/i), {
      target: { value: 'abc12345678' }
    })

    fireEvent.input(screen.getByRole('spinbutton', { name: /phone/i }), {
      target: { value: 47468900 }
    })

    fireEvent.input(screen.getByTestId('conditions'), {
      target: { value: true }
    })

    fireEvent.input(screen.getByTestId('search'), {
      target: { value: 'Argentina' }
    })

    fireEvent.submit(screen.getByRole('button'))

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0))
  })
})
