import React, {Component} from 'react';
import TableCard from '../TableCard/TableCard';
import './TableListing.css'
import firebase from '../../Database/Firestore'
import {Link} from 'react-router-dom'

export default class TableListing extends React.Component {
    
    constructor(){
        super();
        var selected = null;
        this.tables = [];
        this.state = {
            selectedTableId: null,
            tables: []
            
        }
    }

    getTablesData = () => {
        
        const db = firebase.firestore();
        var tableref = db.collection('active_table').where('active','==',true)
            .onSnapshot(querySnapshot => {
            querySnapshot.forEach((doc) => {
                console.log(doc.id, '=>', doc.data());
                this.tables.push(doc.data());
                });
            console.log("tables data: "+this.tables);
            this.setState({tables: this.tables});
            console.log("state changed");
          }, err => {
            console.log(`Encountered error: ${err}`);
          });

          
    }   

    componentDidMount(){
        console.log("did mount");
        
        this.getTablesData();
        //this.tryGetTable();
        //this.trySetState();
        console.log("state: "+this.state.tables.length);
        
    }  
    renderTables(){
        console.log('render now')
        console.log(this.tables.length);
        return this.state.tables.map((table) => {
          return (
                    <TableCard tableData={table} clicked={ (e) => {this.onTableClick(e, table)}} />
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

    

    onTableClick = (e, table) =>{
        //e.preventDefault();
        this.props.history.push("/detail/"+table.number, {id: table.id});    
    }


    render(){
        return (
        <section>
          <h1 className='page-title'>Danh Sach Ban</h1>
          <div className='row'>
            {this.renderTables()}
            
          </div>
        </section>
        );
    }
}