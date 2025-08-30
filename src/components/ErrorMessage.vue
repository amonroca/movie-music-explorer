<template>
  <div class="error-message">
    <div class="error-icon">⚠️</div>
    <h3>{{ title }}</h3>
    <p>{{ message }}</p>
    <button v-if="showRetry" @click="$emit('retry')" class="retry-button">
      Try Again
    </button>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: 'Oops! Something went wrong'
  },
  message: {
    type: String,
    default: 'An unexpected error occurred. Please try again later.'
  },
  showRetry: {
    type: Boolean,
    default: true
  }
});

defineEmits(['retry']);
</script>

<style scoped>
.error-message {
  text-align: center;
  padding: 2rem;
  color: #666;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin: 1rem;
}

.error-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.error-message h3 {
  color: #333;
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
}

.error-message p {
  margin: 0 0 1.5rem 0;
  line-height: 1.5;
}

.retry-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}
</style>
