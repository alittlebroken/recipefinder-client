import React from 'react'
import { screen, within } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

// Import components being tested
import LandingCategories from '../components/Client/LandingCategories/LandingCategories'

// Mocked Category data to be returned
let mockedCategories = [
    { id: 1, name: 'Vegetarian'},
    { id: 2, name: 'Vegan'},
    { id: 3, name: 'Gluten Free'},
    { id: 4, name: 'Dairy Free'}
]

describe('LandingCategories component', () => {

    afterEach(() => jest.clearAllMocks())

    it("renders the component", async () => {

        // render the component
        renderWithProviders(<LandingCategories categories={mockedCategories} />)

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Categories/i })).toBeInTheDocument()

    })

    it("The child component(s) are rendered", async () => {

        // render the component
        renderWithProviders(<LandingCategories  categories={mockedCategories} />)

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Categories/i })).toBeInTheDocument()

        // Get all the children for this component
        let children = screen.getByRole('generic', { name: /landing page categories/i })
        expect(within(children).getAllByRole('generic', { name: /card-container/i}  )).toHaveLength(4)
        expect(within(children).getAllByRole('img')).toHaveLength(4)
    
    })

    xit("Skeleton test", async () => {

        // render the component
        renderWithProviders(<LandingCategories />)
        
        // Setup
        const latestRecipes = screen.getByRole('generic', { name: /recipes-Container/i })

        // Asserts
        expect(screen).toBeDefined()
       
    })

})