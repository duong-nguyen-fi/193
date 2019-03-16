import React from 'react';
import './Bill.scss'
import printjs from 'print-js';

class Bill extends React.Component{

    render(){
        return(
     
  <form  id="invoice-POS" action="#">
          
    <div id="bot">

                  <div id="table">
                      <table>
                          <tr className="tabletitle">
                              <td className="item"><h2>Item</h2></td>
                              <td className="Hours"><h2>Qty</h2></td>
                              <td className="Rate"><h2>Sub Total</h2></td>
                          </tr>

                          <tr className="service">
                              <td className="tableitem"><p className="itemtext">Communication</p></td>
                              <td className="tableitem"><p className="itemtext">5</p></td>
                              <td className="tableitem"><p className="itemtext">$375.00</p></td>
                          </tr>

                          <tr className="service">
                              <td className="tableitem"><p className="itemtext">Asset Gathering</p></td>
                              <td className="tableitem"><p className="itemtext">3</p></td>
                              <td className="tableitem"><p className="itemtext">$225.00</p></td>
                          </tr>

                          <tr className="tabletitle">
                              <td></td>
                              <td className="Rate"><h2>tax</h2></td>
                              <td className="payment"><h2>$419.25</h2></td>
                          </tr>

                          <tr className="tabletitle">
                              <td></td>
                              <td className="Rate"><h2>Total</h2></td>
                              <td className="payment"><h2>$3,644.25</h2></td>
                          </tr>

                      </table>
                  </div>

                  <div id="legalcopy">
                      <p className="legal"><strong>Thank you for your business!</strong>  Payment is expected within 31 days; please process this invoice within that time. There will be a 5% interest charge per month on late invoices. 
                      </p>
                  </div>

              </div>
</form>

        )

    }
}

export default Bill;