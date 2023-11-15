document.addEventListener('DOMContentLoaded', () => {
  storageOutput()
  getStations()
  msgbox()

  let button = document.getElementById('btnFindPs')
  let showAll = document.getElementById('showAll')

  //Array för localstorage
  let itemValues = []

  button.addEventListener('click', () => {

    //Här sparas inmatningen från userInput i itemValues arrayen.
    //itemValues sparas i localStorage för att kunna visas upp senare.
    let userInput = document.getElementById('search-Ps')

    itemValues.push(userInput.value)
    localStorage.setItem('search', JSON.stringify(itemValues))
    console.log(localStorage.getItem('search'))

    //funktion för att söka polisstation
    searchPS()

  })
  showAll.addEventListener('click', () => {
    //funktion för att lista samtliga polisstationer
    listAll()
  })

})

function listAll() {
  fetch('https://polisen.se/api/policestations')
    .then(response => response.json())
    .then(result => {
      resultStations.innerHTML = ""
      for (let i = 0; i < result.length; i++) {
        resultStations.innerHTML +=
          "<div id=' " + result[i].id +
          "'>" +
          "<p id='name'>" +
          result[i].name +
          "<p id='location'>" + result[i]
            .location
            .name +
          "<p id='stationUrl'>" +
          "<a id='href' target='blank' href='" +
          result[i].Url +
          "'>Till station</a>" +
          "</div>";
      }
    })
}

// Funktion som hämtar de första 20 polisstationerna och presenterar
//dessa i varsin div.

function getStations() {
  //Hämtar händelser ifrån API
  fetch('https://polisen.se/api/policestations')
    .then(response => response.json())
    .then(result => {
      resultStations.innerHTML = ""

      for (let i = 0; i < 20; i++) {
        resultStations.innerHTML += "<div id=' " + result[i].id +
          "'>" +
          "<p id='name'>" +
          result[i].name + "<p id='location'>" + result[i]
            .location.name +
          "<p id='stationUrl'>" +
          "<a id='href' target='blank' href='" +
          result[i].Url + "'>Till station</a>" +
          "</div>";
      }
    })
}

function storageOutput() {
  let webStore = document.getElementById('webStore')

  let parsedValues = JSON.parse(localStorage.getItem('search'))
  for (let i = 0; i < parsedValues.length; i++) {
    webStore.innerHTML = "<h2>Senaste sökningar: </h2>"
    webStore.innerHTML += "<p>" + parsedValues
  }
}

function searchPS() {
  let webStore = document.getElementById('webStore')

  let parsedValues = JSON.parse(localStorage.getItem('search'))
  for (let i = 0; i < parsedValues.length; i++) {
    webStore.innerHTML = "<h2>Senaste sökningar: </h2>"
    webStore.innerHTML += "<p>" + parsedValues
  }

  fetch('https://polisen.se/api/policestations')
    .then(response => response.json())
    .then(result => {

      resultStations.innerHTML = ""

      //filtrear sökresultat för att visa samtliga som innhåller det
      //användaren skriver in.
      let userInput = document.getElementById('search-Ps').value

      let filterData = result.filter(item =>
        item.name.includes(userInput))

      filterData.forEach(station => {
        resultStations.innerHTML +=
          "<div id=' " + station
            .id + "'>" +
          "<p id='name'>" +
          station.name +
          "<p id='location'>" +
          station
            .location.name +
          "<p id='stationUrl'>" +
          "<a id='href' target='blank' href='" +
          station.Url +
          "'>Till station</a>" +
          "</div>";
      })
      //Felmeddelande presenteras om sökningen inte gav några träffar
      if (filterData.length === 0) {
        resultStations.innerHTML +=
          "<div> <p id='error'> Kunde inte hitta någon station, sök igen."
      }
    })
}



//Funktion som visar en ruta med text när man hovrar över sökrutan.
// rutan med text försvinner när man trycker på hitta knappen.
// samtliga element och text skapas i funktionen.

function msgbox() {
  let main = document.getElementById('mainFind')
  let info = document.createElement('p')
  info.setAttribute('id', 'infoText')
  main.appendChild(info)
  let txt = document.createTextNode(
    'Skriv in stad för att söka polisstation. Klicka i textrutan för att stänga detta meddelande'
  )
  info.appendChild(txt)

  let userInput = document.getElementById('search-Ps')

  //Gömmer elementet i CSS tills eventet startas.

  userInput.addEventListener('mouseover', () => {
    document.getElementById('infoText').style.display = "inline"
  })
  userInput.addEventListener('click', () => {
    document.getElementById('infoText').style.display = "none"
  })
}
