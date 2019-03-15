import React, { Component } from 'react';
import TableListing from './Table/TableListing/TableListing'
import TableDetail from './Table/TableDetail/TableDetail'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
import './App.css';
import Header from './Header/Header';
import './../../node_modules/font-awesome/css/font-awesome.css';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header location={this.props}/>
          <Route exact path="/" render={() => (<Redirect to="/listing/New" />)} />  
          <Route path='/listing/:status' component={TableListing}  />
          <Route path='/detail/:id'  component={TableDetail} />
          
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
