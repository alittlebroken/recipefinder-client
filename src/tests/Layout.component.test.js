import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

// Import components we are testing
import Layout from '../components/Layout/Layout'

describe('<Layout />', () => {

  it('renders the component', async () => {
    
    // Setup

    // Execute
    render(<Layout />)

    // Assert

  })

  it('renders the header content that will contain the nav and brand', async () => {

    // Setup

    // Execute
    render(<Layout />)

    // Assert
    expect(screen.getByRole('banner', { name: 'site-header'})).toBeInTheDocument()

  })

  it('renders the main tag containing the content', () => {

    // Setup

    // Execute
    render(<Layout />)

    // Assert
    expect(screen.getByRole('main', { name: 'site-content' })).toBeInTheDocument()

  })

})