import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import UserForm from "./UserForm"
import AllNotes from "./components/Notes/AllNotes"
import Navbar from "./components/Navbar/Navbar"
import SingleNote from "./components/Notes/SingleNote"
import Login from "./components/Auth/Login"
import RegisterForm from "./components/Auth/RegisterForm"
import PrivateRoute from "./components/Auth/PrivateRoute"

function App(props) {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
      <Route path="/" exact render={()=><h4>Dashboard</h4>}/>  
      <PrivateRoute path="/create" exact component={UserForm}/>  
      <PrivateRoute path="/note" exact component={(props)=><AllNotes {...props}/>}/> 
      <PrivateRoute path="/note/:id" component={(props)=><SingleNote {...props}/>}/> 
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={RegisterForm}/>
      <Route render={()=><h1>404 Not found</h1>}/> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
