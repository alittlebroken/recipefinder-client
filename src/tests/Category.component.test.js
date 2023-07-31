/* Import React */
import * as React from 'react'

/* Import test suite */
import { render, screen, within } from '@testing-library/react'

/* Import in the component being tested */
import Category from '../components/Client/Category/Category'

describe('Recipe component', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the component', async () => {

        /* Setup */

        /* Execute */
        render(<Category />)

        /* Test */
        expect(screen).toBeDefined()

        const children = screen.getByRole('generic', { name: /card-container/i })

        expect(within(children).getAllByRole('heading')).toHaveLength(1)
        expect(within(children).getAllByRole('paragraph')).toHaveLength(1)
        
    })



})