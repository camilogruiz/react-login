import React from 'react';
import { Provider } from 'react-redux';
import store from "../../../store";
import { MemoryRouter } from 'react-router-dom'
import Landing from '../Landing'

import { render, screen, cleanup, fireEvent, waitFor } from '@testing-library/react';

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe('Landing Render Page', () => {
  afterEach(cleanup);
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Landing />
        </MemoryRouter>
      </Provider>
    )
  });

  test('should display 2 links', async () => {
    const register = screen.getByRole('link', {name: /register/i})
    const login = screen.getByRole('link', {name: /login/i})

    expect(register).toHaveAttribute('href', '/register')
    expect(login).toHaveAttribute('href', '/login')
  });
})
