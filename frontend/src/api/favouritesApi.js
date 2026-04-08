import api from './axios';

export const getFavourites = () =>
  api.get('/favourites');

export const addFavourite = (data) =>
  api.post('/favourites', data);

export const updateFavourite = (id, data) =>
  api.put(`/favourites/${id}`, data);

export const removeFavourite = (id) =>
  api.delete(`/favourites/${id}`);
