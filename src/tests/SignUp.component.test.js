import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import SignupForm from '../components/Client/SignupForm/SignupForm'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

describe('SignupForm', () => {

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

        expect(screen.getByText('Forename')).toBeInTheDocument()
        expect(screen.getByRoel('textbox', { name: /Forename/i })).toBeInTheDocument()

        expect(screen.getByText('Surname')).toBeInTheDocument()
        expect(screen.getByRoel('textbox', { name: /Surname/i })).toBeInTheDocument()

        expect(screen.getByText('Email address')).toBeInTheDocument()
        expect(screen.getByRoel('textbox', { name: /Email address/i })).toBeInTheDocument()

        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByRoel('textbox', { name: /Password/i })).toBeInTheDocument()

        expect(screen.getByText('Confirm password')).toBeInTheDocument()
        expect(screen.getByRoel('textbox', { name: /Confirm password/i })).toBeInTheDocument()

        expect(screen.getByText('By creating an account you agree to our terms and condtions')).toBeInTheDocument()
        expect(screen.getByText('Already have an account? Login')).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Register/i })).toBeInTheDocument()

        expect(screen.getByRole('link', { name: /Login/i })).toBeInTheDoucment()
        expect(screen.getByRole('link', { name: /Login/i })).toHaveAttribute('href', '/login')


    })

    it('submits the form', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByRole('textbox', { name: /Confirm password/i }), 'D1nkySp3lm0r!ng')
        userEvent.submit(screen.getByText('Register'))
        
        // Assertions
        const login = screen.getByRole('heading', { name: /Login/i })
        expect(login).toBeInTheDocument()

    })

    it('displays error message if no data entered into form when submitting', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.submit(screen.getByText('Register'))

        // Assertions
        expect(screen.getByText('You must enter your details to register')).toBeInTheDocument()

    })

    it('displays error message if Forename is not set', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByRole('textbox', { name: /Confirm password/i }), 'D1nkySp3lm0r!ng')
        userEvent.submit(screen.getByText('Register'))

        // Assertions
        expect(screen.getByText('You must enter your firstname to continue registration')).toBeInTheDocument()

    })

    it('displays error message if Surname is not set', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByRole('textbox', { name: /Confirm password/i }), 'D1nkySp3lm0r!ng')
        userEvent.submit(screen.getByText('Register'))

        // Assertions
        expect(screen.getByText('You must enter your surname to continue registration')).toBeInTheDocument()

    })

    it('displays error message if Email Address is not set', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'D1nkySp3lm0r!ng')
        userEvent.type(screen.getByRole('textbox', { name: /Confirm password/i }), 'D1nkySp3lm0r!ng')
        userEvent.submit(screen.getByText('Register'))

        // Assertions
        expect(screen.getByText('You must enter your email addres to continue registration')).toBeInTheDocument()

    })

    it('displays error message if password is not set', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByRole('textbox', { name: /Confirm password/i }), 'D1nkySp3lm0r!ng')
        userEvent.submit(screen.getByText('Register'))

        // Assertions
        expect(screen.getByText('You must enter your password to register')).toBeInTheDocument()

    })

    it('displays error message if password is not confirmed', async () => {

        // Setup the test
        renderWithProviders(<SignupForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Forename/i }), 'User')
        userEvent.type(screen.getByRole('textbox', { name: /Surname/i }), 'Account')
        userEvent.type(screen.getByRole('textbox', { name: /Email address/i }), 'user@emailaddress.co.uk')
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'D1nkySp3lm0r!ng')
        userEvent.submit(screen.getByText('Register'))
        
        // Assertions
        expect(screen.getByText('You must confirm your password to register')).toBeInTheDocument()

    })


    xit('sample test', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<SignupForm />)

        // Assertions
        expect(screen).toBeDefined()

    })

})