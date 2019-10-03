import React from 'react';
import ReactDOM from 'react-dom';
import './paymentpage.css';
import Processbar from './processbar.js';
import Paymentdetail from './paymentdetail.js';
import Checkout from './checkout.js';
class Paymentpage extends React.Component{
	render()
	{
		return(

  <div className="main-container col2-right-layout myorder-fluid">
    <div className="container">
      <div className="row">
              <Processbar/>
              <Paymentdetail/>
              <Checkout/>
      </div>
    </div>
  </div>

			)
	}
}

export default Paymentpage