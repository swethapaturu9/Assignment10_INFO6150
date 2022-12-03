import {DateTime} from "luxon";

const API_KEY = '133d78d4c19fbd1c70da54e3db1476fd';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';



const getWeatherData = (infoType, searchParams) => {

   const url = new URL(BASE_URL + "/" + infoType);
   url.search= new URLSearchParams({...searchParams, appid:API_KEY});


   return fetch(url)
   .then((res) => res.json())
   .then((data)=>data);


};


const formatCurrentWeather = (data) => {
   const {
       
    coord: {lat,lon},
    main: {temp, temp_min, temp_max},
    weather

   } = data

   const{main:details, icon} = weather[0];

   return {lat,lon,temp,temp_min,temp_max,details,icon}

}


const formatForecastWeather = (data) => {

     let {list,timezone} = data;
     list = list.slice(2,40).map(d=> {
      return {

        title: formatToLocalTime(d.dt, timezone, 'ccc'),
        temp: d.main.temp,
        temp_min: d.main.temp_min,
        temp_max: d.main.temp_max,
        icon: d.weather[0].icon 
      }
    });

    let list_firstday = list.slice(0,8);
    let list_secondday = list.slice(8,16);
    let list_thirdday = list.slice(16,24);
    let list_fourthday = list.slice(24,32);
    let list_fifthday = list.slice(32,40);
    
   return {list_firstday,list_secondday,list_thirdday,list_fourthday,list_fifthday};
}

const formatDailyWeather = (data1, data2,data3,data4,data5) => {

    let list_day = data1;
    let list_secondday = data2;
    let list_thirdday = data3;
    let list_fourthday = data4;
    let list_fifthday = data5;


    let max_temp=-100; 
    let min_temp=100;

    list_day.forEach(day => {
      if(day.temp_min<=min_temp)
           min_temp = day.temp_min;

      if(day.temp_max>=max_temp)
        max_temp = day.temp_max;   

    })
 
    list_day = list_day.slice(0,1).map(d=> {
        return {
  
        
          title: d.title,
          temp: d.temp,
          temp_min: min_temp,
          temp_max: max_temp,
          icon: d.icon 
        }
      });



    let max_temp1=-100; 
    let min_temp1=100;

    list_secondday.forEach(day => {
      if(day.temp_min<=min_temp1)
           min_temp1 = day.temp_min;

      if(day.temp_max>=max_temp1)
        max_temp1 = day.temp_max;   

    })
 
    list_secondday = list_secondday.slice(0,1).map(d=> {
        return {
  
        
          title: d.title,
          temp: d.temp,
          temp_min: min_temp1,
          temp_max: max_temp1,
          icon: d.icon 
        }
      });


      let max_temp2=-100; 
    let min_temp2=100;

    list_thirdday.forEach(day => {
      if(day.temp_min<=min_temp2)
           min_temp2 = day.temp_min;

      if(day.temp_max>=max_temp2)
        max_temp2 = day.temp_max;   

    })
 
    list_thirdday = list_thirdday.slice(0,1).map(d=> {
        return {
  
        
          title: d.title,
          temp: d.temp,
          temp_min: min_temp2,
          temp_max: max_temp2,
          icon: d.icon 
        }
      });


      let max_temp3=-100; 
      let min_temp3=100;
  
      list_fourthday.forEach(day => {
        if(day.temp_min<=min_temp3)
             min_temp3 = day.temp_min;
  
        if(day.temp_max>=max_temp3)
          max_temp3 = day.temp_max;   
  
      })
   
      list_fourthday = list_fourthday.slice(0,1).map(d=> {
          return {
    
          
            title: d.title,
            temp: d.temp,
            temp_min: min_temp3,
            temp_max: max_temp3,
            icon: d.icon 
          }
        });



        let max_temp4=-100; 
        let min_temp4=100;
    
        list_fifthday.forEach(day => {
          if(day.temp_min<=min_temp4)
               min_temp4 = day.temp_min;
    
          if(day.temp_max>=max_temp4)
            max_temp4 = day.temp_max;   
    
        })
     
        list_fifthday = list_fifthday.slice(0,1).map(d=> {
            return {
      
            
              title: d.title,
              temp: d.temp,
              temp_min: min_temp4,
              temp_max: max_temp4,
              icon: d.icon 
            }
          });



      return {list_day,list_secondday,list_thirdday,list_fourthday,list_fifthday};




}

const getFormattedWeatherData = async () => {
    const formattedCurrentWeather = await getWeatherData('weather', {
        lat: '42.3645',
        lon: '-71.0389',
        units:'metric',
    }).then(formatCurrentWeather);




    const formattedForecastWeather = await getWeatherData('forecast', {
       lat: '42.3645',
       lon: '-71.0389',
       exclude: 'current,minutely,alerts', 
       units:'metric',
    }).then(formatForecastWeather)

  
    const {list_firstday,list_secondday,list_thirdday,list_fourthday,list_fifthday} = formattedForecastWeather;

    const formattedDailyWeather = formatDailyWeather(list_firstday,list_secondday,list_thirdday,list_fourthday,list_fifthday);
 
  


    return {...formattedCurrentWeather,...formattedDailyWeather};
}


const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Localtime: 'hh:mm a") => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };


