import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import { tmdbApi, deezerApi, searchMovieSoundtrack } from '../src/services/api';

vi.mock('axios');

// API calls tests

describe('tmdbApi', () => {
  it('getPopularMovies makes correct call', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });
    const result = await tmdbApi.getPopularMovies(2);
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/movie/popular'),
      expect.objectContaining({ params: expect.objectContaining({ page: 2 }) })
    );
    expect(result.data).toEqual({ results: [] });
  });

  it('searchMovies makes correct call', async () => {
    axios.get.mockResolvedValue({ data: { results: [] } });
    const result = await tmdbApi.searchMovies('batman');
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/search/movie'),
      expect.objectContaining({ params: expect.objectContaining({ query: 'batman' }) })
    );
    expect(result.data).toEqual({ results: [] });
  });
});

describe('deezerApi', () => {
  it('searchTracks makes correct call', async () => {
    axios.get.mockResolvedValue({ data: { data: [] } });
    const result = await deezerApi.searchTracks('soundtrack');
    expect(axios.get).toHaveBeenCalledWith(
      expect.stringContaining('/search'),
      expect.objectContaining({ params: expect.objectContaining({ q: 'soundtrack' }) })
    );
    expect(result.data).toEqual({ data: [] });
  });
});

describe('searchMovieSoundtrack', () => {
  it('returns data when searching for soundtrack', async () => {
    axios.get.mockResolvedValue({ data: { data: ['track1'] } });
    const result = await searchMovieSoundtrack('Matrix');
    expect(result).toEqual({ data: ['track1'] });
  });

  it('returns null on error', async () => {
    axios.get.mockRejectedValue(new Error('API error'));
    const result = await searchMovieSoundtrack('Matrix');
    expect(result).toBeNull();
  });
});
