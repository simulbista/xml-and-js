const clientId = "934888a502bd4c15866f51721924b16d";
const clientSecret = "8f979d0e265240088cc3a5ef186a7e68";
let _data = [];


const getToken = async () =>{
    const result = await fetch(`https://accounts.spotify.com/api/token`,
    {
        method: `POST`,
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded",
            Authorization : "Basic " + btoa(clientId + ":" + clientSecret)
        },  
        body: "grant_type=client_credentials"
    });

    const data = await result.json();
    return data.access_token;
}


const getGenres = async(token) => {
    const result = await fetch(`https://api.spotify.com/v1/browse/categories?locale=sv_US`,
    {
        method: `GET`,
        headers: {
            Authorization : "Bearer " + token
        }
    });

    const data = await result.json();
    return data.categories.items;
}

const getPlaylistsByGenre = async(token, genreId) => {
    const limit = 10;

    const result = await fetch(`https://api.spotify.com/v1/browse/categories/${genreId}/playlists?limit=${limit}`,
    {
        method: `GET`,
        headers: {
            Authorization : "Bearer " + token,
        }
    });

    const data = await result.json();
    return data.playlists? data.playlists.items: [];
}


const getTracks = async(token, href) =>{
    const result = await fetch(href,{
        method: `GET`,
        headers:{
            Authorization : "Bearer " + token
        }
    });

    const data = await result.json();
    return data.items;
}



const loadGenres = async() => {
    const token = await getToken();
    const genres = await getGenres(token);

    _data = await Promise.all(genres.map(async (genre) =>{
        const playlists = await getPlaylistsByGenre(token,genre.id);

        const loadedPlaylists = await Promise.all(playlists.map(async (playlist) => {
            const tracks = await getTracks(token,playlist.tracks.href);
            return {...playlist,tracks};
        })
        );
        return {...genre, playlists: loadedPlaylists};
    }));
}

const renderGenres = (filterTerm,playlistTerm) => {
    source = _data;
    if(Boolean(filterTerm)){
        const fTerm = filterTerm.toLowerCase();
        source = source.filter(({name}) => name.toLowerCase().includes(fTerm));
    }

    if(Boolean(playlistTerm)){
        if(playlistTerm === 'with-playlist'){
            source = source.filter(({playlists}) => playlists.length > 0); 
        }else if(playlistTerm === 'without-playlist'){
            source = source.filter(({playlists}) => playlists.length === 0); 
        }
    }
    
    const html = source.reduce((acc, {name, playlists}) => {
        const playlistsHTML = playlists.reduce(
            (playListAcc, {name, external_urls: { spotify },images: [icon],tracks}) =>
            {
            const trackHTML = tracks.map(tr => {
                if(tr && tr.track){
                    return `<li>
                    ${tr.track.name}
                    </li>`
                }
            }).join(``);

            return (playListAcc +
                        `<li>
                            <a href="${spotify}" alt="${name} target ="_blank">
                                <img src = "${icon.url}" width="200" height="200""/>
                                <ol id="tracks">${trackHTML}</ol>
                            </a>
                        </li>`);
                    }, ``);
            return (
                acc + 
            `
            <article>
                <div id="genreTitle">${name}</div>
                <div class="playlists">
                    <ul>
                    ${playlistsHTML}
                    </ul>
                </div>
            </article>`
            );
        },
        ``
    );

    const list = document.getElementById(`genres`);
    list.innerHTML = html;
    console.log("Data rendered!");
};


loadGenres().then(() => {
    console.log("Data loaded!");
    renderGenres();
});

const onSubmit = event =>{
    event.preventDefault();
    const filterTerm = event.target.term1.value;
    const playlistTerm = event.target.term2.value;
    renderGenres(filterTerm,playlistTerm);
}

const onReset = () =>{
    renderGenres();
}