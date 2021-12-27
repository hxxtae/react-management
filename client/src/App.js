import './App.css';
import React, { Component } from 'react';
import Customer from './components/Customer';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core/';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  root: {
    width: '100%',
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})

const customers = [
  {
    id: 1,
    image: 'https://placeimg.com/64/64/1',
    name: '김희태',
    birthday: '940413',
    gender: '남자',
    job: '직장인'
  },
  {
    id: 2,
    image: 'https://placeimg.com/64/64/2',
    name: '남예찬',
    birthday: '940902',
    gender: '남자',
    job: '직장인'
  },
  {
    id: 3,
    image: 'https://placeimg.com/64/64/3',
    name: '김태호',
    birthday: '930403',
    gender: '남자',
    job: '직장인'
  },
  {
    id: 4,
    image: 'https://placeimg.com/64/64/4',
    name: '김성태',
    birthday: '941124',
    gender: '남자',
    job: '직장인'
  }];

class App extends Component {

  render() {
    const { classes } = this.props;
    return (
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
            {customers.map(item => {
              return (
                <Customer
                  key={item.id}
                  id={item.id}
                  image={item.image}
                  name={item.name}
                  birthday={item.birthday}
                  gender={item.gender}
                  job={item.job}
                >
                </Customer>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);
