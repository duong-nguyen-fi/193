import React, {Component} from 'react';
import TableCard from '../TableCard/TableCard';
import './TableListing.css'
import firebase from '../../Database/Firestore'
import FloatingButton from './../../Shared/FloatingButton/FloatingButton'

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
        this.filter="New";
        this.tableNumbers =[];
    }

    closeMessage = () =>{
        this.setState({message: ""});
    }

    newTable = () => {
        window.promptForNumberInput("Nhập số bàn mới",(tableNumber) =>{
            if (tableNumber === null)
                return;
            else if (isNaN(tableNumber) || tableNumber<=0)
                alert("Hãy nhập lại số bàn");
            else if(this.tableNumbers.includes(Number(tableNumber)))
                alert("Bàn này đã tồn tại");
            else
            {
                const db = firebase.firestore();
                var tableref = db.collection('tables').add({
                    active: true,
                    number: Number(tableNumber),
                    orders: [],
                    total: 0,
                    checkin: firebase.firestore.Timestamp.fromDate(new Date()),
                    checkout: null,
                    status: "New"
                })
                .then( (docRef) =>{
                    console.log(docRef.id);
                })
            }
        });
        //this.getTablesData();
    }



    getTablesData = () => {
        if(this.props.history.location.pathname.includes('deleted'))
        {
            this.filter = 'Deleted';
        }
        const db = firebase.firestore();
        var tableref = db.collection('tables').where('status','==',this.filter)
            .onSnapshot(querySnapshot => {
                this.setState({loading: true})
                this.tables.length = 0;
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
        var sortedTables =[...this.state.tables];
        //sortedTables.sort((a,b) => b.values.checkin.seconds - a.values.checkin.seconds );
        sortedTables.sort((a,b) => a.values.number - b.values.number );
        console.log(sortedTables);
        return sortedTables.map((table) => {
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

    displayNewButton = () =>{
        if(this.filter == 'New')
        return (<i className="float" onClick={ this.newTable}>
        <span  className="fa fa-4x">+</span>
      </i>)
    }


    render(){
        if(this.state.loading){
            return (<div className="loader"/>)
        }
        else
        return (
        <section>
            
          <h1 className='page-title'>Danh Sách Bàn</h1>
          <h2> Số Lượng Bàn: {this.state.tables.length} </h2>
          <div className='row'>
            {this.renderTables()}
           
          </div>

          {this.displayNewButton()}
          
          
        </section>
            
        );
    }
}