// intentional global variable - modified over the life of the web app
let myChart;

function bubbleGraphDataF(values) {
    return values.map((object) => { return { x: object["timestamp"]["seconds"] * 1000, y: object["numPeople"], r: object["CO2"] / 100 } })
}

function doubleLineGraphDataF(values) {
    return values.map((object) => { return { x: object["timestamp"]["seconds"] * 1000, y: object["numPeople"], r: object["CO2"] / 100 } })
}

function LineChartDataF(values, key) {
    return values.map((object) => { return { x: object["timestamp"]["seconds"] * 1000, y: object[key] } })
}

function scatterGraphDataF(values) {
    return values.map((object) => { return { x: object["numPeople"], y: object["CO2"] } })
}

function extractData(key, dataset, sensorPos) {
    return dataset[sensorPos].map((object) => { return object[key] })
}

// Can add Chart axis labels - https://www.chartjs.org/docs/latest/axes/labelling.html

function addBubbleChart(dataset) {
    // {x: time, y: numPeople, r: CO2/100}
    // requires r: object["CO2"] / 100 added to map in formatting as r determines size of bubble in pixels
    const data = {
        datasets: [{
            label: 'Sensor 1',
            data: dataset[0],
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            label: 'Sensor 2',
            data: dataset[1],
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        },
        {
            label: 'Sensor 3',
            data: dataset[2],
            backgroundColor: "#56B4E9",
            borderColor: "#56B4E9",
            borderWidth: 1
        },
        {
            label: 'Sensor 4',
            data: dataset[3],
            backgroundColor: "#009E73",
            borderColor: "#009E73",
            borderWidth: 1
        },
        {
            label: 'Sensor 5',
            data: dataset[4],
            backgroundColor: "#0072B2",
            borderColor: "#0072B2",
            borderWidth: 1
        },
        {
            label: 'Sensor 6',
            data: dataset[5],
            backgroundColor: "#CC79A7",
            borderColor: "#CC79A7",
            borderWidth: 1
        },
        ]
    };
    const config = {
        type: 'bubble',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    position: 'bottom',
                },
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addDoubleLineChart(barLineData) {
    // {x: time, y: numPeople, r: CO2}
    const data = {
        labels: extractData("x", barLineData, 0),
        datasets: [{
            type: 'line',
            label: 'numPeople',
            data: extractData("y", barLineData, 0),
            backgroundColor: "#000000",
            borderColor: "#000000",
            borderWidth: 1
        }, {
            type: 'line',
            label: 'Sensor 1',
            data: extractData("r", barLineData, 0),
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 2',
            data: extractData("r", barLineData, 1),
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 3',
            data: extractData("r", barLineData, 2),
            backgroundColor: "#56B4E9",
            borderColor: "#56B4E9",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 4',
            data: extractData("r", barLineData, 3),
            backgroundColor: "#009E73",
            borderColor: "#009E73",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 5',
            data: extractData("r", barLineData, 4),
            backgroundColor: "#0072B2",
            borderColor: "#0072B2",
            borderWidth: 1
        }]
    };
    const config = {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    position: 'bottom'
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addTimeLineChart(dataset) {
    // {x: time, y: CO2}
    const data = {
        datasets: [{
            label: 'Sensor 1',
            data: dataset[0],
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            label: 'Sensor 2',
            data: dataset[1],
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        },
        {
            label: 'Sensor 3',
            data: dataset[2],
            backgroundColor: "#56B4E9",
            borderColor: "#56B4E9",
            borderWidth: 1
        },
        {
            label: 'Sensor 4',
            data: dataset[3],
            backgroundColor: "#009E73",
            borderColor: "#009E73",
            borderWidth: 1
        },
        {
            label: 'Sensor 5',
            data: dataset[4],
            backgroundColor: "#0072B2",
            borderColor: "#0072B2",
            borderWidth: 1
        },
        ]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    position: 'bottom'
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addScatterChart(dataset) {
    // {x: numPeople, y: CO2}
    console.log("scatter")
    console.log(dataset)
    const data = {
        datasets: [{
            label: 'Sensor 1',
            data: dataset[0],
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            label: 'Sensor 2',
            data: dataset[1],
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        },
        {
            label: 'Sensor 3',
            data: dataset[2],
            backgroundColor: "#56B4E9",
            borderColor: "#56B4E9",
            borderWidth: 1
        },
        {
            label: 'Sensor 4',
            data: dataset[3],
            backgroundColor: "#009E73",
            borderColor: "#009E73",
            borderWidth: 1
        },
        {
            label: 'Sensor 5',
            data: dataset[4],
            backgroundColor: "#0072B2",
            borderColor: "#0072B2",
            borderWidth: 1
        },
        {
            label: 'Sensor 6',
            data: dataset[5],
            backgroundColor: "#CC79A7",
            borderColor: "#CC79A7",
            borderWidth: 1
        },
        ]
    };
    const config = {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                x: {
                    type: 'linear',
                    position: 'bottom'
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function addAutoLineChart(dataset) {
    // {x: time, y: CO2}
    const data = {
        datasets: [{
            type: 'line',
            label: 'Sensor 1',
            data: dataset[0],
            backgroundColor: "#D55E00",
            borderColor: "#D55E00",
            borderWidth: 1
        },
        {
            type: 'line',
            label: 'Sensor 2',
            data: dataset[1],
            backgroundColor: "#E69F00",
            borderColor: "#E69F00",
            borderWidth: 1
        }]
    };
    const config = {
        type: 'scatter',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                },
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    position: 'bottom'
                }
            }
        }
    };
    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}