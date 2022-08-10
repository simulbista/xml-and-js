/**
 * Function to get username and total age of user's vehicles
 * - should return a promise
 * @param {*} data - see shape in ../../data.example.json
 * @returns Array of objects:
 * [{
 *  userName - string,
 *  totalAgent - number
 * }]
 */
 const data = require("../data.example.json");


const getUserNameAndVehicleAge = data.map((item) => ({name: item.userName,item.vehicle.reduce((acc,item) => {
    return acc + item.age
},0)}));

module.exports = getUserNameAndVehicleAge;
