import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Search from  '../components/Client/Search/Search'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

describe('Search component', () => {

    it('renders the component', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<Search />)

        // Assertions
        expect(screen.getByRole('searchbox')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDoucment()

    })

    it('displays a list of results when a user searches for something', async () => {

        // Setup the test
        renderWithProviders(<Search />)
        const searchField = screen.getByRole('searchbox')
        const searchButton = screen.getByRole('button')
        
        // Enter some text to search for
        userEvent.type(searchField, 'eggs')
        expect(searchField).toHaveValue('eggs')

        // Click the search button
        userEvent.click(searchButton)
        expect(screen.getByText('Loading search results')).tobeInTheDocument()

        let heading
        await waitFor(() => {
            heading = screen.getByRole('heading')
            
            expect(heading).tobeInTheDocument()
        })
        expect(heading).toHaveValue('Results found for search term eggs')

        // Look for some results
        expect(screen.getByRole('generic', { name: /searchresults-container/i})).toBeInTheDocument()

        const results = screen.getByRole('generic', { name: /searchresults-container/i})
        
        // Check for results
        expect(within(results).getAllByRole('generic', { name: /card-container/i})).toHaveLength(2)
        expect(within(results).getAllByRole('img')).toHaveLength(2)
        expect(within(results).getAllByRole('link')).toHaveLength(2)

        expect(within(results).getByText('Egg fried rice')).toBeInTheDocument()
        expect(within(results).getByText('Eggy bread')).toBeInTheDocument()

    })

    xit('sample test', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<Search />)

        // Assertions

    })

})