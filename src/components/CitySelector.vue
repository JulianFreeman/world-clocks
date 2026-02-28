<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Plus, Search } from 'lucide-vue-next'
import { availableCities, type CityData } from '../data/cities'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'

const emit = defineEmits(['add', 'close'])
const { t, locale } = useI18n()

const searchQuery = ref('')
const sortBy = ref<'country' | 'timezone'>('country')

const filteredCities = computed(() => {
  const query = searchQuery.value.toLowerCase()
  const filtered = availableCities.filter(city => 
    city.name.toLowerCase().includes(query) || 
    city.country.toLowerCase().includes(query) ||
    (city.name_zh && city.name_zh.includes(query)) ||
    (city.country_zh && city.country_zh.includes(query))
  )

  return filtered.sort((a, b) => {
    if (sortBy.value === 'timezone') {
      const offsetA = dayjs().tz(a.timezone).utcOffset()
      const offsetB = dayjs().tz(b.timezone).utcOffset()
      if (offsetA !== offsetB) {
        return offsetA - offsetB
      }
    }
    
    if (a.country === b.country) {
      return a.name.localeCompare(b.name)
    }
    return a.country.localeCompare(b.country)
  })
})

function getCityName(city: CityData) {
  return locale.value === 'zh-CN' ? (city.name_zh || city.name) : city.name
}

function getCityCountry(city: CityData) {
  return locale.value === 'zh-CN' ? (city.country_zh || city.country) : city.country
}

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
        <h2>{{ t('city.modalTitle') }}</h2>
        <button @click="$emit('close')" class="close-btn">
          <X :size="20" />
        </button>
      </header>
      
      <div class="controls-row">
        <div class="search-wrapper">
          <Search :size="16" class="search-icon" />
          <input 
            v-model="searchQuery" 
            type="text" 
            :placeholder="t('city.searchPlaceholder')" 
            autofocus
          />
        </div>

        <div class="sort-buttons">
          <button 
            class="sort-btn" 
            :class="{ active: sortBy === 'country' }"
            @click="sortBy = 'country'"
          >
            {{ t('city.sortCountry') }}
          </button>
          <button 
            class="sort-btn" 
            :class="{ active: sortBy === 'timezone' }"
            @click="sortBy = 'timezone'"
          >
            {{ t('city.sortTimezone') }}
          </button>
        </div>
      </div>
      
      <div class="city-list">
        <button 
          v-for="city in filteredCities" 
          :key="city.name + city.country" 
          class="city-item"
          @click="addCity(city)"
        >
          <span class="city-info">
            <span class="city-name">{{ getCityName(city) }}</span>
            <span class="city-country">{{ getCityCountry(city) }}</span>
          </span>
          <span class="city-offset">UTC {{ formatOffset(city.timezone) }}</span>
          <Plus :size="16" class="plus-icon" />
        </button>
        <div v-if="filteredCities.length === 0" class="no-results">
          {{ t('city.noResults') }}
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
  align-items: flex-start;
  justify-content: center;
  z-index: 100;
  backdrop-filter: blur(2px);
  padding-top: 10vh;
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

.controls-row {
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-wrapper {
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  color: var(--color-timeline-text);
  pointer-events: none;
}

.search-wrapper input {
  width: 100%;
  padding: 8px 8px 8px 36px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background: var(--color-timeline-bg);
  color: var(--color-text);
  font-size: 1rem;
}
.search-wrapper input:focus {
  outline: 2px solid var(--color-primary);
  border-color: transparent;
}

.sort-buttons {
  flex-shrink: 0;
  display: flex;
  background: var(--color-timeline-bg);
  border-radius: 6px;
  padding: 2px;
  border: 1px solid var(--color-border);
}

.sort-btn {
  background: none;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  color: var(--color-timeline-text);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.sort-btn:hover {
  color: var(--color-text);
}

.sort-btn.active {
  background: var(--color-bg);
  color: var(--color-primary);
  font-weight: 500;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
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
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace;
  font-size: 0.85rem;
  font-weight: 500;
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
