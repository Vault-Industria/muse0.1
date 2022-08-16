import React, { useEffect } from "react";

import SignIn from "../pages/SignIn";

const PrivateRoute =({children})=>{
    const [token,setToken] = React.useState(null);

    useEffect(()=>{
        const tokens = localStorage.getItem('token');
        if(tokens){
            setToken(tokens);
        }
    },[token]);
    ;
    return token ? children : <SignIn/>
}

export default PrivateRoute;