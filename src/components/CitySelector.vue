<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Plus, Search } from 'lucide-vue-next'
import { availableCities, type CityData } from '../data/cities'
import dayjs from 'dayjs'

const emit = defineEmits(['add', 'close'])

const searchQuery = ref('')

const filteredCities = computed(() => {
  const query = searchQuery.value.toLowerCase()
  return availableCities.filter(city => 
    city.name.toLowerCase().includes(query) || 
    city.country.toLowerCase().includes(query)
  )
})

function formatOffset(timezone: string) {
  return dayjs().tz(timezone).format('Z')
}

function addCity(city: CityData) {
  emit('add', city)
}
</script>

<template>
  <div class="modal-overlay" @click="$emit('close')">
    <div class="modal-content" @click.stop>
      <header class="modal-header">
        <h2>Add City</h2>
        <button @click="$emit('close')" class="close-btn">
          <X :size="20" />
        </button>
      </header>
      
      <div class="search-bar">
        <Search :size="16" class="search-icon" />
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search city or country..." 
          autofocus
        />
      </div>
      
      <div class="city-list">
        <button 
          v-for="city in filteredCities" 
          :key="city.name + city.country" 
          class="city-item"
          @click="addCity(city)"
        >
          <span class="city-info">
            <span class="city-name">{{ city.name }}</span>
            <span class="city-country">{{ city.country }}</span>
          </span>
          <span class="city-offset">UTC {{ formatOffset(city.timezone) }}</span>
          <Plus :size="16" class="plus-icon" />
        </button>
        <div v-if="filteredCities.length === 0" class="no-results">
          No cities found.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(2px);
}

.modal-content {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.modal-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.modal-header h2 {
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text);
  opacity: 0.6;
  transition: opacity 0.2s;
}
.close-btn:hover {
  opacity: 1;
}

.search-bar {
  padding: 16px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 24px;
  color: var(--color-timeline-text);
}

.search-bar input {
  width: 100%;
  padding: 10px 10px 10px 36px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-timeline-bg);
  color: var(--color-text);
  font-size: 1rem;
}
.search-bar input:focus {
  outline: 2px solid var(--color-primary);
  border-color: transparent;
}

.city-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 16px 16px 16px;
}

.city-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background: none;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--color-text);
  transition: background-color 0.2s;
  text-align: left;
}

.city-item:hover {
  background-color: var(--color-hover);
}

.city-info {
  display: flex;
  flex-direction: column;
}

.city-name {
  font-weight: 600;
}

.city-country {
  font-size: 0.85rem;
  color: var(--color-timeline-text);
}

.city-offset {
  margin-left: auto;
  margin-right: 16px;
  font-family: monospace;
  font-size: 0.9rem;
  color: var(--color-timeline-text);
}

.plus-icon {
  color: var(--color-primary);
}

.no-results {
  text-align: center;
  padding: 20px;
  color: var(--color-timeline-text);
}
</style>
