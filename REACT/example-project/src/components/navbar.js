import React, { Component } from 'react';
import SearchField from './SearchField';
import logo from '../img/techkid-logo.png';
import ProfilePanel from './ProfilePanel';
class navbar extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="container">
          <SearchField />
         
          <div className="col-6 text-center">
           {/* {this.props.img.length  > 0 ? this.props.img[0].description : "hello world"} */}
            <img src={logo} style={{ width:"100px" ,height:"auto"}}></img>
          </div>  
          <ProfilePanel />
        </div>

      </div>
    );
  }
}

export default navbar;