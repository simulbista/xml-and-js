const timeout = (ms) => {
    return new Promise((resolve) => {
        setTimeout(resolve,ms);
    })
}

const generateRandomNumber = () => Math.floor(Math.random() * 40);

const generateData = async() =>{
    await timeout(1000);
    return Array.from({ length: 20 }, generateRandomNumber);
}

const convertToFeet = async(meters) => {
    const feet = meters * 3.2808;
    await timeout(3500);
    return feet;
}

const processData = async(data,callback) =>{
    const items = data.map(value => callback(value));
    return Promise.all(items);
}

const logResult = (meters, feet) =>{
    console.log(`Converted ${meters}m to ${feet}ft`);
}


const main = async() => {
    console.log("Start");
    const data = await generateData();
    const items = await processData(data,convertToFeet);
    for(let i=0;i<20;i++){
        logResult(data[i],items[i]);
    }
    console.log("Finish");
}

main();