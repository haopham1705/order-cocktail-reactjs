import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkLoggedIn } from './checkLoggedIn'


function AuthRoute({ component: Component, ...rest }) {

    return (
        <>
            <Route
                {...rest}
                render={(props) => {
                    return checkLoggedIn() === false ?
                        (<Component {...props} />)
                        :
                        (<Redirect to={{ pathname: "/", state: {from: props.location}}} />)
                }}
            />
        </>
    );
}

export default AuthRoute;