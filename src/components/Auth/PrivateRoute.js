import React, { Component } from 'react'
import firebase from 'firebase'
import 'firebase/database'
import {Route, Redirect} from "react-router-dom"

export class PrivateRoute extends Component {
    constructor(props){
        super(props)
        this.state={
            authenticated:"",
            localAuth:""
        }
        this.auth =firebase.database()
    }
    componentWillMount(){
     const localAuth = localStorage.getItem("auth")
        this.auth.ref("auth").orderByKey().on("value", snap=>{
            let temp = snap.val()
            this.setState({
                authenticated:temp.authenticated,
                localAuth:localAuth
            })
        })
        

    }   
    render() {
        const { component: Component, ...rest } = this.props;
        console.log(this.state)
        return (
          <Route
            {...rest}
            render={props => {
              if (this.state.authenticated && this.state.localAuth) {
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

export default PrivateRoute
