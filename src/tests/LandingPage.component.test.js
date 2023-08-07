import React from 'react'
import { screen, waitFor } from '@testing-library/react'

import LandingPage from '../components/Client/LandingPage/LandingPage'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

describe('LandingPage Component', () => {

    it('the component renders', async () => {

        // render the component
        renderWithProviders(<LandingPage />)
    
        // Render loading data message for each Component
        expect(screen.getByText(/Loading latest recipe data/i)).toBeInTheDocument()
        expect(screen.getByText(/Loading popular recipe data/i)).toBeInTheDocument()
        expect(screen.getByText(/Loading category data/i)).toBeInTheDocument()

        let headings
        await waitFor(() => {
            headings = screen.getAllByRole('heading')
            expect(headings).toHaveLength(4)
        })

    })

    xit('Skeleton test', async () => {

        // render the component
        renderWithProviders(<LandingPage />)
        
        // Asserts
        expect(screen.getByRole('generic', { name: /landing-container/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /latest recipes/i })).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /popular recipes/i })).toBeIntheDocument()
        expect(screen.getByRole('heading', { name: /categories/i })).toBeInTheDocument()

    })

})