import React from 'react';
import {post} from 'axios'; // 백엔더와 프론트엔더와 상호 통신을 위한 라이버리설치
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  hidden: {
    display:'none'
  }
})

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
      open: false
    }
  }

  handleFormSubmit = (e) => {
    e.preventDefault()
    this.addCustomer()
      .then((response) => {
        console.log(response.data);
        this.props.stateRefresh(); // props값으로 전달받은 값을 수행
      })
    this.setState({
      file: null,
      userName:'',
      birthday:'',
      gender:'',
      job:'',
      fileName:'',
      open: false
    })    
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

  handleClickOpen =() => {
    this.setState({
      open: true
    });
  }

  handleClose =() => {
    this.setState({      
        file: null,
        userName:'',
        birthday:'',
        gender:'',
        job:'',
        fileName:'',
        open: false
      });    
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:0, borderBottom:'1px solid #ddd'}}>
          <h1 style={{marginLeft:15}}>고객리스트</h1>
          <Button variant="contained"
                  color="primary"
                  onClick={() => this.handleClickOpen()}
                  style={{margin:'21px 15px 0', height:40}}                
                  >
            고객 추가 하기
          </Button>
        </div>
        <Dialog open={this.state.open}>
          <DialogTitle style={{margin:'-20px 0 -50px'}}><h3>고객추가</h3></DialogTitle>
          <DialogContent>
            <p>              
              <input type="file"                     
                     file={this.state.file}
                     value={this.state.fileName}
                     onChange={this.handleFileChange}
                     className={classes.hidden}
                     accept="image/*"
                     id="raised-button-file"
              />
              <label htmlFor="raised-button-file">
                <Button variant="contained" color="primary" component="span" name="file" style={{width:'100%'}}>
                    {this.state.fileName === ""
                      ? "프로필 이미지 선택"
                      : this.state.fileName
                    }
                </Button>
              </label>
            </p>
            <p>
              <TextField label="이름" type="text"
                    name="userName"
                    value={this.state.userName}
                    onChange={this.handleValueChange}
              />
            </p>
            <p>
              <TextField label="생년월일" type="text"
                    name="birthday"
                    value={this.state.birthday}
                    onChange={this.handleValueChange}
              />
            </p>
            <p>
              <TextField label="성별" type="text"
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleValueChange}
              />
            </p>
            <p>
              <TextField label="직업" type="text"
                    name="job"
                    value={this.state.job}
                    onChange={this.handleValueChange}
              /> 
            </p>         
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" onClick={this.handleFormSubmit} style={{width:'70%'}}>추가</Button>
            <Button variant="outlined" color="primary" onClick={this.handleClose} style={{width:'30%'}}>닫기</Button>
          </DialogActions>
        </Dialog>
      </div>      
    );
  }
}

export default withStyles(styles)(CustomerAdd);