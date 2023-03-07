import { Navigate } from "react-router-dom";

import userAuth from "../custom-hooks/userAuth";

const ProtectedRoute = ({ children }) => {
    const { currentUser } = userAuth();
    return currentUser ? children : <Navigate to='/login' replace={true} />;
}

export default ProtectedRoute