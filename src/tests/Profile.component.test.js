import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

/* Import the component being tested */
import Profile from '../components/Client/Profile/Profile'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

/* Create a file to test uploading */
const file = new File(["(¬0-0)"], "image.pdf", { type: "application/pdf" })
const imageFile = new File(["hello"], "hello.png", { type: "image/png" })

describe('Profile', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('renders the component', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        
        // Assertions
        expect(screen).toBeDefined()

        expect(screen.getByAltText(/Terry Wallaby profile picture/i)).toBeInTheDocument()
        expect(screen.getByRole('heading', { name: /Terry Wallaby/i })).ToBeInTheDocument()
        expect(screen.getByRole('heading', { name: /twallaby@australia.net/i })).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Pantry/i})).toBeInTheDocument()
        expect(screen.getByRole('generic', { name: /pantry count/i})).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Cookbooks/i})).toBeInTheDocument()
        expect(screen.getByRole('generic', { name: /cookbook count/i})).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Recipes/i})).toBeInTheDocument()
        expect(screen.getByRole('generic', { name: /recipe count/i})).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Ingredients/i})).toBeInTheDocument()
        expect(screen.getByRole('generic', { name: /ingredient count/i})).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: /Personal Info/i})).toBeInTheDocument()
        
        expect(screen.getByLabelText(/Forename:/i)).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /Forename:/i })).toBeInTheDocument()

        expect(screen.getByLabelText(/Surname:/i)).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /Surname:/i })).toBeInTheDocument()

        expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /Email:/i })).toBeInTheDocument()

        expect(screen.getByAltText(/uploaded profile picture/i)).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /uploadprofilepic/i })).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Update/i })).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: /Password/i })).toBeInTheDocument()
        expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Confirm password:/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Reset Password/i })).toBeInTheDocument()

    })

    it('displays an error if forename is not set', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Surname:/i), 'Wallaby Jr')
        userEvent.type(screen.getByLabelText(/Email:/i), 'twallabyjr@australia.net')
        
        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Update/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/You must supply a forename to update/i)).toBeInTheDocument()

    })

    it('displays an error if forename is not of the correct length', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Forename:/i), 'T')
        userEvent.type(screen.getByLabelText(/Surname:/i), 'Wallaby Jr')
        userEvent.type(screen.getByLabelText(/Email:/i), 'twallabyjr@australia.net')
        
        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Update/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/You must supply a forename that is greater than 2 characters long/i)).toBeInTheDocument()

    })

    it('displays an error if surname is not set', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Forename:/i), 'Terry')
        userEvent.type(screen.getByLabelText(/Email:/i), 'twallabyjr@australia.net')
        
        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Update/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/You must supply a surname to update/i)).toBeInTheDocument()

    })

    it('displays an error if surname is not of the correct length', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Forename:/i), 'Terry')
        userEvent.type(screen.getByLabelText(/Surname:/i), 'W')
        userEvent.type(screen.getByLabelText(/Email:/i), 'twallabyjr@australia.net')
        
        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Update/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/You must supply a surname that is greater than 2 characters long/i)).toBeInTheDocument()

    })

    it('displays an error if email is not set', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Forename:/i), 'Terry')
        userEvent.type(screen.getByLabelText(/Surname:/i), 'Wallaby Jr')
        
        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Update/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/You must supply an email address to update/i)).toBeInTheDocument()

    })

    it('displays an error if email address is not of the correct length', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Forename:/i), 'T')
        userEvent.type(screen.getByLabelText(/Surname:/i), 'Wallaby Jr')
        userEvent.type(screen.getByLabelText(/Email:/i), 'tw@aus.net')
        
        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Update/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/You must supply an email address that is greater than 15 characters long/i)).toBeInTheDocument()

    })

    it('displays an error if uploaded file is of the wrong file mime type', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Forename:/i), 'Terry')
        userEvent.type(screen.getByLabelText(/Surname:/i), 'Wallaby Jr')
        userEvent.type(screen.getByLabelText(/Email:/i), 'twjr@australia.net')

        const fileInput = screen.getByLabelText(/Profile Image/i)
        userEvent.upload(fileInput, file)
        
        expect(fileInput.files[0]).toStrictEqual(file)
        expect(fileInput.files.item[0]).toStrictEqual(file)
        expect(fileInput.files).toHaveLength(1)

        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Update/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/Please upload a valid image for the profile picture/i)).toBeInTheDocument()

    })

    it('submits the personal info section without error', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Forename:/i), 'Terry')
        userEvent.type(screen.getByLabelText(/Surname:/i), 'Wallaby Jr')
        userEvent.type(screen.getByLabelText(/Email:/i), 'twjr@australia.net')

        const fileInput = screen.getByLabelText(/Profile Image/i)
        userEvent.upload(fileInput, imageFile)
        
        expect(fileInput.files[0]).toStrictEqual(imageFile)
        expect(fileInput.files.item[0]).toStrictEqual(imageFile)
        expect(fileInput.files).toHaveLength(1)

        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Update/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/User profile updated/i)).toBeInTheDocument()

    })

    it('displays an error if the change password field is not set', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/ Confirm Password:/i), 'somem0thersdoav33m')

        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/You must supply a new password to change to/i)).toBeInTheDocument()

    })

    it('displays an error if the password filed is less than 8 characters long', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Password:/i), 'some')
        userEvent.type(screen.getByLabelText(/ Confirm Password:/i), 'somem0thersdoav33m')

        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/The password must be at least 8 characters long/i)).toBeInTheDocument()

    })

    it('displays an error if the confirm changed password field is not set', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Password:/i), 'somem0thersdoav33m')

        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/You must confirm the new password you wish to change to/i)).toBeInTheDocument()

    })

    it('displays an error if the confirmed password is not at least 8 characters long', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Password:/i), 'somem0thersdoav33m')
        userEvent.type(screen.getByLabelText(/ Confirm Password:/i), 'somem')

        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/The confirmed password must be at least 8 characters long/i)).toBeInTheDocument()

    })

    it('displays an error if the password and confirmed password do not match', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Password:/i), 'somem0thersdoav33m')
        userEvent.type(screen.getByLabelText(/ Confirm Password:/i), 'somemv33m')

        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/Both password fileds must match/i)).toBeInTheDocument()

    })

    it('Should reset the password', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        userEvent.type(screen.getByLabelText(/Password:/i), 'somem0thersdoav33m')
        userEvent.type(screen.getByLabelText(/ Confirm Password:/i), 'somem0thersdoav33m')

        await waitFor(async () => {
            await userEvent.click(screen.getByRole('button', { name: /Reset Password/i }))
        })

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByText(/Password successfully changed/i)).toBeInTheDocument()

    })

    xit('sample test', async () => {

        // Setup the test
        renderWithProviders(<Profile />)

        // Execute the test
        
        // Assertions
        expect(screen).toBeDefined()

    })

})