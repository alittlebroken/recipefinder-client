/* Import React */
import * as React from 'react'

/* Import test suite */
import { render, screen, within } from '@testing-library/react'

/* Import in the component being tested */
import Recipe from '../components/Client/Recipe/Recipe'

describe('Recipe component', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    it('should render the component', async () => {

        /* Setup */

        /* Execute */
        render(<Recipe />)

        /* Test */
        expect(screen).toBeDefined()

    })

    

})