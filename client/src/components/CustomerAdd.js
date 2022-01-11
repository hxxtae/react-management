import React, { Component } from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core';


const styles = theme => ({
  hidden: {
    display: 'none',
  }
});

class CustomerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false,
    }
  }

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    });
  }

  handleValueChange = (e) => {
    const textName = e.target.name;
    const textVal = e.target.value;
    this.setState({ [textName]: textVal });
  }

  addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData(); // form 데이터 폼 처리 객체 ★★★
    formData.append('image', this.state.file);
    formData.append('name', this.state.userName);
    formData.append('birthday', this.state.birthday);
    formData.append('gender', this.state.gender);
    formData.append('job', this.state.job);
    const config = {
      headers: {
        'content-type': 'multipart/form-data' // 전달하고자 하는 데이터에 file 이 포함되어 있을 때 설정해 주어야 한다. ★★★
      }
    }
    return post(url, formData, config); // axios.post();
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    
    this.addCustomer()
      .then(respense => {
        console.log(respense.data);
        this.props.stateRefresh();
      });
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    });
  }

  handleClickOpen = () => {
    this.setState({
      open: true
    });
  }

  handleClose = () => {
    this.setState({
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
          고객 추가하기
        </Button>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle>고객 추가</DialogTitle>
          <DialogContent>
            <input className={classes.hidden} accept="image/*" id="raised-button-file" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
            <label htmlFor="raised-button-file">
              <Button variant="contained" color="primary" component="span" name="file">
                {this.state.fileName === '' ? "프로필 이미지 선택" : this.state.fileName}
              </Button>
            </label>
            <br/>
            <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/><br/>
            <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
            <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
            <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
            <Button variant="contained" color="outline" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>

      // < @material-ui 미적용 >
      // <form id="custoemr-add" onSubmit={this.handleFormSubmit}>
      //   <h1>고객 추가</h1>
      //   프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
      //   이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input>
      //   생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></input>
      //   성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></input>
      //   직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></input>
      //   <button type="submit">추가하기</button>
      // </form>
    );
  }
}

export default withStyles(styles)(CustomerAdd);