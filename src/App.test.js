import React from "react";
import { Provider } from 'react-redux';
import store from "./store";
import './App.css';
import App from './App';

import { render, screen, cleanup } from '@testing-library/react';

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key) => key }),
}));

describe("App Render Page", () => {
  afterEach(cleanup);
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>);
  });
  test('should render the App component without crashing', async () => {
    const logo = await screen.findAllByRole('img');
    expect(logo[0]).toHaveAttribute('src', 'logo.svg');
    expect(logo[0]).toHaveAttribute('alt', 'logo');
  });
})
