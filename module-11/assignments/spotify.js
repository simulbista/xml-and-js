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

const renderGenres = (term) => {
    let source = _data;
    if(Boolean(term)){
        const searchTerm = term.toLowerCase();

        source = source.filter(({name}) => name.toLowerCase().includes(searchTerm));
    }
    
    const html = source.reduce((acc, {name,playlists}) => {
        const playlistsHTML = playlists.reduce(
            (playListAcc, {name, external_urls: { spotify },images: [icon]}) => 
            playListAcc +
            `
            <li>
                <a href="${spotify}" alt="${name} target ="_blank">
                    <img src = "${icon.url}" width="200" height="200""/>
                </a>
            </li>`,    
            ``
        );
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
    const term = event.target.term.value;
    renderGenres(term);
}

const onReset = () =>{
    renderGenres();
}















// const loadGenres_old = async() => {
//     const token = await getToken();
//     const genres = await getGenres(token);
    

//     const list = document.getElementById(`genres`);

//     genres.map(async({name,id}) => {

//         const playlists = await getPlaylistsByGenre(token,id);

//         const playlistsList = await(await Promise.all(playlists.map(async ({name, id,external_urls: { spotify },images: [icon]}) => {

//             const tracks = await getTracks(token,id);
//             const tracksList = tracks.map(({track}) =>{
//                 const artistArray = track.artists.map(artist => artist.name).join(`,`);
//                 return track.name + '-' + artistArray;
//             })

//             console.log(tracksList);
//             const track = tracksList.map((data) =>{
//                 return `<li>${data}</li>`
//             }).join(``)

//             return `
//             <li key='id'>
//                 <a href="${spotify}" target ="_blank">
//                     <img src = "${icon.url}" width="200" height="200" alt="${name}"/>
//                 </a>
                
//                 <ol>
//                 Track Name (Artists)
//                     ${track}
//                 </ol>
//             </li>
//             `
            
//         }))).join(``);

//         // console.log(playlistsList);
//         const html = `
//             <article>
//                 <div id="genreTitle">${name}</div>
//                 <div class="playlists">
//                     <ul>
//                     ${playlistsList}
//                     </ul>
//                 </div>
//             </article>
//         `;
//         list.insertAdjacentHTML(`beforebegin`,html);
//     });
   
// }