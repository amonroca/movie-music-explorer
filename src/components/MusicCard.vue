<template>
  <div class="music-card" @click="playPreview">
    <div class="music-artwork">
      <img 
        :src="track.album?.cover_medium || track.artist?.picture_medium || defaultImage" 
        :alt="track.title"
        class="artwork-image"
      />
      <div class="play-overlay">
        <div class="play-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="music-info">
      <h3 class="track-title">{{ track.title }}</h3>
      <p class="artist-name">{{ track.artist?.name }}</p>
      <p class="album-name" v-if="track.album?.title">{{ track.album.title }}</p>
      <div class="track-meta">
        <span class="duration" v-if="track.duration">
          {{ formatDuration(track.duration) }}
        </span>
        <span class="rank" v-if="track.rank">
          🔥 {{ track.rank }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  track: {
    type: Object,
    required: true
  }
});

const defaultImage = 'https://via.placeholder.com/200x200/667eea/ffffff?text=♪';

const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const playPreview = () => {
  if (props.track.preview) {
    // Create temporary audio player for preview
    const audio = new Audio(props.track.preview);
    audio.play().catch(error => {
      console.error('Error playing preview:', error);
    });
  } else {
    // Open in Deezer
    if (props.track.link) {
      window.open(props.track.link, '_blank');
    }
  }
};
</script>

<style scoped>
.music-card {
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

.music-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
}

.music-artwork {
  position: relative;
  overflow: hidden;
}

.artwork-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.music-card:hover .artwork-image {
  transform: scale(1.05);
}

.play-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.music-card:hover .play-overlay {
  opacity: 1;
}

.play-button {
  width: 60px;
  height: 60px;
  background: rgba(102, 126, 234, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.8);
  transition: transform 0.3s ease;
}

.play-overlay:hover .play-button {
  transform: scale(1);
}

.music-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.track-title {
  font-size: 1rem;
  font-weight: bold;
  margin: 0 0 0.25rem 0;
  color: #333;
  line-height: 1.3;
}

.artist-name {
  color: #667eea;
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
}

.album-name {
  color: #666;
  font-size: 0.8rem;
  margin: 0 0 0.5rem 0;
  font-style: italic;
}

.track-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  font-size: 0.75rem;
  color: #999;
}

.duration {
  background: #f8f9fa;
  padding: 0.25rem 0.5rem;
  border-radius: 10px;
}

.rank {
  font-weight: bold;
  color: #ff6b6b;
}

@media (max-width: 768px) {
  .artwork-image {
    height: 150px;
  }
  
  .track-title {
    font-size: 0.9rem;
  }
  
  .artist-name {
    font-size: 0.8rem;
  }
  
  .album-name {
    font-size: 0.75rem;
  }
}
</style>
