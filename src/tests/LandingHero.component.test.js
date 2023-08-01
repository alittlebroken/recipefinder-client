import React from 'react'
import { screen, within  } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'
import { setupStore } from '../store/store'

// Import components being tested
import LandingHero from '../components/Client/LandingHero/LandingHero'
import Hero from '../components/Client/Hero/Hero'

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
jest.mock('../components/Client/Hero/Hero')

describe('LandingCategories component', () => {

    beforeEach(() => {
        // Create an initial store
        store = setupStore(initialStoreState)
    })

    it("renders the component", async () => {

        // render the component
        renderWithProviders(<LandingHero />, { store })

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Find your next favourite/i })).toBeInTheDoucument()

    })

    it("The child component is called", async () => {

        // render the component
        renderWithProviders(<LandingHero />, { store })

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Find your next favourite/i })).toBeInTheDoucument()

        expect(Hero).toHaveBeenCalled()

    })

    xit("Skeleton test", async () => {

        // render the component
        renderWithProviders(<LandingHero />, { store })
        
        // Setup
        const latestRecipes = screen.getByRole('generic', { name: /recipes-Container/i })

        // Asserts
        expect(screen).toBeDefined()
       
    })

})