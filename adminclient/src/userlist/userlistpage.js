import React from 'react';
import ReactDOM from 'react-dom';
import './userlistpage.css';
class Userlistpage extends React.Component{
	render()
	{
		return(
        <div className="my-3 my-md-5">
          <div className="container">
            <div className="page-header">
              <h4 className="page-title">User List</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/Dashboard">Home</a></li>
                <li className="breadcrumb-item active" aria-current="page">User List</li>
              </ol>
            </div>
            <div className="row">
              <div className="col-md-12 col-lg-12">
              <div className="card">
                <div className="card-body">
                                  <div className="table-responsive">
                  <table id="example" className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th className="wd-15p">User Id</th>
                        <th className="wd-15p">User Name</th>
                        <th className="wd-15p">Gender</th>
                        <th className="wd-15p">Email Id</th>
                        <th className="wd-20p">Mobile No</th>
                        <th className="wd-20p">Address</th>
                        <th className="wd-25p">Status</th>
                        <th className="wd-25p">Action</th>
                      </tr>
                    </thead>
                    {/* <tbody>
                      <tr>
                        <td>#U1001</td>
                        <td>Mo Danish</td>
                        <td>Male</td>
                        <td>danish@gmail.com</td>
                        <td>+971 3215 5487</td>
                        <td>SDF HALL Dubai</td>
                        <td>
                        <div className="card-options">
                            <label className="custom-switch m-0">
                              <input type="checkbox" value="1" className="custom-switch-input" />
                              <span className="custom-switch-indicator"></span>
                            </label>
                          </div>
                        </td>
                        <td>
                          <div className="actiontrans">
                            <a href="/userdetail">View Detail </a>
                          </div>
                        </td>
                      </tr>
                    </tbody> */}
                  </table>
                </div>
                                </div>
              </div>
              </div>
            </div>
          </div>
        </div>


			)
	}
}

export default Userlistpage;