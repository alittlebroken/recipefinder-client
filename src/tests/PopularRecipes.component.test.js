import React from 'react'
import { screen, within  } from '@testing-library/react'

// Import custom render function
import { renderWithProviders } from '../utils/test.utils'

// Import components being tested
import PopularRecipes from '../components/Client/PopularRecipes/PopularRecipes'

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

describe('LatestRecipes component', () => {

    it("renders the component", async () => {

        // render the component
        renderWithProviders(<PopularRecipes records={mockedData} />)

        // Asserts
        expect(screen).toBeDefined()
        expect(screen.getByRole('heading', { name: /Popular Recipes/i })).toBeInTheDocument()

        // Check the child components
        let children = screen.getByRole('generic', { name: /card list/i })

        expect(within(children).getAllByRole('img')).toHaveLength(1)
        expect(within(children).getAllByRole('link')).toHaveLength(1)
        expect(within(children).getByText('Beans on toast')).toBeInTheDocument()

        expect(within(children).getByText('Breakfast')).toBeInTheDocument()
        
    })

    xit("Skeleton test", async () => {

        // render the component
        renderWithProviders(<PopularRecipes records={mockedData} />)
        
        // Setup
        const latestRecipes = screen.getByRole('generic', { name: /recipes-Container/i })

        // Asserts
        expect(screen).toBeDefined()
       
    })

})