<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import { GripVertical, Trash2 } from 'lucide-vue-next'
import type { CityData } from '../data/cities'

const props = defineProps<{
  city: CityData
  viewingTime: dayjs.Dayjs
  isCurrentLocation?: boolean
}>()

const emit = defineEmits(['remove', 'update:viewingTime', 'start-drag'])

const pixelsPerHour = 120
const timelineContainer = ref<HTMLElement | null>(null)
const containerWidth = ref(0)

// Anchor time to stabilize rendering (Start of current day of viewingTime)
// We update this only when viewingTime drifts significantly to prevent jitter
const anchorTime = ref(props.viewingTime.startOf('day'))

// Update anchor if viewingTime moves more than 12 hours away from current anchor center
watch(() => props.viewingTime, (newTime) => {
  const diff = newTime.diff(anchorTime.value, 'hour', true)
  if (Math.abs(diff) > 12) {
     anchorTime.value = newTime.startOf('day')
  }
})

// Generate ticks for +/- 2 days around anchor
const ticks = computed(() => {
  const result = []
  const start = anchorTime.value.subtract(2, 'day')
  const end = anchorTime.value.add(2, 'day')
  
  let current = start.startOf('hour')
  while (current.isBefore(end)) {
    result.push(current)
    current = current.add(1, 'hour')
  }
  return result
})

// Calculate local time for the intersection point
const localTime = computed(() => {
  return props.viewingTime.tz(props.city.timezone)
})

const formattedTime = computed(() => localTime.value.format('HH:mm'))
const formattedDate = computed(() => localTime.value.format('ddd, MMM D'))
const gmtOffset = computed(() => localTime.value.format('Z'))

// Calculate timeline offset
// We want the point on timeline corresponding to 'viewingTime' to be at center of container
const timelineTransform = computed(() => {
  if (!containerWidth.value) return 0
  
  const diffHours = props.viewingTime.diff(anchorTime.value, 'hour', true)
  // The anchor is at 0px relative to the inner strip start? 
  // Let's say inner strip starts at -48h relative to anchor.
  // Actually simpler:
  // Let 0px of inner strip be `anchorTime`.
  // We want `viewingTime` to be at `containerWidth / 2`.
  // `viewingTime` position relative to anchor is `diffHours * pixelsPerHour`.
  // So we shift left by that amount, then shift right by half container.
  
  return -1 * (diffHours * pixelsPerHour) + (containerWidth.value / 2)
})

// Tick positioning relative to anchor
function getTickStyle(tick: dayjs.Dayjs) {
  const diff = tick.diff(anchorTime.value, 'hour', true)
  const left = diff * pixelsPerHour
  return {
    left: `${left}px`
  }
}

// Format tick label (local to city)
function formatTick(tick: dayjs.Dayjs) {
  return tick.tz(props.city.timezone).format('H')
}

function isMidnight(tick: dayjs.Dayjs) {
  return tick.tz(props.city.timezone).hour() === 0
}

function getDayLabel(tick: dayjs.Dayjs) {
    return tick.tz(props.city.timezone).format('MMM D')
}

// Resize observer
onMounted(() => {
  if (timelineContainer.value) {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        containerWidth.value = entry.contentRect.width
      }
    })
    observer.observe(timelineContainer.value)
  }
})

</script>

<template>
  <div class="city-row">
    <div class="drag-handle" title="Drag to reorder">
      <GripVertical :size="16" />
    </div>
    
    <div class="city-info">
      <div class="city-name-group">
        <span class="city-name">{{ city.name }}</span>
        <span class="city-details">{{ city.country }}</span>
      </div>
      <div class="city-meta">
        <span class="time-preview">{{ formattedTime }}</span>
        <span class="date-preview">{{ formattedDate }}</span>
        <span class="offset-preview">UTC {{ gmtOffset }}</span>
      </div>
    </div>
    
    <div 
      class="timeline-wrapper" 
      ref="timelineContainer"
      @mousedown="$emit('start-drag', $event)"
    >
       <div 
         class="timeline-track"
         :style="{ transform: `translateX(${timelineTransform}px)` }"
       >
         <!-- Render Grid/Ticks -->
         <div 
            v-for="tick in ticks" 
            :key="tick.toISOString()"
            class="tick"
            :class="{ 'tick-midnight': isMidnight(tick) }"
            :style="getTickStyle(tick)"
         >
            <span class="tick-label">{{ formatTick(tick) }}</span>
            <span v-if="isMidnight(tick)" class="day-label">{{ getDayLabel(tick) }}</span>
            <div class="tick-mark"></div>
         </div>
       </div>
       
       <!-- Current Time Indicator (Intersection) -->
       <!-- We don't strictly need it here if the parent draws a global line, 
            but the prompt says 'At the intersection point... display date and time'. 
            We are displaying it in the left panel for clarity, 
            but we could also display it floating on the line. 
            Let's stick to the left panel for clean design, or maybe a tooltip.
       -->
    </div>
    
    <button 
      v-if="!isCurrentLocation" 
      class="remove-btn" 
      @click="$emit('remove')"
      title="Remove city"
    >
      <Trash2 :size="18" />
    </button>
    <div v-else class="remove-placeholder"></div>
  </div>
</template>

<style scoped>
.city-row {
  display: flex;
  align-items: center;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  height: 100px;
  user-select: none;
}

.drag-handle {
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-timeline-text);
  cursor: grab;
  height: 100%;
  flex-shrink: 0;
}
.drag-handle:active {
  cursor: grabbing;
}

.city-info {
  width: calc(var(--sidebar-width, 260px) - 40px);
  padding: 16px;
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.city-name-group {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 4px;
  overflow: hidden;
}

.city-name {
  font-size: 1.1rem;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.city-details {
  font-size: 0.85rem;
  color: var(--color-timeline-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.city-meta {
  display: flex;
  flex-direction: column;
  font-size: 0.85rem;
  color: var(--color-timeline-text);
}

.time-preview {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--color-primary);
}

.timeline-wrapper {
  flex: 1;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: var(--color-timeline-bg);
  cursor: ew-resize; /* Indicate horizontal scrolling */
}

.timeline-track {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  will-change: transform;
  /* No transition during drag, parent handles smoothness via state or we add it conditionally */
}

.tick {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px; /* Just the position point */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
}

.tick-mark {
  width: 1px;
  height: 10px;
  background-color: var(--color-timeline-line);
  margin-top: auto;
}

.tick-midnight .tick-mark {
  height: 20px;
  background-color: var(--color-text);
  opacity: 0.5;
}

.tick-label {
  font-size: 0.8rem;
  color: var(--color-timeline-text);
  margin-bottom: 4px;
}

.day-label {
  position: absolute;
  top: 10px;
  left: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
}

.remove-btn {
  width: 40px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  border-left: 1px solid var(--color-border);
  color: var(--color-timeline-text);
  opacity: 0;
  transition: opacity 0.2s, color 0.2s, background-color 0.2s;
}
.city-row:hover .remove-btn {
  opacity: 1;
}
.remove-btn:hover {
  color: var(--color-indicator);
  background-color: var(--color-hover);
}
.remove-placeholder {
    width: 40px;
    border-left: 1px solid var(--color-border);
    height: 100%;
}

</style>
