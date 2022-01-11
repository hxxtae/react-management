import './App.css';
import React, { Component } from 'react';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core/';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    width: '100%',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      customers: "",
      completed: 0
    }
  }

  stateRefresh = () => { 
    this.setState({
      customers: "",
      completed: 0
    });
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 80);
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
          <TableHead>
              <TableRow>
                <TableCell>번호</TableCell>
                <TableCell>이미지</TableCell>
                <TableCell>이름</TableCell>
                <TableCell>생년월일</TableCell>
                <TableCell>성별</TableCell>
                <TableCell>직업</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.customers ? this.state.customers.map(item => {
                return (
                  <Customer
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    birthday={item.birthday}
                    gender={item.gender}
                    job={item.job}
                    stateRefresh={this.stateRefresh}
                  >
                  </Customer>
                )
              }) : 
                <TableRow>
                  <TableCell colspan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh}></CustomerAdd>
      </div>
    );
  }
}

export default withStyles(styles)(App);
