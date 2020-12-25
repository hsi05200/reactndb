import React from 'react';
import {post} from 'axios'; // 백엔더와 프론트엔더와 상호 통신을 위한 라이버리설치

class CustomerAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName:'',
      birthday:'',
      gender:'',
      job:'',
      fileName:'',        
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.addCustomer()
      .then((response) => {
        console.log(response.data);
      })
    this.setState({
      file: null,
      userName:'',
      birthday:'',
      gender:'',
      job:'',
      fileName:'',
    })
    window.location.reload();
  }

  handleFileChange = (e) => {
    this.setState({
      file: e.target.files[0],
      fileName: e.target.value
    })
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }

  addCustomer = () => {
    const url = '/api/customers';
    const formData = new FormData();
    formData.append('image', this.state.file);
    formData.append('name', this.state.userName);
    formData.append('birthday', this.state.birthday);
    formData.append('gender', this.state.gender);
    formData.append('job', this.state.job);
    const config = {
      headers: {
        'content-type': 'multipart/form-data' 
      }
    }
    return post(url, formData, config);
  }

  render() {
    return (
      <form className="customerForm" onSubmit={this.handleFormSubmit}>
        <h1>고객추가</h1>        
        <p>
          <label style={{marginRight:15}}>프로필 이미지</label>
          <input type="file"
                  name="file"
                  file={this.state.file}
                  value={this.state.fileName}
                  onChange={this.handleFileChange}
          />
        </p>

        <div>
          <p>
            <label>이름</label>
            <input type="text"
                  name="userName"
                  value={this.state.userName}
                  onChange={this.handleValueChange}
            />
          </p>
          <p>
            <label>생년월일</label>
            <input type="text"
                  name="birthday"
                  value={this.state.birthday}
                  onChange={this.handleValueChange}
            />
          </p>
        </div>

        <div>
          <p>
            <label>성별</label>
            <input type="text"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleValueChange}
            />
          </p>
          <p>
            <label>직업</label>
            <input type="text"
                  name="job"
                  value={this.state.job}
                  onChange={this.handleValueChange}
            />
          </p>
        </div>
        <button className="CtmSubmitBtn" type="submit">추가하기</button>
      </form>
    );
  }
}

export default CustomerAdd;