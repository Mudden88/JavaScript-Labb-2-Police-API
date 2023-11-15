
document.addEventListener('DOMContentLoaded', () => {
  //Kör funktion som visar alla händelser
  getEvents()

  //Funktion för chart
  getChart()

  // Kod som skapar div element med attribut, lägger detta som child till main
  // skapar ett img element och lägger det som child till div elementet.
  let contentBox = document.createElement('div')
  contentBox.setAttribute('id', 'contentBox')

  let main = document.getElementById('main')
  main.appendChild(contentBox)

  let img = document.createElement('img')
  img.setAttribute('id', 'images')
  img.src =
    'https://upload.wikimedia.org/wikipedia/commons/a/a1/Sverige_FlaggKarta.svg'
  contentBox.appendChild(img)

  //Hämtar elementet som händelserna skall visas i:
  let resultBox = document.getElementById('resultBox')
  let button = document.getElementById('search')
  let menu = document.getElementById('myMenu')
  //Event för knapptryck:
  button.addEventListener('click', () => {
    let optionValue = menu.value
    //rensar målelementet för händelser inför ny sökning:
    resultBox.innerHTML = ""
    //if satser med vad som ska hända beroende på vilken stad man väljer.
    //varje stad har en function för att hämta händelser i nämnd stad.
    //varje stad har även en bild som visas till rätt stad.
    if (optionValue === 'gbg') {
      getEventsGBG()
      img.src =
        'https://goteborgkonst.se/wp-content/uploads/2023/02/Avenyn-och-Gotaplatsen-foto-Frida-Winter-1-2000x1200.jpg'
      console.log('filtrerar gbg')
    } else if (optionValue === 'sthlm') {
      getEventsSthlm()
      img.src =
        'https://images.aftonbladet-cdn.se/v2/images/28447ec5-e7a3-4e50-8477-7f35f366a0d3?fit=crop&format=auto&h=867&q=50&w=1300&s=207b70fc7a5791e0a70b6cad3d2b2d40934d61f2'
      console.log('filtrerar sthlm')
    } else if (optionValue === 'choice') {
      getEvents()
      img.src =
        'https://upload.wikimedia.org/wikipedia/commons/a/a1/Sverige_FlaggKarta.svg'
      console.log('Filtrerar alla städer')
    } else if (optionValue === 'mlmoe') {
      getEventsMlmoe()
      img.src =
        'https://sverigeslandskap.se/wp-content/uploads/2017/08/Tophorizontal-photo-6.png'
      console.log('filtrerar malmö')
    }
  })
})
//funktion som hämtar de 20 senaste händelserna och placerar dessa i resultBox elementet
function getEvents() {
  //Hämtar händelser ifrån API
  fetch('https://polisen.se/api/events').then(response => response.json()).then(
    result => {
      //Rensar tidigare händelser:
      resultBox.innerHTML = ""
      //loopar igenom de 20 första händelserna
      for (let i = 0; i < 20; i++) {
        //Visar händelserna i varsin div som får id nr via polisens egna id för händelsen.
        resultBox.innerHTML += "<div id=' " + result[i].id + "'>" +
          "<p id='name'>" + result[i].name + "<p id='summary'>" + result[i]
            .summary + "<p id='link'>" +
          "<a id='href' target='blank' href='https://www.polisen.se" + result[
            i].url + "'>Visa mer...</a>" + "</div>"
      }
    })
}
//funktion för att filtrera händelser i Göteborg:
function getEventsGBG() {
  fetch('https://polisen.se/api/events?locationname=Göteborg').then(response =>
    response.json()).then(result => {
      //Rensar tidigare händelser:
      resultBox.innerHTML = ""
      for (let i = 0; i < 20; i++) {
        resultBox.innerHTML += "<div id=' " + result[i].id + "'>" +
          "<p id='name'>" + result[i].name + "<p id='summary'>" + result[i]
            .summary + "<p id='link'>" +
          "<a id='href' target='blank' href='https://www.polisen.se" + result[
            i].url + "'>Visa mer...</a>" + "</div>"
      }
    })
}
//funktion som filtrerar händelser i stockholm.
function getEventsSthlm() {
  fetch('https://polisen.se/api/events?locationname=Stockholm').then(response =>
    response.json()).then(result => {
      //Variabel för att kunna rensa tidigare händelser:
      resultBox.innerHTML = ""
      for (let i = 0; i < 20; i++) {
        resultBox.innerHTML += "<div id=' " + result[i].id + "'>" +
          "<p id='name'>" + result[i].name + "<p id='summary'>" + result[i]
            .summary + "<p id='link'>" +
          "<a id='href' target='blank' href='https://www.polisen.se" + result[
            i].url + "'>Visa mer...</a>" + "</div>"
      }
    })
}
// Funktion som filtrerar händelser i malmö.
function getEventsMlmoe() {
  fetch('https://polisen.se/api/events?locationname=Malmö').then(response =>
    response.json()).then(result => {
      //Variabel för att kunna rensa tidigare händelser:
      resultBox.innerHTML = ""
      for (let i = 0; i < 20; i++) {
        resultBox.innerHTML += "<div id=' " + result[i].id + "'>" +
          "<p id='name'>" + result[i].name + "<p id='summary'>" + result[i]
            .summary + "<p id='link'>" +
          "<a id='href' target='blank' href='https://www.polisen.se" + result[
            i].url + "'>Visa mer...</a>" + "</div>"
      }
    })
}

function getChart() {
  //Chart som innehåller 3st fetch för att kunna hantera datan ifrån olika adresser:
  fetch('https://polisen.se/api/events?locationname=Göteborg').then(
    response => response.json()).then(chartResultGbg => {
      let counterGBG = 0
      let counterSthml = 0
      let counterMlmo = 0
      //counter variabeln kommer användas i "data" på charten.
      for (let i = 0; i < chartResultGbg.length; i++) {
        //räknar hur många händelser (objekt) som finns i fetchen.
        if (chartResultGbg[i] instanceof Object) {
          counterGBG++
        }
      }
      fetch('https://polisen.se/api/events?locationname=Stockholm').then(
        response => response.json()).then(chartResultSTHML => {
          for (let i = 0; i < chartResultSTHML.length; i++) {
            if (chartResultSTHML[i] instanceof Object) {
              counterSthml++
            }
          }
          fetch('https://polisen.se/api/events?locationname=Malmö')
            .then(response => response.json()).then(
              chartResultMlmoe => {
                for (let i = 0; i < chartResultMlmoe.length; i++) {
                  counterMlmo++
                }
                const ctx = document.getElementById('myChart');
                new Chart(ctx, {
                  type: 'bar',
                  data: {
                    labels: ['Stockholm', 'Göteborg', 'Malmö'],
                    datasets: [{
                      label: 'Antal händelser i storstäderna, maximalt 500st pga API',
                      data: [counterSthml, counterGBG,
                        counterMlmo
                      ],
                      borderWidth: 2
                    }]
                  },
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                });
              })
        })
    })

}
