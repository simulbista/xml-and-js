// data from lord of the rings (lotr) api

const { default: axios } = require("axios");

//actual token added in vercel as an enviroment variable
const token = process.env.LOTR_TOKEN;
// const token = "JDqUYiAhsyc1RLFvNapQ";
const endpoint = "https://the-one-api.dev/v2";

const getAllBooks = async () => {
  try {
    const { data } = await axios.get(`${endpoint}/book`);
    return { code: 200, data: JSON.stringify(data) };
  } catch (error) {
    return { code: 500, data: JSON.stringify({ message: error.message }) };
  }
};

const getAllMovies = async () => {
  try {
    const { data } = await axios.get(`${endpoint}/movie`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return { code: 200, data: JSON.stringify(data) };
  } catch (error) {
    return {
      code: error.response.status || 500,
      data: JSON.stringify({ message: error.message }),
    };
  }
};

const getAllBooksWithChapters = async () => {
  try {
    const responses = await Promise.all([getAllBooks(), getAllChapters()]);
    const books = JSON.parse(responses[0].data);
    const chapters = JSON.parse(responses[1].data);
    const data = books.docs.map((book) => {
      const bookChapters = chapters.docs.filter(
        (chapter) => chapter.book === book._id
      );
      return {
        ...book,
        chapters: bookChapters.map((chapter) => chapter.chapterName),
      };
    });
    return { code: 200, data: JSON.stringify(data) };
  } catch (error) {
    return {
      code: error.response.status || 500,
      data: JSON.stringify({ message: error.message }),
    };
  }
};

const getAllChapters = async () => {
  try {
    const { data } = await axios.get(`${endpoint}/chapter`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return { code: 200, data: JSON.stringify(data) };
  } catch (error) {
    return {
      code: error.response.status || 500,
      data: JSON.stringify({ message: error.message }),
    };
  }
};


module.exports = {
  getAllBooks,
  getAllMovies,
  getAllChapters,
  getAllBooksWithChapters,
};
