// data from lord of the rings (lotr) api

const {default: axios} = require("axios");

//actual token added in vercel as an enviroment variable
// const token = process.env.LOTR_TOKEN;
const token = "JDqUYiAhsyc1RLFvNapQ";
const endpoint = "https://the-one-api.dev/v2";

const getAllBooks = async() =>{
    try{
        const {data} = await axios.get(`${endpoint}/book`);
        const x = await getChaptersByBook(`5cf5805fb53e011a64671582`);
        console.log(x.data);
        return {code: 200, data: JSON.stringify(data)};
    }catch(error){
        return {code:500,data: JSON.stringify({message: error.message})};
    }
}

const getAllMovies = async() =>{
    try{
        const {data} = await axios.get(`${endpoint}/movie`,{
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return {code: 200, data: JSON.stringify(data)};
    }catch(error){
        return {code: error.response.status||500,data: JSON.stringify({message: error.message})};
    }
}

const getAllChapters = async() =>{
    try{
        const {data} = await axios.get(`${endpoint}/chapter`,{
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return {code: 200, data: JSON.stringify(data)};
    }catch(error){
        return {code: error.response.status||500,data: JSON.stringify({message: error.message})};
    }
}

const getChaptersByBook = async(id) =>{
    try{
        const {data} = await axios.get(`${endpoint}//book/${id}/chapter`,{
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        return {code: 200, data: JSON.stringify(data)};
    }catch(error){
        return {code: error.response.status||500,data: JSON.stringify({message: error.message})};
    }
}


module.exports = {
    getAllBooks,
    getAllMovies,
    getAllChapters,
    getChaptersByBook,
}