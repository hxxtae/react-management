import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

class CustomerDelete extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    }
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  }
  
  deleteCustomer(id) {
    const url = '/api/customers/' + id;
    fetch(url, {
      method: 'DELETE'
    });
    this.setState({
      open: false
    })
    this.props.stateRefresh();
  }

  render() {
    return (
      <div>
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle onClose={this.handleClose}>
            삭제 경고
          </DialogTitle>
          <DialogContent>
            <Typography>
                선택한 고객 정보가 삭제됩니다.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>  
        </Dialog>
      </div>
      // <button onClick={(e) => { this.deleteCustomer(this.props.id) }}>삭제</button>
    )
  }
}

export default CustomerDelete;
