const YOUR_ACCESS_KEY = `4a71749bd71a07c6ee3f2a14b13ff58b`;

// sources,categories,date
const getNews = async () => {
    const result = await fetch(`http://api.mediastack.com/v1/news?access_key=${YOUR_ACCESS_KEY}`);
    const data = await result.json();
    // console.log(data);
    return data;
  };

const loadNews = async() => {
    const news = await getNews();
    const list = document.getElementById(`news`);
    // console.log(news.data);

    news.data.map(({source,category,country,image,url}) => {
        const html = `
            <article>
                <h2>${source}</h2>
                <h2>${category}</h2>
                <h2>${country}</h2>
                <h2>${url}</h2>
                <h3>......<h3>
            </article>
        `;

        list.insertAdjacentHTML("beforeend", html);
    })
}


loadNews();
