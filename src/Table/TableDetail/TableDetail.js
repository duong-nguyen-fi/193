import React, {Component} from 'react';
import './TableDetail.css'
import MenuItem from '../../Menu/MenuItem/MenuItem'
import firebase from './../../Database/Firestore'
import {withRouter} from 'react-router-dom'


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
                name : 'Chan Ga (1 Cap)',
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
        console.log('id:'+id);

        this.getTableData(id);
        //this.getOrderData(id, "orders");
    }

    menuItemClick = (item) =>{
        console.log("click "+ item.name);
    }

    getTableData = (id) => {
        
        const db = firebase.firestore();
        var tableref = db.collection('tables').doc(id)
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



    render(){
        var displayOrders = () =>{
            return this.state.table.orders.map((order, index) =>{
                return (
                    <tr key={order.name}>
                        <td><h3>{order.name}</h3></td>
                        <td><h3>{order.quantity}</h3></td>
                        <td></td>
                        <td><h3>{order.subtotal}</h3></td>
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
            <div className='col-xs-12 col-sm-12 col-md-8' >
                <div className='panel panel-primary'> 
                    <div className="panel-heading">Thuc don</div>
                    <div className="panel-body">
                        {displayMenuList()}
                    </div>
                </div>
            </div>
            <div className='col-xs-12 col-sm-12 col-md-4'>
                <div className='panel panel-primary'>
                    <div className="panel-heading">Mon da goi</div>
                    <div className="panel-body">
                    <div className="table table-bordered">
						<table className="col-md-12 col-xs-12 col-sm-12">
                            <thead>
                                <tr >
                                <th >Mon</th>
                                <th >SL</th>
                                <th ></th>
                                <th>Thanh Tien</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayOrders()}
                                
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