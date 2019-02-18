import React, {Component} from 'react';
import TableCard from '../TableCard/TableCard';
import './TableListing.css'
import AlertMessage from './../../Shared/MessageBox/AlertMessage';
import firebase from '../../Database/Firestore'

export default class TableListing extends React.Component {
    
    constructor(){
        super();
        this.tables = [];
        this.state = {
            selectedTableId: null,
            tables: [],
            loading: true,
            message: ""
        }
        this.tableNumbers =[];
    }

    showMessge = () =>{
        if(this.state.message == "")
            return ;
        else
            return (<AlertMessage message={this.state.message} click={this.closeMessage()}/>);
    }

    closeMessage = () =>{
        this.setState({message: ""});
    }

    newTable = () => {
        console.log(this.state.tables.length+" size after add");
        this.state.tables.length =0;
        console.log(this.state.tables.length +" size after empty out");
        var tableNumber = prompt("Nhap so ban");
        if (tableNumber == null || tableNumber == "" || isNaN(tableNumber))
            alert("Hay nhap so ban");
        else if(this.tableNumbers.includes(Number(tableNumber)))
            alert("Ban nay da ton tai");
        else
        {
            const db = firebase.firestore();
            var tableref = db.collection('tables').add({
                active: true,
                number: Number(tableNumber),
                orders: [
                    {
                        name: "Bach Tuoc",
                        price: 20,
                        quantity: 4,
                        subtotal: 80
                    },
                    {
                        name: "Thit Nuong",
                        price: 10,
                        quantity: 4,
                        subtotal: 40
                    }
                ],
                total: 230,
                checkin: firebase.firestore.Timestamp.fromDate(new Date()),
                checkout: null
            })
            .then( (docRef) =>{
                console.log(docRef.id);
            })
        }
        
        
        //this.getTablesData();
    }

    getTablesData = () => {
        const db = firebase.firestore();
        var tableref = db.collection('tables').where('active','==',true)
            .onSnapshot(querySnapshot => {
            querySnapshot.forEach((doc) => {
                //console.log(doc.id, '=>', doc.data());
                var data ={
                    key: doc.id,
                    values : doc.data()
                }
                //console.log(data);
                if(!this.tables.includes(data)){
                    this.tables.push(data);
                    this.tableNumbers.push(data.values.number);
                }
                
                });

                
            this.setState({tables: this.tables});
            this.setState({loading: false})
            //console.log("state changed");
          }, err => {
            console.log(`Encountered error: ${err}`);
          });

          
    }
    
    shouldComponentUpdate(){
        console.log("Should component update");
        console.log(this.state.tables.length);
        return true;
    }

    componentWillUpdate(){
        console.log("component will update");
        console.log(this.state.tables.length);
    }

    componentDidMount(){
        console.log("did mount");
        //this.getTablesData();
        
    }  

    componentWillMount(){
        console.log("will mount");
        this.getTablesData();
    }
    renderTables(){

        console.log("render now. Tables state length: "+ this.state.tables.length);
        return this.state.tables.map((table) => {
          return (
                    <TableCard tableData={table.values} clicked={ (e) => {this.onTableClick(e, table)}} key={table.key}/>
                    
          )
        })
    }

    onTableClick = (e, table) =>{
        //e.preventDefault();
        //console.log(table);
        this.props.history.push("/detail/"+table.key);    
    }


    render(){
        if(this.state.loading){
            return (<div className="loader"/>)
        }
        else
        return (
        <section>
            {this.showMessge()}
          <h1 className='page-title'>Danh Sach Ban</h1>
          <h2> So Luong Ban: {this.state.tables.length} </h2>
          <div className='row'>
            {this.renderTables()}
          </div>
          <a className="float" onClick={ this.newTable}>
            <span  className="fa fa-4x">+</span>
          </a>
          
        </section>
            
        );
    }
}