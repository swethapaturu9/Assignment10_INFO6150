import React, { useEffect, useState } from 'react'
//import axios from 'axios';
import getFormattedWeatherData from './services/weatherService';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Day from './pages/Day'
import { iconUrlFromCode } from './services/weatherService';


function App() {


  //const url = "api.openweathermap.org/data/2.5/weather?q=boston&appid=d97a34a8d412a312e5e2824695a7ef6c"
  //const url = "api.openweathermap.org/data/2.5/weather?q=boston&appid=ea2adf9bf3c8b3348706b202404a1fa3" 

  const [weather, setWeather] = useState({
    details: "",
    icon: "",
    lat: 0,
    list_day: {},
    list_fifthday: {},
    list_fourthday: {},
    list_secondday: {},
    list_thirdday: {},
    lon: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0
  });



  useEffect(() => {
    const fetchWeather = async () => {


      await getFormattedWeatherData().then((data) => {

        setWeather(data);
      });
    };

    fetchWeather();
  }, []);


  console.log(weather);

  const{
    details,
    icon,
    lat,
    list_day,
    list_fifthday,
    list_fourthday,
    list_secondday,
    list_thirdday,
    lon,
    temp,
    temp_max,
    temp_min,
     
  
  } = weather;


 /*
   const{
     title,
     temp1,
     temp_min1,
     temp_max1,
     icon1
    } = arr1;

*/ 


  const arr1 = Object.values(list_day);
  const arr2 = Object.values(list_secondday);
  const arr3 = Object.values(list_thirdday);
  const arr4 = Object.values(list_fourthday);
  const arr5 = Object.values(list_fifthday,);
   











  
  

  return (

    <div className="app">
      <div className='container'>
        <div className='top'>
          <div className='today'>
            <p> Boston </p>
            <p> Today </p> 
          </div>
          <div className='temp'>
            <h1> {temp}°C  </h1>
          </div>
          <div className='desc'>
            <p> {details} </p>
          
          </div>
          <img src={iconUrlFromCode(icon)} alt="" />
        </div>
        
        <div className="forecast">
          <div className='bottom'>
          {
         arr1.map(arr=> (
            <div>
              <p> {arr.title} </p>
              <img className="desc_img" src={iconUrlFromCode(arr.icon)} alt="" />
            </div>
           ))
        }  
            <div className='lowest'>
            {
         arr1.map(arr=> (
            <div>
              <p> {arr.temp_min}°C </p>
            </div>
           ))
        }  
            </div>
            <div className='highest'>
            {
         arr1.map(arr=> (
            
            <div>
              <p> {arr.temp_max}°C </p>
           
            

            </div>
           ))
        }


            </div>
          </div>
         
          
          <div className='bottom'>
          {
         arr2.map(arr=> (
            <div>
              <p> {arr.title} </p>
              <img className="desc_img" src={iconUrlFromCode(arr.icon)} alt="" />
            </div>
           ))
        }  

            <div className='lowest'>
            {
         arr2.map(arr=> (
            <div>
              <p> {arr.temp_min}°C </p>
            </div>
           ))
        }  
            </div>
            <div className='highest'>
            {
         arr2.map(arr=> (
            <div>
              <p> {arr.temp_max}°C </p>
            </div>
           ))
        }  
            </div>
          </div>
         

          <div className='bottom'>
          {
         arr3.map(arr=> (
            <div>
              <p> {arr.title} </p>
              <img className="desc_img" src={iconUrlFromCode(arr.icon)} alt="" />
            </div>
           ))
        }  
            <div className='lowest'>
            {
         arr3.map(arr=> (
            <div>
              <p> {arr.temp_min}°C </p>
            </div>
           ))
        }  
            </div>
            <div className='highest'>
            {
         arr3.map(arr=> (
            <div>
              <p> {arr.temp_max}°C </p>
            </div>
           ))
        }  
            </div>
          </div>

         
          <div className='bottom'>

          {
         arr4.map(arr=> (
            <div>
              <p> {arr.title} </p>
              <img className="desc_img" src={iconUrlFromCode(arr.icon)} alt="" />
            </div>
           ))
        }  


            <div className='lowest'>
            {
         arr4.map(arr=> (
            <div>
              <p> {arr.temp_min}°C </p>
            </div>
           ))
        }  
            </div>
            <div className='highest'>
            {
         arr4.map(arr=> (
            <div>
              <p> {arr.temp_max}°C </p>
            </div>
           ))
        }  
            </div>
          </div>



          <div className='bottom'>

          {
         arr5.map(arr=> (
            <div>
              <p> {arr.title} </p>
              <img className="desc_img" src={iconUrlFromCode(arr.icon)} alt="" />
            </div>
           ))
        }  

            <div className='lowest'>
            {
         arr5.map(arr=> (
            <div>
              <p> {arr.temp_min}°C </p>
            </div>
           ))
        }  
            </div>
            <div className='highest'>
            {
         arr5.map(arr=> (
            <div>
              <p> {arr.temp_max}°C </p>
            </div>
           ))
        }  
            </div>
          </div>

          <Router>

            <Routes>

              <Route path='/Mon' element={<Day />}></Route>
              <Route path='/Tue' element={<Day />}></Route>
              <Route path='/Wed' element={<Day />}></Route>
              <Route path='/Thu' element={<Day />}></Route>
              <Route path='/Fri' element={<Day />}></Route>
              <Route path='/Sat' element={<Day />}></Route>
              <Route path='/Sun' element={<Day />}></Route>
            </Routes>
          </Router>


        </div>

      </div>
    </div>
  );
}

export default App;
