import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import LoginForm from '../components/Client/LoginForm/LoginForm'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

describe('Login component', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('renders the component', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<LoginForm />)

        // Assertions
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument()

        expect(screen.getByRole('form')).toBeInTheDocument()
        
        expect(screen.getByText('Email Address')).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /Email Address/i })).toBeInTheDocument()

        expect(screen.getByText('Password')).toBeInTheDocument()
        expect(screen.getByRole('textbox', { name: /Password/i })).toBeInTheDocument()

        expect(screen.getByRole('button', { name: /Submit/i })).toBeInTheDocument()

        expect(screen.getByRole('link', { name: /Register/i })).toBeInTheDoucment()
        expect(screen.getByRole('link', { name: /Register/i })).toHaveAttribute('href', '/signup')

    })

    it('submits the form', async () => {

        // Setup the test
        renderWithProviders(<LoginForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Email Address/i }), 'customer@website.co.uk')
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'customersPassword')
        userEvent.submit(screen.getByText('Submit'))
        

        // Assertions
        const profile = await screen.findByRole('link', { name: /Profile/i })
        expect(profile).toBeInTheDocument()

    })

    it('displays error message if no data entered into form when submitting', async () => {

        // Setup the test
        renderWithProviders(<LoginForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Email Address/i }), 'customer@website.co.uk')
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'customersPassword')
        userEvent.submit(screen.getByText('Submit'))

        // Assertions
        expect(screen.getByText('You must supply username and password')).toBeInTheDocument()

    })

    it('displays error message if no username submitted', async () => {

        // Setup the test
        renderWithProviders(<LoginForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'customersPassword')
        userEvent.submit(screen.getByText('Submit'))
        // Assertions
        expect(screen.getByText('You must supply a username')).toBeInTheDocument()

    })

    it('displays error message if no password submitted', async () => {

        // Setup the test
        renderWithProviders(<LoginForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'customersPassword')
        userEvent.submit(screen.getByText('Submit'))
        // Assertions
        expect(screen.getByText('You must supply a password')).toBeInTheDocument()

    })

    it('displays error message if there is an issue with the login details', async () => {

        // Setup the test
        renderWithProviders(<LoginForm />)

        // Execute the test
        userEvent.type(screen.getByRole('textbox', { name: /Email Address/i }), 'cust@website.co.uk')
        userEvent.type(screen.getByRole('textbox', { name: /Password/i }), 'customers')
        userEvent.submit(screen.getByText('Submit'))

        // Assertions
        const expectedText = await screen.findByText('Username or password is incorrect')
        expect(expectedText).toBeInTheDocument()

    })



    xit('sample test', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<LoginForm />)

        // Assertions

    })

})