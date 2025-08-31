import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import MovieCard from '../src/components/MovieCard.vue';
import ErrorMessage from '../src/components/ErrorMessage.vue';
import MusicCard from '../src/components/MusicCard.vue';

// MovieCard presentation test

describe('MovieCard.vue', () => {
  const movie = {
    title: 'Matrix',
    poster_path: '/matrix.jpg',
    vote_average: 8.7,
    release_date: '1999-03-31',
    overview: 'A revolutionary movie.'
  };

  it('renders movie information', () => {
    const wrapper = mount(MovieCard, { props: { movie } });
    expect(wrapper.text()).toContain('Matrix');
    expect(wrapper.text()).toContain('1999');
    expect(wrapper.text()).toContain('A revolutionary movie.');
    expect(wrapper.html()).toContain('matrix.jpg');
    expect(wrapper.text()).toContain('8.7');
  });

  it('shows default image if poster is missing', () => {
    const wrapper = mount(MovieCard, { props: { movie: { ...movie, poster_path: null } } });
    expect(wrapper.html()).toContain('No+Image');
  });
});

// Exception control test (ErrorMessage)
describe('ErrorMessage.vue', () => {
  it('renders default error message', () => {
    const wrapper = mount(ErrorMessage);
    expect(wrapper.text()).toContain('Oops! Something went wrong');
    expect(wrapper.text()).toContain('An unexpected error occurred');
  });

  it('renders custom error message', () => {
    const wrapper = mount(ErrorMessage, {
      props: { title: 'Error', message: 'API failure', showRetry: false }
    });
    expect(wrapper.text()).toContain('Error');
    expect(wrapper.text()).toContain('API failure');
  });
});

// MusicCard presentation test
describe('MusicCard.vue', () => {
  const track = {
    title: 'Song',
    artist: { name: 'Artist', picture_medium: 'artist.jpg' },
    album: { title: 'Album', cover_medium: 'cover.jpg' },
    duration: 120,
    rank: 1000,
    preview: 'preview.mp3',
    link: 'https://deezer.com/track/1'
  };

  it('renders music information', () => {
    const wrapper = mount(MusicCard, { props: { track } });
    expect(wrapper.text()).toContain('Song');
    expect(wrapper.text()).toContain('Artist');
    expect(wrapper.text()).toContain('Album');
    expect(wrapper.text()).toContain('2:00');
    expect(wrapper.text()).toContain('1000');
    expect(wrapper.html()).toContain('cover.jpg');
  });

  it('shows default image if cover is missing', () => {
    const wrapper = mount(MusicCard, { props: { track: { ...track, album: null, artist: null } } });
    expect(wrapper.html()).toContain('https://via.placeholder.com/200x200/667eea/ffffff?text=♪');
  });
});
