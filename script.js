function addAQReadingInformation() {
  let numPeopleElem = document.getElementById("numPeople")
  let co2ReadingElems = [document.getElementById("CO21"), document.getElementById("CO22"), document.getElementById("CO23"), document.getElementById("CO24"), document.getElementById("CO25")]
  // console.log({ firebase, db });
  for (let i = 0; i < co2ReadingElems.length; i++) {
    if (dataEntryErrors(co2ReadingElems[i].value, numPeopleElem.value)) {
      return
    }
  }
  // Uploads each datapoint separately - can be done more efficiently
  for (let i = 0; i < co2ReadingElems.length; i++) {
    // Replace test with the name of your Firebase collection
    db.collection("test")
      .add({
        CO2: parseInt(co2ReadingElems[i].value),
        numPeople: parseInt(numPeopleElem.value),
        sensorPos: parseInt(i + 1),
        // Adds timestamp from Firebase server
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        // Reset all readings to 0 for the next user
        let co2ReadingElems = [document.getElementById("CO21"), document.getElementById("CO22"), document.getElementById("CO23"), document.getElementById("CO24"), document.getElementById("CO25")]
        document.getElementById("numPeople").value = 0
        co2ReadingElems.forEach((element) => {
          element.value = null
        })
        // could add a data submitted message
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }
}

// Function for automated Bboard Data
function BboardData() {
  Promise.all([
    // Replace API keys in URLs with your own from the Bboard Cloud
    fetch('https://cloud.brilliantlabs.ca/api?key=YOURAPIKEY&cmd=GET_FEED_DATA&feed=Bboard1&all=true'),
    fetch('https://cloud.brilliantlabs.ca/api?key=YOURAPIKEY&cmd=GET_FEED_DATA&feed=Bboard2&all=true')
  ]).then(function (responses) {
    // Get a JSON object from each of the responses
    return Promise.all(responses.map(function (response) {
      return response.json();
    }));
  }).then(function (data) {
    // could add data screening to prevent 0 values from affecting graph
    var dataset = []
    dataset[0] = sortBboardData(data[0].result.data)
    dataset[1] = sortBboardData(data[1].result.data)
    if (myChart) {
      myChart.destroy();
    }
    addAutoLineChart(dataset)
  }).catch(function (error) {
    // if there's an error, log it
    console.log(error);
  });
}

function sortBboardData(values) {
  return values.map((object) => { return { x: object["timestamp"], y: object["value"] } })
}

function getReadings(key, data) {
  let values = []
  data.forEach((object) => {
    values.push(object[key])
  });
  return values
}

function dataEntryErrors(co2, numPeople) {
  if (co2 == 0) {
    document.getElementById("errorMessage").textContent = "please fill the form in fully"
    return true
  } else if ((co2 < 100) || (co2 > 7000)) {
    document.getElementById("errorMessage").textContent = "please check you have entered your CO2 data correctly"
    return true
  } else if (numPeople <= 0) {
    document.getElementById("errorMessage").textContent = "please fill in the number of people"
    return true
  } else {
    document.getElementById("errorMessage").textContent = ""
    return false
  }
}

function querySnapshotToArray(qs) {
  let values = []
  qs.forEach((doc) => {
    // ... = spread operator - expand doc.data properties into a new object that is alongside id
    values.push({ id: doc.id, ...doc.data() })
  });
  return values
}

function readDocsButtonPressed() {
  // Replace test with the name of your Firebase collection
  db.collection("test")
    .orderBy("timestamp", "asc")
    .get()
    .then((querySnapshot) => {
      values = querySnapshotToArray(querySnapshot)
      generateGraph()
    });
}

function sepDataBySensorPos(values, sensorN) {
  data = []
  values.forEach((object) => {
    if (object["sensorPos"] == sensorN) {
      data.push(object)
    }
  });
  return data
}

function submitData() {
  addAQReadingInformation()
}

function toggleData() {
  // Reference hard-coded datasets here
  dataType = document.getElementById("dataSelect").value
  if (dataType == "COPData") {
    values = COPData
  } else if (dataType == "SatData") {
    values = SatData
  } else if (dataType == "SunData") {
    values = SunData
  } else if (dataType == "TateData") {
    values = TateData
  } else if (dataType == "BboardData") {
    BboardData()
    return
  }
  generateGraph()
}

function generateGraph() {
  console.log(values)
  dataset = []
  let graphType = document.getElementById("graphSelect").value
  for (let i = 1; i < 6; i++) {
    data = sepDataBySensorPos(values, i)
    if (graphType == "bubbleGraph") {
      data = bubbleGraphDataF(data)
    } else if (graphType == "doubleLineGraph") {
      data = doubleLineGraphDataF(data)
    } else if (graphType == "CO2LineGraph") {
      data = LineChartDataF(data, "CO2")
    } else if (graphType == "scatterGraph") {
      data = scatterGraphDataF(data)
    }
    dataset.push(data)
  }
  console.log(dataset)
  if (myChart) {
    myChart.destroy();
    // we can also use myChart.update - however, didn't seem to change the axes scales
    // myChart.data.datasets[0].data = dataset[0]
    // myChart.data.datasets[1].data = dataset[1]
    // myChart.data.datasets[2].data = dataset[2]
    // myChart.data.datasets[3].data = dataset[3]
    // myChart.data.datasets[4].data = dataset[4]
    // myChart.data.datasets[5].data = dataset[5]
    // myChart.data.datasets[6].data = dataset[6]
    // myChart.update();
  }
  if (graphType == "bubbleGraph") {
    addBubbleChart(dataset)
  } else if (graphType == "doubleLineGraph") {
    addDoubleLineChart(dataset)
  } else if (graphType == "CO2LineGraph") {
    addTimeLineChart(dataset)
  } else if (graphType == "scatterGraph") {
    addScatterChart(dataset)
  }
}