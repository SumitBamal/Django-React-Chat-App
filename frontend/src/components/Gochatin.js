import React from "react";
import { Redirect, Route } from "react-router-dom";

const Gochatin = ({ component: Component, loading, ...rest }) => {
    const ischat = Boolean(localStorage.getItem("uri"));
    //console.log(`ischat is ${ischat}`);
    return (
        <Route
            {...rest}
            render={(props) =>
                loading ? (
                    <p>Loading...</p>
                ) : ischat ? (
                    <Component history={props.history} {...rest} />
                ) : (
                            <Redirect
                                to={{
                                    pathname: "/",
                                }}
                            />
                        )
            }
        />
    );
};

export default Gochatin;
