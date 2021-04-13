import getEnvVars from "../../environment";
// import {createClient} from "pexels"
const {apikeyM} = getEnvVars();
// const client = createClient('563492ad6f9170000100000100def160705549058757709fa28c4a8d')

export const fetchTracks = async () => {
    const endpoint = `https://api.deezer.com/chart`;
  
    const response = await fetch(endpoint);
    const data = await response.json();
  
    return data.tracks.data;
};

export const fetchGenres = async () => {
    const endpoint = `https://api.deezer.com/genre`;
    //const endpoint_m = `http://api.musixmatch.com/ws/1.1/music.genres.get?apikey=${apikeyM}`;
  
    const response = await fetch(endpoint);
    const data = await response.json();

    return data.data.slice(!0);
};

export const _getArtistImage = async (artist)=>{
    const response = await fetch(`https://api.deezer.com/search?q=${artist}`);
    const data = await response.json();

    const newData = data.data.shift();
    const image_url = newData.artist.picture_big;
    

    return image_url;
}

export const _getImageArray = async (artist)=>{
    const response = await fetch(`https://api.deezer.com/search?q=${artist}`);
    const data = await response.json();

    const newData = data.data.shift();
    

    return newData;
}

export const _fetchAlbums = async (artistID) => {

    const response = await fetch(`http://api.musixmatch.com/ws/1.1/artist.albums.get?artist_id=${artistID}&apikey=${apikeyM}`)
    const data = await response.json();
    
    //console.log(data.message.body.album_list);

    const promise = data.message.body.album_list.map((di)=>{
        const ids = di.album 
        
        return ids;
    });
    return promise;
}

export const _fetchArtists = async () =>{

    const response = await fetch(`http://api.musixmatch.com/ws/1.1/chart.artists.get?page=1&page_size=10&country=ca&apikey=${apikeyM}`)
    const data = await response.json();


    const promises = data.message.body.artist_list.map(async(artist)=>{

        const image = await _getArtistImage(artist.artist.artist_credits.artist_list.length > 0 ? artist.artist.artist_credits.artist_list[0].artist.artist_name : artist.artist.artist_name);
        //  console.log(image);
        // console.log(cont);
          
        return {
            ...artist,
            image_url: image
        }  
    });

    return Promise.all(promises);
};



