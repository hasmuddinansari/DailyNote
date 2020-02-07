import React, { Component } from 'react'
import {Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"

export class PrivateRoute extends Component {
    constructor(props){
        super(props)
    }  
    render() {
        const { component: Component, ...rest } = this.props;
        console.log(this.state)
        return (
          <Route
            {...rest}
            render={props => {
              if (this.props.auth.authenticated) {
                return <Component {...props} />;
              } else {
                return (
                  <Redirect
                    to={{
                      pathname: "/login",
                      state: {
                        from: props.location
                      }
                    }}
                  />
                );
              }
            }}
          />
        );
    }
}
const mapStateToProps=(state)=>{
  return {
    auth:state.auth,
    notes:state.notes
  }
}

export default connect(mapStateToProps)(PrivateRoute)