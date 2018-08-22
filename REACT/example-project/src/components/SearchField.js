import React, { Component } from 'react';

class SearchField extends Component {
  render() {
    return (
        <form className="col-3">
            <input className="form-control" type="text" placeholder="search" />
        </form>
    );
  }
}

export default SearchField;