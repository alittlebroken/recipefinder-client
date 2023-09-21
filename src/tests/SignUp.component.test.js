import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SignupForm from '../components/Client/SignupForm/SignupForm'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

describe('SignupForm', () => {

    beforeEach(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate) 
    })

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('The form is displayed', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<SignupForm />)

        // Assertions
        expect(screen).toBeDefined()

        expect(screen.getByRole('form')).toBeInTheDocument()

        expect(screen.getByRole('heading', { name: /Register/i})).toBeInTheDocument()

        expect(screen.getByLabelText('Forename:')).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /Forename/i })).toBeInTheDocument()

        expect(screen.getByLabelText('Surname:')).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /Surname/i })).toBeInTheDocument()

        expect(screen.getByLabelText('Email address:')).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /Email address/i })).toBeInTheDocument()

        expect(screen.getByLabelText('Password:')).toBeInTheDocument()
       
        expect(screen.getByLabelText('Confirm password:')).toBeInTheDocument()
        
        expect(screen.getByText('By creating an account you agree to our terms and condtions')).toBeInTheDocument()
        expect(screen.getByText('Already have an account?')).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument()

        expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDocument()
        expect(screen.getByRole('link', { name: /Login/i })).toHaveAttribute('href', '/login')


    })

    it('submits the form', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        
        // Assertions
        expect(navigate).toHaveBeenCalledWith('/login')

    })

    it('displays error message if Forename is not set', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        // Assertions
        expect(screen.getByText('You must supply a forename to register')).toBeInTheDocument()

    })

    it('displays error message if Forename is not of the required length', async () => {
 
        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'U')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        // Assertions
        expect(screen.getByText('You must suppyly a forename that is greater then 2 characters long')).toBeInTheDocument()

    })

    it('displays error message if Surname is not set', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        // Assertions
        expect(screen.getByText('You must supply a surname to register')).toBeInTheDocument()

    })

    it('displays error message if Surname is not of the required length', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'A')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        // Assertions
        expect(screen.getByText('You must suppyly a surname that is greater then 2 characters long')).toBeInTheDocument()

    })

    it('displays error message if Email Address is not set', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        // Assertions
        expect(screen.getByText('You must supply an email address to register')).toBeInTheDocument()

    })

    it('displays error message if Email Address is not of the required length', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@email.co')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        // Assertions
        expect(screen.getByText('You must supply an email of at least 16 characters')).toBeInTheDocument()

    })

    it('displays error message if password is not set', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        // Assertions
        expect(screen.getByText('You must supply a password to register')).toBeInTheDocument()

    })

    it('displays error message if password is not of the required length', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nky')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })

        // Assertions
        expect(screen.getByText('The supplied password must be at least 8 characters long')).toBeInTheDocument()

    })

    it('displays error message if password is not confirmed', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })
        
        // Assertions
        expect(screen.getByText('You must confirm your password to register')).toBeInTheDocument()

    })

    it('displays error message if confirmed password is not of the required length', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nky')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })
        
        // Assertions
        expect(screen.getByText('The supplied confirmed password must be at least 8 characters long')).toBeInTheDocument()

    })

    it('displays error message if confirmed password and password do not match', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByLabelText('Password:'), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByLabelText('Confirm password:'), 'D1nkyW!nky')
        
        await waitFor( async () => {
            await userEvent.click(screen.getByRole('button', { name: /Register/i }))
        })
        
        // Assertions
        expect(screen.getByText('The password and confirmed password must match before registration can continue')).toBeInTheDocument()

    })

    xit('sample test', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<SignupForm />)

        // Assertions
        expect(screen).toBeDefined()

    })

})