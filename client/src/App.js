import { Component } from 'react';
//import logo from './logo.svg';
import React from "react";
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';

  const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto'
    },
    table: {
      minWidth: 677
    }
  })

  const customer = [
    {
      id: 1,
      image: 'https://placeimg.com/50/50/1',
      name:'홍길동',
      birthday: '961222',
      gender: '남자',
      job: '대학생'
    },
    {
      id: 2,
      image: 'https://placeimg.com/50/50/2',
      name:'사임당',
      birthday: '921011',
      gender: '여자',
      job: '회사원'
    },
    {
      id: 3,
      image: 'https://placeimg.com/50/50/3',
      name:'일지매',
      birthday: '930218',
      gender: '남자',
      job: '학원강사'
    }
  ]

class App extends Component {   
  render() {

    const { classes } = this.props;
    return (         
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                customer.map(c => {
                  return (                
                    <Customer
                      id={c.id}
                      image={c.image}
                      name={c.name}
                      birthday={c.birthday}
                      gender={c.gender}
                      job={c.job}            
                    />                
                  );
                })                         
              }
            </TableBody>
          </Table>
        </Paper> 
    );
  }
}

export default withStyles(styles)(App);