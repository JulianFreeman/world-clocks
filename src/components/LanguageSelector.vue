<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Languages, ChevronDown, Check } from 'lucide-vue-next'
import { onClickOutside } from '@vueuse/core'
import dayjs from 'dayjs'

const { locale, t } = useI18n()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

const languages = [
  { code: 'en', label: 'English' },
  { code: 'zh-CN', label: '简体中文' }
]

function setLanguage(code: string) {
  locale.value = code
  isOpen.value = false
  // Update dayjs locale globally
  dayjs.locale(code === 'zh-CN' ? 'zh-cn' : 'en')
}
</script>

<template>
  <div class="lang-dropdown-container" ref="dropdownRef">
    <button 
      class="lang-btn"
      @click="isOpen = !isOpen"
      :title="t('app.language.title')"
    >
      <Languages :size="18" />
      <ChevronDown :size="14" class="chevron" :class="{ open: isOpen }" />
    </button>

    <Transition name="fade">
      <div v-if="isOpen" class="dropdown-menu">
        <button 
          v-for="lang in languages"
          :key="lang.code"
          class="menu-item" 
          :class="{ active: locale === lang.code }"
          @click="setLanguage(lang.code)"
        >
          <span>{{ lang.label }}</span>
          <Check v-if="locale === lang.code" :size="14" class="check-icon" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.lang-dropdown-container {
  position: relative;
}

.lang-btn {
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

.lang-btn:hover {
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
  justify-content: space-between;
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

.check-icon {
  color: var(--color-primary);
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
