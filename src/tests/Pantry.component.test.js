import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

import Pantry from '../components/Client/Pantry/Pantry'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

describe('Pantry', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('renders the component', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(4)
        ingredients.forEach((ingredient) => {
            expect(ingredient).toHaveClass('mi-ingredient')

            let image = within(ingredient).getByRole('img')
            let title = within(ingredient).getByRole('heading', { level: 3})
            let amount = within(ingredient).getByText('Amount:')
            let amountType = within(ingredient).getByText('Amount Type:')
            let removeBtn = within(ingredient).getByRole('button', { name: /Remove/i })
            let editBtn = within(ingredient).getByRole('button', { name: /Edit/i })

            expect(image).toBeDefined()
            expect(title).toBeDefined()
            expect(amount).toBeDefined()
            expect(amountType).toBeDefined()
            expect(removeBtn).toBeDefined()
            expect(editBtn).toBeDefined()

        })
        

    })

    it('removes the ingredient when the remove button is clicked', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(1)
        const removeBtn = screen.getByRole('button', { name: /Remove/i })

        userEvent.click(removeBtn)
        
        let notification
        await waitFor(() => {
            notification = screen.getByRole('generic', { name: /remove notification bar/i })
        })
        expect(notification).toBeInTheDocument()

        expect(within(notification).getByText('Ingredient successfully removed from the pantry')).toBeInTheDocument()      
        
    })

    it('displays an error if the ingredient could not be removed', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(1)
        const removeBtn = screen.getByRole('button', { name: /Remove/i })

        userEvent.click(removeBtn)
        
        let notification
        await waitFor(() => {
            notification = screen.getByRole('generic', { name: /remove notification bar/i })
        })
        expect(notification).toBeInTheDocument()

        expect(within(notification).getByText('Ingredient unable to be removed from the pantry')).toBeInTheDocument()      
        
    })

    it('displays the edit modal when the user clicks on the edit button for an ingredient', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(1)
        const editBtn = screen.getByRole('button', { name: /Edit/i })

        userEvent.click(editBtn)
        
        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Amount:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amount/i })).toBeInTheDocument()
        expect(within(modal).getByText('Amount Type:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amountType/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Update/i })).toBeInTheDoucment()
        
    })

    it('should update an ingredient and let the user know if it was successful', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(1)
        const editBtn = screen.getByRole('button', { name: /Edit/i })

        userEvent.click(editBtn)
        
        let modal
        let amount
        let amountType
        let updBtn
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
            amount = screen.getByRole('textBox', { name: /amount/i })
            amountType = screen.getByRole('textbox', { name: /amountType/i })
            updBtn = screen.getByRole('button', { name: /Update/i })
        })
        expect(modal).toBeInTheDocument()

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Amount:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amount/i })).toBeInTheDocument()
        expect(within(modal).getByText('Amount Type:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amountType/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Update/i })).toBeInTheDoucment()

        userEvent.type(amount, 12)
        userEvent.type(amountType, "Slices")
        userEvent.click(updBtn)

        let confirmation = await screen.findByRole('generic', { name: /update confirmation/i })
        expect(confirmation).toBeInTheDocument()

        expect(within(confirmation).getByText('Ingredient successfully updated')).toBeInTheDocument()
        
    })

    it('should display an error if the amount value is missing', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(1)
        const editBtn = screen.getByRole('button', { name: /Edit/i })

        userEvent.click(editBtn)
        
        let modal
        let amount
        let amountType
        let updBtn
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
            amount = screen.getByRole('textBox', { name: /amount/i })
            amountType = screen.getByRole('textbox', { name: /amountType/i })
            updBtn = screen.getByRole('button', { name: /Update/i })
        })
        expect(modal).toBeInTheDocument()

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Amount:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amount/i })).toBeInTheDocument()
        expect(within(modal).getByText('Amount Type:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amountType/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Update/i })).toBeInTheDoucment()

        //userEvent.type(amount, 12)
        userEvent.type(amountType, "Slices")
        userEvent.click(updBtn)

        let confirmation = await screen.findByRole('generic', { name: /amount error/i })
        expect(confirmation).toBeInTheDocument()
        
        expect(within(confirmation).getByText('You must supply an amount for the ingredient')).toBeInTheDocument()
        
    })

    it('should display an error if the amount value less than 1', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(1)
        const editBtn = screen.getByRole('button', { name: /Edit/i })

        userEvent.click(editBtn)
        
        let modal
        let amount
        let amountType
        let updBtn
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
            amount = screen.getByRole('textBox', { name: /amount/i })
            amountType = screen.getByRole('textbox', { name: /amountType/i })
            updBtn = screen.getByRole('button', { name: /Update/i })
        })
        expect(modal).toBeInTheDocument()

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Amount:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amount/i })).toBeInTheDocument()
        expect(within(modal).getByText('Amount Type:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amountType/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Update/i })).toBeInTheDoucment()

        userEvent.type(amount, 0)
        userEvent.type(amountType, "Slices")
        userEvent.click(updBtn)

        let confirmation = await screen.findByRole('generic', { name: /amount error/i })
        expect(confirmation).toBeInTheDocument()
        
        expect(within(confirmation).getByText('You must supply an amount for the ingredient that is greater than 0')).toBeInTheDocument()
        
    })

    it('should display an error if the amount type value is missing', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(1)
        const editBtn = screen.getByRole('button', { name: /Edit/i })

        userEvent.click(editBtn)
        
        let modal
        let amount
        let amountType
        let updBtn
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
            amount = screen.getByRole('textBox', { name: /amount/i })
            amountType = screen.getByRole('textbox', { name: /amountType/i })
            updBtn = screen.getByRole('button', { name: /Update/i })
        })
        expect(modal).toBeInTheDocument()

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Amount:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amount/i })).toBeInTheDocument()
        expect(within(modal).getByText('Amount Type:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amountType/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Update/i })).toBeInTheDoucment()

        userEvent.type(amount, 0)
        //userEvent.type(amountType, "Slices")
        userEvent.click(updBtn)

        let confirmation = await screen.findByRole('generic', { name: /amount type error/i })
        expect(confirmation).toBeInTheDocument()
        
        expect(within(confirmation).getByText('You must supply a value for amount type')).toBeInTheDocument()
        
    })

    it('should display an error if the amount type value less than 1 characters long', async () => {

        /* Setup */
        renderWithProviders(<Pantry />)

        /* Execute */

        /* Test */
        expect(screen).toBeDefined()

        const mainHeading = screen.getByRole('heading', { level: 2})
        expect(mainHeading).toBeInTheDocument()
        
        const findForm = screen.getByRole('form', {
            name: /find ingredient form/i
        })
        expect(findForm).toBeDefined()

        expect(within(findForm).getByText('Find Ingredient:')).toBeInTheDoucment()
        expect(within(findForm).getByRole('searchbox', { name: /search by ingredient name/i})).toBeInTheDocument()
        expect(within(findForm).getByRole('button', { name: /Find/i })).toBeInTheDocument()

        const ingredientList = screen.getByRole('generic', { name: 'ingredient list'})
        expect(ingredientList).toBeInTheDocument()

        let ingredients
        await waitFor(() => {
            ingredients = screen.getAllByRole('generic', { name: /ingredient-container/i })
        })

        expect(ingredients).toHaveLength(1)
        const editBtn = screen.getByRole('button', { name: /Edit/i })

        userEvent.click(editBtn)
        
        let modal
        let amount
        let amountType
        let updBtn
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
            amount = screen.getByRole('textBox', { name: /amount/i })
            amountType = screen.getByRole('textbox', { name: /amountType/i })
            updBtn = screen.getByRole('button', { name: /Update/i })
        })
        expect(modal).toBeInTheDocument()

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Amount:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amount/i })).toBeInTheDocument()
        expect(within(modal).getByText('Amount Type:')).toBeInTheDocument()
        expect(within(modal).getByRole('textbox', { name: /amountType/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Update/i })).toBeInTheDoucment()

        userEvent.type(amount, 0)
        userEvent.type(amountType, "")
        userEvent.click(updBtn)

        let confirmation = await screen.findByRole('generic', { name: /amount type error/i })
        expect(confirmation).toBeInTheDocument()
        
        expect(within(confirmation).getByText('You must supply a value for amount type that is greater than 1 character in length')).toBeInTheDocument()
        
    })

})
