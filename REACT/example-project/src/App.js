import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import NAVBAR from './components/navbar';
import axios from "axios";
import config from "./config";
import GirlImage from "./components/GirlImage";
class App extends Component {
  state = {
    images:[]
  }
  componentDidMount(){
    axios
    .get(config.rootPath+"/api/images/")
    .then(data=>{
      this.setState({images:data.data.images})
    })
    .catch(err => console.error(err))
  }
  render() {
    const allImage=this.state.images.map(img => <GirlImage img = {img}/> );
    return (
      <div className="app">
      <NAVBAR imag={this.state.images}/>
      {allImage}
      </div>
    );
  }
}

export default App;
