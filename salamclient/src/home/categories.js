import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import './categories.css';

import "react-multi-carousel/lib/styles.css";
import Slid from '../Slid';
import Loader from 'react-loader-spinner'


import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './newproduct.css';


const URL = process.env.REACT_APP_LOCAL;


class Categories extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      productList : [],
      visible  : false,


    }
    this.allProducts = this.allProducts.bind(this);
  }

  allProducts(){
    this.setState({visible : true});
    axios.post(URL+'/api/user/fetchHomeProduct').then((response)=>{
      console.log('OOOOOOOOOOOOOOOOOOO',response.data.product);
      this.setState({visible : false});
      this.setState({
        productList : response.data.product,
      })
    })
  }

  componentDidMount(){
    this.allProducts();
  }
 
 	render(){
    
    const responsive = {
      superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 5,
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 5,
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
      },
    };


		return(
<div className="container-fluid newproduct-fluid">
         <div className="container">
             <div className="headingpart">
                  <h2>New  Products</h2>
             </div>
              <Carousel responsive={responsive}>

              {
          this.state.productList.map((e,i)=>{
            return(

                 <div className="mutlislider">
                   <div className="productimage">
                   <a href={"Productdetail?product="+e._id}><img src= {e.file1} alt="product 1" /></a>
                   <a href={'Productdetail?product='+e._id}><div className="viewproduct"><i className="fa fa-shopping-cart"></i> Add to Cart </div></a>
                    </div>
                    <h3>{e.productName}</h3>
                    <h4><span>${e.productPrice}</span> ${((e.productPrice)-(e.productPrice)*(e.discount)/100)}</h4>
                   {/* <div className="wishlist"><Link to="" title="wishlist"><i class="fa fa-heart"></i></Link></div> */}
                   {/* <div className="size">
                     <span>Size: </span>
                     <ul>
                        <li>S</li>
                        <li>M</li>
                        <li>L</li>
                        <li>XL</li>
                        <li>XXL</li>
                     </ul>
                   </div> */}
                 </div>
)
    })
  }



               
              </Carousel>
         </div>
      </div>

			)
	}
}

export default Categories;