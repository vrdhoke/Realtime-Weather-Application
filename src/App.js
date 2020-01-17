import React from 'react';
import {Route,BrowserRouter as Router,Link,NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


var moment = require('moment');



const API_key = "ab04fa8d5a7790709fea1bac8075ba7f";


const Day = ({id,day}) => {
  
  
  return(
      <div>
      <h1>{day}</h1>
  
      {id.map(function(i,index) {
      let newDate = new Date();
      const weekday = i.dt * 1000
      newDate.setTime(weekday)      
      const imgURL = `owf owf-${i.weather[0].id} owf-5x`
      return (
      <div className="col-sm-2">
      <div className="card in">
        <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
        <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
        <i className={imgURL}></i>
        <h2>{Math.round(i.main.temp)} °F</h2>
        <div className="card-body">
          <p className="card-text">{i.weather[0].description}</p>
        </div>
      </div>
      </div>)
          //<h1>{i.dt_txt},{i.main.temp}</h1>        
      })}
      </div>
    );
}


const MainCard = ({id,day}) =>{
  let newDate = new Date();

  const first = id.slice(0,1);
  console.log(first);
  

  //console.log(id.length);
  //console.log(first.main.humidity);
  // const weekday = id.dt * 1000;
  // newDate.setTime(weekday);   
  // //const imgURL = `owf owf-${id.weather[0].id} owf-5x`
  return(
    <div>
    {first.map(function(i,index) {
    let newDate = new Date();
    const weekday = i.dt * 1000
    newDate.setTime(weekday)      
    const imgURL = `owf owf-${i.weather[0].id} owf-5x`
    return (
    <div className="col-sm-2">
    <div className="card in">
      <h4 className="card-title">{day}</h4>
      <h3 className="card-title">{moment(newDate).format('dddd')}</h3>
      <p className="text-muted">{moment(newDate).format('MMMM Do, h:mm a')}</p>
      <i className={imgURL}></i>
      <h2>{Math.round(i.main.temp)} °F</h2>
      <div className="card-body">
        <p className="card-text">{i.weather[0].description}</p>
      </div>
    </div>
    </div>)
        //<h1>{i.dt_txt},{i.main.temp}</h1>        
    })}
    </div>
  );
}



class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      items1:[],
      items2:[],
      items3:[],
      items4:[],
      items5:[],
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celcius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };
    this.getWeather();
  }

  getWeather = async() =>{

    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?q=Boston,us&appid=${API_key}`
    );

    const response = await api_call.json();

    console.log(response);
    console.log(response.list.length);
    // const items = response.list.slice(0,7);
    // console.log(items.length);

    this.setState({
      city:response.city.name,
      country:response.city.country,
      items1:response.list.slice(0,7),
      items2:response.list.slice(8,15),
      items3:response.list.slice(16,23),
      items4:response.list.slice(24,31),
      items5:response.list.slice(32,39)
    })
  };


  render(){
    return(
      

      <Router >
        <div className="App">   
        <h1 className="display-1 jumbotron"><Link className="deco" to="/">5-Day Forecast.</Link></h1>
        <h5 className="display-5 text-muted">Boston, US</h5>
        <div className="container">
          <div className="row justify-content-center">
          <Link to="/day1"><MainCard id={this.state.items1} day ={"Day 1"}/></Link>
          <Link to="/day2"><MainCard id={this.state.items2} day ={"Day 2"}/></Link>
          <Link to="/day3"><MainCard id={this.state.items3} day ={"Day 3"}/></Link>
          <Link to="/day4"><MainCard id={this.state.items4} day ={"Day 4"}/></Link>
          <Link to="/day5"><MainCard id={this.state.items5} day ={"Day 5"}/></Link>
          </div>
        </div>
        <div className="row justify-content-center">
          <Route path="/day1" exact strict render={(props)=><Day id={this.state.items1} day ={"Day 1 Every 3 hour forecast"}/>}/>
          <Route path="/day2" exact strict render={(props)=><Day id={this.state.items2} day ={"Day 2 Every 3 hour forecast"}/>}/>
          <Route path="/day3" exact strict render={(props)=><Day id={this.state.items3} day ={"Day 3 Every 3 hour forecast"}/>}/>
          <Route path="/day4" exact strict render={(props)=><Day id={this.state.items4} day ={"Day 4 Every 3 hour forecast"}/>}/>
          <Route path="/day5" exact strict render={(props)=><Day id={this.state.items5} day ={"Day 5 Every 3 hour forecast"}/>}/>
       </div>  
        
      </div>
      </Router>  

      // <div className="App">
      // <Weather city={this.state.city} 
      // country={this.state.country} 
      // temp_celius={this.state.celcius}
      // temp_max={this.state.temp_max}
      // temp_min={this.state.temp_min}
      // description={this.state.description}
      // />
      // </div>
    );
  }
}

export default App;
