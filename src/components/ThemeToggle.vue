<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { Moon, Sun } from 'lucide-vue-next'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <button 
    @click="toggleDark()" 
    class="theme-toggle"
    title="Toggle Theme"
  >
    <Moon v-if="isDark" :size="20" />
    <Sun v-else :size="20" />
  </button>
</template>

<style scoped>
.theme-toggle {
  background: none;
  border: none;
  color: var(--color-text);
  padding: 8px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.theme-toggle:hover {
  background-color: var(--color-hover);
}
</style>
