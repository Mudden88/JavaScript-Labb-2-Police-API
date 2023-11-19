document.addEventListener('DOMContentLoaded', () => {
  fetchCities()

  let form = document.getElementById('form')
  let refresh = document.getElementById('refreshBtn')

  form.addEventListener('submit', (e) => {

    e.preventDefault()

    let city = document.getElementById('cityText').value
    let pop = document.getElementById('cityPop').value
    let cityId = document.getElementById('cityId').value
    let selectValue = document.getElementById('select').value

    //2st olika objekt skickas in beroende på om ID är nödvändig info eller ej.

    let data = {
      name: city,
      population: parseInt(pop)
    }

    let dataId = {
      name: city,
      population: parseInt(pop),
      id: cityId
    }

    if (selectValue === 'Lägg till') {
      fetch('https://avancera.app/cities/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)

      })

    } else if (selectValue === 'Ta bort') {
      fetch(`https://avancera.app/cities/${cityId}`, {

        method: 'DELETE',

      })

    } else if (selectValue === 'Ändra') {
      fetch(`https://avancera.app/cities/${cityId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataId)
      })
    }
  })

  //Event till knapp för att uppdatera listan
  refresh.addEventListener('click', () => {

    fetchCities()
  })

  //Event för att kunna uppdatera listan när man trycker på skicka.
  //setTimout används då den inte ska uppdatera innan formuläret är klart.
  submitButton.addEventListener('click', () => {
    setTimeout(() => {
      fetchCities()
    }, "1000");
  })
})


//Funktion som hämtar städer
function fetchCities() {

  let resultDiv = document.getElementById('showCities')

  fetch('https://avancera.app/cities/')
    .then(response => response.json())
    .then(result => {

      resultDiv.innerHTML = ""

      for (let i = 0; i < result.length; i++) {

        resultDiv.innerHTML += "<div id='divClone'>" + "<p id='idNo'> ID: " +
          result[i].id + "<p id='cityName'> Namn: " + result[i].name +
          "<p id='pop'> Population: " + result[i].population + "</div>"
      }
    })
}
