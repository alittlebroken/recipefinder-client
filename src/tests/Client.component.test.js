import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

// Import supporting packages
import { MemoryRouter } from 'react-router-dom'

// Import components we are testing
import Client from '../components/Client/Client'

describe('<Client />', () => {


  it('renders the component', async () => {
    
    // Setup

    // Execute
    render(
        <MemoryRouter>
            <Client />
        </MemoryRouter>
    )

    // Assert

  })

})