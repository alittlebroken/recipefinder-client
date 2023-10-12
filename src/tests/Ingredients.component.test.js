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

        expect(screen.getByRole('heading', { level: 2, name: /Ingredients/i })).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Ingredient Name')).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Filter/i })).toBeInTheDocument()

        let ingredients = screen.getByRole('generic', { name: /list container/i })
        expect(ingredients).toBeInTheDocument()

        /* Wait for the page to gather the initial data from the API */
        let list
        await waitFor(() => {
            list = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(list).toHaveLength(6)
        list.forEach((item) => {
            expect(item).toHaveClass('ig-container')
        })

    })

    it('filters the ingredients by the chosen terms', async () => {

        // Setup
        renderWithProviders(<Ingredients />)
        const searchField = screen.getByRole('searchbox')
        const searchButton = screen.getByRole('button', { name: /Filter/i })

        // Execute
        userEvent.type(searchField, 'egg')
        userEvent.click(searchButton)

        let ingredients = screen.getByRole('generic', { name: /list container/i })


        // Assert
        expect(screen).toBeDefined()
        expect(ingredients).toBeInTheDocument()

        /* Wait for the page to gather the initial data from the API */
        let list
        await waitFor(() => {
            list = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(list).toHaveLength(1)
        list.forEach((item) => {
            expect(item).toHaveClass('ig-container')
        })

    })

    it('displays a message if no results found for a specific filter term', async () => {

        //Setup
        renderWithProviders(<Ingredients />)
        const searchField = screen.getByRole('searchbox')
        const searchButton = screen.getByRole('button', { name: /Filter/i })

        //Execute
        userEvent.type(searchField, 'butterkist')
        userEvent.click(searchButton)

        let ingredients = screen.getByRole('generic', { name: /list container/i })

        //Assert
        expect(screen).toBeDefined()
        expect(ingredients).toBeInTheDocument()
        expect(screen.getByRole('heading', {level: 4, name: /No ingredients found matching the term butterkist/i })).toBeInTheDocument()

    })

})