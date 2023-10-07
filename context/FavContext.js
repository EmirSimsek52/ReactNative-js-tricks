import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export function useFavorites() {
  return useContext(FavoritesContext);
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [favCheck, setFavCheck] = useState();
  const addToFavorites = (item) => {
    setFavorites([...favorites, item]);
    alert('eklendi')
  };

  const removeFromFavorites = (item) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== item.id);
    setFavorites(newFavorites);
    alert('Silindi')
  };

  const chechkFav = (item) => {
    favorites.map((fav) => fav?.id === item?.id ? setFavCheck(true) : setFavCheck(false));
  };
  
  
  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites,chechkFav,favCheck }}>
      {children}
    </FavoritesContext.Provider>
  );
}
