function f(x) {
    return 23 * x + 2
}

let data = []
let x = new Array()
let y = new Array()

for (var i=20; i<40; i += .1) {
    let xval = i/10
    let yval = f(xval + (Math.random() - 0.5) * 1.3)
    data.push([xval, yval])
    x.push(xval)
    y.push(yval)
}

var regression = new jsregression.LinearRegression({
    alpha: 0.001,
    iterations: 1000,
    lambda: 0
})
var model = regression.fit(data)
console.log(model)

let actual_y = new Array()
let pred_y = new Array()
for (let i=0; i < x.length; i++) {
    pred_y.push(regression.transform([x[i]]))
    actual_y.push(f(x[i]))
}

var trace1 = {
    x: x,
    y: y,
    mode: "markers"
};

var trace2 = {
    x: x,
    y: pred_y
}

var trace3 = {
    x: x,
    y: actual_y
}

let datos = [trace1, trace2, trace3]

Plotly.newPlot('app', datos);
