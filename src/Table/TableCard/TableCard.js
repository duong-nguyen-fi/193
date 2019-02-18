import React from 'react';
import './TableCard.css'

function TableCard(props){
 //console.log(props.tableData.checkin);
  
  var date = props.tableData.checkin.toDate();
  return (
    <div className='col-md-3 col-xs-6' onClick={props.clicked}>
          <div className='card bwm-card'>
            <div className='card-block'>
              <h6 className='card-subtitle'>{date.toLocaleTimeString()} {date.toLocaleDateString()}</h6>
              <h4 className='card-title'>Ban {props.tableData.number}</h4>
              <p className='card-text'>{props.tableData.total}k</p>
            </div>
          </div>
    </div>
  )
}
  
  export default TableCard;