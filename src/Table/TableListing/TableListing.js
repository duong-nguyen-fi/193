import React, {Component} from 'react';
import TableCard from '../TableCard/TableCard';
import './TableListing.css'
import firebase from '../../Database/Firestore'
export default class TableListing extends React.Component {
    
    constructor(){
        super();
        this.state = {
          tables: [1,2,3,4,5]
        }
    }
    
    renderTables(){
        return this.state.tables.map((table) => {
          return (

            <TableCard number={table}/>
          )
        })
    }

    addUser = () => {
        const db = firebase.firestore();
        db.settings({
            timestampsInSnapshots: true
          });
        db.collection("users").doc("staff1").set({
            name:'thu ngan',
            type:'staff'
        })
    }
    
    getUsers = () => {
        const db = firebase.firestore();
        db.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });
    }

    render(){
        return (
        <section>
          <h1 className='page-title'>Bach Tuoc Nuong 193</h1>
          <div className='row'>
            {this.renderTables()}
            {this.getUsers()}
          </div>
        </section>
        );
    }
}