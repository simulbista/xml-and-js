const YOUR_ACCESS_KEY = `4a71749bd71a07c6ee3f2a14b13ff58b`;

// sources,categories,date
const getNews = async () => {
    const result = await fetch(`http://api.mediastack.com/v1/news?access_key=${YOUR_ACCESS_KEY}`);
    const data = await result.json();
    console.log(data);
    return data;
  };

  //returns the full name of the country by passing the abbreviation
  const getFullCountry = (key) =>{
        if(key==='eg') return "Egypt"; 
        if(key==='ma') return "Morocco";
        if(key==='iq') return "Iraq"; 
  }

const loadNews = async() => {
    const news = await getNews();
    const list = document.getElementById(`news`);
    // filtering out news data which have null values
    filteredNews = news.data.filter((data) => data.image);
    // console.log(filteredNews);
    filteredNews.map(({title,category,country,image,url}) => {
        const html = `
            <article>
                <h1>Title: ${title.substring(0, 35)}...</h2>
                <h4>Category: ${category} Country: ${getFullCountry(country)}</h4>
                <a href="${url}" target="_blank"><img src="${image}" alt="news_title_image" style="width:150px;height:150px;"></a>
            </article>
        `;

        list.insertAdjacentHTML("beforeend", html);
    })
}


loadNews();
