import axios from 'axios';

import authProvider from '../providers/authProvider'

import inMemoryJWT from '../utils/auth.utils';

jest.mock('axios')

describe('authProvider', () => {

    afterEach(() => {
        jest.resetAllMocks()
    })

    describe('login', () => {

        afterEach(() => {
            jest.resetAllMocks()
        })

        it('should return status 200, return a auth token indicating the user is logged in', async () => {

            // Setup

                // The users login name
                const userLogin = 'auser@company.co.uk'

                // The users password
                const userPassword = 'R1ck3tyR1ck$'

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 200,
                    data: {
                        accessToken: '645623452345-345345234534-345234534534'
                    }
                })

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        "Content-type": "application/json",
                    }
                }

                // Set the expected return values
                const expectedStatus = 200
                const expectedSuccess = true
                const expectedMessage = 'Login successful'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/login`
                const expectedToken = '645623452345-345345234534-345234534534'

            // Execute
            const response = await authProvider.login(userLogin, userPassword)

            // Assert
            expect(axios.post).toHaveBeenCalledWith(expectedUrl, { username: userLogin, password: userPassword}, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

            expect(typeof response.token).toBe('string')
            expect(response.token).toEqual(expectedToken)

        })

        it('should return status 400 if username is missing', async () => {

            // Setup

                // The users login name
                let userLogin

                // The users password
                const userPassword = 'R1ck3tyR1ck$'

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Undefined username'
                    }
                })

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        "Content-type": "application/json",
                    }
                }

                // Set the expected return values
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined username'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/login`

            // Execute
            const response = await authProvider.login(userLogin, userPassword)

            // Assert
            //expect(axios.post).toHaveBeenCalledWith(expectedUrl, { username: userLogin, password: userPassword}, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 400 if the username is of the wrong format', async () => {

            // Setup

                // The users login name
                const userLogin = 123456789

                // The users password
                const userPassword = 'R1ck3tyR1ck$'

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Wrong format for username'
                    }
                })

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }

                // Set the expected return values
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Wrong format for username'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/login`

            // Execute
            const response = await authProvider.login(userLogin, userPassword)

            // Assert
            //expect(axios.post).toHaveBeenCalledWith(expectedUrl, { username: userLogin, password: userPassword}, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 400 if password is missing', async () => {

            // Setup

                // The users login name
                const userLogin = 'auser@company.co.uk'

                // The users password
                let userPassword

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Undefined password'
                    }
                })

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        "Content-type": "application/json",
                    },
                }

                // Set the expected return values
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Undefined password'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/login`

            // Execute
            const response = await authProvider.login(userLogin, userPassword)

            // Assert
            //expect(axios.post).toHaveBeenCalledWith(expectedUrl, { username: userLogin, password: userPassword}, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return 400 if the password is of the wrong format', async () => {

            // Setup

                // The users login name
                const userLogin = 'auser@company.co.uk'

                // The users password
                const userPassword = 5389457398

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 400,
                    data: {
                        status: 400,
                        success: false,
                        message: 'Wrong format for password'
                    }
                })

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        "Content-type": "application/json"
                    },
                }

                // Set the expected return values
                const expectedStatus = 400
                const expectedSuccess = false
                const expectedMessage = 'Wrong format for password'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/login`

            // Execute
            const response = await authProvider.login(userLogin, userPassword)

            // Assert
            //expect(axios.post).toHaveBeenCalledWith(expectedUrl, { username: userLogin, password: userPassword}, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 404 if the specified user does not exist', async () => {

            // Setup

                // The users login name
                const userLogin = 'usernothere@company.co.uk'

                // The users password
                const userPassword = 'R1ck3tyR1ck$'

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 404,
                    data: {
                        status: 404,
                        success: false,
                        message: 'User not found'
                    }
                })

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        "Content-type": "application/json"
                    },
                }

                // Set the expected return values
                const expectedStatus = 404
                const expectedSuccess = false
                const expectedMessage = 'User not found'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/login`

            // Execute
            const response = await authProvider.login(userLogin, userPassword)

            // Assert
            expect(axios.post).toHaveBeenCalledWith(expectedUrl, { username: userLogin, password: userPassword}, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 409 if the users password is incorrect', async () => {

            // Setup

                // The users login name
                const userLogin = 'auser@company.co.uk'

                // The users password
                const userPassword = 'R1ck3tyR1ck$'

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 409,
                    data: {
                        status: 409,
                        success: false,
                        message: 'Specified password is incorrect'
                    }
                })

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        "Content-type": "application/json"
                    },
                }

                // Set the expected return values
                const expectedStatus = 409
                const expectedSuccess = false
                const expectedMessage = 'Specified password is incorrect'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/login`

            // Execute
            const response = await authProvider.login(userLogin, userPassword)

            // Assert
            expect(axios.post).toHaveBeenCalledWith(expectedUrl, { username: userLogin, password: userPassword}, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 500 for any other issues', async () => {

            // Setup

                // The users login name
                const userLogin = 'auser@company.co.uk'

                // The users password
                const userPassword = 'R1ck3tyR1ck$'

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 500,
                    data: {
                        status: 500,
                        success: false,
                        message: 'There was a problem with the resource, please try again later'
                    }
                })

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        "Content-type": "application/json"
                    },
                }

                // Set the expected return values
                const expectedStatus = 500
                const expectedSuccess = false
                const expectedMessage = 'There was a problem with the resource, please try again later'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/login`

            // Execute
            const response = await authProvider.login(userLogin, userPassword)

            // Assert
            //expect(axios.post).toHaveBeenCalledWith(expectedUrl, { username: userLogin, password: userPassword}, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

    })

    describe('logout', () => {

        afterEach(() => {
            jest.clearAllMocks()
        })

        it('should return status 200 and logout the user', async () => {

            // Setup

                // Mock/Spy on the inMemoryToken
                jest.spyOn(inMemoryJWT, 'getToken').mockImplementation(() => {
                    return '645623452345-345345234534-345234534534'
                })

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 200,
                    data: {
                    status: 200,
                    success: true,
                    message: 'Successfully logged out'
                }})

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        token: '645623452345-345345234534-345234534534',
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }

                // Set the expected return values
                const expectedStatus = 200
                const expectedSuccess = true
                const expectedMessage = 'Successfully logged out'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/logout`
                const expectedToken = '645623452345-345345234534-345234534534'

            // Execute
            const response = await authProvider.logout()

            // Assert
            expect(axios.post).toHaveBeenCalledWith(expectedUrl, { action: "logout" }, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 404 if the refresh token is missing', async () => {

            // Setup

                // Mock/Spy on the inMemoryToken
                jest.spyOn(inMemoryJWT, 'getToken').mockImplementation(() => {
                    return '645623452345-345345234534-345234534534'
                })

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                    status: 404,
                    data: {
                    status: 404,
                    success: false,
                    message: 'Missing refresh token'
                }})

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        token: '645623452345-345345234534-345234534534',
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }

                // Set the expected return values
                const expectedStatus = 404
                const expectedSuccess = false
                const expectedMessage = 'Missing refresh token'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/logout`
                const expectedToken = '645623452345-345345234534-345234534534'

            // Execute
            const response = await authProvider.logout()

            // Assert
            expect(axios.post).toHaveBeenCalledWith(expectedUrl, { action: "logout" }, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

        it('should return status 500 for any other issues encountered by the resource', async () => {

            // Setup

                 // Mock/Spy on the inMemoryToken
                 jest.spyOn(inMemoryJWT, 'getToken').mockImplementation(() => {
                    return '645623452345-345345234534-345234534534'
                })

                // Mock the axios return data
                axios.post.mockResolvedValueOnce({
                  status: 500,
                  data: {
                    status: 500,
                    success: false,
                    message: 'There was a problem with the resource, please try again later'
                }})

                // Options used by Axios
                const axiosOptions = {
                    headers: {
                        token: '645623452345-345345234534-345234534534',
                        "Content-type": "application/json",
                    },
                    withCredentials: true,
                }

                // Set the expected return values
                const expectedStatus = 500
                const expectedSuccess = false
                const expectedMessage = 'There was a problem with the resource, please try again later'
                const expectedUrl = `${process.env.REACT_APP_API_URL}/auth/logout`
                const expectedToken = '645623452345-345345234534-345234534534'

            // Execute
            const response = await authProvider.logout()

            // Assert
            expect(axios.post).toHaveBeenCalledWith(expectedUrl, { action: "logout" }, axiosOptions)

            expect(typeof response.status).toBe('number')
            expect(response.status).toBe(expectedStatus)

            expect(typeof response.success).toBe('boolean')
            expect(response.success).toBe(expectedSuccess)

            expect(typeof response.message).toBe('string')
            expect(response.message).toBe(expectedMessage)

        })

    })

})