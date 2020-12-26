import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import  Typography from '@material-ui/core/Typography';


class CustomerDelete extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      open: false
    } 
  }

  handleClickOpen =() => {
    this.setState({
      open: true
    });
  }

  handleClose =() => {
    this.setState({              
        open: false
      });    
  }

  deletedCustomer(id) {    
    const url = '/api/customers/' + id;
    fetch(url, {
      method: 'DELETE'
    });
    this.props.stateRefresh();
  }
  render() {

    return (
      <div>
        <Button 
          variant="contained"
          color="secondary"
          onClick={this.handleClickOpen}>삭제</Button>
        <Dialog open={this.state.open}>
          <DialogTitle onClose={this.handleClose} style={{justifyContent:'center', display:'flex'}}>
            <span style={{fontSize:18, fontWeight:600, color:'red'}}>
              [ 삭제경고!! ]
            </span>
          </DialogTitle>
          <DialogContent>
            <Typography gutterBottom style={{textAlign:'center', marginBottom:-5}}>
              <span style={{fontSize:13}}>
                선택한 고객정보가 삭제됩니다!<br />
                그래도 삭제하시겠습니까?
              </span>
            </Typography>
          </DialogContent>
          <DialogActions style={{justifyContent:'center'}}>
            <Button variant="contained"
                    color="primary"
                    onClick={(e) => {this.deletedCustomer(this.props.id)}}>
              삭제
            </Button>
            <Button variant="contained"
                    color="primary"
                    onClick={this.handleClose}>
              취소
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default CustomerDelete;