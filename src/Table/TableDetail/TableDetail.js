import React, {Component} from 'react';
import './TableDetail.css'
import MenuItem from '../../Menu/MenuItem/MenuItem'
import firebase from './../../Database/Firestore'


export default class TableDetail extends React.Component {

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
        }
    }
    componentDidMount(){
        this.getDetailData();
    }

    menuItemClick = (item) =>{
        console.log("click "+ item.name);
    }

    getDetailData = () => {
        const db = firebase.firestore();
        db.collection('active_table').get()
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
        

        var displayMenuList = () =>{
            return this.items.map((item) =>{
                return (<MenuItem item={item} click={() => this.menuItemClick(item)}/>)
            })
        }

        return (
        <section>
          <h1 className='page-title'>Ban So</h1>
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
                    </div>
                </div>
                
            </div>

          </div>
          
        </section>

        
        );
    }
}