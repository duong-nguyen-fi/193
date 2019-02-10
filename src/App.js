import React, { Component } from 'react';
import TableListing from './Table/TableListing/TableListing.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <TableListing/>
      </div>
    );
  }
}

export default App;
