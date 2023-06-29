import { isRejected } from '@reduxjs/toolkit';
import axios from 'axios';

import apiProvider from '../providers/apiProvider'

jest.mock('axios')


describe('apiProvider', () => {

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

    describe('getList', () => {

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return status 200 and a list of items from the specified resource', async () => {

            // Setup

                // Expected data to be returned from the method being tested
                const expectedStatus = 200
                const expectedSuccess = true
                const expectedMessage = ''
                const expectedData = [
                    { id: 1, name: "Breakfast", created_at: "2023-06-27T12:33:00000Z", updated_at: "2023-006-27T12:33:00000Z"},
                    { id: 2, name: "Lunch", created_at: "2023-06-28T12:33:00000Z", updated_at: "2023-006-28T12:33:00000Z"},
                    { id: 3, name: "Dinner", created_at: "2023-06-29T12:33:00000Z", updated_at: "2023-006-29T12:33:00000Z"},
                ]
                const expectedParams = {page:1,limit:10,sort_by:"id",sort_direction:"asc"}

                // Data being returned from Axios
                const axiosMockData = expectedData
                axios.get.mockResolvedValueOnce({
                    status: 200,
                    data: axiosMockData
                })

                // Data for the various parameters
                const params = {
                    pagination: {
                        page: 1,
                        perPage: 10
                    },
                    sort: {
                        field: 'id',
                        order: 'asc'
                    }
                }

                // The resource we wish to access
                const resource = 'categories'

                // Options used by axios for the request
                const axiosOptions = { headers: { "Content-type": "application/json"}}

            // Execute
            const response = await apiProvider.getList(resource, params)

            // Assert

            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/${resource}?${JSON.stringify(expectedParams)}`, axiosOptions)

            expect(response.status).toBe(200)

            expect(response.data).not.toBe(null)
            const data = response.data
            expect(Array.isArray(data)).toBe(true)
            expect(data).toHaveLength(3)

            let index = 0
            data.forEach(category => {

                expect(typeof data[index].id).toBe('number')
                expect(data[index].id).toBe(expectedData[index].id)

                expect(typeof data[index].name).toBe('string')
                expect(data[index].name).toBe(expectedData[index].name)

                expect(typeof data[index].created_at).toBe('string')
                expect(data[index].created_at).toBe(expectedData[index].created_at)

                expect(typeof data[index].updated_at).toBe('string')
                expect(data[index].updated_at).toBe(expectedData[index].updated_at)

                index += 1
            })


        })

        it('should return status 404 if the resorce has no items to return', async () => {

            // Setup

                // The expected results
                const expectedStatus = 404
                const expectedSuccess = false
                const expectedMessage = "There are no categories to return"
                const expectedData = []
                const expectedParams = {page:1,limit:10,sort_by:"id",sort_direction:"asc"}

                // Resource being accessed
                const resource = 'categories'

                // Data being returned from axios
                axios.get.mockResolvedValueOnce({
                    status: 404,
                    data: {
                        status: 404,
                        success: false,
                        message: expectedMessage
                    }
                })


                // Data for the various parameters
                const params = {
                    pagination: {
                        page: 1,
                        perPage: 10
                    },
                    sort: {
                        field: 'id',
                        order: 'asc'
                    }
                }

                // Options used by axios for the request
                const axiosOptions = { headers: { "Content-type": "application/json"}}

            // Execute
            const response = await  apiProvider.getList(resource, params)

            // Assert
            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/${resource}?${JSON.stringify(expectedParams)}`, axiosOptions)
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toEqual(expectedMessage)

        })

        it('should return status 500 if the resource encounters any other error', async () => {

            // Setup

                // Expected return values
                const expectedStatus = 500
                const expectedSuccess = false
                const expectedMessage = 'There was a problem with the resource, please try again later'
                const expectedData = []
                const expectedParams = {page:1,limit:10,sort_by:"id",sort_direction:"asc"}

                // Resource being accessed
                const resource = 'categories'

                // Data being returned from axios
                axios.get.mockResolvedValueOnce({
                    status: 500,
                    data: {
                        status: 500,
                        success: false,
                        message: expectedMessage
                    }
                })

                // params to use
                const params = {
                    pagination: {
                        page: 1,
                        perPage: 10
                    },
                    sort: {
                        field: 'id',
                        order: 'asc'
                    }
                }

                // Options used by axios for the request
                const axiosOptions = { headers: { "Content-type": "application/json"}}

            // Execute
            const response = await apiProvider.getList(resource, params)

            // Assert
            expect(axios.get).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/${resource}?${JSON.stringify(expectedParams)}`, axiosOptions)
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

    })

    describe('removeOne', () => {

        afterEach(()=> {
            jest.clearAllMocks()
        })

        it('should return status 200 and delete the requested item from the resource', async () => {

            // Setup

                // Resource we are accessing on the API
                const resource = 'ingredients'

                // Id used to identify the item in the specified resource
                const id = 12

                // Params to pass to the method
                const params = { id }

                // Options to pass to axios
                const axiosOptions = { headers: { 'Content-type': 'application/json'}}

                // Mock the axios return data
                axios.delete.mockResolvedValueOnce({
                    status: 200,
                    data: {
                        status: 200,
                        success: true,
                        message: 'Ingredient successfully removed'
                    }
                })

                // Expected return data
                const expectedStatus = 200
                const expectedSuccess = true
                const expectedMessage = 'Ingredient successfully removed'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

            // Execute
            const response = await apiProvider.removeOne(resource, params)

            // Assert
            expect(axios.delete).toHaveBeenCalledWith(expectedUrl, axiosOptions)
            
        
            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 400 if the request params are undefined', async () => {

            // Setup

                // Set the resource being targeted
                const resource = 'ingredients'

                // Set the identifier of the item to be removed from the specified resource
                const id = 12

                // Set the parameters to be used in the request
                let params

                // Set the options to be passed to axios
                const axiosOptions = { headers: { "content-type": 'application.json'}}

                // Set the mock return value for axios
                axios.delete.mockResolvedValueOnce({})

                // Set the return values we expect to recieve from the api
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined request parameters'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

            // Execute
            const response = await apiProvider.removeOne(resource, params)

            // Assert

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 400 if the id is missing', async () => {

            // Setup

                // Set the resource being targeted
                const resource = 'ingredients'

                // Set the identifier of the item to be removed from the specified resource
                let id

                // Set the parameters to be used in the request
                const params = { id }

                // Set the options to be passed to axios
                const axiosOptions = { headers: { "content-type": 'application.json'}}

                // Set the mock return value for axios
                axios.delete.mockResolvedValueOnce({})

                // Set the return values we expect to recieve from the api
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined id'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

            // Execute
            const response = await apiProvider.removeOne(resource, params)

            // Assert

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 500 if resource encounters any other issues', async () => {

            // Setup

                // Set the resource being targeted
                const resource = 'ingredients'

                // Set the identifier of the item to be removed from the specified resource
                let id = 12

                // Set the parameters to be used in the request
                const params = { id }

                // Set the options to be passed to axios
                const axiosOptions = { headers: { "Content-type": 'application/json'}}

                // Set the mock return value for axios
                axios.delete.mockResolvedValueOnce({
                    status: 500,
                    data: {
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later'
                    }
                })

                // Set the return values we expect to recieve from the api
                const expectedStatus = 500
                const expectedSuccess = false
                const expectedMessage = 'There was a problem with the resource, please try again later'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

            // Execute
            const response = await apiProvider.removeOne(resource, params)

            // Assert
            expect(axios.delete).toHaveBeenCalledWith(expectedUrl, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

    })

    describe('removeAll', () => {

        afterEach(() => {
            jest.resetAllMocks()
        })

        it('should return status 200 and remove all records for a resource', async () => {

            // Setup

                // Resource name
                const resource = 'ingredients'

                // Parameters to be passed to the method
                const params = {}

                // Options for Axios
                const axiosOptions = { headers: { "Content-type": "application/json" }}

                // Mock the return data from axios
                axios.delete.mockResolvedValueOnce({
                    status: 200,
                    data: {
                        status: 200,
                        success: true,
                        message: "All ingredients removed successfully",
                        count: 12
                    }
                })

                // Set the expected return values
                const expectedStatus = 200
                const expectedSuccess = true
                const expectedMessage = 'All ingredients removed successfully'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}`

            // Execute
            const response = await apiProvider.removeAll(resource, params)

            // Assert
            expect(axios.delete).toHaveBeenCalledWith(expectedUrl, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 404 if it finds no records to delete', async () => {

            // Setup

                // Resource name
                const resource = 'ingredients'

                // Parameters to be passed to the method
                const params = {}

                // Options for Axios
                const axiosOptions = { headers: { "Content-type": "application/json" }}

                // Mock the return data from axios
                axios.delete.mockResolvedValueOnce({
                    status: 404,
                    data: {
                        count: 0
                    }
                })

                // Set the expected return values
                const expectedStatus = 404
                const expectedSuccess = false
                const expectedMessage = 'There are no records to delete'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}`

            // Execute
            const response = await apiProvider.removeAll(resource, params)

            // Assert
            expect(axios.delete).toHaveBeenCalledWith(expectedUrl, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 500 if there is any other problem', async () => {

            // Setup

                // Resource name
                const resource = 'ingredients'

                // Parameters to be passed to the method
                const params = {}

                // Options for Axios
                const axiosOptions = { headers: { "Content-type": "application/json" }}

                // Mock the return data from axios
                axios.delete.mockResolvedValueOnce({
                    status: 500,
                    data: {
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later'
                    }
                })

                // Set the expected return values
                const expectedStatus = 500
                const expectedSuccess = false
                const expectedMessage = 'There was a problem with the resource, please try again later'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}`

            // Execute
            const response = await apiProvider.removeAll(resource, params)

            // Assert
            expect(axios.delete).toHaveBeenCalledWith(expectedUrl, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

    })

    describe('create', () => {

       afterEach(() => {
        jest.resetAllMocks()
       }) 

       it('should return status 200 and create a new record within the resource', async () => {

            // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource
                // Set the payload for this particular resource
                const params = {
                    payload: {
                        name: "Snacks"
                    }
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.post.mockResolvedValueOnce({
                    status: 200,
                    data: {
                        status: 200,
                        success: true,
                        message: 'Category successfully added'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 200
                const expectedSuccess = true
                const expectedMessage = 'Category successfully added'
                const expectedParams = JSON.stringify({payload: { name: "Snacks" }})
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}`

            // Execute
            const response = await apiProvider.create(resource, params)

            // Assert 
            expect(axios.post).toHaveBeenCalledWith(`${expectedUrl}`, params.payload, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

       })

       it('should return status 400 if the payload is missing', async () => {

            // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource
                // Set the payload for this particular resource
                const params = {}

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.post.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Undefined payload'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined payload'

            // Execute
            const response = await apiProvider.create(resource, params)

            // Assert 

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage) 

       })

       it('should return status 400 if category name is undefined', async () => {

            // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource
                // Set the payload for this particular resource
                const params = {
                    payload: {
                        
                    }
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.post.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Undefined category name'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined category name'
                const expectedParams = JSON.stringify({payload: { }})
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}`

            // Execute
            const response = await apiProvider.create(resource, params)

            // Assert

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

       })

       it('should return status 400 if category name is of the wrong type', async () => {

        // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource
                // Set the payload for this particular resource
                const params = {
                    payload: {
                        name: 123
                    }
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.post.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Wrong format for category name'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Wrong format for category name'
                const expectedParams = JSON.stringify({payload: { name: "Snacks" }})
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}`

            // Execute
            const response = await apiProvider.create(resource, params)

            // Assert 

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

       })

       it('should return status 500 for any other error', async () => {

        // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource
                // Set the payload for this particular resource
                const params = {
                    payload: {
                        name: "Snacks"
                    }
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.post.mockResolvedValueOnce({
                    status: 500,
                    data: {
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 500
                const expectedSuccess = false
                const expectedMessage = 'There was a problem with the resource, please try again later'
                const expectedParams = JSON.stringify({payload: { name: "Snacks" }})
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}`

            // Execute
            const response = await apiProvider.create(resource, params)

            // Assert

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

       })

    })

    describe('update', () => {

        afterEach(() => {
            jest.clearAllMocks()
        })

        it('should return status 200 and update the specified resources record', async () => {

            // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource

                // Id of the record being updated
                const id = 1265

                // Set the payload for this particular resource
                const params = {
                    id, 
                    payload: {
                        name: "Gluten Free"
                    }
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.put.mockResolvedValueOnce({
                    status: 200,
                    data: {
                        status: 200,
                        success: true,
                        message: 'Category successfully updated'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 200
                const expectedSuccess = true
                const expectedMessage = 'Category successfully updated'
                const expectedParams = JSON.stringify({ id: 1265})
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

                // Execute
                const response = await apiProvider.update(resource, params)
                
                // Assert
                expect(axios.put).toHaveBeenCalledWith(expectedUrl, params.payload, axiosOptions)

                expect(typeof response.status).toBe('number')
                expect(response.status).toBe(expectedStatus)

                expect(typeof response.success).toBe('boolean')
                expect(response.success).toBe(expectedSuccess)

                expect(typeof response.message).toBe('string')
                expect(response.message).toBe(expectedMessage)

            })

            it('should return status 400 if the request parameters are missing', async () => {

                // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource

                // Id of the record being updated
                const id = 1265

                // Set the payload for this particular resource
                let params

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.put.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Undefined request parameter'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined request parameter'
                const expectedParams = JSON.stringify({ id: 1265})
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

                // Execute
                const response = await apiProvider.update(resource, params)

                // Assert

                expect(typeof response.status).toBe('number')
                expect(response.status).toBe(expectedStatus)

                expect(typeof response.success).toBe('boolean')
                expect(response.success).toBe(expectedSuccess)

                expect(typeof response.message).toBe('string')
                expect(response.message).toBe(expectedMessage)

            })

            it('should return status 400 if category id is missing', async () => {

                // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource

                // Id of the record being updated
                let id

                // Set the payload for this particular resource
                const params = {
                    payload: { name: "Air Fryer" }
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.put.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Undefined category id'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined category id'
                const expectedParams = JSON.stringify()
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

                // Execute
                const response = await apiProvider.update(resource, params)

                // Assert

                expect(typeof response.status).toBe('number')
                expect(response.status).toBe(expectedStatus)

                expect(typeof response.success).toBe('boolean')
                expect(response.success).toBe(expectedSuccess)

                expect(typeof response.message).toBe('string')
                expect(response.message).toBe(expectedMessage)

            })

            it('should return status 400 if the category name is missing', async () => {

                // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource

                // Id of the record being updated
                let id

                // Set the payload for this particular resource
                const params = {
                    id,
                    payload: {}
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.put.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Undefined category name'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined category name'
                const expectedParams = JSON.stringify()
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

                // Execute
                const response = await apiProvider.update(resource, params)

                // Assert

                expect(typeof response.status).toBe('number')
                expect(response.status).toBe(expectedStatus)

                expect(typeof response.success).toBe('boolean')
                expect(response.success).toBe(expectedSuccess)

                expect(typeof response.message).toBe('string')
                expect(response.message).toBe(expectedMessage)

            })

            it('should return status 400 if category name is in the wrong format', async () => {

                // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource

                // Id of the record being updated
                let id

                // Set the payload for this particular resource
                const params = {
                    id,
                    payload: {
                        name: 12345
                    }
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.put.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Wrong format for category name'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Wrong format for category name'
                const expectedParams = JSON.stringify()
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

                // Execute
                const response = await apiProvider.update(resource, params)

                // Assert

                expect(typeof response.status).toBe('number')
                expect(response.status).toBe(expectedStatus)

                expect(typeof response.success).toBe('boolean')
                expect(response.success).toBe(expectedSuccess)

                expect(typeof response.message).toBe('string')
                expect(response.message).toBe(expectedMessage)

            })

            it('should return status 500 for any other problems', async () => {

                // Setup
            
                // Resource being accessed
                const resource = 'categories'

                // Params to be sent to the resource

                // Id of the record being updated
                let id

                // Set the payload for this particular resource
                const params = {
                    id: 1265,
                    payload: {
                        name: "Sweets"
                    }
                }

                // Set the axios options
                const axiosOptions = { headers: {"Content-type": "application/json" }}

                // Mock the axios post request reponse
                axios.put.mockResolvedValueOnce({
                    status: 500,
                    data: {
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later'
                    }
                })

                // Expected return data from the method
                const expectedStatus = 500
                const expectedSuccess = false
                const expectedMessage = 'There was a problem with the resource, please try again later'
                const expectedParams = JSON.stringify()
                const expectedUrl = `${process.env.REACT_APP_API_URL}/${resource}/${id}`

                // Execute
                const response = await apiProvider.update(resource, params)

                // Assert

                expect(typeof response.status).toBe('number')
                expect(response.status).toBe(expectedStatus)

                expect(typeof response.success).toBe('boolean')
                expect(response.success).toBe(expectedSuccess)

                expect(typeof response.message).toBe('string')
                expect(response.message).toBe(expectedMessage)

            })

    })

})
 