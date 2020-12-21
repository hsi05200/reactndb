import { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {

    return (
      <div className="gray_bg">
        <img src={logo} lat="logo" />
        <h2>고객관리 프로그램</h2>
      </div>
    );
  }
}

export default App;