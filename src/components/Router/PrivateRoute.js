import React from "react";
import { Redirect, Route } from "react-router-dom";
import { checkLoggedIn } from './checkLoggedIn'

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <>
            <Route
                {...rest}
                render={(props) =>
                    checkLoggedIn() ?
                        (<Component {...props} />)
                        :
                        (<Redirect to={{ pathname: "/login", state: { from: props.location } }} />)
                }
            />
        </>
    );
}

export default PrivateRoute;