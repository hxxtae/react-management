import React, { Component } from 'react';
import { post } from 'axios';

class CustomerAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: ''
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
      fileName: ''
    });
  }

  render() {
    return (
      <form id="custoemr-add" onSubmit={this.handleFormSubmit}>
        <h1>고객 추가</h1>
        프로필 이미지: <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
        이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input>
        생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></input>
        성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></input>
        직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></input>
        <button type="submit">추가하기</button>
      </form>
    );
  }
}

export default CustomerAdd;