import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import UserForm from "./UserForm"
import AllNotes from "./components/Notes/AllNotes"
import Navbar from "./components/Navbar/Navbar"
import SingleNote from "./components/Notes/SingleNote"

function App(props) {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
      <Route path="/" exact render={()=><h4>Dashboard</h4>}/>  
      <Route path="/create" exact component={UserForm}/>  
      <Route path="/note" exact component={(props)=><AllNotes {...props}/>}/> 
      <Route path="/note/:id" component={(props)=><SingleNote {...props}/>}/> 
      <Route render={()=><h1>404 Not found</h1>}/> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
