import React from 'react'
import { screen, within  } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'
import { setupStore } from '../store/store'

// Import components being tested
import PopularRecipes from '../components/Client/PopularRecipes/PopularRecipes'
import Recipe from '../components/Client/Recipe/Recipe'

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
jest.mock('../components/Client/Recipe/Recipe')

describe('LatestRecipes component', () => {

    beforeEach(() => {
        // Create an initial store
        store = setupStore(initialStoreState)
    })

    it("renders the component", async () => {

        // render the component
        renderWithProviders(<PopularRecipes />, { store })

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Popular Recipes/i })).toBeInTheDoucument()

    })

    it("The child component is called", async () => {

        // render the component
        renderWithProviders(<PopularRecipes />, { store })

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Popular Recipes/i })).toBeInTheDoucument()

        expect(Recipe).toHaveBeenCalled()

    })

    xit("Skeleton test", async () => {

        // render the component
        renderWithProviders(<LatestRecipes />, { store })
        
        // Setup
        const latestRecipes = screen.getByRole('generic', { name: /recipes-Container/i })

        // Asserts
        expect(screen).toBeDefined()
       
    })

})