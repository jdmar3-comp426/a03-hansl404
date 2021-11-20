/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    return a + ' + ' + b + ' = ' + (a + b)
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    let result = []
    for (let i = 0; i < endNumber - startNumber + 1; i++) {
        result[i] = startNumber + i
    }
    return result
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    return {max: Math.min.apply(Math, numbers), min: Math.min.apply(Math, numbers)}
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let m = new Map()
    for (let i = 0; i < array.length; i++) {
        let element = array[i]
        if (m.has('' + element)) {
            m.set('' + element, m.get('' + element) + 1)
        } else {
            m.set('' + element, 1)
        }
    }
    let obj = {}
    for (let [key, value] of m) {
        let stringified = '' + key
        obj[stringified] = value
    }
    return obj
}
