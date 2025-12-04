<script setup lang="ts">
import { ref } from 'vue'
import { useColorMode, onClickOutside } from '@vueuse/core'
import { Moon, Sun, Monitor, ChevronDown } from 'lucide-vue-next'

const mode = useColorMode({
  emitAuto: true,
})

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

function setMode(newMode: 'auto' | 'light' | 'dark') {
  mode.value = newMode
  isOpen.value = false
}
</script>

<template>
  <div class="theme-dropdown-container" ref="dropdownRef">
    <button 
      class="theme-btn"
      @click="isOpen = !isOpen"
      title="Select Theme"
    >
      <Moon v-if="mode === 'dark'" :size="18" />
      <Sun v-else-if="mode === 'light'" :size="18" />
      <Monitor v-else :size="18" />
      <ChevronDown :size="14" class="chevron" :class="{ open: isOpen }" />
    </button>

    <Transition name="fade">
      <div v-if="isOpen" class="dropdown-menu">
        <button 
          class="menu-item" 
          :class="{ active: mode === 'auto' }"
          @click="setMode('auto')"
        >
          <Monitor :size="16" />
          <span>Auto</span>
        </button>
        <button 
          class="menu-item" 
          :class="{ active: mode === 'light' }"
          @click="setMode('light')"
        >
          <Sun :size="16" />
          <span>Light</span>
        </button>
        <button 
          class="menu-item" 
          :class="{ active: mode === 'dark' }"
          @click="setMode('dark')"
        >
          <Moon :size="16" />
          <span>Dark</span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.theme-dropdown-container {
  position: relative;
}

.theme-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.theme-btn:hover {
  background-color: var(--color-hover);
  border-color: var(--color-timeline-line);
}

.chevron {
  opacity: 0.6;
  transition: transform 0.2s;
}
.chevron.open {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  width: 140px;
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  padding: 4px;
  display: flex;
  flex-direction: column;
  z-index: 50;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  width: 100%;
  border: none;
  background: none;
  color: var(--color-text);
  border-radius: 4px;
  text-align: left;
  font-size: 0.9rem;
}

.menu-item:hover {
  background-color: var(--color-hover);
}

.menu-item.active {
  color: var(--color-primary);
  background-color: rgba(59, 130, 246, 0.1);
  font-weight: 500;
}

/* Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s, transform 0.15s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}
</style>
