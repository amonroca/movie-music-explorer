<template>
  <div class="search-bar">
    <div class="search-container">
      <select v-model="searchType" class="search-type">
        <option value="movies">Movies</option>
        <option value="music">Music</option>
      </select>
      <input
        v-model="searchQuery"
        @keyup.enter="handleSearch"
        type="text"
        :placeholder="searchType === 'movies' ? 'Search movies...' : 'Search music...'"
        class="search-input"
      />
      <button @click="handleSearch" class="search-button" :disabled="!searchQuery.trim()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['search']);

const searchQuery = ref('');
const searchType = ref('movies');

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', {
      query: searchQuery.value.trim(),
      type: searchType.value
    });
  }
};
</script>

<style scoped>
.search-bar {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem;
  margin-bottom: 2rem;
}

.search-container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  gap: 0.5rem;
  background: white;
  border-radius: 50px;
  padding: 0.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.search-type {
  border: none;
  background: #f8f9fa;
  border-radius: 25px;
  padding: 0.75rem 1rem;
  font-size: 0.9rem;
  color: #495057;
  cursor: pointer;
  min-width: 100px;
}

.search-type:focus {
  outline: none;
  background: #e9ecef;
}

.search-input {
  flex: 1;
  border: none;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  background: transparent;
  color: #495057;
}

.search-input:focus {
  outline: none;
}

.search-input::placeholder {
  color: #6c757d;
}

.search-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-button:hover:not(:disabled) {
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

.search-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .search-container {
    flex-direction: column;
    border-radius: 15px;
    padding: 1rem;
  }
  
  .search-type {
    border-radius: 10px;
    text-align: center;
  }
  
  .search-input {
    padding: 1rem;
    border-radius: 10px;
    background: #f8f9fa;
  }
  
  .search-button {
    align-self: center;
    border-radius: 10px;
    width: auto;
    padding: 0.75rem 2rem;
  }
}
</style>
