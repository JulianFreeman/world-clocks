<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useStorage, useNow, useTitle, useResizeObserver } from '@vueuse/core'
import dayjs from 'dayjs'
import { Plus, RotateCcw } from 'lucide-vue-next'
import { v4 as uuidv4 } from 'uuid'

import CitySelector from './components/CitySelector.vue'
import TimelineRow from './components/TimelineRow.vue'
import ThemeToggle from './components/ThemeToggle.vue'
import type { CityData } from './data/cities'

// --- State ---

// Viewing Time (Center of Screen)
const now = useNow({ interval: 1000 })
// Initialize with current time. We don't auto-sync to 'now' unless user clicks "Back to Now"
// or if we are in "live" mode. Let's default to static mode that initializes at 'now', 
// but stays still unless dragged? 
// Actually, a clock should tick.
// So `viewingTime` should be an offset from `Date.now()`?
// Or simply: `viewingTime` is a ref. We update it every second if 'isLive' is true.
// Dragging sets 'isLive' to false.
const isLive = ref(true)
const viewingTime = ref(dayjs())

// Update viewing time if live
watch(now, (newNow: Date) => {
  if (isLive.value) {
    viewingTime.value = dayjs(newNow)
  }
})

function resetToNow() {
  isLive.value = true
  viewingTime.value = dayjs(now.value)
}

// Cities Persistence
interface StoredCity extends CityData {
  id: string
}

// Default cities
const defaultCities: StoredCity[] = [
  { id: uuidv4(), name: 'Local Time', country: 'Current Location', timezone: dayjs.tz.guess() }
]

const selectedCities = useStorage<StoredCity[]>('world-clock-cities', defaultCities)
const sidebarWidth = useStorage('world-clock-sidebar-width', 300)

// UI State
const showAddCity = ref(false)
const isDraggingTime = ref(false)
const isResizingSidebar = ref(false)
const lastMouseX = ref(0)
const pixelsPerHour = 120 // Must match Child component
const ROW_HEIGHT = 100 // Must match CSS .city-row height

const citiesListRef = ref<HTMLElement | null>(null)
const citiesListClientWidth = ref(0)
// Dynamic height based on number of rows
const citiesListHeight = computed(() => selectedCities.value.length * ROW_HEIGHT)

useResizeObserver(citiesListRef, (entries) => {
  const entry = entries[0]
  // Use contentRect.width usually, but verify element exists for clientWidth to be safe against box-sizing issues
  // clientWidth is robust for 'excluding scrollbar'
  if (citiesListRef.value) {
    citiesListClientWidth.value = citiesListRef.value.clientWidth
  } else if (entry) {
    citiesListClientWidth.value = entry.contentRect.width
  }
})

// Calculate indicator line position dynamically to account for scrollbars
// Formula: Sidebar + (TimelineWidth / 2)
// TimelineWidth = TotalClientWidth - SidebarWidth - RemoveBtnWidth (40px)
// Result: SidebarWidth + (TotalClientWidth + SidebarWidth - 40) / 2 
//       = (TotalClientWidth + SidebarWidth - 40) / 2
const indicatorLeft = computed(() => {
  if (!citiesListClientWidth.value) return 0
  const removeBtnWidth = 40
  return (citiesListClientWidth.value + sidebarWidth.value - removeBtnWidth) / 2
})

const nowLineLeft = computed(() => {
  // Perfect alignment when live
  if (isLive.value) return indicatorLeft.value

  const nowTime = dayjs(now.value)
  const diffHours = nowTime.diff(viewingTime.value, 'hour', true)
  return indicatorLeft.value + (diffHours * pixelsPerHour)
})

const isNowLineVisible = computed(() => {
  if (!citiesListClientWidth.value) return false
  const left = nowLineLeft.value
  // Ensure the line is within the timeline track (between sidebar and remove button)
  // 40 is the width of the remove button/placeholder on the right
  return left > sidebarWidth.value && left < (citiesListClientWidth.value - 40)
})
// --- Sidebar Resize Logic ---

function onResizeMouseDown(e: MouseEvent) {
  isResizingSidebar.value = true
  document.body.style.cursor = 'col-resize'
  window.addEventListener('mousemove', onResizeMove)
  window.addEventListener('mouseup', onResizeEnd)
}

function onResizeMove(e: MouseEvent) {
  if (!isResizingSidebar.value) return
  const newWidth = e.clientX
  // Constrain width (min 200, max 600)
  if (newWidth >= 200 && newWidth <= 600) {
    sidebarWidth.value = newWidth
  }
}

function onResizeEnd() {
  isResizingSidebar.value = false
  document.body.style.cursor = ''
  window.removeEventListener('mousemove', onResizeMove)
  window.removeEventListener('mouseup', onResizeEnd)
}

// --- Time Dragging Logic ---

function onTimelineMouseDown(e: MouseEvent) {
  // Only trigger if clicked on timeline track (right side)
  // We can check target or class, or just rely on the event bubbling from the specific area
  // But since we handle it globally for sync, let's rely on a wrapper event or pass-through
  isDraggingTime.value = true
  isLive.value = false // Stop auto-ticking
  lastMouseX.value = e.clientX
  document.body.style.cursor = 'grabbing'
  window.addEventListener('mousemove', onTimelineDrag)
  window.addEventListener('mouseup', onTimelineDragEnd)
}

function onTimelineDrag(e: MouseEvent) {
  if (!isDraggingTime.value) return

  const deltaX = e.clientX - lastMouseX.value
  lastMouseX.value = e.clientX

  // Convert pixels to minutes
  // pixelsPerHour = 120 => 2px = 1 min
  const deltaHours = deltaX / pixelsPerHour

  viewingTime.value = viewingTime.value.subtract(deltaHours, 'hour')
}

function onTimelineDragEnd() {
  isDraggingTime.value = false
  document.body.style.cursor = ''
  window.removeEventListener('mousemove', onTimelineDrag)
  window.removeEventListener('mouseup', onTimelineDragEnd)
}

// --- City Management ---

function handleAddCity(city: CityData) {
  selectedCities.value.push({
    ...city,
    id: uuidv4()
  })
  showAddCity.value = false
}

function removeCity(index: number) {
  selectedCities.value.splice(index, 1)
}

// --- Row Reordering (Drag and Drop) ---

const draggedItemIndex = ref<number | null>(null)

function onDragStart(index: number) {
  draggedItemIndex.value = index
}

function onDragOver(index: number) {
  if (draggedItemIndex.value === null || draggedItemIndex.value === index) return

  // Move item
  const item = selectedCities.value[draggedItemIndex.value]
  if (!item) return

  selectedCities.value.splice(draggedItemIndex.value, 1)
  selectedCities.value.splice(index, 0, item)
  draggedItemIndex.value = index
}

function onDragEnd() {
  draggedItemIndex.value = null
}

useTitle('World Clock')
</script>

<template>
  <div class="app-container" :style="{ '--sidebar-width': `${sidebarWidth}px` }">
    <header class="app-header">
      <div class="logo">
        <h1>World Clock</h1>
      </div>
      <div class="controls">
        <button class="action-btn" @click="resetToNow" :class="{ active: isLive }" title="Back to Now">
          <RotateCcw :size="18" />
          <span class="btn-text">Now</span>
        </button>
        <button class="action-btn primary" @click="showAddCity = true">
          <Plus :size="18" />
          <span class="btn-text">Add City</span>
        </button>
        <ThemeToggle />
      </div>
    </header>

    <main class="timeline-area">
      <!-- The Red Line Indicator -->
      <div class="indicator-line" :style="{ left: `${indicatorLeft}px`, height: `${citiesListHeight}px` }"></div>
      <!-- The Real-time "Now" Line -->
      <div class="now-line" v-show="isNowLineVisible" :style="{ left: `${nowLineLeft}px`, height: `${citiesListHeight}px` }"></div>

      <div class="cities-list" ref="citiesListRef">
        <TimelineRow v-for="(city, index) in selectedCities" :key="city.id" :city="city" :viewingTime="viewingTime"
          :isCurrentLocation="city.name === 'Local Time'" @dragstart="onDragStart(index)"
          @dragover.prevent="onDragOver(index)" @dragend="onDragEnd" @remove="removeCity(index)"
          @start-drag="onTimelineMouseDown" />
      </div>

      <div class="resize-handle" @mousedown.prevent="onResizeMouseDown"></div>
      <div class="interaction-overlay" @mousedown="onTimelineMouseDown"></div>
    </main>

    <CitySelector v-if="showAddCity" @close="showAddCity = false" @add="handleAddCity" />
  </div>
</template>

<style scoped>
.app-container {
  height: 100vh;
  /* Change min-height to height to constrain layout */
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
  overflow: hidden;
  /* Prevent body scroll */
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--color-border);
  background-color: var(--color-bg);
  z-index: 10;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  background: linear-gradient(to right, var(--color-primary), #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid var(--color-border);
  background-color: var(--color-bg);
  color: var(--color-text);
  font-weight: 500;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: var(--color-hover);
  border-color: var(--color-timeline-line);
}

.action-btn.active {
  color: var(--color-primary);
  border-color: var(--color-primary);
  background-color: rgba(59, 130, 246, 0.1);
}

.action-btn.primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.action-btn.primary:hover {
  opacity: 0.9;
}

.btn-text {
  display: none;
}

@media (min-width: 600px) {
  .btn-text {
    display: inline;
  }
}

.timeline-area {
  flex: 1;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.cities-list {
  position: relative;
  z-index: 5;
  /* Ensure rows are above the background overlay */
  overflow-y: auto;
  flex: 1;
  width: 100%;
}

.indicator-line {
  position: absolute;
  /* left is handled by inline style */
  top: 0;
  width: 2px;
  background-color: var(--color-indicator);
  z-index: 15;
  /* Higher than cities-list (5) to be visible */
  pointer-events: none;
  box-shadow: 0 0 10px rgba(239, 68, 68, 0.4);
  transform: translateX(-50%);
}

.now-line {
  position: absolute;
  top: 0;
  width: 0;
  border-left: 2px dashed #eab308;
  /* Yellow-500 */
  z-index: 14;
  /* Slightly below red indicator */
  pointer-events: none;
  opacity: 0.7;
  transform: translateX(-50%);
}

.resize-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  left: var(--sidebar-width);
  width: 4px;
  cursor: col-resize;
  z-index: 20;
  background-color: transparent;
  transition: background-color 0.2s;
  margin-left: -2px;
}

.resize-handle:hover,
.resize-handle:active {
  background-color: var(--color-primary);
}

.interaction-overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: var(--sidebar-width);
  z-index: 1;
  /* Below cities-list so buttons work, but handles background drag */
  cursor: grab;
}

.interaction-overlay:active {
  cursor: grabbing;
}
</style>
