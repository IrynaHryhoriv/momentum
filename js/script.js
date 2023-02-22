// time and greeting

function displayTime(){
    var d = new Date();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();

    if (hour < 10)
    hour = "0"+ hour;
    if (min < 10)
    min = "0" + min;
    if (sec < 10)
    sec = "0" + sec;
    document.getElementById("time").innerHTML = hour + ":" + min + ":" + sec;
}
setInterval(displayTime,1000);


function displayDate(){
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const monthOftheYear = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var d = new Date();
    let day = weekday[d.getDay()];
    var month = monthOftheYear[d.getMonth()];
    var numDayOfMonth = d.getDate();

    document.getElementById("date").innerHTML = day + ", " + month + " " + numDayOfMonth;
}
setInterval(displayDate,1000);








// function showDate(lang) {
//     const date = new Date();
//     const options = {month: 'long', day: 'numeric', weekday: 'long'};
//     const currentDate = date.toLocaleDateString(lang, options);
//     dateContainer.textContent = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);
//   }



