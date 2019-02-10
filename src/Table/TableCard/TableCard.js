import React, { Component } from 'react';
import './TableCard.css'

function TableCard(props){
  return (
    <div className='col-md-3 col-xs-6'>
          <div className='card bwm-card'>
            <div className='card-block'>
              <h6 className='card-subtitle'>20/12/2018 17:30</h6>
              <h4 className='card-title'>Ban {props.number}</h4>
              <p className='card-text'>300k</p>
            </div>
          </div>
    </div>

    
)

}
  
  export default TableCard;