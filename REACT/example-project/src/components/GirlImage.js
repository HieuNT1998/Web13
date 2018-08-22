import React, { Component } from 'react';
import config from "../config";
class GirlImage extends Component {
  render() {
    return (
      <div>
        <img src={this.props.img.imageUrl} alt={this.props.img.description} />
        <p>
            {this.props.img.description}
        </p>
      </div>
    
    )
  }
}

export default GirlImage;