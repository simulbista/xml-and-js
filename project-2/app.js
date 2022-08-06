const YOUR_ACCESS_KEY = `add461a708ec88dc1ac9dc8266bbd4bb`;
let _source = [];

// key value pair for countries
var countryMap = {ar:"Argentina",au:"Australia",at:"Austria",be:"Belgium",br:"Brazil",bg:"Bulgaria",
ca:"Canada",cn:"China",co:"Colombia",cz:"Czech Republic",eg:"Egypt",fr:"France",de:"Germany",
gr:"Greece",hk:"Hong Kong",hu:"Hungary",in:"India",id:"Indonesia",ie:"Ireland",il:"Israel",
it:"Italy",iq:"Iraq",jp:"Japan",lv:"Latvia",lt:"Lithuania",my:"Malaysia",mx:"Mexico",ma:"Morocco",
nl:"Netherlands",nz:"New Zealand",ng:"Nigeria",no:"Norway",ph:"Philippines",pl:"Poland",
pt:"Portugal",ro:"Romania",sa:"Saudi Arabia",rs:"Serbia",sg:"Singapore",sk:"Slovakia",
si:"Slovenia",za:"South Africa",kr:"South Korea",se:"Sweden",ch:"Switzerland",tw:"Taiwan",
th:"Thailand",tr:"Turkey",ae:"UAE",ua:"Ukraine",gb:"United Kingdom",us:"United States",el:"Venuzuela"}

// fetch data from the api
const getNews = async () => {
    const result = await fetch(`http://api.mediastack.com/v1/news?access_key=${YOUR_ACCESS_KEY}`);
    const data = await result.json();
    return data;
  };

//load data (filter if needed and render the html)
const loadNews = async(titleTerm,countryTerm) => {
    const news = await getNews();
    const list = document.getElementById(`news`);
    // filtering out news data which have null values for image field
    _source = news.data.filter((data) => data.image);
    
    //filtering by title
    if(Boolean(titleTerm)){
        const tTerm = titleTerm.toLowerCase().trim();
        _source = _source.filter(({title}) => title.toLowerCase().includes(tTerm));
    }

    //filtering by country
    if(Boolean(countryTerm) && countryTerm!=='all'){
        _source = _source.filter(({country}) => country===countryTerm);
    }
    //reset the older html content
    list.innerHTML = ``;
``
    _source.map(({title,category,country,image,url}) => {
        const html = `
            <article>
                <div id="newsImage">
                    <a href="${url}" target="_blank"><img src="${image}" alt="news_title_image" style="width:150px;height:150px;"></a>
                </div>
                <div id="content">
                    <h1 id='newsTitle'>Title: ${title.substring(0, 35)}...</h2>
                    <h4>Category: ${category}</h4> 
                    <h4>Country: ${countryMap[country]}</h4>
                </div>
            </article>
        `;
        list.insertAdjacentHTML("beforeend", html);
    })
}


loadNews();

const onSubmit = event =>{
    event.preventDefault();
    const titleTerm = event.target.titleTerm.value;
    const countryTerm = event.target.countryTerm.value;
    loadNews(titleTerm,countryTerm);
}

const onReset = () =>{
    loadNews();
}
