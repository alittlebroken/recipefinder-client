import React from 'react'
import { screen, within  } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'
import { setupStore } from '../store/store'

// Import components being tested
import LandingCategories from '../components/Client/LandingCategories/LandingCategories'
import Category from '../components/Client/Category/Category'

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

// Mock any child components
jest.mock('../components/Client/Category/Category')

describe('LandingCategories component', () => {

    beforeEach(() => {
        // Create an initial store
        store = setupStore(initialStoreState)
    })

    it("renders the component", async () => {

        // render the component
        renderWithProviders(<LandingCategories />, { store })

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Landing Categories/i })).toBeInTheDoucument()

    })

    it("The child component is called", async () => {

        // render the component
        renderWithProviders(<LandingCategories />, { store })

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Landing Categories/i })).toBeInTheDoucument()

        expect(Category).toHaveBeenCalled()

    })

    xit("Skeleton test", async () => {

        // render the component
        renderWithProviders(<LandingCategories />, { store })
        
        // Setup
        const latestRecipes = screen.getByRole('generic', { name: /recipes-Container/i })

        // Asserts
        expect(screen).toBeDefined()
       
    })

})