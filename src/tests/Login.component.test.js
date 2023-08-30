import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import Login from '../components/Client/Login/Login'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

describe('Login component', () => {

    it('renders the component', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<Login />)

        // Assertions

    })

    xit('sample test', async () => {

        // Setup the test

        // Execute the test
        renderWithProviders(<Login />)

        // Assertions

    })

})