import React from 'react';
import ReactDOM from 'react-dom';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
// import action from '../action/action';
import validator from 'validator';
import axios from 'axios';
import swal from 'sweetalert';
import $ from 'jquery';
import './addnewproductpage.css';
import { access } from 'fs';
import action from '../action/action';
import AuthService from '../Authentication/AuthService';
const URL = process.env.REACT_APP_LOCAL;

class Addnewproductpage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
          businesscategory : {value: '', isValidate: true, message:''},
          category         : {value: '', isValidate: true, message:''},
          subCategory      : {value: '', isValidate: true, message: ''},
          productName      : {value: '', isValidate: true, message: ''},
          brandName        : {value: '', isValidate: true, message: ''},
          productPrice     : {value: '', isValidate: true, message: ''},
          quantity         : {value: '', isValidate: true, message: ''},
          discount         : {value: '', isValidate: true, message: ''},
          aboutProduct     : {value: '', isValidate: true, message: ''},
          file1            : null,
          file2            : null,
          file3            : null,
          file4            : null,
          businesscat      : '',
          cat              : '',
          brandList        : [],
          businessList     : [],
          categoryList     : [],
          subCategoryList  : [],
          specificationList: [],
          fValue           : '',
          specification    : [],

    }
    this.handleChange = this.handleChange.bind(this);
    this.submit       = this.submit.bind(this);
    this.handleChageImage1 = this.handleChageImage1.bind(this);
    this.handleChageImage2 = this.handleChageImage2.bind(this);
    this.handleChageImage3 = this.handleChageImage3.bind(this);
    this.handleChageImage4 = this.handleChageImage4.bind(this);
    this.fetchBrand = this.fetchBrand.bind(this);
    this.fetchBusinessCategory = this.fetchBusinessCategory.bind(this);
    this.hadleChangeSize = this.hadleChangeSize.bind(this);
    this.Auth = new AuthService();
  }

  async componentWillMount(){
    this.fetchBrand();
    this.fetchBusinessCategory(); 

 

    var that=this;
    console.log('eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')

    var a = await this.Auth.loggedIn()
    if(a){
       return this.props.history.replace('/Addnewproduct');
    }else{
  return this.props.history.replace('/');
 };
}

  handleChange(event){
    const{name,value} = event.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
  }

  handleChageImage1(e){
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = ()=>{
      aa = reader.result;
      this.setState({file1: aa})
    }
  }  

  handleChageImage2(e){
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = ()=>{
      aa = reader.result;
      this.setState({file2: aa})
    }
  }  

  handleChageImage3(e){
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = ()=>{
      aa = reader.result;
      this.setState({file3: aa})
    }
  }  

  handleChageImage4(e){
    e.preventDefault();
    var aa = '';
    let reader = new FileReader();
    let data = e.target.files[0];
    reader.readAsDataURL(data);
    reader.onloadend = ()=>{
      aa = reader.result;
      this.setState({file4: aa})
    }
  }  

  validate(){
    let state = this.state;
    if(validator.isEmpty(state.businesscategory.value)){
      state.businesscategory.isValidate = false;
      state.businesscategory.message = 'Please Select The Business Category';
      this.setState(state);
      return false;
    }

    // if(validator.isEmpty(state.file1.value)){
    //   state.file1.isValidate = false;
    //   state.file1.message = 'Please Select The Image';
    //   this.setState(state);
    //   return false;
    // }

    if(validator.isEmpty(state.category.value)){
      state.category.isValidate = false;
      state.category.message = 'Please Select The Category';
      this.setState(state);
      return false;
    }
    if(validator.isEmpty(state.subCategory.value)){
      state.subCategory.isValidate = false;
      state.subCategory.message = 'Please Select The SUB-Category';
      this.setState(state);
      return false;
    }
    if(validator.isEmpty(state.productName.value)){
      state.productName.isValidate = false;
      state.productName.message = 'Please Fill The Product Name';
      this.setState(state);
      return false;
    }
      // if (!state.productName.value.match(/^[0-100 ]+$/)) {
      //   state.productName.isValidate = false;
      //   state.productName.message = "Must Be Letters";
      //   this.setState(state);
      //   return false;
      // }
  
    // if(validator.isEmpty(state.brandName.value)){
    //   state.brandName.isValidate = false;
    //   state.brandName.message = "Please Fill The Brand Name";
    //   this.setState(state);
    //   return false;
    // }
    if(!validator.isEmpty(state.productPrice.value)){
      if(!validator.isNumeric(state.productPrice.value)){
      state.productPrice.isValidate = false;
      state.productPrice.message = "Must Be A Number";
      this.setState(state);
      return false;
      }
    }else{
      state.productPrice.isValidate = false;
      state.productPrice.message = 'Please Fill The Price'
      this.setState(state);
      return false;
    }
      // if (!state.productPrice.value.match(/^[0-100 ]+$/)) {
      //   state.productPrice.isValidate = false;
      //   state.productPrice.message = "Price Not Less Than 0";
      //   this.setState(state);
      //   return false;
      // }

    if(!validator.isEmpty(state.quantity.value)){
      if(!validator.isNumeric(state.quantity.value)){
      state.quantity.isValidate = false;
      state.quantity.message = "Must Be A Number";
      this.setState(state);
      return false;
    }
  }else{
    state.quantity.isValidate = false;
    state.quantity.message = 'Please Fill The Quantity Of Product';
    this.setState(state);
    return false;
  }

    if(!validator.isEmpty(state.discount.value)){
      if(!validator.isNumeric(state.discount.value)){
      state.discount.isValidate = false;
      state.discount.message = "Must Be a Number";
      this.setState(state);
      return false;
    }
  }else{
    state.discount.isValidate = false;
    state.discount.message = 'Please Fill The Discount Rate';
    this.setState(state);
    return false;
  }
    if(!validator.isEmpty(state.aboutProduct.value)) {
      if(!validator.isLength(state.aboutProduct.value, 100, 1000)){
      state.aboutProduct.isValidate = false;
      state.aboutProduct.message = 'Description must be of 100- 1000 characters'
      this.setState(state);
       return false;
      }
   }else{
      state.aboutProduct.isValidate = false;
      state.aboutProduct.message = 'About Product cannot be blank'
      this.setState(state);
      return false;
   }
    return true;
  }

fetchBrand(){
  axios.post(URL+'/api/vendor/fetchBrand').then((response)=>{
    console.log('BrandResponse',response.data.doc);
    this.setState({
      brandList :  response.data.doc
    })
  })
}

fetchBusinessCategory(){
  axios.post(URL+'/api/vendor/fetchBusiness').then((response)=>{
    console.log('BusinessResponse',response.data.doc);
    this.setState({
      businessList :  response.data.doc
    })
  })
}

  submit(event){
    event.preventDefault();
    let isValid = this.validate();
    if(isValid){
      let obj = {};
      obj.userId           = this.props.userId;
      obj.businesscategory = this.state['businesscategory'].value;
      obj.category         = this.state['category'].value;
      obj.subCategory      = this.state['subCategory'].value;
      obj.productName      = this.state['productName'].value;
      obj.brandName        = this.state['brandName'].value;
      obj.productPrice     = this.state['productPrice'].value;
      obj.quantity         = this.state['quantity'].value;
      obj.discount         = this.state['discount'].value;
      obj.aboutProduct     = this.state['aboutProduct'].value;
      obj.file1            = this.state.file1;
      obj.file2            = this.state.file2;
      obj.file3            = this.state.file3;
      obj.file4            = this.state.file4;
      obj.specification    = this.state.specification


      console.log('objjjjjjjjjjjjjjjjj',obj);
      axios.post(URL+'/api/vendor/addProduct',obj).then((response)=>{
        if(response.data.status === true){
          swal({
						title: "Success!",
						text: response.data.message,
						icon: "success",
						dangerMode: false,
						closeOnClickOutside: false,
					}).then((d)=>{
							if(d){
								return this.props.history.replace('/Productlist');
							}
						}) 
        }else{
          swal("Error",
         `${response.data.message}`,
         "error", ).then((d)=>{
           if(d){
            return this.props.history.replace('/Addnewproduct');
           }
         })
        }
      })
    }
  }

  
  handleSelect(e,i) {
    const{name,value} = e.target;
    let state = this.state;
    state[name].message = '';
    state[name].value = value;
    this.setState(state);
     let obj = {};
      obj.businesscategory = e.target.value
      console.log('resseeepeeppe',obj);
    axios.post(URL+'/api/vendor/fetchCategory',obj).then((resp)=>{
      this.setState({
              categoryList :  resp.data.category
            })
    })
}

handleSelectSubCategory(e){
  const{name,value} = e.target;
  let state = this.state;
  state[name].message = '';
  state[name].value = value;
  this.setState(state);
  let obj = {};
  obj.category = e.target.value
  console.log('resseeepeeppe',obj);
  axios.post(URL+'/api/vendor/fetchsubCategory',obj).then((resp)=>{
    this.setState({
            subCategoryList :  resp.data.subcategory
          })
  })
}


handleSelectSpecification(e){
  const{name,value} = e.target;
  let state = this.state;
  state[name].message = '';
  state[name].value = value;
  this.setState(state);
  let obj = {};
  obj.subCategoryId = e.target.value;
  console.log('object',obj);
  axios.post(URL+'/api/vendor/fetchSpecification',obj).then((response)=>{
    console.log('response',response.data.doc);
    this.setState({
      specificationList : response.data.doc
    })
  })
}


// handleImage(event) {
//   this.setState({
//     file2: URL.createObjectURL(event.target.files[0])
//   })
// }

// handleImage1(event) {
//   this.setState({
//     file1: URL.createObjectURL(event.target.files[0])
//   })
// }




hadleChangeSize(e,i){
  console.log('e.target.value',e.target.value)
  // this.setState({fValue : event.target.value})

  // current array of options
  const options = this.state.specification
  let index

  // check if the check box is checked or unchecked
  if (e.target.checked) {
    // add the numerical value of the checkbox to options array
    options.push(e.target.value)
  } else {
    // or remove the value from the unchecked checkbox from the array
    index = options.indexOf(e.target.value)
    options.splice(index, 1)
  }

  // update the state with the new array of options
  this.setState({ specification: options })
}


newSize(){
  if(this.state.fValue !== "" && this.state.fValue !== null && this.state.fValue !== undefined ){
      this.setState({specification : [...this.state.specification, this.state.fValue]})
  }
  this.setState({fValue : ''})
}


	render(e,i){
    const state = this.state;
    console.log('7777777777777777777',this.state.specification);

		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">Add  New Product</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">Add  New Product</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-12">
                <form  method="post" className="card" onSubmit = {this.submit}>
                  <div className="card-header">
                    <h3 className="card-title">Hi ! Vendor Upload Your New Product</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                    <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Business Category</label>
                          <select name="Category"  className="form-control custom-select" name = "businesscategory" value = {state.businesscategory.value} onChange = {this.handleChange} onChange = {this.handleSelect.bind(this)} >
                            <option value ="" hidden selected>Select</option>
                            {
                              this.state.businessList.map((e,i)=>{
                                return(
                                  <React.Fragment key = {i}>
                                     <option value = {e._id} >{e.businesscategory}</option>
                                  </React.Fragment>
                                )
                              })
                            }
                          </select>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.businesscategory.message} 
                          </div>
                        </div>
                    </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Category</label>
                          <select name="Category"  className="form-control custom-select" name = "category" value = {state.category.value} onChange = {this.handleChange} onChange = {this.handleSelectSubCategory.bind(this)}>
                            <option value ="" hidden selected>Select</option>
                            {
                              this.state.categoryList.map((e,i)=>{
                                return(
                                  <React.Fragment key = {i}>
                                     <option value = {e._id} >{e.category}</option>
                                  </React.Fragment>
                                )
                              })
                            }
                          </select>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.category.message} 
                          </div>
                        </div>
                    </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Select Sub Category</label>
                          <select  className="form-control select2 custom-select" name = "subCategory" value={state.subCategory.value} onChange = {this.handleChange}  onChange = {this.handleSelectSpecification.bind(this)}>
                            <option value= "" hidden selected>Select</option>
                            {
                              this.state.subCategoryList.map((e,i)=>{
                                console.log('ppppppppppp',e);
                                return(
                                  <React.Fragment key = {i}>
                                     <option value = {e._id} >{e.subcategory}</option>
                                  </React.Fragment>
                                )
                              })
                            }
                          </select>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.subCategory.message} 
                          </div>
                        </div>
                    </div>
                             {
                        this.state.specificationList.map((e,i)=>{
                          return(
                            <React.Fragment key = {i}>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label"  > {e.fieldName} </label> 
                          {e.fieldValue.map((r,s)=>{
                            return(
                              <React.Fragment key = {s} >
                              <input type = {e.fieldType} name = "size[]"  value = {r.fieldValue}  onClick= {()=>this.newSize()} 
                               onChange = {this.hadleChangeSize.bind(this)}
                               />
                                &nbsp;
                              <label >  {r.fieldValue} </label> &nbsp;
                              </React.Fragment>
                              )
                          })}
                        </div>
                      </div>
                            </React.Fragment>
                          )
                        })
                      }

                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Product Name </label>
                          <input type="text" className="form-control" name="productName" value = {state.productName.value} onChange={this.handleChange}/>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.productName.message} 
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Brand Name </label>
                          <select name="Category"  className="form-control custom-select" name = "brandName" value={state.brandName.value} onChange = {this.handleChange}>
                            <option value= "" hidden selected>Select</option>
                            {
                              this.state.brandList.map((e,i)=>{
                                return(
                                  <React.Fragment key = {i}>
                                     <option>{e.brandName}</option>
                                  </React.Fragment>
                                )
                              })
                            }
                          </select>
                          {/* <div style = {{fontSize:13, color:"red"}}>
                            {state.brandName.message} 
                          </div> */}
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Product Price ($) </label>
                          <input type="number" className="form-control" name="productPrice" min="1"
                          // min="1" max="100"
                           value={state.productPrice.value} onChange = {this.handleChange}  />
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.productPrice.message} 
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Total Quantity </label>
                          <input type="number" className="form-control" name="quantity" min="1"  value = {state.quantity.value} onChange= {this.handleChange} />
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.quantity.message} 
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6 col-lg-6">
                        <div className="form-group">
                          <label className="form-label">Total Discount (%)</label>
                          <input type="number" className="form-control" name="discount" min="1" max="100" value = {state.discount.value} onChange = {this.handleChange} />
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.discount.message} 
                          </div>
                        </div>
                      </div>
                
                      <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                         <label className="form-label">Upload Product Image </label>
                          <div className="custom-file">
                           <input type="file"  name = "myImage" id = "file" accept="image/*" onChange = {this.handleChageImage1}   className="custom-file-input"  />
                           <img src={this.state.file1 === null ? "images/defaultImg.png" : this.state.file1} style = {{height : '270px', width : '220px'}} />
                            <label className="custom-file-label">Choose file</label>
                           </div>
                           {/* <div style = {{fontSize:13, color:"red"}}>
                            {state.file1.message} 
                          </div> */}
                        </div>
                      
                      </div>
                      <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                         <label className="form-label">Upload Product Image </label>
                          <div className="custom-file">
                           <input type="file"  name = "myImage" id = "file" accept="image/*" onChange = {this.handleChageImage2}   className="custom-file-input"  />
                           <img src={this.state.file2 === null ? "images/defaultImg.png" : this.state.file2} style = {{height : '270px', width : '220px'}}  />
                            <label className="custom-file-label">Choose file</label>
                           </div>
                        </div>
                      
                      </div>
                      <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                         <label className="form-label">Upload Product Image </label>
                          <div className="custom-file">
                           <input type="file"  name = "myImage" id = "file" accept="image/*" onChange = {this.handleChageImage3}   className="custom-file-input"  />
                           <img src={this.state.file3 === null ? "images/defaultImg.png" : this.state.file3} style = {{height : '270px', width : '220px'}} />
                            <label className="custom-file-label">Choose file</label>
                           </div>
                        </div>
                      
                      </div>
                      <div className="col-md-3 col-lg-3">
                      <div className="form-group">
                         <label className="form-label">Upload Product Image </label>
                          <div className="custom-file">
                           <input type="file"  name = "myImage" id = "file" accept="image/*"  onChange = {this.handleChageImage4}   className="custom-file-input"  />
                           <img src={this.state.file4 === null ? "images/defaultImg.png" : this.state.file4} style = {{height : '270px', width : '220px'}}  />                            
                            <label className="custom-file-label">Choose file</label>
                           </div>
                        </div>
                      </div>

                        {/* <div className="col-md-4 col-lg-4"> */}
                       {/* <div className="form-group">
                          <label className="form-label">Upload Product Image </label>
                          <div>
                           <input type="file" onChange={this.handleImage}/>
                           <div id="testDIv">
                           <img src={this.state.file}/>
                           </div>
                         </div>
                          </div> */}
                       {/* </div>  */}
                     
                      


                      <div className="col-md-12 col-lg-12" style = {{paddingTop : '112px' }} >
                        <div className="form-group">
                          <label className="form-label">About Product </label>
                          <textarea className="form-control" name="aboutProduct" value = {state.aboutProduct.value} onChange = {this.handleChange} rows="6" placeholder="text here.."></textarea>
                          <div style = {{fontSize:13, color:"red"}}>
                            {state.aboutProduct.message} 
                          </div>
                        </div>
                      </div>

                      <div className="col-md-12 col-lg-12">
                      <button type="submit" class="btn btn-primary pull-right">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
			)
	}
}

function mapstateToProps(state){
  return{
    authenticateState : state.inititateState.authenticateState,
    userId : state.inititateState.userId
  }
}

// function mapDispatchToProps(dispatch){
// 	return {
// 		product : bindActionCreators(action.product, dispatch)
// 	}
// }

export default withRouter(connect(mapstateToProps)(Addnewproductpage));