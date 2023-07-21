import React from 'react'
import { screen } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'
import { setupStore } from '../store/store'

// Import Components being tested
import LandingPage from '../components/Client/LandingPage/LandingPage'

// Inital store state
const initialStoreState = {
    landingpage: {
        latest: [],
        popular: [],
        categories: [],
        isLoading: false,
        hasError: false,
    }
}

// setup a store for the tests to use
let store

describe('LandingPage Component', () => {

    beforeEach(() => {
        // Create an initial store
        store = setupStore(initialStoreState)
    })

    it('Skeleton test', async () => {

        // render the component
        renderWithProviders(<LandingPage />, { store })
        
        // Asserts
        expect(screen.getByRole('heading', { name: /latest recipes/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /popular recipes/i })).toBeIntheDocument()
        expect(screen.getByRole('heading', { name: /categories/i })).toBeInTheDocument()

    })

})