import React from 'react'
import { screen, waitFor, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import SearchResults from  '../components/Client/SearchResults/SearchResults'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

// Mock data to pass to the child components
const mockedData = [
    {
        id: 9,
        userId: 3,
        name: "Beans on toast",
        description: "World's tastiest snack",
        servings: 1,
        calories_per_serving: 246,
        prep_time: 5,
        cook_time: 10,
        rating: null,
        ingredients: [
            {
                id: 67,
                name: 'Bread',
                amount: 2,
                amount_type: 'slices'
            }
        ],
        cookbooks: [
            {
                id: 2,
                name: 'My Favourite Recipes'
            }
        ],
        steps: [
            {
                id: 38,
                stepNo: 1,
                content: 'Toast the bread in a toaster or under the grill'
            }
        ],
        categories: [
            {
                id: 6,
                name: 'Breakfast'
            }
        ],
        images: [
           {
            imageId: 36,
            source: '/public/test.img',
            title: 'Pot of baked beans',
            alt: null
           } 
        ]
    },
]

const mockedTerm = 'bread'

const mockedType = 'Recipes'

describe('SearchResults component', () => {

    it('should render the component', async () => {

        // Setup
        renderWithProviders(<SearchResults results={mockedData} terms={mockedTerm} searchType={mockedType} />)

        // Execute

        // Assert
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Results for Recipes containing bread/i })).toBeInTheDocument()

    })

    it('should display the child components', async () => {

        // Setup
        renderWithProviders(<SearchResults results={mockedData} terms={mockedTerm} searchType={mockedType} />)

        // Execute

        // Assert
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Results for Recipes containing bread/i })).toBeInTheDocument()

        let children = screen.getByRole('generic', { name: /card list/i })
        expect(within(children).getAllByRole('img')).toHaveLength(1)
        expect(within(children).getAllByRole('link')).toHaveLength(1)

        expect(within(children).getByText('Beans on toast')).toBeInTheDocument()
        expect(within(children).getByText('Breakfast')).toBeInTheDocument()        

    })

})