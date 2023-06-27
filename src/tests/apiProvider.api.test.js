import { isRejected } from '@reduxjs/toolkit';
import axios from 'axios';

import apiProvider from '../providers/apiProvider'

jest.mock('axios')


describe('dataProvider', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getOne', () => {

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return status 200 and some data from the resource', async () => {

            // Setup

                // Resource being accessed
                const resource = 'recipes'

                // Resource ID
                const id = 1

                // Request parameters to send ( if any )
                const params = {
                    id
                }

                // The data returned from the API
                const mockedData = {
                    id: 1,
                    userId: 12,
                    name: 'Delectable strawberry Ice Cream',
                    description: 'Perfect British starwberries paired with creamy Cornish ice cream',
                    servings: 10,
                    calories_per_serving: 293,
                    prep_time: 10,
                    cook_time: 240,
                    rating: 9,
                    ingredients: [
                        { id: 1, ingredientId: 1, name: 'Strawberries', amount: 200, amount_type: 'grams' },
                        { id: 2, ingredientId: 2, name: 'Heavy whipping cream', amount: 2, amount_type: 'cups'},
                        { id: 3, ingredientId: 3, name: 'Condensed milk', amount: 14, amount_type: 'ounces'},
                        { id: 4, ingredientId: 4, name: 'Vanilla essence', amount: 1, amount_type: 'teaspoon'}
                    ],
                    steps: [
                        { id: 1, stepNo: 1, content: 'Whip the cream until stiff peaks appear.'},
                        { id: 2, stepNo: 2, content: 'Whisk the vanilla with the condensed milk.'},
                        { id: 3, stepNo: 3, content: 'Slowly fold the whiupped cream and incoporate the two mixtures together.'},
                        { id: 4, stepNo: 4, content: 'Mix the strawberries directly into the cream mixuture.'},
                        { id: 5, stepNo: 5, content: 'Transfer to an insulated tub and freeze for 4-6 hours.'}
                    ],
                    categories: [
                        { id: 1, categoryId: 1, name: 'Desserts'},
                        { id: 2, categoryId: 2, name: 'Sweets'},
                    ],
                    cookbooks: [
                        { id: 1, cookbookId: 1, name: 'Delectable Desserts', description: 'Amazing desserts', image: null}
                    ]
                }
                axios.get.mockResolvedValue({ status: 200, data: mockedData })

                // Options used
                const axiosOptions = { headers: { "Content-type": "application/json"}}

            // Execute
                const response = await apiProvider.getOne(resource, params)
               
            // Assert

                // Check the API url used is good
                expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/${resource}/${params.id}`, axiosOptions)

                // Check we have the desired HTTP status for this request
                expect(response.status).toBe(200)
                
                // Check we have data returned from the function
                expect(response.data).not.toBe(null)
            
                // Extract out the data
                const data = response.data

                expect(typeof data.id).toBe('number')
                expect(data.id).toBe(mockedData.id)
                
                expect(typeof data.userId).toBe('number')
                expect(data.userId).toBe(mockedData.userId)

                expect(typeof data.name).toBe('string')
                expect(data.name).toEqual(mockedData.name)

                expect(typeof data.description).toBe('string')
                expect(data.description).toEqual(mockedData.description)

                expect(typeof data.servings).toBe('number')
                expect(data.servings).toBe(mockedData.servings)

                expect(typeof data.calories_per_serving).toBe('number')
                expect(data.calories_per_serving).toBe(mockedData.calories_per_serving)

                expect(typeof data.prep_time).toBe('number')
                expect(data.prep_time).toBe(mockedData.prep_time)

                expect(typeof data.cook_time).toBe('number')
                expect(data.cook_time).toBe(mockedData.cook_time)

                expect(typeof data.rating).toBe('number')
                expect(data.rating).toBe(mockedData.rating)

                expect(Array.isArray(data.ingredients)).toBe(true)
                expect(data.ingredients).toHaveLength(4)

                // Loop through the ingredients and test each entry
                let index = 0
                data.ingredients.forEach(ingredient => {

                    let expectedData = mockedData.ingredients[index]

                    expect(typeof ingredient.id).toBe('number')
                    expect(ingredient.id).toBe(expectedData.id)

                    expect(typeof ingredient.ingredientId).toBe('number')
                    expect(ingredient.ingredientId).toBe(expectedData.ingredientId)

                    expect(typeof ingredient.name).toBe('string')
                    expect(ingredient.name).toEqual(expectedData.name)

                    expect(typeof ingredient.amount).toBe('number')
                    expect(ingredient.amount).toBe(expectedData.amount)

                    expect(typeof ingredient.amount_type).toBe('string')
                    expect(ingredient.amount_type).toEqual(expectedData.amount_type)

                    index += 1
                })

                // Steps
                expect(Array.isArray(data.steps)).toBe(true)
                expect(data.steps).toHaveLength(5)

                index = 0
                data.steps.forEach(step => {

                    let expectedData = mockedData.steps[index]

                    expect(typeof step.id).toBe('number')
                    expect(step.id).toBe(expectedData.id)

                    expect(typeof step.stepNo).toBe('number')
                    expect(step.stepNo).toBe(expectedData.stepNo)

                    expect(typeof step.content).toBe('string')
                    expect(step.content).toEqual(expectedData.content)

                    index += 1

                })

                // Categories
                expect(Array.isArray(data.categories)).toBe(true)
                expect(data.categories).toHaveLength(2)

                index = 0
                data.categories.forEach(category => {

                    let expectedData = mockedData.categories[index]

                    expect(typeof category.id).toBe('number')
                    expect(category.id).toBe(expectedData.id)

                    expect(typeof category.categoryId).toBe('number')
                    expect(category.categoryId).toBe(expectedData.categoryId)

                    expect(typeof category.name).toBe('string')
                    expect(category.name).toEqual(expectedData.name)

                    index += 1
                })

                // Cookbooks
                expect(Array.isArray(data.cookbooks)).toBe(true)
                expect(data.cookbooks).toHaveLength(1)

                index = 0
                data.cookbooks.forEach(cookbook => {

                    const expectedData = mockedData.cookbooks[index]

                    expect(typeof cookbook.id).toBe('number')
                    expect(cookbook.id).toBe(expectedData.id)

                    expect(typeof cookbook.name).toBe('string')
                    expect(cookbook.name).toEqual(expectedData.name)

                    expect(typeof cookbook.description).toBe('string')
                    expect(cookbook.description).toEqual(expectedData.description)

                    expect(cookbook.image).toBe(null)

                    index += 1

                })

        })

        it('should return status 400 if the request parameters are undefined', async () => {

            // Setup

                // What are the values we expect to see
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined request parameter'

                // Resource being accessed
                const resource = 'recipes'

                // Resource ID desired
                let id

                // Query params to send
                const params = null

                // Mocked return data
                const returnData = {}

            // Execute
            const response = await apiProvider.getOne(resource, params)

            // Assert

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toEqual(expectedMessage)

        })

        it('should return status 400 if the resource id is undefined', async () => {

            // Setup

                // What are the values we expect to see
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined id'

                // Resource being accessed
                const resource = 'recipes'

                // Resource ID desired
                let id

                // Query params to send
                const params = {
                    
                }

                // Mocked return data
                const returnData = {}
                

            // Execute
            const response = await apiProvider.getOne(resource, params)

            // Assert
            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toEqual(expectedMessage)

        })

        it('should return status 404 if no resource matched supplied id', async () => {

            // Setup

                // What are the values we expect to see
                const expectedStatus = 404
                const expectedSuccess = false
                const expectedMessage = 'No recipe found matching supplied id'

                // Resource being accessed
                const resource = 'recipes'

                // Resource ID desired
                let id = 123456

                // Query params to send
                const params = {
                    id
                }

                // Mocked return data
                const returnData = {
                    status: 404,
                    success: false,
                    message: 'No recipe found matching supplied id'
                }
                axios.get.mockResolvedValueOnce({
                    status: 404,
                    data: returnData
                })

            // Execute
            const response = await apiProvider.getOne(resource, params)
            
            // Assert
            expect(response.status).toBe(404)
            expect(Array.isArray(response.data)).toBe(false)

            const data = response.data

            expect(typeof data.status).toBe('number')
            expect(data.status).toBe(expectedStatus)

            expect(typeof data.success).toBe('boolean')
            expect(data.success).toBe(expectedSuccess)

            expect(typeof data.message).toBe('string')
            expect(data.message).toEqual(expectedMessage)

        })

        it('should return status 500 for any other issue', async () => {

            // Setup

                // Set what values we expect to be returned to us
                const expectedStatus = 500
                const expectedSuccess = false
                const expectedMessage = 'There was a problem with the resource, please try again later'

                // Set the resource we will be accessing on the API
                const resource = 'recipes' 

                // Resource ID desired
                let id = 123456

                // Query params to send
                const params = {
                    id
                }

                // The return data from the API
                const returnData = {
                    status: 500,
                    success: false,
                    message: 'There was a problem with the resource, please try again later'
                }
                axios.get.mockResolvedValueOnce({
                    status: 500,
                    data: returnData
                })

            // Execute
                const response = await apiProvider.getOne(resource, params)
                console.log(response)
            // Assert
                expect(response.status).toBe(500)

                const data = response.data

                expect(typeof data.status).toBe('number')
                expect(data.status).toBe(expectedStatus)

                expect(typeof data.success).toBe('boolean')
                expect(data.success).toBe(expectedSuccess)

                expect(typeof data.message).toBe('string')
                expect(data.message).toEqual(expectedMessage)

        })

    })

})  