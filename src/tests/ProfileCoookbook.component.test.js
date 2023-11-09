import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/* Import the component being tested */
import ProfileCookbook from '../components/Client/ProfileCookbook/ProfileCookbook'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

/* Create a file to test uploading */
const file = new File(["(¬0-0)"], "image.pdf", { type: "application/pdf" })
const imageFile = new File(["hello"], "hello.png", { type: "image/png" })

describe('ProfileCookbook', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })
    
    it('renders the component', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        recipes.forEach(recipe => {

            expect(recipe).toHaveClass('r-container')

            let img = within(recipe).getByRole('img')
            let header = within(recipe).getByRole('heading')
            let desc = within(recipe).getByRole('generic', { name: /recipe description/i })
            let moreBtn = within(recipe).getByRole('button', { name: /More Info/i })
            let rmvBtn = within(recipe).getByRole('button', { name: /Remove/i })

            expect(img).toBeDefined()
            expect(header).toBeDefined()
            expect(desc).toBeDefined()
            expect(moreBtn).toBeDefined()
            expect(rmvBtn).toBeDefined()

        })

        expect(within(recipes[0]).getByRole('img')).toHaveAttribute('href', 'spagbol.png')
        expect(within(recipes[0]).getByRole('img')).toHaveAttribute('alt', 'Image of a bowl of Spaghetti Bolognaise')
        expect(within(recipes[0]).getByRole('img')).tohaveAttribute('title', 'Spaghetti Bolognaise')
        expect(within(recipes[0]).getByRole('heading', { level: 3})).toContain('Spaghetti Bolognaise')
        expect(within(recipes[0]).getByRole('generic', { name: /recipe description/i })).toContain('A delicious and simple Spaghettit Bolognaise')

    })

    it('displays a modal when the remove button for a recipe is clicked', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const removeBtn = within(recipes[0]).getByRole('button', { name: /Remove/i })
        expect(removeBtn).toBeInTheDocument()
        userEvent.click(removeBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Are you sure you wish to remove this recipe?')).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Remove/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Cancel/i })).toBeInTheDocument()
        
    })

    it('removes the recipe when the remove button on the modal is clicked', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const removeBtn = within(recipes[0]).getByRole('button', { name: /Remove/i })
        expect(removeBtn).toBeInTheDocument()
        userEvent.click(removeBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        const rmvButton = within(modal).getByRole('button', { name: /Remove/i })
        userEvent.click(rmvButton)

        await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
        })
        
        let notification = screen.getByRole('generic', 'notification container')
        expect(notification).toBeInTheDocument()

        expect(notification).toContain('Recipe was successfully removed')
        
    })

    it('closes the modal when the cancel button is clicked', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const removeBtn = within(recipes[0]).getByRole('button', { name: /Remove/i })
        expect(removeBtn).toBeInTheDocument()
        userEvent.click(removeBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        const closeButton = within(modal).getByRole('button', { name: /Cancel/i })
        userEvent.click(closeButton)

        await waitFor(() => {
            expect(modal).not.toBeInTheDocument()
        })
        
    })

    it('displays a modal when the edit button is clicked', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const editBtn = within(recipes[0]).getByRole('button', { name: /Edit/i })
        expect(editBtn).toBeInTheDocument()
        userEvent.click(editBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByRole('heading')).toContain('Edit Cookbook')

        expect(within(modal).getByText('Title:')).toBeInTheDocument()
        expect(within(modal).getByLabelText('Title:')).toBeInTheDocument()

        expect(within(modal).getByText('Description:')).toBeInTheDocument()
        expect(within(modal).getByLabelText('Description:')).toBeInTheDocument()

        expect(within(modal).getByRole('button', { name: /Update/i})).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Cancel/i })).toBeInTheDocument()

    })

    it('updates the entry after it has been edited', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const editBtn = within(recipes[0]).getByRole('button', { name: /Edit/i })
        expect(editBtn).toBeInTheDocument()
        userEvent.click(editBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        let titleInput = within(modal).getByLabelText("Title:")
        let descInput = within(modal).getByLabelText("Description:")
        let updateBtn = within(modal).getByRole('button', { name: /Update/i })

        userEvent.type(titleInput, "My Favourites")
        userEvent.type(descInput, "All my favourite recipes")

        userEvent.click(updateBtn)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('Cookbook successfully updated')

    })

    it('shows an error if the title is not set', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const editBtn = within(recipes[0]).getByRole('button', { name: /Edit/i })
        expect(editBtn).toBeInTheDocument()
        userEvent.click(editBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        let titleInput = within(modal).getByLabelText("Title:")
        let descInput = within(modal).getByLabelText("Description:")
        let imgInput = within(modal).getByLabelText("Image:")
        let imgTitleInput = within(modal).getByLabelText("Image Title:")
        let imgAltInput = within(modal).getByLabelText("Image Alt Text")
        let updateBtn = within(modal).getByRole('button', { name: /Update/i })

        //userEvent.type(titleInput, "My Favourites")
        userEvent.type(descInput, "All my favourite recipes")
        userEvent.type(imgTitleInput, "A pile of celebrity cookbooks")
        userEvent.type(imgAltInput, "Piles and piles of celebrity cookbooks")
        userEvent.upload(imgInput, imageFile)

        userEvent.click(updateBtn)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('You must supply a title for the cookbook')

    })

    it('shows an error if the description is not set', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const editBtn = within(recipes[0]).getByRole('button', { name: /Edit/i })
        expect(editBtn).toBeInTheDocument()
        userEvent.click(editBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        let titleInput = within(modal).getByLabelText("Title:")
        let descInput = within(modal).getByLabelText("Description:")
        let imgInput = within(modal).getByLabelText("Image:")
        let imgTitleInput = within(modal).getByLabelText("Image Title:")
        let imgAltInput = within(modal).getByLabelText("Image Alt Text")
        let updateBtn = within(modal).getByRole('button', { name: /Update/i })

        userEvent.type(titleInput, "My Favourites")
        //userEvent.type(descInput, "All my favourite recipes")
        userEvent.type(imgTitleInput, "A pile of celebrity cookbooks")
        userEvent.type(imgAltInput, "Piles and piles of celebrity cookbooks")
        userEvent.upload(imgInput, imageFile)

        userEvent.click(updateBtn)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('You must supply a description for the cookbook')

    })

    it('shows an error if the image title is not set', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const editBtn = within(recipes[0]).getByRole('button', { name: /Edit/i })
        expect(editBtn).toBeInTheDocument()
        userEvent.click(editBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        let titleInput = within(modal).getByLabelText("Title:")
        let descInput = within(modal).getByLabelText("Description:")
        let imgInput = within(modal).getByLabelText("Image:")
        let imgTitleInput = within(modal).getByLabelText("Image Title:")
        let imgAltInput = within(modal).getByLabelText("Image Alt Text")
        let updateBtn = within(modal).getByRole('button', { name: /Update/i })

        userEvent.type(titleInput, "My Favourites")
        userEvent.type(descInput, "All my favourite recipes")
        //userEvent.type(imgTitleInput, "A pile of celebrity cookbooks")
        userEvent.type(imgAltInput, "Piles and piles of celebrity cookbooks")
        userEvent.upload(imgInput, imageFile)

        userEvent.click(updateBtn)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('You must supply a title for the cookbooks image')

    })

    it('shows an error if the image alt text  is not set', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        const editBtn = within(recipes[0]).getByRole('button', { name: /Edit/i })
        expect(editBtn).toBeInTheDocument()
        userEvent.click(editBtn)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })

        let titleInput = within(modal).getByLabelText("Title:")
        let descInput = within(modal).getByLabelText("Description:")
        let imgInput = within(modal).getByLabelText("Image:")
        let imgTitleInput = within(modal).getByLabelText("Image Title:")
        let imgAltInput = within(modal).getByLabelText("Image Alt Text")
        let updateBtn = within(modal).getByRole('button', { name: /Update/i })

        userEvent.type(titleInput, "My Favourites")
        userEvent.type(descInput, "All my favourite recipes")
        userEvent.type(imgTitleInput, "A pile of celebrity cookbooks")
        //userEvent.type(imgAltInput, "Piles and piles of celebrity cookbooks")
        userEvent.upload(imgInput, imageFile)

        userEvent.click(updateBtn)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('You must supply alt text for the cookbooks image')

    })

    it('navigates to the recipe view when More Info is clicked', async () => {

        // Setup
        renderWithProviders(<ProfileCookbook />)

        // Execute
        const cookBookTitle = screen.getByRole('heading', { level: 2})
        const CookbookDescription = screen.getByRole('generic', { name: /cookbook description/i })
        const list = screen.getByRole('generic', { name: /recipes container/i })

        let recipes
        await waitFor(() => {
            recipes = screen.getAllByRole('generic', { name: /recipe container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(cookBookTitle).toBeInTheDocument()
        expect(CookbookDescription).toBeInTheDocument()
        
        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        expect(list).toBeInTheDocument()
        expect(recipes).toHaveLength(1)

        let moreButton = within(recipes[0]).getByRole('button', { name: /More Info/i })
        userEvent.click(moreButton)

        expect(navigate).toHaveBeenCalledWith('/recipe/1')
        
        
    })

})