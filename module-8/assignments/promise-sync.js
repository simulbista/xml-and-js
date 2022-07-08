const inc = (a) =>{
    return new Promise((resolve)=>{
        resolve(a + 1);
    })
};

const sum = (a,b) =>{
    return new Promise((resolve)=>{
        resolve(a+b);
    })
};

const max = (a,b) => {
    return new Promise((resolve) => {
        resolve(a>b?a:b);
    })
};

const avg = async (a,b) =>{
    const s = await sum(a,b);
    return new Promise((resolve) => {
        resolve(s/2);
    })
};

const obj = {
    name : "Marcus Aurelius",
    split: function(sep = " "){
            return new Promise((resolve) => {
            resolve(this.name.split(sep));
        });
      }
};


class Person {
    constructor(name) {
      this.name = name;
    }
  
    static of(name) {
      return new Person(name);
    }
  
    split(sep = " ") {
      return new Promise((resolve) => {
        resolve(this.name.split(sep));
      })
    }
  }

const person = Person.of("Marcus Aurelius");

Promise.all([inc(5),sum(1,3),max(8,6),avg(8, 6),obj.split(),person.split()]).then((data) => {
    console.log("inc(5) =", data[0]);
    console.log("sum(1, 3) =", data[1]);
    console.log("max(8, 6) =", data[2]);
    console.log("avg(8, 6) =", data[3]);
    console.log("obj.split() =", data[4]);
    console.log("person.split() =", data[5]);
})