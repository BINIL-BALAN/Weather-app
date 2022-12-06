// https://api.openweathermap.org/data/2.5/weather?q=kakkanad&appid=8ac5c4d57ba6a4b3dfcf622700447b1e

document.querySelector('[class="btn btn-light mt-2 f-right"]').addEventListener('click', () => { 
  placename=place.value
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${placename}&appid=8ac5c4d57ba6a4b3dfcf622700447b1e`)
  .then((data)=>{
    return data.json()
  })
  .then((weatherData)=>{
    console.log(weatherData);
    displayDetails(weatherData)
  })
  
})

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
    <div class="place">${data.name}</div>
    <div class="state">Feel like ${Math.floor((data.main.feels_like) - 273.15)}&#x2103;</div>
    <div class="date-time">${timeAndDate()}</div>`
    
    moreDetail.innerHTML=moreDetails
    displayContent.innerHTML=contentData
} 
