import React from 'react'
import { screen } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'
import { setupStore } from '../store/store'

// Import Components being tested
import LandingPage from '../components/Client/LandingPage/LandingPage'
import LatestRecipes from '../components/Client/LatestRecipes'
import PopularRecipes from '../components/Client/PopularRecipes'
import Categories from '../components/Client/Categories'

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

// Mock the child components
jest.mock('../components/Client/LatestRecipes/LatestRecipes')
jest.mock('../components/Client/PopularRecipes/PopularRecipes')
jest.mock('../components/Client/Categories/Categories')

describe('LandingPage Component', () => {

    beforeEach(() => {
        // Create an initial store
        store = setupStore(initialStoreState)
    })

    it('the component renders', async () => {

        // render the component
        renderWithProviders(<LandingPage />, { store })
        
        // Asserts
        expect(LatestRecipes).toHaveBeenCalled()
        expect(PopularRecipes).toHaveBeenCalled()
        expect(Categories).toHaveBeenCalled()

    })

    xit('Skeleton test', async () => {

        // render the component
        renderWithProviders(<LandingPage />, { store })
        
        // Asserts
        expect(screen.getByRole('generic', { name: /landing-container/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /latest recipes/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /popular recipes/i })).toBeIntheDocument()
        expect(screen.getByRole('heading', { name: /categories/i })).toBeInTheDocument()

    })

})