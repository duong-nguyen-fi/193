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
        var itemExists = this.checkMenuItemOrderedExists(item);
        console.log("actual return: " +itemExists);
        if( itemExists=== false)
            window.promptForNumberInput(" Nhap so luong "+item.name,(result) =>{
                console.log("returned value: "+result);
                if(!isNull(result))
                    if(result>1)
                        this.addNewOrder(item, Number(result));
                    else
                        alert("Nhap so luong it nhat la 2");
            });
        else
            window.customAlert("Mon nay da ton tai. Sua so luong o danh sach ben phai");
        
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

    checkMenuItemOrderedExists = (item) =>{
        console.log("item name= "+item.name);
        var flag = false;
        this.state.table.orders.forEach(element => {
            console.log("element name= "+element.name);
            if(item.name === element.name)
            {
                console.log("Should return true");
                flag = true;
                return;
            }
                
        });
        return flag;
    }

    changeOrderAmount = (item) =>{
        console.log(item);
        if(this.state.table.active ===false){
            return;
        }
        var tabledata = {...this.state.table};
        var message = "<div><p>Thay đổi số lượng "+ item.name +"</p><p> Số lượng hiện tại: <h2>"+item.quantity+"</h2></p>";
        window.promptForNumberInput(message, (result)=>{
            //update quantity
            if(result == item.quantity)
            {
                window.customAlert("<h1>Nhap so khac "+ item.quantity+"</h1>");
            } else
            if(result < 2)
            {
                window.customAlert("<h1>Nhap so luong it nhat la 2</h1>");
            }
            else if (result != item.quantity)
            {
                var foundItem = tabledata.orders.find((element)=>{
                    return element.name === item.name;
                });

                foundItem.quantity = result;
                foundItem.subtotal = Number(foundItem.price) * result;
                var total = this.calculateTotal(tabledata.orders);
                console.log(total);
                
                const db = firebase.firestore();
                var tableref = db.collection('tables').doc(this.id);

                tableref.update({"orders": tabledata.orders})
                .then( () =>{
                    console.log("Table data set");
                    tabledata=null;
                });

                tableref.update({"total": total});
            }
            
            
            
        })
    }

    calculateTotal = (orders) =>{
        var total = 0;
        orders.forEach(element => {
            total+=element.subtotal;
        });    
        return total;
    }

    deleteOrder = (item) =>{
        console.log("click delte order: "+ item.name);
        if(this.state.table.active ===false){
            return;
        }
        var tabledata = {...this.state.table};
        var message = "<div><h2> "+item.name +" se bi xoa khoi danh sach</h2></p>";

        window.customConfirm(message, (result)=>{
            console.log(result);
            if(result === true)
            {
                var removedArray = Array.from(this.state.table.orders).filter((element)=>{
                    return element.name !== item.name;
                });
    
                var total = this.calculateTotal(removedArray);
    
                const db = firebase.firestore();
                var tableref = db.collection('tables').doc(this.id);
                tableref.update({"orders": removedArray})
                    .then( () =>{
                    console.log("Removed order: "+ item.name);
    
                    
                });
                tableref.update({"total": total});
                    tabledata=null;
            }
        })
    }


    onCheckTableClick = ()=>{
        console.log("Check please");
    }

    onDeleteTableClick = () =>{
        console.log("ID to be deleted: "+this.id);
        window.customConfirm("<h1>Xác Nhận Xóa Bàn Này?<h1>", (result) =>{
            if(result===true)
            {
                this.setState({loading: true});
                const db = firebase.firestore();
                var tableref = db.collection('tables').doc(this.id);
                tableref.update({status: "Deleted"})
                            .then( () =>{
                                tableref.update({active: false});

                                console.log("Table is deleted "+this.state.number);
                                this.setState({loading: false});
                                console.log(this.props.history);
                                this.props.history.push("/"); 
                            //this.props.history.goBack();
                               
                });

                
                
            }
        });
    }

    render(){
        var displayOrders = () =>{
            return this.state.table.orders.map((order, index) =>{
                return (
                    <tr key={index}>
                        <td><h3>{order.name}</h3></td>
                        <th scope="row"><h3>{order.price}k</h3></th>
                        <th scope="row"><h3>{order.quantity}</h3></th>
                        <td><h3>{order.subtotal}k</h3></td>
                        <td><button type="button" className="btn btn-default btn-block" onClick={() => this.changeOrderAmount(order)}>
                            <span className="glyphicon glyphicon-edit fa-2x"></span>
                            </button>
                            <button type="button" className="btn btn-danger btn-block" onClick={() => this.deleteOrder(order)}>
                            <span className="glyphicon glyphicon-trash fa-2x"></span>
                            </button>
                        </td>
                    </tr>
                )
            })
        }

        var displayDeleteAndCheckButton = () =>{
            if (this.state.table.active === true)
                return(
                    <div>
                    <div className="col-xs-12 col-sm-6 col-md6">
                        <button className="btn btn-danger btn-block" onClick={() => this.onDeleteTableClick()}><h3>Xoa Ban</h3> <span className="glyphicon glyphicon-trash fa-2x"></span></button>
                    </div>
                    <div className="col-xs-12 col-sm-6 col-md6">
                        <button className="btn btn-success btn-block" onClick={() => this.onCheckTableClick()}><h3>Thanh Toan</h3> <span className="glyphicon glyphicon-check fa-2x"></span></button>
                    </div>
                    </div>
                )
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
                    {displayDeleteAndCheckButton()}
                    <div className='col-xs-12 col-sm-12 col-md-12'></div>
                    
                    <div className="col-md-12 col-xs-12 col-sm-12 ">
						<table className=" table table-bordered">
                            <thead>
                                <tr className="tabletitle">
                                <th scope="col">Mon</th>
                                <th scope="col">Gia</th>
                                <th scope="col">SL</th>
                                <th scope="col">Thanh Tien</th>
                                <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayOrders()}
                                <tr className="tabletitle">
                                 <th scope="row"></th>
                                    <td><h1>Tong </h1></td>
                                    <td></td>
                                    <td><h1>{this.state.table.total}k</h1></td>
                                    <td></td>
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