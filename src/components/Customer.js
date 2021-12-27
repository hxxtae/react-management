import React, { Component } from 'react';
import { TableRow, TableCell } from '@material-ui/core';

class Customer extends Component {
  
  render() {
    return (
        <TableRow>
          <TableCell>{this.props.id}</TableCell>
          <TableCell>{this.props.name}</TableCell>
          <TableCell><img src={this.props.image} alt="profile-image"></img></TableCell>
          <TableCell>{this.props.birthday}</TableCell>
          <TableCell>{this.props.gender}</TableCell>
          <TableCell>{this.props.job}</TableCell>
        </TableRow>
      )
  }
}

export default Customer;
