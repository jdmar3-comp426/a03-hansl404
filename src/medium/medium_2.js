import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export function getavgMpg(arr) {
    let total_city_mpg = 0
    let total_highway_mpg = 0
    for (let i = 0; i < arr.length; i++) {
        let currentcar = arr[i]
        total_city_mpg += currentcar.city_mpg
        total_highway_mpg += currentcar.highway_mpg
    }
    let avg_city_mpg = total_city_mpg / arr.length
    let avg_highway_mpg = total_highway_mpg / arr.length

    return {avg_city_mpg, avg_highway_mpg}
}

// ???
export function getallYearStats(arr) {
    let years = []
    for (let i = 0; i < arr.length; i++) {
        years[i] = mpg_data[i].year
    }
    return getStatistics(years)
}

export function getratioHybrids(arr) {
    let num_hybrids = 0
    for (let i = 0; i < arr.length; i++) {
        let currentcar = mpg_data[i]
        if (currentcar.hybrid) {
            num_hybrids++
        }
    }
    return num_hybrids / arr.length
}

export const allCarStats = {
    avgMpg: getavgMpg(mpg_data),
    allYearStats: getallYearStats(mpg_data),
    ratioHybrids: getratioHybrids(mpg_data),
};


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */

export function getmakerHybrids(arr) {
    let all_hybrids = arr.filter(car => car.hybrid)

    let result = []

    all_hybrids.forEach(hybrid => {
        let make = hybrid.make
        let id = hybrid.id
        
        // check if the make is in the result array and if so find the index
        let already_registered = false
        let registered_index = -1
        for (let i = 0; i < result.length; i++) {
            if (result[i].make == make) {
                already_registered = true
                registered_index = i
            }
        }
        
        // put stuff onto the result array depending on if the make is already in it or not
        if (already_registered) {
            result[registered_index].hybrids.push(id)
        } else {
            result.push({make: make, hybrids: [id]})
        }
    })

    // sort by number of hybrids in the hybrids array
    result.sort((a,b) => b.hybrids.length - a.hybrids.length)

    return result
}

export function getavgMpgByYearAndHybrid(arr) {
    let result = {}
    let years = []

    // get all the years
    arr.forEach(car => {
        let car_year = car.year
        if (!years.contains(car_year)) {
            years.push(car_year)
        }
    })
    // sort the years by ascending order
    years.sort((a,b) => a - b)

    // get all the hybrids and nonhybrids for each year and append to result
    for (let i = 0; i < years.length; i++) {
        let year = years[i]
        let hybrids_of_year = arr.filter(car => car.hybrid && car.year == year)
        let nonhybrids_of_year = arr.filter(car => !car.hybrid && car.year == year)

        // put data in object
        let obj = {
            hybrid: getavgMpg(hybrids_of_year),
            notHybrid: getavgMpg(nonhybrids_of_year)
        }

        // put the data object in result with the appropriate key
        result[year] = obj
    }

    return result
    
}

export const moreStats = {
    makerHybrids: getmakerHybrids(mpg_data),
    avgMpgByYearAndHybrid: getavgMpgByYearAndHybrid(mpg_data)
};
