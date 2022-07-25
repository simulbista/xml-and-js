const clientId = "934888a502bd4c15866f51721924b16d";
const clientSecret = "8f979d0e265240088cc3a5ef186a7e68";


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
    return data.playlists.items;
}

const getTracks = async(token, playlistId) =>{
    const limit = 5;
    const result = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=${limit}`,{
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
    

    const list = document.getElementById(`genres`);

    genres.map(async({name,id}) => {

        const playlists = await getPlaylistsByGenre(token,id);

        // const playlistsList = playlists.map(({name, id,external_urls: { spotify },images: [icon]}) => {
        //     return `
        //     <li key="${id}">
                
        //         <a href="${spotify}" target ="_blank">
        //             <img src = "${icon.url}" width="200" height="200" alt="${name}"/>
        //         </a>
        //     </li>
        //     `
        // }).join(``);


        const playlistsList = await(await Promise.all(playlists.map(async ({name, id,external_urls: { spotify },images: [icon]}) => {

            const tracks = await getTracks(token,id);
            const tracksList = tracks.map(({track}) =>{
                const artistArray = track.artists.map(artist => artist.name).join(`,`);
                return track.name + '-' + artistArray;
            })

            console.log(tracksList);
            const track = tracksList.map((data) =>{
                return `<li>${data}</li>`
            }).join(``)

            return `
            <li key='id'>
                <a href="${spotify}" target ="_blank">
                    <img src = "${icon.url}" width="200" height="200" alt="${name}"/>
                </a>
                
                <ol>
                Track Name (Artists)
                    ${track}
                </ol>
            </li>
            `
            
        }))).join(``);

        // console.log(playlistsList);
        const html = `
            <article>
                <div id="genreTitle">${name}</div>
                <div class="playlists">
                    <ul>
                    ${playlistsList}
                    </ul>
                </div>
            </article>
        `;
        list.insertAdjacentHTML(`beforebegin`,html);
    });
   
}

loadGenres();