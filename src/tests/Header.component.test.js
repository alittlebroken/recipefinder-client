import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'

// Import components we are testing
import Header from '../components/Client/Header/Header'

describe('<Header />', () => {

  it('renders the component', async () => {
    
    // Setup

    // Execute
    render(<Header />)

    // Assert


  })

  it('has the header element', async () => {

    // Setup

    // Execute
    render(<Header />)

    // Assert
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByRole('banner')).toHaveClass('header-container')

    // Debug

  })

  it('contains the brand container', () => {

    // Setup

    // Execute
    render(<Header />)

    // Assert
    expect(screen.getByRole('brand')).toBeInTheDocument()
    expect(screen.getByRole('brand')).toHaveClass('brand-container')

  })

  it('displays the brand name', async () => {

    // Setup

    // execute
    render(<Header />)

    // Assert
    expect(screen.getByRole('generic', { name: /brand-name/i })).toBeInTheDocument()
    expect(screen.getByRole('generic', { name: /brand-name/i })).toHaveClass('brand-name')
    expect(screen.getByText('recipeFinder')).toBeInTheDocument()

  })

  it('displays the brand sub text', async () => {

    // Setup

    // execute
    render(<Header />)

    // Assert
    expect(screen.getByRole('brandsubtext')).toBeInTheDocument()
    expect(screen.getByText('Find your next favourite recipe')).toBeInTheDocument()

  })

  it('displays the navigation element', async () => {

    // Setup

    // Execute
    render(<Header />)

    // Assert
    expect(screen.getByRole('navigation')).toBeInTheDocument()
    expect(screen.getByRole('navigation')).toHaveClass('nav-container')

  })

  it('displays the navigation items', async () => {

    // Setup

    // Execute
    render(<Header />)

    // Assert
    expect(screen.getByRole('list')).toBeInTheDocument()
    expect(screen.getByRole('list')).toHaveClass('nav-list')
    
    expect(screen.getByText('Recipes')).toBeInTheDocument()
    expect(screen.getByText('Categories')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()

  })

  it('has rendered navigation links', async () => {

    // Setup

    // Execute
    render(<Header />)

    // Assert
    expect(screen.getByRole('link', { name: /recipe/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /recipe/i })).toHaveAttribute('href', '/recipes')

    expect(screen.getByRole('link', { name: /categories/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /categories/i })).toHaveAttribute('href', '/categories')

    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/login')

    expect(screen.getByRole('link', { name: /search/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /search/i })).toHaveAttribute('href', '/search')

  })

})
