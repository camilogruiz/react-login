import React from 'react'
import { render, screen } from '@testing-library/react'
import { Search } from '../Search'

jest.mock('react-i18next', () => ({
  useTranslation: () => ({ t: (key) => key })
}))
describe('Search Render Component', () => {
  beforeEach(() => {
    render(<Search />)
  })

  test('should render the basic fields', () => {
    expect(
      screen.getByRole('textbox')
    ).toBeInTheDocument()
  })
})
