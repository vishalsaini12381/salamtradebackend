import React from 'react';
import { Link, withRouter } from 'react-router-dom'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import SearchField from 'react-search-field';
import axios from 'axios';
import './search.css';
const URL = process.env.REACT_APP_LOCAL;
class Search extends React.Component{
  constructor(props){
    super(props)
    this.state={
        search: '',
    };
    this.searchJob = this.searchJob.bind(this);
  }

  searchJob(event){
    // console.log(event,'fgf')
    let obj={}
    obj.search = event;
    // obj.userId = this.props.userId;
    // obj.type = this.props.type;
    if(event === ''){
        this.pagi();
    }else{
        axios.post(URL+'/api/user/searchBox',obj).then((res)=>{
            if(res){
                this.setState({productList: res.data.product})
                return window.location = '/Productlist'
            }
        })
    }
}

	render()
	{
		return(
  <header className="header-container">
    <div className="header-top">
      <div className="container">
        <div className="row"> 
          <div className="col-xs-6">           
            <div className="welcome-msg hidden-xs"> Welcome To  salam trade! </div>
          </div>
          <div className="col-xs-6"> 
            <div className="toplinks">
              <div className="links">
                {
                  this.props.email ? 
                    <div className="wishlist"><a title="My Wishlist"  href="/Mywishlist"><span className="hidden-xs">Wishlist</span></a><a href="/Myprofile" data-toggle="modal"><span className="hidden-xs">My Account</span></a> </div>
                  :
                  <div className="myaccount"><a href="/Login" data-toggle="modal"><span className="hidden-xs">Login</span></a> <a href="/Signup" data-toggle="modal"><span className="hidden-xs">Signup</span></a> </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="header header-serach">
    <div className="container">
      <div className="row">
        <div className="col-lg-2 col-sm-3 col-md-2"> 
          <a className="logo" title="Souqalasal" href="/"><img alt="Souqalasal Logo" src="./images/logo/logo.png" /></a> 
        </div>
        <div className="col-lg-8 col-sm-6 col-md-8"> 
          <div className="search-box">
            <form>
              <select name="category_id" className="cate-dropdown hidden-xs">
                <option value="0">All Categories</option>
                <option value="36">Honey</option>
                <option value="37">Honey Products</option>
                <option value="38">Bee Products</option>
                <option value="39">Sweets and Desserts</option>
                <option value="40">Food Supplement</option>
                <option value="41">Neutraceutical</option>
                <option value="41">Halal Food</option>
              </select>
              {/* <input type="text" placeholder="Search Products " value="" maxlength="70" className="" name="search" id="search"/> */}
              <SearchField
              placeholder="Search Products..."
              onSearchClick={this.searchJob} 
              onEnter={this.searchJob}  
              classNames="test-class"
              />
              {/* <button id="submit-button" className="search-btn-bg"><span><i class="fa fa-search"></i></span></button> */}
            </form>
          </div>
        </div>
        <div className="col-lg-2 col-sm-3 col-md-2">
          <div className="top-cart-contain">
            <div className="mini-cart">
              <div   className="basket "> <a href = "/Shoppingcart"> <i class="fa fa-shopping-bag"></i>
                <div className="cart-box"><span className="title">My Cart</span></div>
                </a></div>
              <div>
            </div>
            </div>
            <div id="ajaxconfig_info"> <a href="#"></a>
              <input value="" type="hidden"/>
              <input id="enable_module" value="1" type="hidden"/>
              <input className="effect_to_cart" value="1" type="hidden"/>
              <input className="title_shopping_cart" value="Go to shopping cart" type="hidden"/>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </header>
			)

	}
}

function mapStateToProps(state){
  console.log('555555555555555555',state.inititateState.email);
   return{
      authenticateState : state.inititateState.authenticateState,
      email: state.inititateState.email
   }
}

export default withRouter(connect(mapStateToProps)(Search));
// export default Search;