import React from 'react';
import './MenuItem.css';

function MenuItem(props){
  return (
    <div className='col-md-6 col-sm-6 col-xs-6' onClick={props.click}>
          <div className='card bwm-card btn-primary btn-lg' >
                {props.item.name}
          </div>
    </div>
  )
}
  
  export default MenuItem;