import React from 'react'
import { screen } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

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

describe('LandingPage Component', () => {

    it('', async () => {

        // Setup
        

    })

})