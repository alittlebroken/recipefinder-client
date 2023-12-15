import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

import Categories from '../components/Client/Categories/Categories'

/* Mocking the react router navigation functions */
import * as router from 'react-router'
const navigate = jest.fn()

describe('Categories', () => {

    beforeAll(() => {
        jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('should render the component', async () => {

        renderWithProviders(<Categories />)

        const pageHeading = screen.getByRole('heading', { level: 2})
        const list = screen.getByRole('generic', { name: /List of categories/i })
        const categories = within(list).getAllByRole('generic', { name: /category container/i })

        expect(screen).tobeDefined()
        expect(pageHeading).toBeDefined()
        expect(list).toBeDefined()
        expect(categories).toHaveLength(4)

        expect(pageHeading).toHaveTextContent('Categories')

        expect(categories[0]).toHaveTextContent('Vegetarian')
        expect(categories[1]).toHaveTextContent('Dairy Free')
        expect(categories[2]).toHaveTextContent('Gluten Free')
        expect(categories[3]).toHaveTextContent('Vegan')
        

    })

    it('should redirect to the recipes page with the correct category when clicked', async () => {

        renderWithProviders(<Categories />)

        const list = screen.getByRole('generic', { name: /List of categories/i })
        const categories = within(list).getAllByRole('generic', { name: /category container/i })

        const link = within(categories[0]).getByRole('link')

        expect(screen).toBeDefined()
        expect(list).toBeDefined()
        expect(categories).toHaveLength(4)

        userEvent.click(link)
        expect(navigate).toHaveBeenCalledWith('/recipes/vegetarian')

        
    })

})
