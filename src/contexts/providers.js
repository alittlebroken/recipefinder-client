import { createContext, useContext, useState } from "react"

const AccessTokenProvider = (props) => {
    const [accessToken, setAccessToken] = useState(null)
    return <AccessToken.Provider value={[accessToken, setAccessToken]} {...props} />
}

/* Create a Provider to store the access tokens in memory */
const AccessToken = createContext(null)

const useAccessToken = () => useContext(AccessToken)
export { AccessTokenProvider, useAccessToken }

export const ProviderContext = createContext()