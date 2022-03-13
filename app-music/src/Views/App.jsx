import React from 'react';
import axios from 'axios';
import '../Styles/App.css';
import { useEffect, useState } from 'react';


function App() {
  const CLIENT_ID = '9cbb7469c3104485bbd0298a0a0f98d7';
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";

  const [token, setToken] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", token)
    }

setToken(token)

  }, [])

  const logout = () => {
    setToken("")
    window.localStorage.removeItem("token")
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: {
        q: searchKey,
        type: "artist"
      }
    })
    setArtists(data.artists.item)
console.log(data);
  }

  const renderArtists = () => {
    return artists.map(artist => (
        <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt=""/> : <div>No Image</div>}
            {artist.name}
        </div>
    ))
}
return (
    <div className="App">
      <header className="App-header">
        <div>
          <h1 className='nameApp'>My Music App</h1>
        </div>
        {!token ?
          <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to spotify</a>
          : <button onClick={logout} className="logout">Logout</button>}

        {!token ?
                  <h2>Please Login</h2>
                  : <form onSubmit={searchArtists}>
          <input placeholder='Name of Artist' type="text" onChange={e => setSearchKey(e.target.value)} />
          <button type="submit" className="search">Search</button>
        </form>
        }
      {renderArtists()}
       </header>
    </div>
  );
}

export default App;
