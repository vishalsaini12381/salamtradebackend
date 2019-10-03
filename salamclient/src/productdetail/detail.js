import React from 'react';
import ReactDOM from 'react-dom';
import './detail.css';
import Productslider from './productslider.js';
import Description from './description.js';
class Detail extends React.Component{
	render()
	{
		return(
  <section class="main-container col1-layout">
    <div class=" container">
      <div class="col-main">
           <div className="breadcrumbs">
            <div className="row">
              <ul>
                <li className="home"> <a href="#" title="Go to Home Page">Home</a><span>/</span></li>
                <li className=""> <a href="#" title="Go to Home Page">Man Fashion</a><span>/</span></li>
                <li className="category13"> Man T-Shirt</li>
              </ul>
          </div>
       </div>
        <div class="row">
          <div class="product-view productdetail-fluid">
            <div class="product-essential">
                 <Productslider/>
                 <Description/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


			)
	}
}

export default Detail;