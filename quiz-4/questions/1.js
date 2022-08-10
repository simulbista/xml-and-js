/**
 * Function to get array of all states.
 * - with no duplicates
 * - should return a promise
 * @param {*} data - see shape in ../../data.example.json
 * @returns Array of strings, e.g ["value1", "value2"]
 */

const data = require("../data.example.json");


// const getAllStates = states.map((item) => `${item.address.state}`);

const getAllStates = data.map((item) => {return item.address.state});

module.exports = getAllStates;
