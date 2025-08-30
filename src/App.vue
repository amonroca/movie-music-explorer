<script setup>
import { ref, onMounted } from 'vue';
import SearchBar from './components/SearchBar.vue';
import MovieCard from './components/MovieCard.vue';
import MusicCard from './components/MusicCard.vue';
import MovieModal from './components/MovieModal.vue';
import LoadingSpinner from './components/LoadingSpinner.vue';
import ErrorMessage from './components/ErrorMessage.vue';
import { tmdbApi, deezerApi } from './services/api.js';

// Estado da aplicação
const searchResults = ref([]);
const loading = ref(false);
const error = ref(null);
const currentSearchType = ref('movies');
const selectedMovie = ref(null);
const showModal = ref(false);
const popularMovies = ref([]);

// Carregar filmes populares na inicialização
onMounted(async () => {
  await loadPopularMovies();
});

const loadPopularMovies = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await tmdbApi.getPopularMovies();
    popularMovies.value = response.data.results || [];
    searchResults.value = popularMovies.value;
  } catch (err) {
    console.error('Error loading popular movies:', err);
    error.value = {
      title: 'Error loading movies',
      message: 'Could not load popular movies. Please check your connection and API keys.'
    };
  } finally {
    loading.value = false;
  }
};

const handleSearch = async ({ query, type }) => {
  loading.value = true;
  error.value = null;
  currentSearchType.value = type;
  
  try {
    if (type === 'movies') {
      const response = await tmdbApi.searchMovies(query);
      searchResults.value = response.data.results || [];
    } else if (type === 'music') {
      const response = await deezerApi.searchTracks(query);
      searchResults.value = response.data.data || [];
    }
    
    if (searchResults.value.length === 0) {
      error.value = {
        title: 'No results found',
        message: `No results found for "${query}". Try a different search.`,
        showRetry: false
      };
    }
  } catch (err) {
    console.error('Search error:', err);
    error.value = {
      title: 'Search error',
      message: 'Could not perform search. Please check your connection and try again.'
    };
    searchResults.value = [];
  } finally {
    loading.value = false;
  }
};

const selectMovie = (movie) => {
  selectedMovie.value = movie;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedMovie.value = null;
};

const retryLastAction = () => {
  if (searchResults.value.length === 0 && !loading.value) {
    loadPopularMovies();
  }
};
</script>

<template>
  <div id="app">
    <header class="app-header">
      <div class="container">
        <h1 class="app-title">
          <span class="icon">🎬</span>
          Movie & Music Explorer
          <span class="icon">🎵</span>
        </h1>
        <p class="app-subtitle">Discover movies and their soundtracks</p>
      </div>
    </header>

    <SearchBar @search="handleSearch" />

    <main class="main-content">
      <div class="container">
        <div class="section-header">
          <h2 v-if="currentSearchType === 'movies'">
            {{ searchResults.length ? 'Search Results' : 'Popular Movies' }}
          </h2>
          <h2 v-else>Music Results</h2>
          <span class="results-count" v-if="searchResults.length">
            {{ searchResults.length }} result(s)
          </span>
        </div>

        <LoadingSpinner v-if="loading" message="Loading..." />

        <ErrorMessage 
          v-else-if="error" 
          :title="error.title"
          :message="error.message"
          :show-retry="error.showRetry !== false"
          @retry="retryLastAction"
        />

        <div v-else-if="searchResults.length" class="results-grid">
          <MovieCard 
            v-if="currentSearchType === 'movies'"
            v-for="movie in searchResults" 
            :key="movie.id" 
            :movie="movie"
            @select="selectMovie"
          />
          <MusicCard 
            v-else
            v-for="track in searchResults" 
            :key="track.id" 
            :track="track"
          />
        </div>

        <div v-else class="no-results">
          <div class="no-results-icon">🔍</div>
          <h3>No results found</h3>
          <p>Try a different search or explore popular movies.</p>
        </div>
      </div>
    </main>

    <!-- Movie details modal -->
    <MovieModal 
      v-if="showModal"
      :movie="selectedMovie"
      :is-visible="showModal"
      @close="closeModal"
    />
  </div>
</template>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 2rem 1rem;
}

.app-title {
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.icon {
  font-size: 2rem;
}

.app-subtitle {
  font-size: 1.1rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.main-content {
  min-height: calc(100vh - 200px);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

.section-header h2 {
  font-size: 1.8rem;
  color: #333;
  margin: 0;
}

.results-count {
  background: #f8f9fa;
  color: #495057;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;
}

.no-results {
  text-align: center;
  padding: 4rem 1rem;
  color: #666;
}

.no-results-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.no-results h3 {
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.no-results p {
  font-size: 1rem;
  margin: 0;
}

@media (max-width: 768px) {
  .app-title {
    font-size: 1.8rem;
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .icon {
    font-size: 1.5rem;
  }
  
  .app-subtitle {
    font-size: 1rem;
  }
  
  .section-header {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
  
  .results-grid {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }
}
</style>
