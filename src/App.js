import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Signup from './components/Signup';
import Home from "./components/Home";
import LoginForm from './components/LoginForm';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/Register" component={Signup} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path ="/" component={Home} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
