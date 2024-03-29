import React from "react"
import { render } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter, Routes } from 'react-router-dom';
import { setupStore } from '../store/store'

// Provide a new function to render a component with a store
export function renderWithProviders(
    ui,
    {
      preloadedState = {},
      // Automatically create a store instance if no store was passed in
      store = setupStore(preloadedState),
      ...renderOptions
    } = {}
  ) {
    function Wrapper({ children }) {
      return (
      <BrowserRouter>
        <Provider store={store}>
            {children}
        </Provider>
      </BrowserRouter>
      );
    }
  
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
  }