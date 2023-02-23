// time and greeting

const dateContainer = document.getElementById("date");
const timeContainer = document.getElementById("time");

function displayTime() {
    var d = new Date();
    var hour = new String(d.getHours()).padStart(2, '0');
    var min = new String(d.getMinutes()).padStart(2, '0');
    var sec = new String(d.getSeconds()).padStart(2, '0');

    timeContainer.innerHTML = `${hour}:${min}:${sec}`;
}
setInterval(displayTime, 1000);


function displayDate() {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthOftheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var d = new Date();
    let day = weekday[d.getDay()];
    var month = monthOftheYear[d.getMonth()];
    var numDayOfMonth = d.getDate();

    dateContainer.innerHTML = `${day}, ${month} ${numDayOfMonth}`;
}
setInterval(displayDate, 1000);


// enter name

const yourName = document.querySelector('.name');

function setLocalStorageName() {
  localStorage.setItem('name', yourName.value);
}
window.addEventListener('beforeunload', setLocalStorageName);

function getLocalStorageName() {
  if (localStorage.getItem('name')) {
    yourName.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorageName);


// slider

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours > 4 && hours < 12) {
        return 'morning';
    }
    else if (hours >= 12 && hours <= 16) {
        return 'afternoon';
    }
    else if (hours >= 17 && hours <= 24) {
        return 'evening';
    }
}


function getRandomIntInclusive(min,max){
    min = Math.ceil(1);
    max = Math.floor(20);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const imgSourceSelect = document.getElementById('img-source');
const imgTag = document.getElementById('img-tag');



function getLocalStorageImg() {
    if (localStorage.getItem('imgSource')) {
      imgSourceSelect.value = localStorage.getItem('imgSource');
    }
    if (localStorage.getItem('imgTag')) {
      imgTag.value = localStorage.getItem('imgTag');
    }
  };
  
  window.addEventListener('load', function() {
    getLocalStorageImg();
  });
  
  imgSourceSelect.addEventListener('change', function() {
    setBg()
    localStorage.setItem('imgSource', imgSourceSelect.value);
  });
  
  imgTag.addEventListener('change', function() {
    setBg()
    localStorage.setItem('imgTag', imgTag.value);
  });


function getBgNumber(currentNumber) {
    return String(currentNumber).padStart(2, '0');
}

function setBg() {   
    const timeOfDay = getTimeOfDay();

    const img = new Image();
    var imgSrc = `https://raw.githubusercontent.com/IrynaHryhoriv/momentum_photos/master/images/${timeOfDay}/${getBgNumber(randomNum)}.jpg`;
    img.src = imgSrc;

    img.onload = () => {
        let imgStyle =  `url('${imgSrc}')`;
        document.body.style.backgroundImage = imgStyle;
    }
}
  
//   async function getLinkFromUnsplash() {
   
//     if (imgTag.value.length === 0) {
//       url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=_vrajOhpkeRmlTTVzv31VBoLLYutmg9XIyd8Ad9p0-Y`;
//     } else {
//       url = `https://api.unsplash.com/photos/random?query=${imgTag.value}&client_id=_vrajOhpkeRmlTTVzv31VBoLLYutmg9XIyd8Ad9p0-Y`;
//     }  
//     const res = await fetch(url);
//     const data = await res.json();
//     img.src = await data.urls.regular;
//   }
  
//    async function getLinkFromFlickr() {
   
//     if (imgTag.value.length === 0) {
//       url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d35a780e56c889998cbc7359352758c4&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
//     } else {
//       url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=d35a780e56c889998cbc7359352758c4&tags=${imgTag.value}&extras=url_l&format=json&nojsoncallback=1`;
//     }
//     const res = await fetch(url);
//     const data = await res.json();
//     const randomNum = Math.floor(Math.random() * data.photos.photo.length);
//     img.src = await data.photos.photo[randomNum].url_l;
//   }
  
  
function getSlidePrev() {
    if (randomNum === 1) {
      randomNum = 20;
    } else {
      randomNum--;
    }
    setBg();
}

function getSlideNext() {
    if (randomNum === 20) {
      randomNum = 1;
    } else {
      randomNum++;
    }
    setBg();
}

const arrowPrev = document.querySelector('.slide-prev');
const arrowNext = document.querySelector('.slide-next');
let randomNum = getRandomIntInclusive();


document.getElementById("greeting").innerHTML = `Good ${getTimeOfDay()}`;
setBg();
arrowPrev.addEventListener('click', getSlidePrev);
arrowNext.addEventListener('click', getSlideNext);



// weather

 const city = document.querySelector('.city');
 let url;
 let lang = "en";
 city.value = 'Minsk';


 //const lang === 'en' ? city.value = 'Minsk' : city.value = 'Минск';

// function setLocalStorageCity() {
//   localStorage.setItem('city', city.value);
// }
// city.addEventListener('change', setLocalStorageCity)

// function getLocalStorageCity() {
//   if (localStorage.getItem('city')) {
//     city.value = localStorage.getItem('city');
//     getWeather(lang);
//   }
// }
// window.addEventListener('load', getLocalStorageCity);

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherError = document.querySelector('.weather-error');

const weatherTranslation =
  [
    {
      'en': 'Wind speed',
      'ru': 'Скорость ветра'},
    {
      'en': 'm/s',
      'ru': 'м/с'},
    {
      'en': 'Humidity',
      'ru': 'Влажность'},
    {
      'en': 'Please enter your city to check the weather',
      'ru': 'Введите свой город, чтобы узнать погоду'},
    {
      'en': 'Error! The weather in ',
      'ru': 'Ошибка! Погода в городе "'},
    {
      'en': '" is unknown',
      'ru': '" неизвестна'}
  ]

  
async function getWeather(lang) {
  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=d35a780e56c889998cbc7359352758c4&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === 200) {
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    weatherError.textContent = undefined;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = weatherTranslation[0][lang] + ': ' + Math.round(data.wind.speed) + ' ' + weatherTranslation[1][lang];
    humidity.textContent = weatherTranslation[2][lang] + ': ' + Math.round(data.main.humidity) + '%';
  } else if (city.value === '') {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = weatherTranslation[3][lang];
    temperature.textContent = undefined;
    weatherDescription.textContent = undefined;
    wind.textContent = undefined;
    humidity.textContent = undefined;
  } else {
    weatherIcon.className = 'weather-icon owf';
    weatherError.textContent = weatherTranslation[4][lang] + city.value + weatherTranslation[5][lang];
    temperature.textContent = undefined;
    weatherDescription.textContent = undefined;
    wind.textContent = undefined;
    humidity.textContent = undefined;
  }
}
getWeather(lang);

city.addEventListener('change', function () {
   getWeather(lang);
});



// function showDate(lang) {
//     const date = new Date();
//     const options = {month: 'long', day: 'numeric', weekday: 'long'};
//     const currentDate = date.toLocaleDateString(lang, options);
//     dateContainer.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
//   }



