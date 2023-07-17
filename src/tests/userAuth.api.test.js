import * as axios from 'axios'
import { 
    authenticate, 
    API } from '../api/userAuth/userAuth'
import JWTMemoryManager from '../utils/auth.utils'


jest.mock('axios')

describe('userAuth', () => {

    beforeEach(() => {

        // Set the mocks for storing the tokens in memory
        JWTMemoryManager.set = jest.fn()
        JWTMemoryManager.get = jest.fn()
        JWTMemoryManager.remove = jest.fn()
        JWTMemoryManager.refresh = jest.fn()

        localStorage.setItem = jest.fn()
        localStorage.getItem = jest.fn()
        localStorage.removeItem = jest.fn()

    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('authenticate', () => {

        afterEach(() => {
            jest.clearAllMocks()
        })
    
        it('should return status 200 with new access and refresh tokens for the user', async () => {
    
            // Setup
            const mockTokens = {
                accessToken: '4624562456-34562345345-234523452345-2345345345',
                refreshToken: '352345-3452345-324532453-2345345-23434-445'
            }
            
            axios.post = jest.fn().mockResolvedValue(mockTokens)
    
            const payload = {
                username: 'twatkins@bestforager.net',
                password: 'toulouse'
            }
    
            // Execute
            const result = await authenticate(payload)
    
            // Assert
            expect(axios.post).toHaveBeenCalledWith(`${API}/auth/login`)
            
            expect(JWTMemoryManager.set).toHaveBeenCalled()
            expect(JWTMemoryManager.set).toHaveBeenCalledWith(result.accessToken)

            expect(localStorage.setItem).toHaveBeenCalled()
            expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', result.refreshToken)

            expect(result.status).toEqual(200)
    
            expect(typeof result).toBe('object')
            expect(typeof result.accessToken).toBe('string')
            expect(typeof result.refreshToken).toBe('string')
            
            expect(result).toEqual(mockTokens)
    
        })
    
        it('should return an error if the username is missing', async () => {
    
            // Setup
    
            let username
            let password = 'tball'
    
            const payload = {
               username,
               password
            }
    
            axios.post = jest.fn().mockRejectedValue({
              success: false,
              message: 'The username is missing from the request payload'
            })
    
            const returnStatus = 500
            const returnSuccess = false
            const returnMessage = 'The username is missing from the request payload'
    
            // Execute
            const result = await authenticate(payload)
    
            // Assert
            expect(axios.post).toHaveBeenCalledWith(`${API}/auth/login`)
    
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')
    
            expect(result.success).toEqual(returnSuccess)
            expect(result.message).toEqual(returnMessage)
    
        })
    
        it('should return an error if the username is in the wrong format', async () => {
    
            // Setup
    
            let username = ['ten']
            let password = 'tball'
    
            const payload = {
               username,
               password
            }
    
            axios.post = jest.fn().mockRejectedValue({
              success: false,
              message: 'The username for the request payload is in the wrong format'
            })
    
            const returnStatus = 500
            const returnSuccess = false
            const returnMessage = 'The username for the request payload is in the wrong format'
    
            // Execute
            const result = await authenticate(payload)
    
            // Assert
            expect(axios.post).toHaveBeenCalledWith(`${API}/auth/login`)
    
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')
    
            expect(result.success).toEqual(returnSuccess)
            expect(result.message).toEqual(returnMessage)
    
        })
    
        it('should return an error if the password is missing', async () => {
    
            // Setup
    
            let username = 'tball'
            let password
    
            const payload = {
               username,
               password
            }
    
            axios.post = jest.fn().mockRejectedValue({
              success: false,
              message: 'The password is missing from the request payload'
            })
    
            const returnStatus = 500
            const returnSuccess = false
            const returnMessage = 'The password is missing from the request payload'
    
            // Execute
            const result = await authenticate(payload)
    
            // Assert
            expect(axios.post).toHaveBeenCalledWith(`${API}/auth/login`)
    
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')
    
            expect(result.success).toEqual(returnSuccess)
            expect(result.message).toEqual(returnMessage)
    
        })
    
        it('should return an error if the password is in the wrong format', async () => {
    
            // Setup
    
            let username = 'tball'
            let password = { name: 'password' }
    
            const payload = {
               username,
               password
            }
    
            axios.post = jest.fn().mockRejectedValue({
              success: false,
              message: 'The password for the request payload is in the wrong format'
            })
    
            const returnStatus = 500
            const returnSuccess = false
            const returnMessage = 'The password for the request payload is in the wrong format'
    
            // Execute
            const result = await authenticate(payload)
    
            // Assert
            expect(axios.post).toHaveBeenCalledWith(`${API}/auth/login`)
    
            expect(typeof result).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')
    
            expect(result.success).toEqual(returnSuccess)
            expect(result.message).toEqual(returnMessage)
    
        })
    
        it('should return status 500 if there was a general issue with the API', async () => {
    
            // Setup
            const payload = {
                username: 'tball',
                password: 'tball'
            }
    
            axios.post = jest.fn().mockRejectedValue({
              status: 500,
              success: false,
              message: 'There was a problem with the resource, please try again later'
            })
    
            // Execute
            const result = await authenticate(payload)
    
            expect(result.status).toEqual(500)
    
            // Assert
            expect(axios.post).toHaveBeenCalledWith(`${API}/auth/login`)
    
            expect(typeof result).toBe('object')
            expect(typeof result.status).toBe('object')
            expect(typeof result.success).toBe('boolean')
            expect(typeof result.message).toBe('string')
    
            expect(result.success).toEqual(false)
            expect(result.message).toEqual('There was a problem with the resource, please try again later')
    
        })
    
    })

})

