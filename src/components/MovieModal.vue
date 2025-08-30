<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-button" @click="closeModal">×</button>
      
      <div v-if="movie" class="movie-details">
        <div class="movie-header">
          <div class="movie-poster">
            <img 
              :src="posterUrl" 
              :alt="movie.title"
              class="poster-image"
            />
          </div>
          <div class="movie-info">
            <h1 class="movie-title">{{ movie.title }}</h1>
            <div class="movie-meta">
              <span class="release-date" v-if="movie.release_date">
                {{ new Date(movie.release_date).getFullYear() }}
              </span>
              <span class="rating" v-if="movie.vote_average">
                ⭐ {{ movie.vote_average.toFixed(1) }}
              </span>
              <span class="runtime" v-if="movie.runtime">
                {{ formatRuntime(movie.runtime) }}
              </span>
            </div>
            <p class="movie-overview" v-if="movie.overview">{{ movie.overview }}</p>
            <div class="genres" v-if="movie.genres && movie.genres.length">
              <span class="genre" v-for="genre in movie.genres" :key="genre.id">
                {{ genre.name }}
              </span>
            </div>
          </div>
        </div>
        
        <div class="soundtrack-section" v-if="soundtrack && soundtrack.length">
          <h2>Soundtrack</h2>
          <div class="soundtrack-grid">
            <MusicCard 
              v-for="track in soundtrack" 
              :key="track.id" 
              :track="track"
            />
          </div>
        </div>
        
        <div class="loading-section" v-else-if="loadingSoundtrack">
          <LoadingSpinner message="Loading soundtrack..." />
        </div>
        
        <div class="no-soundtrack" v-else>
          <p>No soundtrack found for this movie.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import MusicCard from './MusicCard.vue';
import LoadingSpinner from './LoadingSpinner.vue';
import { searchMovieSoundtrack } from '../services/api.js';

const props = defineProps({
  movie: {
    type: Object,
    default: null
  },
  isVisible: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close']);

const soundtrack = ref([]);
const loadingSoundtrack = ref(false);

const posterUrl = computed(() => {
  if (!props.movie?.poster_path) {
    return 'https://via.placeholder.com/400x600/cccccc/666666?text=No+Image';
  }
  return `https://image.tmdb.org/t/p/w400${props.movie.poster_path}`;
});

const formatRuntime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0 ? `${hours}h ${remainingMinutes}min` : `${remainingMinutes}min`;
};

const closeModal = () => {
  emit('close');
};

const loadSoundtrack = async () => {
  if (!props.movie?.title) return;
  
  loadingSoundtrack.value = true;
  soundtrack.value = [];
  
  try {
    const result = await searchMovieSoundtrack(props.movie.title);
    if (result && result.data) {
      soundtrack.value = result.data.slice(0, 6); // Limit to 6 tracks
    }
  } catch (error) {
    console.error('Error loading soundtrack:', error);
  } finally {
    loadingSoundtrack.value = false;
  }
};

// Load soundtrack when movie changes
watch(() => props.movie, (newMovie) => {
  if (newMovie && props.isVisible) {
    loadSoundtrack();
  }
}, { immediate: true });

// Load soundtrack when modal becomes visible
watch(() => props.isVisible, (isVisible) => {
  if (isVisible && props.movie) {
    loadSoundtrack();
  }
});
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-content {
  background: white;
  border-radius: 20px;
  max-width: 900px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  width: 100%;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.movie-details {
  padding: 2rem;
}

.movie-header {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.poster-image {
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.movie-title {
  font-size: 2rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #333;
}

.movie-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.movie-meta span {
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #495057;
  font-weight: 500;
}

.rating {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white !important;
}

.movie-overview {
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
}

.genres {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.genre {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.soundtrack-section h2 {
  color: #333;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

.soundtrack-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.loading-section,
.no-soundtrack {
  text-align: center;
  padding: 2rem;
  color: #666;
}

@media (max-width: 768px) {
  .modal-content {
    margin: 0;
    border-radius: 20px 20px 0 0;
    max-height: 95vh;
  }
  
  .movie-details {
    padding: 1rem;
  }
  
  .movie-header {
    grid-template-columns: 1fr;
    gap: 1rem;
    text-align: center;
  }
  
  .movie-title {
    font-size: 1.5rem;
  }
  
  .soundtrack-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}
</style>
