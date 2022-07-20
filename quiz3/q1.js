// await func(1,2,3) => should return 1,2,3

// await func(`value`, 15, {}) => should return `value`, 15, {}

// await func() => should throw error

const func = (x,y,z) =>{
    let check=true;
    if(typeof x === "undefined"){
        check = false;
    }
    return new Promise((resolve,reject) => {
        if(check){
            return resolve([x,y,z]);
        }
        else
            return reject("No argument(s) passed!");
    })
       
}

const final =async() =>{
    try{
        console.log(await func(1,2,3));
        console.log(await func(`value`, 15, {}));
        console.log(await func());
    }catch(error){
        console.log(error);
    }   
}

final();
