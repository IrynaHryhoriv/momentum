
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



function getRandomIntInclusive(min, max){
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


document.getElementById("greeting").innerHTML = `Good ${getTimeOfDay()},`;
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



// 5. quotes

const quoteText = document.querySelector('.quote');
const quoteAuthor = document.querySelector('.author');

let quoteNum = getRandomIntInclusive(0, 9);

async function getQuotes(lang) {  
  //const quotes = `quotes_${lang}.json`;
//    const quotes = `file:///Users/ywko/RS_S/momentum/data.json`;
//    const res = await fetch(quotes);
//    console.log(res);
//    const data = await res.json();
  if (lang === 'en') {
    quoteText.textContent = quotes_en.quotes[quoteNum].quote;
    quoteAuthor.textContent = quotes_en.quotes[quoteNum].author;
  } else {
    quoteText.textContent = quotes_ru[quoteNum].text;
    quoteAuthor.textContent = quotes_ru[quoteNum].author;
  }
}
getQuotes(lang);

const changeQuote = document.querySelector('.change-quote');
changeQuote.addEventListener('click', function() {
  let quoteNext = quoteNum;
  while (quoteNext === quoteNum) {
    quoteNext = getRandomIntInclusive(0, 9);
  }
  quoteNum = quoteNext;
  getQuotes(lang);
});






// 6 (7) audioPlayer

const playListContainer = document.querySelector('.play-list');
playList.forEach(el => {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = `${el.title} / ${el.duration}`;
  playListContainer.append(li);
});

const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const musicTrack = playListContainer.childNodes;
const currentTrackTitle = document.querySelector('.current-track-title');

let playNum = 0;
currentTrackTitle.textContent = playList[playNum].title;
let isPlay = false;
const audio = new Audio();

function playAudio() {
  audio.src = playList[playNum+1].src;
  play.classList.toggle('pause');
  musicTrack[playNum+1].classList.toggle('item-active');
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    currentTrackTitle.textContent = playList[playNum].title;
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
}
play.addEventListener('click', playAudio);


playPrev.addEventListener('click', function() {
  musicTrack[playNum].classList.remove('item-active');
  playNum === 0 ? playNum = playList.length - 1 : playNum--;
  isPlay = false;
  play.classList.remove('pause');
  playAudio();
});

function nextTrack() {
  musicTrack[playNum].classList.remove('item-active');
  playNum === playList.length - 1 ? playNum = 0 : playNum++;
  isPlay = false;
  play.classList.remove('pause');
  playAudio();
}

playNext.addEventListener('click', nextTrack);

musicTrack.forEach((el, index) => {
  el.addEventListener('click', function() {
    if (playNum === index && isPlay === true) {
      isPlay = true;
    } else {
      isPlay = false;
      play.classList.remove('pause');
      musicTrack[playNum].classList.remove('item-active');
    }
    playNum = index;
    playAudio();
  })
});

const currentTrackProgress = document.querySelector('.current-track-progress');
const currentTrackTime = document.querySelector('.current-track-time');

function TrackProgress() {
  currentTrackProgress.style.width = (Math.floor(audio.currentTime) * 100) / Math.floor(audio.duration) + '%';
  currentTrackTime.textContent = `${String(Math.floor(audio.currentTime / 60))}:${String(Math.floor(audio.currentTime % 60)).padStart(2, '0')} / ${playList[playNum].duration}`;
  if (currentTrackProgress.style.width === '100%') {
    currentTrackProgress.style.width = 0;
    nextTrack();
  }
}
setInterval (TrackProgress, 1000);

const currentTrackScale = document.querySelector('.current-track-scale');

currentTrackScale.addEventListener('click', function(currentDuration) {
  audio.currentTime = currentDuration.offsetX / parseInt(window.getComputedStyle(currentTrackScale).width) * audio.duration;  
})


audio.volume = .5;
const volumeBtn = document.querySelector('.volume-icon');
const volumeBar = document.querySelector('.volume-bar');
const volumeProgress = document.querySelector('.volume-progress');

volumeBtn.addEventListener('click', function() {
  if (audio.muted === false) {
    audio.muted = true;
    volumeProgress.style.width = 0;
  } else {
    audio.muted = false;
    volumeProgress.style.width = audio.volume * 100 + '%';
  }
  volumeBtn.classList.toggle('volume-icon-on');
});

volumeBar.addEventListener('click', function(changeVolume) {
  audio.muted = false;
  audio.volume = changeVolume.offsetX / parseInt(window.getComputedStyle(volumeBar).width);
  volumeProgress.style.width = audio.volume * 100 + '%';
  if (volumeBtn.classList.contains('volume-icon-on')) {
    volumeBtn.classList.remove('volume-icon-on');
  }
});


//8. translate



const langSelect = document.getElementById('language-select');

langSelect.addEventListener('change', function() {
  lang = langSelect.value;
  //showTime(lang);
  if (lang === 'en') {
    city.value = 'Minsk';
    yourName.placeholder = '[enter name]';
    city.placeholder = 'enter city please';
    
  } else {
    city.value = 'Минск';
    yourName.placeholder = '[введите имя]';
    city.placeholder = 'введите город';
  }
  loadSettings(lang);
  getWeather(lang);
  getQuotes(lang);
})




// 12. settings

const settingsTranslation =
  [
    {
      'en': 'Settings',
      'ru': 'Настройки'},
    {
      'en': 'Language',
      'ru': 'Язык'},
    {
      'en': 'Photo Gallery',
      'ru': 'Фото галерея'},
    {
      'en': 'Image Source',
      'ru': 'Источник фото'},
    {
      'en': 'Image Tags',
      'ru': 'Тег фото'},
    {
      'en': 'Еnter tag for photo please',
      'ru': 'Введите тег для фото'},
    {
      'en': 'Widgets',
      'ru': 'Виджеты'},
    {
      'en': 'Time',
      'ru': 'Время'},
    {
      'en': 'Date',
      'ru': 'Дата'},
    {
      'en': 'Greeting',
      'ru': 'Приветствие'},
    {
      'en': 'Weather',
      'ru': 'Погода'},
    {
      'en': 'Audio Player',
      'ru': 'Плеер'},
    {
      'en': 'Quote',
      'ru': 'Цитата'},
    {
      'en': 'ToDo List',
      'ru': 'Список дел'},
]

const settingsTitle = document.querySelector('.settings-title');
const settingsLang = document.querySelector('.language-label');
const photoGallary = document.querySelector('.photo-gallary');
const imageSource = document.querySelector('.image-source-label');
const imageTag = document.querySelector('.image-tag-label');
const imageTagInput = document.querySelector('.image-tag-input');
const widgets = document.querySelector('.widgets');
const labelTime = document.querySelector('.input-label-time');
const labelDate = document.querySelector('.input-label-date');
const labelGreeting = document.querySelector('.input-label-greeting');
const labelWeather = document.querySelector('.input-label-weather');
const labelPlayer = document.querySelector('.input-label-player');
const labelQuote = document.querySelector('.input-label-quote');
const labelTodo = document.querySelector('.input-label-todo');

const btnSettingsTitle = document.querySelector('.settings-button-title');
const btnTodoTitle = document.querySelector('.todo-button-title');

function loadSettings(lang) {
  settingsTitle.textContent = settingsTranslation[0][lang];
  settingsLang.textContent = settingsTranslation[1][lang];
  photoGallary.textContent = settingsTranslation[2][lang];
  imageSource.textContent = settingsTranslation[3][lang];
  imageTag.textContent = settingsTranslation[4][lang];
  imageTagInput.placeholder = settingsTranslation[5][lang];
  widgets.textContent = settingsTranslation[6][lang];
  labelTime.textContent = settingsTranslation[7][lang];
  labelDate.textContent = settingsTranslation[8][lang];
  labelGreeting.textContent = settingsTranslation[9][lang];
  labelWeather.textContent = settingsTranslation[10][lang];
  labelPlayer.textContent = settingsTranslation[11][lang];
  labelQuote.textContent = settingsTranslation[12][lang];
  labelTodo.textContent = settingsTranslation[13][lang];
  btnSettingsTitle.textContent = settingsTranslation[0][lang];
  btnTodoTitle.textContent = settingsTranslation[13][lang];
}

const settingsBtn = document.querySelector('.settings-button');
const settingsContainer = document.querySelector('.settings-container');

settingsBtn.addEventListener('click', function() {
  settingsContainer.classList.toggle('active');
});

const checkboxTime = document.getElementById('checkbox-time');
const checkboxDate = document.getElementById('checkbox-date');
const checkboxGreeting = document.getElementById('checkbox-greeting');
const checkboxWeather = document.getElementById('checkbox-weather');
const checkboxPlayer = document.getElementById('checkbox-player');
const checkboxQuote = document.getElementById('checkbox-quote');
const checkboxTodo = document.getElementById('checkbox-todo');

const greetingContainer = document.querySelector('.greeting-container');
const weatherContainer = document.querySelector('.weather');
const audioPlayer = document.querySelector('.player');
const quotesContainer = document.querySelector('.quotes');

checkboxTime.addEventListener('change', function() {
  checkboxTime.checked ? time.style.opacity = '1' : time.style.opacity = '0';
});
checkboxDate.addEventListener('change', function() {
  checkboxDate.checked ? dateContainer.style.opacity = '1' : dateContainer.style.opacity = '0';
});
checkboxGreeting.addEventListener('change', function() {
  checkboxGreeting.checked ? greetingContainer.style.opacity = '1' : greetingContainer.style.opacity = '0';
});
checkboxWeather.addEventListener('change', function() {
  checkboxWeather.checked ? weatherContainer.style.opacity = '1' : weatherContainer.style.opacity = '0';
});
checkboxPlayer.addEventListener('change', function() {
  checkboxPlayer.checked ? audioPlayer.style.opacity = '1' : audioPlayer.style.opacity = '0';
});
checkboxQuote.addEventListener('change', function() {
  checkboxQuote.checked ? quotesContainer.style.opacity = '1' : quotesContainer.style.opacity = '0';
});
checkboxTodo.addEventListener('change', function() {
  if (checkboxTodo.checked) {
    todoBtn.style.opacity = '1';
    todoContainer.style.opacity = '1';
  } else {
    todoBtn.style.opacity = '0';
    todoContainer.style.opacity = '0';
  }
});


//12. todo list

const todoBtn = document.querySelector('.todo-button');
const todoContainer = document.querySelector('.todolist-container');

todoBtn.addEventListener('click', function() {
  todoContainer.classList.toggle('active');
});

const arrTodoItems = [];
const newTodo = document.querySelector('.todo-new');
const listTodo = document.querySelector('.todo-list');

newTodo.addEventListener('change', function() {
  arrTodoItems.push(newTodo.value);
  const li = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');

  input.type = 'checkbox';
  input.id = newTodo.value;

  label.classList.add('todo-item-label');
  label.innerHTML = newTodo.value;
  label.htmlFor = newTodo.value;

  li.append(input)
  li.append(label)
  listTodo.append(li);
});