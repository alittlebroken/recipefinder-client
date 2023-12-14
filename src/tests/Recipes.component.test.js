import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

import Recipes from '../components/Client/Recipes/Recipes'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

describe('Recipes', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('should render the component', async () => {

        renderWithProviders(<Recipes />)
        const sectionHeader = screen.getByRole('header', { level: 2})
        const filterInput = screen.getByRole('textbox')
        const filterButton = screen.getByRole('button', { name: /Filter Recipes/i })
        const recipesList = screen.getByRole('generic', { name: /list of recipes/i })
        const recipes = within(recipesList).getAllByRole('generic', { name: /container for recipe/i })

        expect(screen).toBeDefined()
        expect(sectionHeader).toBeDefined()
        expect(filterInput).toBeDefined()
        expect(filterButton).toBeDefined()
        expect(recipesList).toBeDefined()
        expect(recipes).toHaveLength(1)

        recipes.forEach(recipe => {
            let image = within(recipe).getByRole('img')
            let title = within(recipe).getByRole('header', { level: 3})
            let desc = within(recipe).getByRole('generic', { name: /recipe description/i })
            let more = within(recipe).getByRole('button', { name: /More info/i })
            let add = within(recipe).getByRole('button', { name: /Add/i })

            expect(image).toBeDefined()
            expect(title).toBeDefined()
            expect(desc).toBeDefined()
            expect(more).tobeDefined()
            expect(add).toBeDefined()
        })

    })

    it('should navigate to the recipe page when the More button is clicked', async () => {

        renderWithProviders(<Recipes />)
        const recipesList = screen.getByRole('generic', { name: /list of recipes/i })
        const recipes = within(recipesList).getAllByRole('generic', { name: /container for recipe/i })

        expect(recipesList).toBeDefined()
        expect(recipes).toBeDefined().toHaveLength(1)

        const add = within(recipes[0]).getByRole('button', { name: /Add/i })
        userEvent.click(add)

        expect(navigate).toHaveBeenCalledWith('/recipe/9')

    })

    it('adds the recipe to a desired cookbook when the add button is clicked', async () => {

        renderWithProviders(<Recipes />)
        const recipesList = screen.getByRole('generic', { name: /list of recipes/i })
        const recipes = within(recipesList).getAllByRole('generic', { name: /container for recipe/i })

        expect(screen).tobeDefined()
        expect(recipesList).toBeDefined()
        expect(recipes).toBeDefined().toHaveLength(1)
        
        const add = within(recipes[0]).getByRole('button', { name: /Add/i })
        expect(add).toBeDefined()

        let modal
        userEvent.click(add)
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal for cookbook add/i })
        })

        const selectCookbook = within(modal).getByRole('combobox')
        const confirm = within(modal).getByRole('button')

        await userEvent.selectOptions(selectCookbook, "Next meal ideas")
        expect(selectCookbook).toHaveValue("Next meal ideas")
        expect(screen.getByRole('option', { name: "Next meal ideas" }).selected).toBe(true)

        userEvent.click(confirm)

        let notifications
        await waitFor(() => {
            notifications = screen.getByRole('generic', { name: /notifications/i })
        })
        expect(notifications).toContain("Recipe successully added to cookbook.")

    })

})