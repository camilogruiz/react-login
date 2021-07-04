import React from 'react'
import { Provider } from 'react-redux'
import store from '../../../store'
import { MemoryRouter } from 'react-router-dom'
import Terms from '../Terms'

import { render, screen, cleanup } from '@testing-library/react'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))

describe('Terms Render Page', () => {
  afterEach(cleanup)
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Terms />
        </MemoryRouter>
      </Provider>
    )
  })

  test('should display text', async () => {
    expect(
      screen.getByText(/terms/i)
    ).toBeInTheDocument()
  })
})
