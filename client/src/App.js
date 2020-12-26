//import logo from './logo.svg';
import { Component } from 'react';
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
import CustomerAdd from './components/CustomerAdd';
//import SearchAppBar from './components/SearchAppBar';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

  const styles = theme => ({
    root: {
      width: '100%',      
    },
    paper: {
      margin: '0px',
    },    
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),        
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing.unit * 9,
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      width: '100%',
    },
    TableHead: {
      fontSize: '1.0rem'
    },
    inputInput: {
      paddingtop: theme.spacing.unit,
      paddingRight: theme.spacing.unit,
      paddingBottom: theme.spacing.unit,
      paddingLeft: theme.spacing.unit * 10,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 120,
        '&:focus': {
          width: 200,
        },
      },
    }
  });

class App extends Component {   

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    })
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  render() {
    const { classes } = this.props;
    const cellList = [
      "No",
      "프로필 이미지",
      "이름",
      "생년월일",
      "성별",
      "직업",
      "게시글 관리"
    ];

    return (         
        <div className={classes.root}>
          {/* <SearchAppBar /> */}
          <AppBar position="static">
            <ToolBar>
              <IconButton
                className={classes.menuButton}
                color="inherit"
                aria-label="Open drawer"
                >
                <MenuIcon />
              </IconButton>
              <Typography 
                className={classes.title}
                variant="h6"
                color="inherit"
                noWrap>
                  고객관리 시스템
              </Typography>
              <div className={classes.grow} />
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="검색하기"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </ToolBar>
          </AppBar>            
            
          <CustomerAdd stateRefresh={this.stateRefresh}/> {/*함수값을 props값으로 전달 */}
          
          <Paper className={classes.paper}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  {cellList.map(c => {
                    return <TableCell className={classes.TableHead}>{c}</TableCell>
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                { this.state.customers 
                  ? this.state.customers.map(c => {
                      return (                
                        <Customer
                          id={c.id}
                          image={c.image}
                          name={c.name}
                          birthday={c.birthday}
                          gender={c.gender}
                          job={c.job}
                          stateRefresh={this.stateRefresh}
                        />                
                    );
                  })
                  : ""                         
                }
              </TableBody>
            </Table>
          </Paper>
        </div>
    );
  }
}

export default withStyles(styles)(App);
