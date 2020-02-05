const kmeans = require('ml-kmeans');
const plotly = require('nodeplotlib');
const near = require('ml-nearest-vector');
const DataFrame = require('dataframe-js').DataFrame;
const linearAlgebra = require('linear-algebra')(),
    Matrix = linearAlgebra.Matrix;

function get_graphics() {

    const iris = require('js-datasets-iris')

    const cols = ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "specisies"]

    const df = new DataFrame(iris.data, cols)
    let y = df.select("specisies")
    let X = df.select("sepalWidth", "petalLength", "petalWidth")

    let centers = [[2, 1, 0], [2, 1, 4], [3, 0, 2]]
    let ans = kmeans(X.toArray(), 3, { initialization: centers });
    let c1 = ans.centroids[0].centroid
    let c2 = ans.centroids[1].centroid
    let c3 = ans.centroids[2].centroid
    let m_centroids = new Matrix([c1, c2, c3])
    let cent_trans = m_centroids.trans()

    let g1 = new Array()
    let g2 = new Array()
    let g3 = new Array()

    for (let i=0; i < X.dim()[0]; ++i) {

        var vector = X.toArray()[i]
        var c_nearest = near.findNearestVector(m_centroids.data, vector)
        var ind = m_centroids.data.indexOf(c_nearest)

        if (ind == 0) {
            g1.push(vector)
        } else if (ind == 1) {
            g2.push(vector)
        } else {
            g3.push(vector)
        }
    };

    function show_scatter(arr) {
        const scatter = {
            x: arr.data[0],
            y: arr.data[1],
            z: arr.data[2],
            mode: 'markers',
            type: 'scatter3d'
        }
        return scatter
    }

    let gr1 = show_scatter(new Matrix(g1).trans())
    let gr2 = show_scatter(new Matrix(g2).trans())
    let gr3 = show_scatter(new Matrix(g3).trans())
    let gr_c = show_scatter(cent_trans)

    let arr_scatters = [gr1, gr2, gr3, gr_c]

    return arr_scatters
}

function show_model() {
    let arr = get_graphics()
    var layout = {
        width: 1000,
        height: 1000
    }
    plotly.plot(arr, layout)
}

show_model()
