import React from 'react';
import './TableDetail.css'
import MenuItem from '../../Menu/MenuItem/MenuItem'
import firebase from './../../Database/Firestore'
import {withRouter} from 'react-router-dom'
import { isNull } from 'util';



class TableDetail extends React.Component {

    constructor(){
        super();
        this.items = [
            {
                name : 'Bach Tuoc',
                price: 20
            },
            {
                name : 'Thit Nuong',
                price: 10
            },
            {
                name : 'Canh Ga',
                price: 15
            },
            {
                name : 'Chan Ga (Cap)',
                price: 15
            }
        ]
        this.state = {
            table: {},
            number: null,
            loading: true,
            notfound: false
        }

        
    }
    componentDidMount(){
        const {id} = this.props.match.params;
        this.id = id;
        this.getTableDataRealtime();
        //this.getTableData();
        //this.getOrderData(id, "orders");
    }

    menuItemClick = (item) =>{
        window.promptForNumberInput((result) =>{
            console.log("returned value: "+result);
            if(!isNull(result))
                if(result>1)
                    this.addNewOrder(item, Number(result));
                else
                    alert("Nhap so luong it nhat la 2");
        });
        
        //this.interval()
        //this.addNewOrder(item, 3);
    }





    getTableData = () => {
        this.setState({loading: true});
        const db = firebase.firestore();
        db.collection('tables').doc(this.id)
            .get()
                .then(doc => {

                    if (!doc.exists) {
                        console.log('No such document!');
                        this.setState({notfound: true})
                        this.setState({loading: false})
                      } else {
                        console.log('Document data:', doc.data());
                        this.setState({table: doc.data()})
                        this.setState({loading: false})
                      }
                })
            .catch(err =>{
                console.log("error: "+ err);
                this.setState({loading: false})
            });
            
    } 
    
    getTableDataRealtime = () => {
        
        const db = firebase.firestore();
        db.collection('tables').doc(this.id)
            .onSnapshot({
                
            }, (doc) => {
                this.setState({loading: true});
                if (!doc.exists) {
                    console.log('No such document!');
                    this.setState({notfound: true})
                    this.setState({loading: false})
                  } else {
                    console.log('Document data:', doc.data());
                    this.setState({table: doc.data()})
                    this.setState({loading: false})
                  }
            })   
            // .catch(err =>{
            //     console.log("error: "+ err);
            //     this.setState({loading: false})
            // });
            
    }  

    addNewOrder = (item, quantity) =>{
        var _orders = Array.from(this.state.table.orders);

        console.log(_orders);
        var tabledata = {...this.state.table};
        console.log(tabledata);
        var subtotal = Number(item.price)*Number(quantity);
        var itemToAdd = 
            {
                name: item.name,
                price: item.price,
                quantity: quantity,
                subtotal: subtotal
            }

        var total =Number(tabledata.total) + Number(subtotal);
        console.log("total="+total );
        console.log(itemToAdd);
            
        _orders.push(itemToAdd);
        tabledata.orders = _orders;
        tabledata.total = total;

        //console.log(tabledata);

        this.setOrdersAndTotal(tabledata);


        
    }

    setOrdersAndTotal = (tableData) =>{
        const db = firebase.firestore();
            var tableref = db.collection('tables').doc(this.id);
            tableref.set(tableData)
            .then( () =>{
                console.log("Table data set");
                tableData = null;
                
                //this.getTableData();
            })
    }

    render(){
        var displayOrders = () =>{
            return this.state.table.orders.map((order, index) =>{
                return (
                    <tr key={index}>
                        <td><h3>{order.name}</h3></td>
                        <th scope="row"><h3>{order.price}</h3></th>
                        <th scope="row"><h3>{order.quantity}</h3></th>
                        <td><h3>{order.subtotal}k</h3></td>
                    </tr>
                )
            })
        }

        var displayMenuList = () =>{
            return this.items.map((item, index) =>{
                return (<MenuItem item={item} key={index} click={() => this.menuItemClick(item)}/>)
            })
        }
        if(this.state.loading){
            return (<div className="loader"/>)
        }
        else if(this.state.notfound)
            return <h2> Khong tim  thay ban nay</h2>
        else

        return (
        <section>
          <h1 className='page-title'>Ban So {this.state.table.number}</h1>
          <div className='row'>
            <div className='col-xs-12 col-sm-12 col-md-7' >
                <div className='panel panel-primary'> 
                    <div className="panel-heading">Thuc don</div>
                    <div className="panel-body">
                        {displayMenuList()}
                    </div>
                </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-5'>
                <div className='panel panel-primary'>
                    <div className="panel-heading">Mon da goi</div>
                    <div className="panel-body">
                    <div className="col-md-12 col-xs-12 col-sm-12 ">
						<table className=" table table-bordered">
                            <thead>
                                <tr className="tabletitle">
                                <th scope="col">Mon</th>
                                <th scope="col">Gia</th>
                                <th scope="col">SL</th>
                                <th scope="col">Thanh Tien</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayOrders()}
                                <tr className="tabletitle">
                                 <th scope="row"></th>
                                    <td><h1>Tong </h1></td>
                                    <td></td>
                                    <td><h1>{this.state.table.total}k</h1></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    </div>
                </div>
                
            </div>

          </div>
          
        </section>

        
        );
    }
}

export default withRouter(TableDetail);