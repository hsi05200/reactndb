import React from 'react';


class CustomerDelete extends React.Component {

  deletedCustomer(id) {    
    const url = '/api/customers/' + id;
    fetch(url, {
      method: 'DELETE'
    });
    this.props.stateRefresh();
  }
  render() {

    return (
      <button onClick={(e) => {this.deletedCustomer(this.props.id)}}>삭제</button>
    );
  }
}

export default CustomerDelete;