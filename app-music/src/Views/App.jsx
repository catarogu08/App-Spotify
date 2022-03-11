import React from 'react';
import '../Styles/App.css';

function App() {
  return (
    <div className="App">
      <header>
        <form action="">
        <label>
          Genero
          <input type="text" id="genre" name="genre" />
        </label>
        <hr />
        <label>
          Artista
          <input type="text" id="playlist" name="playlist" />
        </label>
        </form>
        <button>Enviar</button>
      </header>

    </div>
  );
}

export default App;
