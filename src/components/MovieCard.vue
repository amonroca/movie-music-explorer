<template>
  <div class="movie-card" @click="$emit('select', movie)">
    <div class="movie-poster">
      <img 
        :src="posterUrl" 
        :alt="movie.title"
        @error="handleImageError"
        class="poster-image"
      />
      <div class="movie-rating" v-if="movie.vote_average">
        <span>⭐ {{ movie.vote_average.toFixed(1) }}</span>
      </div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title">{{ movie.title }}</h3>
      <p class="movie-year" v-if="movie.release_date">
        {{ new Date(movie.release_date).getFullYear() }}
      </p>
      <p class="movie-overview">{{ truncatedOverview }}</p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

defineEmits(['select']);

const imageError = ref(false);

const posterUrl = computed(() => {
  if (imageError.value || !props.movie.poster_path) {
    return 'https://via.placeholder.com/300x450/cccccc/666666?text=No+Image';
  }
  return `https://image.tmdb.org/t/p/w300${props.movie.poster_path}`;
});

const truncatedOverview = computed(() => {
  if (!props.movie.overview) return 'No description available';
  return props.movie.overview.length > 150 
    ? props.movie.overview.substring(0, 150) + '...'
    : props.movie.overview;
});

const handleImageError = () => {
  imageError.value = true;
};
</script>

<style scoped>
.movie-card {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.movie-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.movie-poster {
  position: relative;
  overflow: hidden;
}

.poster-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.movie-card:hover .poster-image {
  transform: scale(1.05);
}

.movie-rating {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
}

.movie-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.movie-title {
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0 0 0.5rem 0;
  color: #333;
  line-height: 1.3;
}

.movie-year {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
  font-weight: 500;
}

.movie-overview {
  color: #666;
  font-size: 0.85rem;
  line-height: 1.4;
  margin: 0;
  flex: 1;
}

@media (max-width: 768px) {
  .poster-image {
    height: 250px;
  }
  
  .movie-title {
    font-size: 1rem;
  }
  
  .movie-overview {
    font-size: 0.8rem;
  }
}
</style>
