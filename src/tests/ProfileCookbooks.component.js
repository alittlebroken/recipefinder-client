import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/* Import the component being tested */
import ProfileCookbooks from '../components/Client/ProfileCookbooks/ProfileCookbooks'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

/* Create a file to test uploading */
const file = new File(["(¬0-0)"], "image.pdf", { type: "application/pdf" })
const imageFile = new File(["hello"], "hello.png", { type: "image/png" })

describe('ProfileCookbooks', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('renders the component', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(sectionHeader).toBeInTheDoucment()
        expect(newButton).toBeInTheDocument()

        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        cookbooks.forEach(cookbook => {

            expect(cookbook).toHaveClass('cb-container')

            let img = within(cookbook).getByRole('img')
            let header = within(cookbook).getByRole('heading', { level: 3})
            let desc = within(cookbook).getByRole('generic', { name: /cookbook description/i })
            let moreBtn = within(cookbook).getByRole('button', { name: /More Info/i })
            let removeBtn = within(cookbook).getByRole('button', { name: /Remove/i })

            expect(img).toBeDefined()
            expect(header).toBeDefined()
            expect(desc).toBeDefined()
            expect(moreBtn).toBeDefined()
            expect(removeBtn).toBeDefined()

        })

        expect(within(cookbooks[0]).getByRole('img')).toHaveAttribute('href', '/cookbook_default.png')
        expect(within(cookbooks[0]).getByRole('img')).toHaveAttribute('alt', 'Generic cookbook with list of recipes')
        expect(within(cookbooks[0]).getByRole('img')).toHaveAttribute('title', 'Generic cookbook with list of recipes')
        expect(within(cookbooks[0]).getByRole('heading', { level: 3})).toContain('My Cookbooks')
        expect(within(cookbooks[0]).getByRole('generic', { name: /cookbook description/i })).toContain('Your default cook book for storing your favourite recipes.')

        expect(within(cookbooks[1]).getByRole('img')).toHaveAttribute('href', '/cookbook_vegan.png')
        expect(within(cookbooks[1]).getByRole('img')).toHaveAttribute('alt', 'Picture of a cookbook next to vegan ingredients')
        expect(within(cookbooks[1]).getByRole('img')).toHaveAttribute('title', 'Picture of a cookbook next to vegan ingredients')
        expect(within(cookbooks[1]).getByRole('heading', { level: 3})).toContain('Vegan recipes')
        expect(within(cookbooks[1]).getByRole('generic', { name: /cookbook description/i })).toContain('My curated list of vegan recipes I have tried and love.')

        expect(within(cookbooks[2]).getByRole('img')).toHaveAttribute('href', '/cookbook_next.png')
        expect(within(cookbooks[2]).getByRole('img')).toHaveAttribute('alt', 'Cookbook atop pile of flour')
        expect(within(cookbooks[2]).getByRole('img')).toHaveAttribute('title', 'Cookbook atop pile of flour')
        expect(within(cookbooks[2]).getByRole('heading', { level: 3})).toContain('Next meal ideas')
        expect(within(cookbooks[2]).getByRole('generic', { name: /cookbook description/i })).toContain('Interesting recipes I have yet to try.')

    })

    it('renders a modal when the remove button is clicked', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        const removeButton = within(cookbooks[0]).getByRole('button', { name: /Remove/i })
        expect(removeButton).toBeInTheDocument()

        userEvent.click(removeButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        expect(within(modal).getByRole('heading')).toBeInTheDocument()
        expect(within(modal).getByText('Are you sure you wish to remove the cookbook')).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Remove/i })).toBeInTheDocument()
        expect(within(modal).getByRole('button', { name: /Cancel/i })).toBeInTheDocument()

    })

    it('removes the cookbook', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        const removeButton = within(cookbooks[0]).getByRole('button', { name: /Remove/i })
        expect(removeButton).toBeInTheDocument()

        userEvent.click(removeButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const removeBtn = within(modal).getByRole('button', { name: /Remove/i })

        let result
        await waitFor(() => {
            result = within(modal).getByRole('generic', { name: /notification container/i })
        })

        expect(result).toContain('Cookbook successfully removed')
       
    })

    it('navigates to the detailed view of the cookbook', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        const moreButton = within(cookbooks[0]).getByRole('button', { name: /More Info`/i })
        expect(moreButton).toBeInTheDocument()

        userEvent.click(moreButton)
       
        console.log(navigate)
        expect(navigate).toHaveBeenCalled()

    })

    it('displays the add new cookbook modal', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const heading = within(modal).getByRole('heading')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent('New Cookbook')

        const nameLabel = within(modal).getByText('Name:')
        expect(nameLabel).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        expect(nameInput).toBeInTheDocument()

        const descLabel = within(modal).getByText('Description:')
        expect(descLabel).toBeInTheDocument()

        const descInput = within(modal).getByLabelText('Description:')
        expect(descInput).toBeInTheDocument()

        const imageLabel = within(modal).getByText('Image:')
        expect(imageLabel).toBeInTheDocument()

        const imageInput = within(modal).getByLabelText('Image:')
        expect(imageInput).toBeInTheDocument()

        const imageTitle = within(modal).getByText('Image Title:')
        expect(imageTitle).toBeInTheDocument()

        const addButton = within(modal).getByRole('button', { name: /Add/i })
        expect(addButton).toBeInTheDocument()
      
    })

    it('adds the new cookbook', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imageInput = within(modal).getByLabelText('Image:')
        const imageTitle = within(modal).getByText('Image Title:')
        const addButton = within(modal).getByRole('button', { name: /Add/i })

        userEvent.type(nameInput, 'Delectable desserts')
        userEvent.type(descInput, 'A selection of tasty dairy free puddings')
        userEvent.input(imageInput, imageFile)
        userEvent.type(imageTitle, 'Delectable Desserts cookbook')

        userEvent.click(addButton)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('Cookbook successfully added')
      
    })

    it('displays an error if cookbook name is missing or incorrect', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imageInput = within(modal).getByLabelText('Image:')
        const imageTitle = within(modal).getByText('Image Title:')
        const addButton = within(modal).getByRole('button', { name: /Add/i })

        //userEvent.type(nameInput, 'Delectable desserts')
        userEvent.type(descInput, 'A selection of tasty dairy free puddings')
        userEvent.input(imageInput, imageFile)
        userEvent.type(imageTitle, 'Delectable Desserts cookbook')

        userEvent.click(addButton)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('You must supply a valid cookbook name')
      
    })

    it('displays an error if cookbook description is missing or incorrect', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imageInput = within(modal).getByLabelText('Image:')
        const imageTitle = within(modal).getByText('Image Title:')
        const addButton = within(modal).getByRole('button', { name: /Add/i })

        userEvent.type(nameInput, 'Delectable desserts')
        //userEvent.type(descInput, 'A selection of tasty dairy free puddings')
        userEvent.input(imageInput, imageFile)
        userEvent.type(imageTitle, 'Delectable Desserts cookbook')

        userEvent.click(addButton)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('You must supply a valid cookbook description')

    })

    it('displays an error if cookbook image file is missing or incorrect', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imageInput = within(modal).getByLabelText('Image:')
        const imageTitle = within(modal).getByText('Image Title:')
        const addButton = within(modal).getByRole('button', { name: /Add/i })

        userEvent.type(nameInput, 'Delectable desserts')
        userEvent.type(descInput, 'A selection of tasty dairy free puddings')
        //userEvent.input(imageInput, imageFile)
        userEvent.type(imageTitle, 'Delectable Desserts cookbook')

        userEvent.click(addButton)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('You must supply a valid image for the cookbook')
        
    })

    it('displays an error if cookbook image title is missing or incorrect', async () => {

        // Setup
        renderWithProviders(<ProfileCookbooks />)

        // Execute
        const sectionHeader = screen.getByRole('heading', { level: 2 })
        const newButton = screen.getByRole('button', { name: /New/i })
        const list = screen.getByRole('generic', { name: /cookbooks container/i })

        let cookbooks
        await waitFor(() => {
            cookbooks = screen.getAllByRole('generic', { name: /cookbook container/i })
        })

        // Assert
        expect(screen).toBeDefined()
        expect(list).toBeInTheDocument()
        expect(cookbooks).toHaveLength(3)

        userEvent.click(newButton)

        let modal
        await waitFor(() => {
            modal = screen.getByRole('generic', { name: /modal container/i })
        })
        expect(modal).toBeInTheDocument()

        const nameInput = within(modal).getByLabelText('Name:')
        const descInput = within(modal).getByLabelText('Description:')
        const imageInput = within(modal).getByLabelText('Image:')
        const imageTitle = within(modal).getByText('Image Title:')
        const addButton = within(modal).getByRole('button', { name: /Add/i })

        userEvent.type(nameInput, 'Delectable desserts')
        userEvent.type(descInput, 'A selection of tasty dairy free puddings')
        userEvent.input(imageInput, imageFile)
        //userEvent.type(imageTitle, 'Delectable Desserts cookbook')

        userEvent.click(addButton)

        let notification
        await waitFor(() => {
            notification = within(modal).getByRole('generic', { name: /notification container/i })
        })
        expect(notification).toBeInTheDocument()
        expect(notification).toContain('You must supply a valid image title for the cookbook')
        
    })


})