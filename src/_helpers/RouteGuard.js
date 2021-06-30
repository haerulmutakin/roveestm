import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../_provider/AuthProvider';

const RouteGuard = ({component: RouteComponent, ...rest}) => {
    const user = useContext(AuthContext);
    return (
        <Route 
            {...rest} 
            render = {props => {
                if (user) {
                    return <RouteComponent {...props} />
                } else {
                    return <Redirect to={'/login'} />
                }
            }}
        />
    )
}

export default RouteGuard;