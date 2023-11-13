import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/* Import the component being tested */
import ProfileRecipes from '../components/Client/ProfileRecipes/ProfileRecipes'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

/* Create a file to test uploading */
const file = new File(["(¬0-0)"], "image.pdf", { type: "application/pdf" })
const imageFile = new File(["hello"], "hello.png", { type: "image/png" })

describe('ProfileRecipes', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('renders the component', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        recipes.forEach(recipe => {

            expect(recipe).toHaveClass('cb-container')

            let img = within(recipe).getByRole('img')
            let header = within(recipe).getByRole('heading', { level: 3})
            let desc = within(recipe).getByRole('generic', { name: /recipe description/i })
            let moreBtn = within(recipe).getByRole('button', { name: /More Info/i })
            let removeBtn = within(recipe).getByRole('button', { name: /Remove/i })

            expect(img).toBeDefined()
            expect(header).toBeDefined()
            expect(desc).toBeDefined()
            expect(moreBtn).toBeDefined()
            expect(removeBtn).toBeDefined()

        })

        expect(within(recipes[0]).getByRole('img')).toHaveAttribute('href', '/cookbook_default.png')
        expect(within(recipes[0]).getByRole('img')).toHaveAttribute('alt', 'Beans on toast')
        expect(within(recipes[0]).getByRole('img')).toHaveAttribute('title', 'Plate of toast smothered with Baked Beans')
        expect(within(recipes[0]).getByRole('heading', { level: 3})).toContain('My Recipes')
        expect(within(recipes[0]).getByRole('generic', { name: /recipe description/i })).toContain('A family favourite across the nation. Can be enjoyed at any time of the day.')

    })

    it('renders a model to remove a recipe from the system', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const removeButton = within(recipes[0]).getByRole('button', { name: /Remove/i })
        expect(removeButton).toBeInTheDocument()

        userEvent.click(removeButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Are you sure you wish to remove the recipe? It will be removed from the application and not be recoverable.')).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Remove/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Cancel/i })).toBeInTheDocument()

    })

    it('removes the specified recipe', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const removeButton = within(recipes[0]).getByRole('button', { name: /Remove/i })
        expect(removeButton).toBeInTheDocument()

        userEvent.click(removeButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const removeBtn = within(modal).getByRole('button', { name: /Remove/i })
        userEvent.click(removeBtn)
        let notifications
        await waitFor(() => {
           notifications = screen.getByRole('generic', { name: /notification container/i })
        })
        expect(notifications).toBeInTheDocument()
        expect(notifications).toContain('Recipe successfully removed')

    })

    it('navigates to the recipe when More Info is clicked', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const moreButton = within(recipes[0]).getByRole('button', { name: /More Info`/i })
        expect(moreButton).toBeInTheDocument()

        userEvent.click(moreButton)
        expect(navigate).toHaveBeenCalledWith('/recipes/1')


    })

    it('renders a model when the new button is clicked', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const heading = within(modal).getByRole('heading', { level: 2})
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveContent('New Recipe')

        const nameLabel = within(modal).getByText('Name:')
        expect(nameLabel).toBeInTheDocument()
        const nameInput = within(modal).getByLabelText('Name:')
        expect(nameInput).toBeInTheDocument()

        const descLabel = within(modal).getByTestId('Description:')
        expect(descLabel).toBeInTheDocument()
        const descInput = within(modal).getByLabelText('Description:')
        expect(descInput).toBeInTheDocument()

        const imgLabel = within(modal).getByText('Image:')
        expect(imgLabel).toBeInTheDocument()
        const imgInput = within(modal).getByLabelText('Image:')
        expect(imgInput).toBeInTheDocument()

        const titleLabel = within(modal).getByText('Image title:')
        expect(titleLabel).toBeInTheDocument()
        const titleInput = within(modal).getByLabelText('Image title:')
        expect(titleInput).toBeInTheDocument()

        const altLabel = within(modal).getByText('Image alt:')
        expect(altLabel).toBeInTheDocument()
        const altInput = within(modal).getByLabelText('Image alt:')
        expect(altInput).toBeInTheDocument()

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        expect(infoContainer).toBeInTheDocument()

        const infoHeading = within(infoContainer).getByRole('heading', { level: 3})
        expect(infoHeading).toBeInTheDocument()
        expect(infoHeading).toHaveContent('Information')

        const servingsLabel = within(infoContainer).getByText('Servings:')
        expect(servingsLabel).toBeInTheDocument()
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        expect(servingsInput).toBeInTheDocument()

        const caloriesLabel = within(infoContainer).getByText('Calories:')
        expect(caloriesLabel).toBeInTheDocument()
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        expect(caloriesInput).toBeInTheDocument()

        const prepLabel = within(infoContainer).getByText('Prep Time:')
        expect(prepLabel).toBeInTheDocument()
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        expect(prepInput).toBeInTheDocument()

        const cookLabel = within(infoContainer).getByText('Cook Time:')
        expect(cookLabel).toBeInTheDocument()
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')
        expect(cookInput).toBeInTheDocument()

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        expect(ingredientsContainer).toBeInTheDocument()

        const ingredientsHeading = within(ingredientsContainer).getByRole('heading', { level: 3 })
        expect(ingredientsHeading).toBeInTheDocument()
        expect(ingredientsHeading).toHaveContent('Ingredients')

        const ingredientsList = within(ingredientsContainer).getByRole('generic', { name: /recipe ingredients container/i })
        expect(ingredientsList).toBeInTheDocument()

        const ingredientsSelectLabel = within(ingredientsContainer).getByText('Ingredient:')
        expect(ingredientsSelectLabel).toBeInTheDocument()

        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        expect(ingredientsSelect).toBeInTheDocument()

        const ingredientsAmountLabel = within(ingredientsContainer).getByText('Amount:')
        expect(ingredientsAmountLabel).toBeInTheDocument()

        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        expect(ingredientsAmount).toBeInTheDocument()

        const ingredientsAmountTypeLabel = within(ingredientsContainer).getByText('Amount Type:')
        expect(ingredientsAmountTypeLabel).toBeInTheDocument()

        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        expect(ingredientsAmountType).toBeInTheDocument()

        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })
        expect(ingredientAdd).toBeInTheDocument()

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        expect(stepsContainer).tobeInTheDocument()

        const stepNoLabel = within(stepsContainer).getByText('Step No:')
        expect(stepNoLabel).toBeInTheDocument()

        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        expect(stepNo).toBeInTheDocument()
        
        const stepNameLabel = within(stepsContainer).getByText('Content:')
        expect(stepNameLabel).toBeInTheDocument()

        const stepName = within(stepsContainer).getByLabelText()
        expect(stepName).toBeInTheDocument()

        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })
        expect(addStep).toBeWithinTheDoucment()

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })
        expect(addRecipe).toBeInTheDocument()

    
    })

    it('adds the recipe when Add Recipe is clicked', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let notifications
        await waitFor(() => {
            notifications = screen.getByRole('generic', { name: /notifications container/i })
        })
        expect(notifications).toBeInTheDocument()
        expect(notifications).toContain('Recipe successfully added.')
    
    })

    it('throws an error if the recipe name is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        //userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe name.')
    
    })

    it('throws an error if the recipe description is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        //userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe description.')
    
    })

    it('throws an error if the recipe image is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        //userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply at least 1 image for the Recipe.')
    
    })

    it('throws an error if the recipe image title is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        //userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe image title.')
    
    })

    it('throws an error if the recipe dimage alt text is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        //userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe image alt text.')
    
    })

    it('throws an error if the recipe serving size is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        //userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe serving size.')
    
    })

    it('throws an error if the recipe calorie count is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        //userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe calorie count.')
    
    })

    it('throws an error if the recipe prep time is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        //userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe time for preparation.')
    
    })

    it('throws an error if the recipe cook time is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        //userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe cook time.')
    
    })

    it('throws an error if an ingredient for the recipe is not selected', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        //await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must select an ingredient for the recipe.')
    
    })

    it('throws an error if the amount for an ingredient is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        //userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid amount for the recipes ingredient.')
    
    })

    it('throws an error if the amount type for an ingredient is not set', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        //userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid amount type for the ingredient.')
    
    })

    it('throws an error if a name for a recipe step is missing', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        userEvent.type(stepNo, 1)
        //userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe step name.')
    
    })

    it('throws an error if a step number is missing on the recipe', async ()=> {

        // Setup
        renderWithProviders(<ProfileRecipes />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imgInput = within(modal).getByLabelText('Image:')
        const titleInput = within(modal).getByLabelText('Image title:')
        const altInput = within(modal).getByLabelText('Image alt:')

        const infoContainer = within(modal).getByRole('generic', { name: /information container/i })
        const servingsInput = within(infoContainer).getByLabelText('Servings:')
        const caloriesInput = within(infoContainer).getByLabelText('Calories:')
        const prepInput = within(infoContainer).getByLabelText('Prep Time:')
        const cookInput = within(infoContainer).getByLabelText('Cook Time:')

        const ingredientsContainer = within(modal).getByRole('generic', { name: /ingredients Container/i })
        const ingredientsSelect = within(ingredientsContainer).getByLabelText('Ingredient:')
        const ingredientsAmount = within(ingredientsContainer).getByLabelText('Amount:')
        const ingredientsAmountType = within(ingredientsContainer).getByLabelText('Amount Type:')
        const ingredientAdd = within(ingredientsContainer).getByRole('button', { name: /Add/i })

        const stepsContainer = within(modal).getByRole('generic', { name: /steps container/i })
        const stepNo = within(stepsContainer).getByLabelText('Step No:')
        const stepName = within(stepsContainer).getByLabelText()
        const addStep = within(stepsContainer).getByRole('button', { name: /Add/i })

        const addRecipe = within(modal).getByRole('button', { name: /Create Recipe/i })

        userEvent.type(nameInput, 'Beans on toast')
        userEvent.type(descInput, 'An amazing snack for time of the day.')

        userEvent.upload(imgInput,imageFile)
        userEvent.type(titleInput, 'Pile of cookbooks')
        userEvent.type(altInput, 'Pile of cookbooks')

        userEvent.type(servingsInput, 2)
        userEvent.type(caloriesInput, 215)
        userEvent.type(prepInput, 5)
        userEvent.type(cookInput, 10)

        await userEvent.selectOptions(ingredientsSelect, "White Bread")
        userEvent.type(ingredientsAmount, 2)
        userEvent.type(ingredientsAmountType, 'slices')
        userEvent.click(ingredientAdd)

        let ingredientList
        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(1)

        await userEvent.selectOptions(ingredientsSelect, "Baked Beans")
        userEvent.type(ingredientsAmount, 400)
        userEvent.type(ingredientsAmountType, 'grams')
        userEvent.click(ingredientAdd)

        await waitFor(() => {
            ingredientList = within(ingredientsContainer).getAllByRole('generic', { name: /ingredient list item/i })
        })
        expect(ingredientList).toHaveLength(2)

        //userEvent.type(stepNo, 1)
        userEvent.type(stepName, 'Empty beans into an appropriatly sized sauce pan and cook over a medium heat for 4 minutes.')
        userEvent.click(addStep)

        let stepList
        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(1)

        userEvent.type(stepNo, 2)
        userEvent.type(stepName, 'Whilst the beans are cooking, toast the bread to your liking.')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(2)

        userEvent.type(stepNo, 3)
        userEvent.type(stepName, 'When the beans and toast are cook, lightly butter the toast, place on a plate and pour over the beans. Enjoy!')
        userEvent.click(addStep)

        await waitFor(() => {
            stepList = within(stepsContainer).getAllByRole('generic', { name: /step list item/i })
        })
        expect(stepList).toHaveLength(3)

        userEvent.click(addRecipe)

        let validations
        await waitFor(() => {
            validations = screen.getByRole('generic', { name: /validation container/i })
        })
        expect(validations).toBeInTheDocument()
        expect(validations).toContain('You must supply a valid recipe step number.')
    
    })

})