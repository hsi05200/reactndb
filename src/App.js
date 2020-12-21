import { Component } from 'react';
//import logo from './logo.svg';
import React from "react";
import './App.css';
import Customer from './components/Customer';

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

class App extends React.Component {   
  render() {
    return (         
        <>          
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
        </> 
    );
  }
}

export default App;