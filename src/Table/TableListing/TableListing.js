import React, {Component} from 'react';
import TableCard from '../TableCard/TableCard';
import './TableListing.css'
import firebase from '../../Database/Firestore'
import {withRouter} from 'react-router-dom'

class TableListing extends React.Component {
    
    constructor(){
        super();
        this.tables = [];
        this.state = {
            selectedTableId: null,
            tables: [],
            loading: true,
            message: ""
        }
        
        this.statusSelector ={
            'New': 'Chưa Thanh Toán',
            'Checked': 'Đã Thanh Toán',
            'Deleted': 'Đã Xóa'
        }

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
        console.log(this.filter);
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
        const {status} = this.props.match.params;
        this.filter = status;
    }

    componentDidMount(){
        console.log("did mount");
        //this.getTablesData();
        this.getTablesData();  
    }  

    componentWillMount(){
        console.log("will mount");      
        const {status} = this.props.match.params;
        this.filter = status;
    }
    renderTables(){
        console.log("render now. Tables state length: "+ this.state.tables.length + " Status: "+ this.filter);
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

    selectorOnChanged = (e) =>{
        console.log("Should show "+ e.target.value);
        this.filter = e.target.value;
        this.props.history.push("/listing/"+e.target.value); 
        window.location.reload()
    }

    renderStatusSelector(){


        return (
            <div>
                <h3>Phân Loại Bàn</h3>
                <select className="browser-default custom-select form-control input-lg" onChange={(e) => this.selectorOnChanged(e)}>
                    <option selected>   </option>
                    <option value="New">{this.statusSelector.New}</option>
                    <option value="Deleted">{this.statusSelector.Deleted}</option>
                    <option value="Checked">{this.statusSelector.Checked}</option>
                </select>
            </div>
        );
    }

    onTableClick = (e, table) =>{
        //e.preventDefault();
        //console.log(table);
        this.props.history.push("/detail/"+table.key);    
    }

    displayNewButton = () =>{
        if(this.filter === 'New')
        return (<i className="float" onClick={ this.newTable}>
        <span  className="fa fa-4x">+</span>
      </i>)
    }


    render(){
        var status = "";

        switch(this.filter) {
            case 'New':
              // code block
              status = this.statusSelector.New;
              break;
            case 'Checked':
              // code block
              status = this.statusSelector.Checked;
              break;
            case 'Deleted':
              // code block
              status = this.statusSelector.Deleted;
              break;
            default:
              // code block
              status = "default";
          }

        if(this.state.loading){
            return (<div className="loader"/>)
        }
        else
        return (
        <section>
            {this.renderStatusSelector()}
          <h1 className='page-title'>Danh Sách Bàn 
            <span style={{color: 'red'}}> {status}</span>
          </h1>
          <h2> Số Lượng Bàn: {this.state.tables.length} </h2>
          <div className='row'>
            
            {this.renderTables()}
           
          </div>

          {this.displayNewButton()}
          
          
        </section>
            
        );
    }
}

export default withRouter(TableListing);