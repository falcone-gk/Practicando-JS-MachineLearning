function f(x, a) {
    return x ** 3 - a
};

function df(x) {
    return 3 * x ** 2
};

function newton_method(x0, a) {
    xt = x0
    i = 0

    while (Math.abs(f(xt, a)) > 10 ** -6) {
        i += 1
        xt = xt - f(xt, a)/df(xt)
    }

    return xt
}

console.log(newton_method(1, 100))
