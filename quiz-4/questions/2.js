/**
 * Function to get array of all active users (not suspended users)
 * - should return a promise
 * @param {*} data - see shape in ../../data.example.json
 * @returns Array of users
 */
 const data = require("../data.example.json");

// const getActiveUsers = (data) => {};



const getActiveUsers = data.filter((item) => item.isSuspended === false);


module.exports = getActiveUsers;
