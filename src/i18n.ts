import { createI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

const messages = {
  en: {
    app: {
      title: 'World Clock',
      now: 'Now',
      addCity: 'Add City',
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
      title: '世界时钟',
      now: '现在',
      addCity: '添加城市',
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
