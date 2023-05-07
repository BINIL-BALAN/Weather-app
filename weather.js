// https://api.openweathermap.org/data/2.5/weather?q=kakkanad&appid=8ac5c4d57ba6a4b3dfcf622700447b1e
window.addEventListener('load',()=>{
  fetchData('asia')
})

function displaySpinner(state){
  if(state){
    document.getElementById("loader").classList.add("spinner-border")
  }else{
    document.getElementById("loader").classList.remove("spinner-border")
  }
 
}

document.querySelector('.btn').addEventListener('click', () => { 
 let placename = place.value
 if(placename !== ''){
  displaySpinner(true)
  fetchData(placename)
 }else{
  document.getElementById("alertmsgsearch").innerHTML = `<p class="text-danger m-0 p-0">No place entered</p>`
    setTimeout(() => {
      document.getElementById("alertmsgsearch").innerHTML = null
    }, 2500);
  }
  
})

function fetchData(placename){
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${placename}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e`)
  .then((response)=>{
    if (response.ok) {
      return response.json();
    }else{
      setTimeout(() => {
        displaySpinner(false)
        document.getElementById("alertmsg").innerHTML = `<div class="alert mb-0 p-2 alert-danger w-50 mt-2 d-flex justify-content-center align-items-center">
        <span>No weather details available for this place</span> 
        <i class="fa-solid fa-triangle-exclamation ms-2"></i>
        </div>`
      }, 1000);
      setTimeout(() => {
        document.getElementById("alertmsg").innerHTML = null
      }, 2500);
      throw new Error('Something went wrong')
    }
  })
  .then((weatherData)=>{
    console.log('weather data',weatherData);
    setTimeout(() => {
      displaySpinner(false)
      displayDetails(weatherData)
    }, 2000);
  })
  .catch(e=>{
  //   alertmsg.innerHTML=`<div class="alert alert-danger" role="alert">
  //   error
  // </div>`
  console.log('error',e);
  })
}

function timeAndDate() {
  let day, amOrpm, hour = new Date().getHours()
  switch (new Date().getDay()) {
    case 0: day = "Sunday"
      break
    case 1: day = "Monday"
      break
    case 2: day = "Tuesday"
      break
    case 3: day = "Wensday"
      break
    case 4: day = "Thursday"
      break
    case 5: day = "Friday"
      break
    case 6: day = "Saturday"
      break
  }
  if (hour >= 0 && hour < 12) {
    amOrpm = 'am'
  } else {
    amOrpm = 'pm'
    hour = hour-12
  }
  return `${day + " " + hour + ':' + new Date().getMinutes() + " " + amOrpm}`
}
function clearScreen(){
  moreDetail.innerHTML=""
  displayContent.innerHTML=""
}
function displayDetails(data) {
  clearScreen()
  moreDetails = `<h6>More details</h6>
    <div class="detail-row">
        <h6 class="detail-title">Country</h6>
        ${data.sys.country}
    </div>
    <div class="detail-row">
        <h6 class="detail-title">Humidity</h6>
        ${data.main.humidity} %
    </div>
    <div class="detail-row">
        <h6 class="detail-title">Pressure</h6>
        ${data.main.pressure}
    </div>
    <div class="detail-row">
        <h6 class="detail-title">Wind</h6>
        ${data.wind.speed}
    </div>`

  contentData = `<div class="tempature">${Math.floor((data.main.temp) - 273.15)}<sup>&#x2103;</sup></div>
    <div class="place">${data.name} <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt=""></div>
    <div class="state">Feel like ${Math.floor((data.main.feels_like) - 273.15)}&#x2103;</div>
    <div class="date-time">${timeAndDate()}</div>` 
    moreDetail.innerHTML=moreDetails
    displayContent.innerHTML=contentData
} 
