import { Component } from 'react';

class Customer extends Component {

  render() {

    return (
      <div style={{display:'flex', margin:'10px 0'}}>        
        <CustomerProfile
          id={this.props.id}
          image={this.props.image}  
          name={this.props.name}
        />
        <CustomerInfo
          birthday={this.props.birthday}
          gender={this.props.gender}
          job={this.props.job}
        />        
      </div>
    )
  }
}

class CustomerProfile extends Component {
  render() {
    return (
      <div style={{display:'flex', alignItems:'center'}}>
        <p>{this.props.id}</p>        
        <img src={this.props.image} alt="profile"/>
        <p>{this.props.name}</p>
      </div>
    );    
  }
}

class CustomerInfo extends Component {
  render() {
    return (
      <div style={{display:'flex', alignItems:'center'}}>
        <p>{this.props.birthday}</p>
        <p>{this.props.gender}</p>
        <p>{this.props.job}</p>
      </div>
    )    
  }
}

export default Customer;