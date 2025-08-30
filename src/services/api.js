import axios from 'axios';

// TMDB API Configuration
const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Deezer API via RapidAPI Configuration
const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const DEEZER_BASE_URL = 'https://deezerdevs-deezer.p.rapidapi.com';

// TMDB API Functions
export const tmdbApi = {
  // Get popular movies
  getPopularMovies: (page = 1) => {
    return axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page,
        language: 'en'
      }
    });
  },

  // Search movies by query
  searchMovies: (query, page = 1) => {
    return axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query,
        page,
        language: 'en'
      }
    });
  },

  // Get movie details
  getMovieDetails: (movieId) => {
    return axios.get(`${TMDB_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en'
      }
    });
  },

  // Get movie soundtrack
  getMovieSoundtrack: (movieId) => {
    return axios.get(`${TMDB_BASE_URL}/movie/${movieId}/soundtrack`, {
      params: {
        api_key: TMDB_API_KEY
      }
    });
  }
};

// Deezer API Functions via RapidAPI
export const deezerApi = {
  // Search tracks
  searchTracks: (query) => {
    return axios.get(`${DEEZER_BASE_URL}/search`, {
      params: {
        q: query
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    });
  },

  // Search artist
  searchArtist: (query) => {
    return axios.get(`${DEEZER_BASE_URL}/search/artist`, {
      params: {
        q: query
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    });
  },

  // Search album
  searchAlbum: (query) => {
    return axios.get(`${DEEZER_BASE_URL}/search/album`, {
      params: {
        q: query
      },
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    });
  },

  // Get track details
  getTrackDetails: (trackId) => {
    return axios.get(`${DEEZER_BASE_URL}/track/${trackId}`, {
      headers: {
        'X-RapidAPI-Key': RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
      }
    });
  }
};

// Function to search soundtrack using movie title
export const searchMovieSoundtrack = async (movieTitle) => {
  try {
    const searchQuery = `${movieTitle} soundtrack`;
    const response = await deezerApi.searchTracks(searchQuery);
    return response.data;
  } catch (error) {
    console.error('Error searching soundtrack:', error);
    return null;
  }
};
