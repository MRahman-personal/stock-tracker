import { FC, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navigation/Navigation';
import Stocks from './Components/Stocks/Stocks';
import Favorites from './Components/Favorites/Favorites';

export const App: FC = () => {
const [favorites, setFavorites] = useState([])

useEffect(() => {
  let localFavorites = JSON.parse(localStorage.getItem("favorites"));
  if(localFavorites !== null)
    setFavorites(localFavorites)
}, []);

useEffect(() => {
  
}, [favorites]);

const handleFavorites = (stock) => {
  setFavorites([...favorites, stock ])
  window.localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Favorite added")
}

const removeFavorite = (stock) => {
  setFavorites(favorites.filter(x => x !== stock))
  window.localStorage.setItem("favorites", JSON.stringify(favorites));
  alert("Favorite removed")
}

  return (
    <BrowserRouter>
    <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Stocks handleFavorites={handleFavorites} />} />
          <Route path="/Favorites" element={<Favorites favorites={favorites} removeFavorite={removeFavorite}/>} />
        </Routes>
    </div>
    </BrowserRouter>
  );
};

export default App