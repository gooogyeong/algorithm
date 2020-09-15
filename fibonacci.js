// loop: returns nth fibonacci number
const nthFibonacci = function (n) {
    let fibArr = [0, 1];
    let currLeng = 2;
    if (n === 0) {return fibArr[n];}
    if (fibArr[n]) {
        return fibArr[n];
    }
    while (!fibArr[n]) {
        currLeng++;
        let newFib = fibArr[currLeng - 3] + fibArr[currLeng - 2];
        fibArr.push(newFib);
    }
    return fibArr[n];
}

// console.log(nthFibonacci(10))

// loop: returns fibonacci array of length n
const fibonacci = function(n) {
    let fibArr = [1, 1];
    let currLeng = 2;
    if (n <= 2) return fibArr.slice(0, n)
    while (!fibArr[n - 1]) {
        currLeng ++;
        let newFib = fibArr[currLeng  - 3] + fibArr[currLeng - 2];
        fibArr.push(newFib);
    }
    return fibArr;
}
//console.log(fibonacci(10000000))

// recursion: returns nth fibonacci number
const nthFibonacci = function(n) {
    const memo = arguments[1] || [1, 1]
    if (n <= 2) return memo[n - 1]
    if (memo[n]) return memo[n]
    return memo[n] = nthFibonacci(n - 2, memo) + nthFibonacci(n - 1, memo)
}
// console.log(nthFibonacci(10000))
// console.log(nthFibonacci(55))

// recursion: returns fibonacci array of length n
const fibonacci = function(n) {
    // const fibArr = [1, 1]
    if (n <= 2) return [1, 1].slice(0, n)
    const fibArr = fibonacci(n -1)
    fibArr.push(fibArr[n - 2] + fibArr[n - 3])
    return fibArr
}

//console.log(fibonacci(100))
//console.log(fibonacci(10000))
