import React from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom"
import UserForm from "./UserForm"
import AllNotes from "./components/AllNotes"

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/" exact component={UserForm}/>  
      <Route path="/note" exact component={AllNotes}/> 
      <Route render={()=><h1>404 Not found</h1>}/> 
      </Switch>
    </BrowserRouter>
  );
}

export default App;
