import inMemoryJWT from '../../../utils/auth.utils';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import { cloneElement } from 'react';

const ProtectedRoute = ({ children }) => {

    /* Check if the token is valid */
    if(!inMemoryJWT.getToken()){
        return <Navigate to="/login" replace />
    }

    /* Now we can decode the token */
    const token = jwt_decode(inMemoryJWT.getToken())

    /* Clone the element and pass the token to as a new prop */
    return cloneElement(children, { token: token })

}

export default ProtectedRoute