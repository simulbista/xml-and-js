// data from lord of the rings (lotr) api

const {default: axios} = require("axios");

//actual token added in vercel as an enviroment variable
// const token = process.env.LOTR_TOKEN;
const token = "JDqUYiAhsyc1RLFvNapQ";
const endpoint = "https://the-one-api.dev/v2";


const getAllBooks = async() =>{
    try{
        const {data} = await axios.get(`${endpoint}/book`);
        // console.log(data);
        // const chapters = await getAllChapters();
        // let result = data.docs.map( async (data) => await getChaptersByBook(data._id));
        // console.log(result);
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

const getAllBooksWithChapters = async() => {
    // const {code1,data1} = await getAllBooks();
    // const {code2,data2} = await getAllChapters();
    // const books = JSON.parse(data1);
    // const chapters = JSON.parse(data2);
    // await Promise.all([
    //   getAllBooks(),
    //   getAllChapters()
    // ]);

    const data =  getAllBooks().then(({code,data}) => {
       // console.log("books",data);
        const books = JSON.parse(data);
        getAllChapters().then(({code,data})=>{
            //console.log("chapters",data);
            const chapters = JSON.parse(data);
            books.docs.map((book) => {
               // console.log(book);
                const bookChapters = chapters.docs.filter(chapter => chapter.book === book._id)
                //console.log( bookChapters.map(chapter => chapter.chapterName));
                // book
                return {...book,  chapters : bookChapters.map(chapter => chapter.chapterName)};
            })
        });
    });
        
    console.log(data.then(console.log))
}

const getAllChapters = async() =>{
    try{
        const {data} = await axios.get(`${endpoint}/chapter`,{
            headers: {
                Authorization: "Bearer " + token,
            },
        });

        // const result = _books.docs.map((book) => (data._id == _book._id))
        // chapters.filter(chapter => chapter._id == data._id)

    // _books.docs.map( book => {

    // });
        return {code: 200, data: JSON.stringify(data)};
    }catch(error){
        return {code: error.response.status||500,data: JSON.stringify({message: error.message})};
    }
}


// const getChaptersByBook = async(id) =>{
//     try{
//         const {data} = await axios.get(`${endpoint}//book/${id}/chapter`,{
//             headers: {
//                 Authorization: "Bearer " + token,
//             },
//         });
//         return {code: 200, data: JSON.stringify(data)};
//     }catch(error){
//         return {code: error.response.status||500,data: JSON.stringify({message: error.message})};
//     }
// }



module.exports = {
    getAllBooks,
    getAllMovies,
    getAllChapters,
    getAllBooksWithChapters,
}