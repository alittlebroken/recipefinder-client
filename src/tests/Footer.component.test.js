/* Import Components to test and supporting libraries */
import Footer from '../components/Client/Footer/Footer'

/* Import React */
import * as React from 'react'

/* Import test suite */
import { render, screen, within } from '@testing-library/react'

describe('Footer', () => {

    it('should render the Footer component', async () => {

        // Setup

        // Execute
        render(<Footer />)

        // Assert
        expect(screen.getByRole('contentinfo')).toBeInTheDocument()
        expect(screen.getByRole('contentinfo')).toHaveClass('footer-container')

    })

    it('should contain a section container', async () => {

        // Setup

        // Execute
        render(<Footer />)

        // Assert
        expect(screen.getByRole('generic', { name: /footerSection/i})).toBeInTheDocument()
        expect(screen.getByRole('generic', { name: /footerSection/i})).toHaveClass('footer-section-container')

    })

    it('should have a brand section to the footer', async () => {

        // Setup

        // Execute
        render(<Footer />)

        // Assert
        expect(screen.getByRole('generic', { name: /footerbrand/i })).toBeInTheDocument()
        expect(screen.getByRole('generic', { name: /footerbrand/i })).toHaveClass('footer-brand-container')

    })

    it('should display the brand name', async () => {

        // Setup


        // Execute
        render(<Footer />)

        // Assert
        expect(screen.getByText(/recipe finder/i)).toBeInTheDocument()

    })

    it('should display the brand social media icons', async () => {

        // Setup

        // Execute
        render(<Footer />)

        // Assert
        expect(screen.getByRole('generic', { name: /socialMediaBadges/i})).toBeInTheDocument()
        const socialBadges = screen.getByRole('generic', { name: /socialMediaBadges/i})
        expect(socialBadges).toHaveClass('footer-social-container')
        
        expect(within(socialBadges).getByRole('generic',  { name: /facebookBadge/i})).toBeInTheDocument()
        expect(within(socialBadges).getByRole('generic',  { name: /facebookBadge/i})).toHaveClass('badge')
        expect(within(socialBadges).getByRole('link',  { name: /f/i})).toHaveAttribute('href', 'https://www.facebook.com/recipefinder')

        expect(within(socialBadges).getByRole('generic',  { name: /instagramBadge/i})).toBeInTheDocument()
        expect(within(socialBadges).getByRole('generic',  { name: /instagramBadge/i})).toHaveClass('badge')
        expect(within(socialBadges).getByRole('link',  { name: /ig/i})).toHaveAttribute('href', 'https://www.instagram.com/recipe-finder')

    })

    it('should display the sitemap section', async () => {


        // Setup

        // Execute
        render(<Footer />)

        //Assert
        expect(screen.getByRole('presentation', {name: /footerSitemap/i})).toBeInTheDocument()
        const footerSitemap = screen.getByRole('presentation', { name: /footerSitemap/i})
        expect(footerSitemap).toHaveClass('sitemap-container')

        expect(within(footerSitemap).getByRole('heading', { name: /Sitemap/i })).toBeInTheDocument()

        expect(within(footerSitemap).getByText(/home/i)).toBeInTheDocument()
        expect(within(footerSitemap).getByText(/home/i)).toHaveAttribute('href', '/')

        expect(within(footerSitemap).getByRole('link', { name: /^recipes$/i })).toBeInTheDocument()

        expect(within(footerSitemap).getByText(/about/i)).toBeInTheDocument()
        expect(within(footerSitemap).getByText(/about/i)).toHaveAttribute('href', '/about')

        expect(within(footerSitemap).getByRole('link', { name: /Recipes/i })).toBeInTheDocument()
        expect(within(footerSitemap).getByRole('link', { name: /Recipes/i })).toHaveAttribute('href', '/recipes')

        expect(within(footerSitemap).getByText(/categories/i)).toBeInTheDocument()
        expect(within(footerSitemap).getByText(/categories/i)).toHaveAttribute('href', '/categories')

        expect(within(footerSitemap).getByText(/ingredients/i)).toBeInTheDocument()
        expect(within(footerSitemap).getByText(/ingredients/i)).toHaveAttribute('href', '/ingredients')

        expect(within(footerSitemap).getByText(/contact/i)).toBeInTheDocument()
        expect(within(footerSitemap).getByText(/contact/i)).toHaveAttribute('href', '/contact')

    })

    it('should display the Recipe footer section', async () => {

        // Setup

        // Execute
        render(<Footer />)

        // Assert
        expect(screen.getByRole('presentation', { name: /footerRecipes/i })).toBeInTheDocument()
        const footerRecipes = screen.getByRole('presentation', { name: /footerRecipes/i})
        expect(footerRecipes).toHaveClass('sitemap-container')

        expect(within(footerRecipes).getByRole('heading', { name: /Recipes/i })).toBeInTheDocument()
        
        expect(within(footerRecipes).getByText(/index/i)).toBeInTheDocument()
        expect(within(footerRecipes).getByText(/index/i)).toHaveAttribute('href', '/recipes')

        expect(within(footerRecipes).getByText(/vegan recipes/i)).toBeInTheDocument()
        expect(within(footerRecipes).getByText(/vegan recipes/i)).toHaveAttribute('href', '/recipes/vegan')

        expect(within(footerRecipes).getByText(/dairy free recipes/i)).toBeInTheDocument()
        expect(within(footerRecipes).getByText(/dairy free recipes/i)).toHaveAttribute('href', '/recipes/dairyfree')

        expect(within(footerRecipes).getByText(/quick recipes/i)).toBeInTheDocument()
        expect(within(footerRecipes).getByText(/quick recipes/i)).toHaveAttribute('href', '/recipes/quick')

        expect(within(footerRecipes).getByText(/microwave recipes/i)).toBeInTheDocument()
        expect(within(footerRecipes).getByText(/microwave recipes/i)).toHaveAttribute('href', '/recipes/microwave')

        expect(within(footerRecipes).getByText(/air fryer recipes/i)).toBeInTheDocument()
        expect(within(footerRecipes).getByText(/air fryer recipes/i)).toHaveAttribute('href', '/recipes/airfryer')


    } )

    it('should display the find section', async () => {

        // Setup

        // Execute
        render(<Footer />)

        // Assert
        expect(screen.getByRole('presentation', { name: /footerSearch/i })).toBeInTheDocument()
        expect(screen.getByRole('presentation', { name: /footerSearch/i })).toHaveClass('footer-search-container')
        const footerSearch = screen.getByRole('presentation', { name: /footerSearch/i })

        expect(within(footerSearch).getByText('Find')).toBeInTheDocument()
        expect(within(footerSearch).getByRole('searchbox', { name: /find/i })).toBeInTheDocument()

        expect(within(footerSearch).getByRole('button', { name: /go/i })).toBeInTheDocument()

    })

})