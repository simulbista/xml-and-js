const data = [
    { born: 1870, died: 1924 },
    { born: 1893, died: 1976 },
    { born: 1869, died: 1948 },
    { born: 1901, died: 1989 },
  ];

const age = data.map((item) => ({age: item.died - item.born}));
console.log("Calculated age for each item.");
console.log(age);
const filtered = age.filter((item) => item.age>75);
console.log("Filtered age greater than 75");
console.log(filtered);
console.log("get the item i.e. the oldest age.");
const oldest = filtered.reduce((acc,value) => acc > value.age ? acc: value.age,0);
console.log(oldest);


//chaining
const maxAge = data
.map((item) => ({age: item.died - item.born}))
.filter((item) => item.age>75)
.reduce((acc,value) => acc > value.age ? acc: value.age,0);
console.log("Oldest age with code chaining");
console.log(maxAge);