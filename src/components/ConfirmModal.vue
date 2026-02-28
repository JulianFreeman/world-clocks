<script setup lang="ts">
import { X, AlertTriangle } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

defineProps<{
  title: string
  message: string
}>()

const emit = defineEmits(['confirm', 'cancel'])
const { t } = useI18n()
</script>

<template>
  <div class="modal-overlay" @click="$emit('cancel')">
    <div class="modal-content" @click.stop>
      <header class="modal-header">
        <div class="header-title">
          <AlertTriangle :size="20" class="warning-icon" />
          <h2>{{ title }}</h2>
        </div>
        <button @click="$emit('cancel')" class="close-btn">
          <X :size="20" />
        </button>
      </header>
      
      <div class="modal-body">
        <p>{{ message }}</p>
      </div>
      
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="$emit('cancel')">
          {{ t('app.cancel') }}
        </button>
        <button class="btn btn-primary" @click="$emit('confirm')">
          {{ t('app.confirm') }}
        </button>
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
  z-index: 110; /* Higher than other UI but below CitySelector if needed, though they don't overlap */
  backdrop-filter: blur(2px);
}

.modal-content {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.modal-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-border);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.warning-icon {
  color: #eab308; /* Yellow-500 */
}

.modal-header h2 {
  margin: 0;
  font-size: 1.1rem;
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

.modal-body {
  padding: 24px 16px;
}

.modal-body p {
  margin: 0;
  color: var(--color-text);
  line-height: 1.5;
}

.modal-footer {
  padding: 12px 16px;
  background: var(--color-timeline-bg);
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid var(--color-border);
}

.btn {
  padding: 8px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.9rem;
}

.btn-secondary {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}
.btn-secondary:hover {
  background: var(--color-hover);
}

.btn-primary {
  background: var(--color-primary);
  border: none;
  color: white;
}
.btn-primary:hover {
  opacity: 0.9;
}
</style>
