const fetchTracks = async () => {
    const endpoint = `https://api.deezer.com/chart`;
  
    const response = await fetch(endpoint);
    const data = await response.json();
  
    return data.tracks.data;
};

export default fetchTracks;