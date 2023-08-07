import React from 'react'
import { screen, within  } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

// Import components being tested
import LandingHero from '../components/Client/LandingHero/LandingHero'

describe('LandingCategories component', () => {

    it("renders the component", async () => {

        // render the component
        renderWithProviders(<LandingHero />)

        // Asserts
        expect(screen).toBeDefined()

        expect(screen.getByRole('heading', { name: /Find your favourite/i })).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /GO/i })).toBeInTheDocument()

        expect(screen.getByRole('searchbox', { placeholder: /Type in a recipe name or ingredient/i })).toBeInTheDocument()

    })

    xit("Skeleton test", async () => {

        // render the component
        renderWithProviders(<LandingHero />,)
        
        // Setup
        const latestRecipes = screen.getByRole('generic', { name: /recipes-Container/i })

        // Asserts
        expect(screen).toBeDefined()
       
    })

})