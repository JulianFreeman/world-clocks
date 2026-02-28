import { createI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

const messages = {
  en: {
    app: {
      title1: 'World',
      title2: 'Clocks',
      now: 'Now',
      addCity: 'Add City',
      reset: 'Reset Cities',
      resetConfirm: 'Are you sure you want to reset the city list to default?',
      cancel: 'Cancel',
      confirm: 'Confirm',
      backToNow: 'Back to Now',
      theme: {
        title: 'Select Theme',
        auto: 'Auto',
        light: 'Light',
        dark: 'Dark'
      },
      language: {
        title: 'Select Language'
      }
    },
    city: {
      localTime: 'Local Time',
      currentLocation: 'Current Location',
      searchPlaceholder: 'Search city or country...',
      noResults: 'No cities found.',
      remove: 'Remove city',
      drag: 'Drag to reorder',
      modalTitle: 'Add City',
      sortBy: 'Sort by',
      sortCountry: 'Country',
      sortTimezone: 'Timezone'
    }
  },
  'zh-CN': {
    app: {
      title1: '世界',
      title2: '时钟',
      now: '现在',
      addCity: '添加城市',
      reset: '重置城市',
      resetConfirm: '确定要将城市列表恢复为默认吗？',
      cancel: '取消',
      confirm: '确认',
      backToNow: '回到现在',
      theme: {
        title: '选择主题',
        auto: '自动',
        light: '亮色',
        dark: '深色'
      },
      language: {
        title: '选择语言'
      }
    },
    city: {
      localTime: '本地时间',
      currentLocation: '当前位置',
      searchPlaceholder: '搜索城市或国家...',
      noResults: '未找到相关城市',
      remove: '移除城市',
      drag: '拖拽排序',
      modalTitle: '添加城市',
      sortBy: '排序',
      sortCountry: '国家',
      sortTimezone: '时区'
    }
  }
}

// Detect default language
function getDefaultLocale() {
  const browserLang = navigator.language
  if (browserLang.startsWith('zh')) {
    return 'zh-CN'
  }
  return 'en'
}

const defaultLocale = getDefaultLocale()

// Set dayjs locale initially
dayjs.locale(defaultLocale === 'zh-CN' ? 'zh-cn' : 'en')

const i18n = createI18n({
  legacy: false, // Use Composition API
  locale: defaultLocale,
  fallbackLocale: 'en',
  messages
})

export default i18n
