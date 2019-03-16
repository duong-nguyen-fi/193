import React from 'react';
import './TableCard.css'

function TableCard(props){
 //console.log(props.tableData.checkin);
  
  var date = props.tableData.checkin.toDate();
  const offsetMs = date.getTimezoneOffset() * 60 * 1000;
  const dateLocal = new Date(date.getTime() - offsetMs);
  var str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/");
  return (
    <div className='col-md-3 col-xs-6' onClick={props.clicked}>
          <div className='card bwm-card'>
            <div className='card-block'>
              <h6 className='card-subtitle'>{str.split("T")[1]} - - - -     {str.split("T")[0]}</h6>
              <h4 className='card-title'>Ban {props.tableData.number}</h4>
              <h6 className='card-title'>{props.tableData.total}k</h6>
            </div>
          </div>
    </div>
  )
}
  
  export default TableCard;