import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

import RecipeDetails from '../components/Client/RecipeDetails'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

/* Create a file to test uploading */
const file = new File(["(¬0-0)"], "image.pdf", { type: "application/pdf" })
const imageFile = new File(["hello"], "hello.png", { type: "image/png" })

describe('RecipeDetails', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('renders the component', async () => {

        // Setup
        renderWithProviders(<RecipeDetails />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const addToCookbook = screen.getByRole('generic', { name: /Add to cookbook/i })
        const cookbookSelect = screen.getByRole('combobox')
        const container = screen.getByRole('generic', { name: /recipe detail container/i })
        const mainImage = screen.getByRole('img', { name: /main recipe image/i })
        const recipeDesc = screen.getByRole('generic', { name: /main recipe description/i })

        const infoHeader = screen.getByRole('heading', { level: 3, name: /info header/i })
        const infoContainer = screen.getByRole('generic', { name: /recipe information/i })
        const infoItems = within(infoContainer).getAllByRole('generic', { name: /recipe info item/i })

        const carousel = screen.getByRole('generic', { name: /carousel of recipe images/i})
        const carouselNext = screen.getByRole('button', { name: />/i})
        const carouselPrev = screen.getByRole('button', { name: /</i})

        const ingredientsHeader = screen.getByRole('header', { name: /ingredients header/i })
        const ingredientsList = screen.getByRole('list', { name: /ingredients/i })
        const ingredientItems = within(ingredientsList).getAllByRole('listitem')

        const stepsHeader = screen.getByRole('header', { name:/steps header/i })
        const stepsContainer = screen.getByRole('generic', { name: /recipe steps container/i })
        const stepNumbers = within(stepsContainer).getAllByRole('generic', { name: /recipe step number/i })
        const stepDetails = within(stepsContainer).getAllByRole('generic', { name:/recipe step content/i })

        const categoriesHeader = screen.getByRole('header', { name: /categories header/i })
        const categoriesList = screen.getByRole('list', { name: /categories/i })
        const categoryItems = within(categoriesList).getAllByRole('listitem')

        // Test
        expect(screen).toBeDefined()

        expect(sectionHeader).toBeDefined()
        expect(container).toBeDefined()
        expect(addToCookbook).toBeDefined()
        expect(cookbookSelect).toBeDefined()
        expect(mainImage).toBeDefined()
        expect(recipeDesc).toBeDefined()
        expect(infoHeader).tobeDefined()
        expect(carousel).toBeDefined()
        expect(carouselNext).toBeDefined()
        expect(carouselPrev).toBeDefined()
        expect(ingredientsHeader).toBeDefined()
        expect(ingredientsList).toBeDefined()
        expect(ingredientItems).toBeDefined()
        expect(stepsHeader).toBeDefined().toContain('Steps')
        expect(stepsContainer).toBeDefined()
        expect(stepNumbers).toBeDefined().toHaveLength(3)
        expect(stepDetails).toBeDefined().toHaveLength(3)
        expect(categoriesHeader).toBeDefined()
        expect(categoriesList).toBeDefined()
        expect(categoryItems).toBeDefined()

        expect(sectionHeader).toContain('Beans on Toast')

        expect(mainImage).toHaveAttribute('title', 'Pot of baked beans')
        expect(mainImage).toHaveAttribute('alt', 'Pot of baked beans')
        expect(mainImage).toHaveAttribute('src', '/images/1.png')

        expect(recipeDesc).toContain("World's tastiest snack")

        expect(ingredientItems).toHaveLength(2)
        const items = ingredientItems.map( item => item.textContent)
        expect(items).toEqual([
            "2 slices of Bread",
            "400 grams of Baked beans"
        ])

        expect(infoItems).toHaveLength(4)

        expect(infoItems[0].getByRole('header')).toContain(246)
        expect(infoItems[0].getByRole('generic', { name: /recipe info item/i })).toContain('Calories')

        expect(infoItems[1].getByRole('header')).toContain(1)
        expect(infoItems[1].getByRole('generic', { name: /recipe info item/i })).toContain('Servings')

        expect(infoItems[2].getByRole('header')).toContain(5)
        expect(infoItems[2].getByRole('generic', { name: /recipe info item/i })).toContain('Prep time')

        expect(infoItems[3].getByRole('header')).toContain(20)
        expect(infoItems[3].getByRole('generic', { name: /recipe info item/i })).toContain('Cook Time')

        expect(stepNumbers[0]).toContain(1)
        expect(stepNumbers[1]).toContain(2)
        expect(stepNumbers[2]).toContain(3)

        expect(stepDetails[0]).toContain('Toast the bread in a toaster or grill')
        expect(stepDetails[1]).toContain('Place the beans in a saucepan and simmer on a low heat for 3 to 4 minutes')
        expect(stepDetails[2]).toContain('Place toast on a palte and pour the cooked beans on top')

        expect(cookbookSelect).tohaveValue('My Cookbooks')
        expect(screen.getByRole('option', { name: "My Cookbooks" }).selected).toBe(true)

    })

    it('adds the recipe to your cookbook when Add to cookbook is clicked', async () => {

        // Setup
        renderWithProviders(<RecipeDetails />)

        // Execute
        const addToCookbook = screen.getByRole('generic', { name: /Add to cookbook/i })
        const cookbookSelect = screen.getByRole('combobox')

      
        // Test
        expect(screen).toBeDefined()
        expect(addToCookbook).toBeDefined()
        expect(cookbookSelect).toBeDefined()

        await userEvent.selectOptions(cookbookSelect, "Next meal ideas")
        expect(cookbookSelect).toHaveValue("Next meal ideas")
        expect(screen.getByRole('option', { name: "Next meal ideas" }).selected).toBe(true)

        userEvent.click(addToCookbook)
        
        let notifications
        await waitFor(() => {
            notifications = screen.getByRole('generic', { name: /notifications/i })
        })
        expect(notifications).toContain("Recipe successully added to cookbook.")

    })

})