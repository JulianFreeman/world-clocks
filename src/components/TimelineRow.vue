<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import dayjs from 'dayjs'
import { GripVertical, Trash2 } from 'lucide-vue-next'
import type { CityData } from '../data/cities'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  city: CityData
  viewingTime: dayjs.Dayjs
  isCurrentLocation?: boolean
}>()

const emit = defineEmits(['remove', 'update:viewingTime', 'start-drag'])
const { t, locale } = useI18n()

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
// Optimization: Pre-calculate all display properties to avoid function calls in template during drag
const ticks = computed(() => {
  // Dependency on locale to trigger re-render when language changes
  const _l = locale.value
  
  const result = []
  const start = anchorTime.value.subtract(2, 'day')
  const end = anchorTime.value.add(2, 'day')
  
  let current = start.startOf('hour')
  while (current.isBefore(end)) {
    const localTick = current.tz(props.city.timezone)
    const diff = current.diff(anchorTime.value, 'hour', true)
    
    result.push({
      key: current.toISOString(),
      left: `${diff * pixelsPerHour}px`,
      label: localTick.format('H'),
      isMidnight: localTick.hour() === 0,
      // Ensure locale is applied
      dayLabel: localTick.locale(_l).format('MMM D')
    })
    current = current.add(1, 'hour')
  }
  return result
})

// Calculate local time for the intersection point
const localTime = computed(() => {
  return props.viewingTime.tz(props.city.timezone)
})

// Reactive formatting based on locale
const formattedTime = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _l = locale.value 
  return localTime.value.format('HH:mm')
})
const formattedDate = computed(() => {
  return localTime.value.locale(locale.value).format('ddd, MMM D')
})
const gmtOffset = computed(() => localTime.value.format('Z'))

// Analog clock rotations
const hourDegrees = computed(() => {
  const h = localTime.value.hour() % 12
  const m = localTime.value.minute()
  const s = localTime.value.second()
  // Hour hand moves slightly as minutes and seconds pass
  return (h + m / 60 + s / 3600) * 30
})

const minuteDegrees = computed(() => {
  const m = localTime.value.minute()
  const s = localTime.value.second()
  // Minute hand moves slightly as seconds pass
  return (m + s / 60) * 6
})

const isDaylight = computed(() => {
  const hour = localTime.value.hour()
  return hour >= 6 && hour < 18
})

// Localized Names
const cityName = computed(() => {
  if (props.isCurrentLocation) return t('city.localTime')
  return locale.value === 'zh-CN' ? (props.city.name_zh || props.city.name) : props.city.name
})
const cityCountry = computed(() => {
  if (props.isCurrentLocation) return t('city.currentLocation')
  return locale.value === 'zh-CN' ? (props.city.country_zh || props.city.country) : props.city.country
})

// Calculate timeline offset
// We want the point on timeline corresponding to 'viewingTime' to be at center of container
const timelineTransform = computed(() => {
  if (!containerWidth.value) return 0
  
  const diffHours = props.viewingTime.diff(anchorTime.value, 'hour', true)
  return -1 * (diffHours * pixelsPerHour) + (containerWidth.value / 2)
})

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

const isDragEnabled = ref(false)
</script>

<template>
  <div 
    class="city-row"
    :draggable="isDragEnabled"
    @dragend="isDragEnabled = false"
  >
    <div 
      class="drag-handle" 
      :title="t('city.drag')"
      @mousedown="isDragEnabled = true"
      @mouseup="isDragEnabled = false"
    >
      <GripVertical :size="16" />
    </div>
    
    <div class="city-info">
      <div class="info-content">
        <div class="city-name-group">
          <span class="city-name">{{ cityName }}</span>
          <span class="city-details">{{ cityCountry }}</span>
        </div>
        <div class="city-meta">
          <span class="time-preview">{{ formattedTime }}</span>
          <span class="date-preview">{{ formattedDate }}</span>
          <span class="offset-preview">UTC {{ gmtOffset }}</span>
        </div>
      </div>

      <div class="analog-clock" :class="{ 'is-day': isDaylight, 'is-night': !isDaylight }" :title="formattedTime">
        <svg viewBox="0 0 100 100">
          <!-- Outer Accent Ring (Suggestion 3) -->
          <circle class="clock-accent-ring" cx="50" cy="50" r="48" />

          <!-- Clock face with dynamic background (Suggestion 1) -->
          <circle class="clock-face" cx="50" cy="50" r="45" />
          
          <!-- Hour markers (12, 3, 6, 9) -->
          <line v-for="n in 4" :key="n" class="clock-marker" x1="50" y1="10" x2="50" y2="16" :transform="`rotate(${(n-1)*90} 50 50)`" />
          
          <!-- Hands -->
          <line 
            class="clock-hand hour-hand" 
            x1="50" y1="50" x2="50" y2="30" 
            :style="{ transform: `rotate(${hourDegrees}deg)` }" 
          />
          <line 
            class="clock-hand minute-hand" 
            x1="50" y1="50" x2="50" y2="18" 
            :style="{ transform: `rotate(${minuteDegrees}deg)` }" 
          />
          
          <!-- Center dot -->
          <circle class="clock-center" cx="50" cy="50" r="3" />
        </svg>
      </div>
    </div>
    
    <div 
      class="timeline-wrapper" 
      ref="timelineContainer"
      @mousedown="$emit('start-drag', $event)"
      @dragstart.prevent
    >
       <div 
         class="timeline-track"
         :style="{ transform: `translateX(${timelineTransform}px)` }"
       >
         <!-- Render Grid/Ticks -->
         <div 
            v-for="tick in ticks" 
            :key="tick.key"
            class="tick"
            :class="{ 'tick-midnight': tick.isMidnight }"
            :style="{ left: tick.left }"
         >
            <span class="tick-label">{{ tick.label }}</span>
            <span v-if="tick.isMidnight" class="day-label">{{ tick.dayLabel }}</span>
            <div class="tick-mark"></div>
         </div>
       </div>
    </div>
    
    <button 
      v-if="!isCurrentLocation" 
      class="remove-btn" 
      @click="$emit('remove')"
      :title="t('city.remove')"
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
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  overflow: hidden;
  gap: 12px;
}

.info-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}

.analog-clock {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  opacity: 1;
}

.clock-face {
  fill: transparent;
  stroke: var(--color-border);
  stroke-width: 2;
  transition: fill 0.8s ease;
}

.clock-accent-ring {
  fill: none;
  stroke-width: 2;
  stroke: transparent;
  transition: stroke 0.8s ease;
  opacity: 0.6;
}

.is-day .clock-face {
  fill: rgba(253, 224, 71, 0.08); /* Pale yellow tint for day */
}

.is-day .clock-accent-ring {
  stroke: #f59e0b; /* Amber-500 accent for day */
}

.is-night .clock-face {
  fill: rgba(30, 58, 138, 0.12); /* Deep blue tint for night */
}

.is-night .clock-accent-ring {
  stroke: #3b82f6; /* Blue-500 accent for night */
}

.clock-marker {
  stroke: var(--color-border);
  stroke-width: 2;
  stroke-linecap: round;
}

.clock-hand {
  stroke-linecap: round;
  transform-origin: center; /* Explicitly rotate around SVG center */
  will-change: transform;
}

.hour-hand {
  stroke: var(--color-text);
  stroke-width: 4;
}

.minute-hand {
  stroke: var(--color-primary);
  stroke-width: 3;
}

.clock-center {
  fill: var(--color-text);
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
  cursor: grab; /* Consistent with global drag */
}
.timeline-wrapper:active {
  cursor: grabbing;
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
