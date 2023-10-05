import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Ingredients from '../components/Client/Ingredients/Ingredients'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

describe('Ingredients', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('renders the component', async () => {

        // Setup
        renderWithProviders(<Ingredients />)

        // Execute

        // Assert
        expect(screen).toBeDefined()

        expect(screen.getByRole('heading', { name: /Ingredients/i })).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Ingredient Name')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Filter/i })).toBeInTheDocument()

        let ingredients = screen.getByRole('generic', { name: /list container/i })
        expect(ingredients).toBeInTheDocument()

        expect(within(ingredients).getAllByRole('generic', { name: /ingredient-container/i })).toHaveLength(6)
        expect(within(ingredients).getAllByRole('generic', { name: /ingredient-container/i })).toHaveClass('ig-container')

    })

    it('filters the ingredients by the chosen terms', async () => {

        // Setup
        renderWithProviders(<Ingredients />)
        const searchField = screen.getByRole('searchbox')
        const searchButton = screen.getByRole('button')

        // Execute
        userEvent.type(searchField, 'egg')
        userEvent.click(searchButton)

        // Assert
        expect(screen).toBeDefined()

        let heading
        await waitFor(() => {
            heading = screen.getByRole('heading')
            expect(heading).tobeInTheDocument()
        })
        expect(heading).toHaveValue('Filtering by the term: egg')

        /* Check for resuts */
        const list = screen.getByRole('generic', { name: /list container/i })

        expect(within(list).getAllByRole('generic', { name: /ingredient-container/i })).toHaveLength(1)

    })

    it('displays a message if no results found for a specific filter term', async () => {

        //Setup
        renderWithProviders(<Ingredients />)
        const searchField = screen.getByRole('searchbox')
        const searchButton = screen.getByRole('button')

        //Execute
        userEvent.type(searchField, 'butterkist')
        userEvent.click(searchButton)

        //Assert
        expect(screen).toBeDefined()

        let heading
        await waitFor(() => {
            heading = screen.getByRole('heading')
            expect(heading).toBeInTheDocument()
        })
        expect(heading).toHaveValue('Filtering by the term: butterkist')

        let list = screen.getByRole('generic', { name: /list container/i })
        expect(list).toBeInTheDocument()
        expect(await within(list).findAllByRole('generic', { name: /ingredient-container/i})).toHaveLength(0)
        expect(await within(list).findAllByRole('heading')).toHaveValue('No ingredients found for filter butterkist')

    })

})