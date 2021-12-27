import './App.css';
import React, { Component } from 'react';
import Customer from './components/Customer';


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
    return (
      <div>
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
      </div>
    );
  }
}

export default App;
