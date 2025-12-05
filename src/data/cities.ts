export interface CityData {
  name: string;
  country: string;
  timezone: string;
  name_zh?: string;
  country_zh?: string;
}

export const availableCities: CityData[] = [
  // North America
  { name: 'New York', country: 'USA', timezone: 'America/New_York', name_zh: '纽约', country_zh: '美国' },
  { name: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles', name_zh: '洛杉矶', country_zh: '美国' },
  { name: 'Chicago', country: 'USA', timezone: 'America/Chicago', name_zh: '芝加哥', country_zh: '美国' },
  { name: 'Houston', country: 'USA', timezone: 'America/Chicago', name_zh: '休斯顿', country_zh: '美国' },
  { name: 'Phoenix', country: 'USA', timezone: 'America/Phoenix', name_zh: '凤凰城', country_zh: '美国' },
  { name: 'Denver', country: 'USA', timezone: 'America/Denver', name_zh: '丹佛', country_zh: '美国' },
  { name: 'San Francisco', country: 'USA', timezone: 'America/Los_Angeles', name_zh: '旧金山', country_zh: '美国' },
  { name: 'Seattle', country: 'USA', timezone: 'America/Los_Angeles', name_zh: '西雅图', country_zh: '美国' },
  { name: 'Miami', country: 'USA', timezone: 'America/New_York', name_zh: '迈阿密', country_zh: '美国' },
  { name: 'Boston', country: 'USA', timezone: 'America/New_York', name_zh: '波士顿', country_zh: '美国' },
  { name: 'Washington D.C.', country: 'USA', timezone: 'America/New_York', name_zh: '华盛顿特区', country_zh: '美国' },
  { name: 'Atlanta', country: 'USA', timezone: 'America/New_York', name_zh: '亚特兰大', country_zh: '美国' },
  { name: 'Honolulu', country: 'USA', timezone: 'Pacific/Honolulu', name_zh: '火奴鲁鲁', country_zh: '美国' },
  { name: 'Anchorage', country: 'USA', timezone: 'America/Anchorage', name_zh: '安克雷奇', country_zh: '美国' },
  { name: 'Toronto', country: 'Canada', timezone: 'America/Toronto', name_zh: '多伦多', country_zh: '加拿大' },
  { name: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver', name_zh: '温哥华', country_zh: '加拿大' },
  { name: 'Montreal', country: 'Canada', timezone: 'America/Toronto', name_zh: '蒙特利尔', country_zh: '加拿大' },
  { name: 'Calgary', country: 'Canada', timezone: 'America/Edmonton', name_zh: '卡尔加里', country_zh: '加拿大' },
  { name: 'Halifax', country: 'Canada', timezone: 'America/Halifax', name_zh: '哈利法克斯', country_zh: '加拿大' },
  { name: 'St. John\'s', country: 'Canada', timezone: 'America/St_Johns', name_zh: '圣约翰斯', country_zh: '加拿大' },
  { name: 'Nuuk', country: 'Greenland', timezone: 'America/Nuuk', name_zh: '努克', country_zh: '格陵兰' },
  { name: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City', name_zh: '墨西哥城', country_zh: '墨西哥' },

  // South America
  { name: 'Sao Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo', name_zh: '圣保罗', country_zh: '巴西' },
  { name: 'Rio de Janeiro', country: 'Brazil', timezone: 'America/Sao_Paulo', name_zh: '里约热内卢', country_zh: '巴西' },
  { name: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires', name_zh: '布宜诺斯艾利斯', country_zh: '阿根廷' },
  { name: 'Santiago', country: 'Chile', timezone: 'America/Santiago', name_zh: '圣地亚哥', country_zh: '智利' },
  { name: 'Lima', country: 'Peru', timezone: 'America/Lima', name_zh: '利马', country_zh: '秘鲁' },
  { name: 'Bogota', country: 'Colombia', timezone: 'America/Bogota', name_zh: '波哥大', country_zh: '哥伦比亚' },
  { name: 'Caracas', country: 'Venezuela', timezone: 'America/Caracas', name_zh: '加拉加斯', country_zh: '委内瑞拉' },

  // Europe
  { name: 'London', country: 'UK', timezone: 'Europe/London', name_zh: '伦敦', country_zh: '英国' },
  { name: 'Manchester', country: 'UK', timezone: 'Europe/London', name_zh: '曼彻斯特', country_zh: '英国' },
  { name: 'Paris', country: 'France', timezone: 'Europe/Paris', name_zh: '巴黎', country_zh: '法国' },
  { name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin', name_zh: '柏林', country_zh: '德国' },
  { name: 'Frankfurt', country: 'Germany', timezone: 'Europe/Berlin', name_zh: '法兰克福', country_zh: '德国' },
  { name: 'Munich', country: 'Germany', timezone: 'Europe/Berlin', name_zh: '慕尼黑', country_zh: '德国' },
  { name: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid', name_zh: '马德里', country_zh: '西班牙' },
  { name: 'Barcelona', country: 'Spain', timezone: 'Europe/Madrid', name_zh: '巴塞罗那', country_zh: '西班牙' },
  { name: 'Rome', country: 'Italy', timezone: 'Europe/Rome', name_zh: '罗马', country_zh: '意大利' },
  { name: 'Milan', country: 'Italy', timezone: 'Europe/Rome', name_zh: '米兰', country_zh: '意大利' },
  { name: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich', name_zh: '苏黎世', country_zh: '瑞士' },
  { name: 'Geneva', country: 'Switzerland', timezone: 'Europe/Zurich', name_zh: '日内瓦', country_zh: '瑞士' },
  { name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow', name_zh: '莫斯科', country_zh: '俄罗斯' },
  { name: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam', name_zh: '阿姆斯特丹', country_zh: '荷兰' },
  { name: 'Brussels', country: 'Belgium', timezone: 'Europe/Brussels', name_zh: '布鲁塞尔', country_zh: '比利时' },
  { name: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna', name_zh: '维也纳', country_zh: '奥地利' },
  { name: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm', name_zh: '斯德哥尔摩', country_zh: '瑞典' },
  { name: 'Oslo', country: 'Norway', timezone: 'Europe/Oslo', name_zh: '奥斯陆', country_zh: '挪威' },
  { name: 'Copenhagen', country: 'Denmark', timezone: 'Europe/Copenhagen', name_zh: '哥本哈根', country_zh: '丹麦' },
  { name: 'Helsinki', country: 'Finland', timezone: 'Europe/Helsinki', name_zh: '赫尔辛基', country_zh: '芬兰' },
  { name: 'Warsaw', country: 'Poland', timezone: 'Europe/Warsaw', name_zh: '华沙', country_zh: '波兰' },
  { name: 'Prague', country: 'Czech Republic', timezone: 'Europe/Prague', name_zh: '布拉格', country_zh: '捷克' },
  { name: 'Budapest', country: 'Hungary', timezone: 'Europe/Budapest', name_zh: '布达佩斯', country_zh: '匈牙利' },
  { name: 'Dublin', country: 'Ireland', timezone: 'Europe/Dublin', name_zh: '都柏林', country_zh: '爱尔兰' },
  { name: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon', name_zh: '里斯本', country_zh: '葡萄牙' },
  { name: 'Reykjavik', country: 'Iceland', timezone: 'Atlantic/Reykjavik', name_zh: '雷克雅未克', country_zh: '冰岛' },
  { name: 'Athens', country: 'Greece', timezone: 'Europe/Athens', name_zh: '雅典', country_zh: '希腊' },
  { name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul', name_zh: '伊斯坦布尔', country_zh: '土耳其' },
  { name: 'Kyiv', country: 'Ukraine', timezone: 'Europe/Kyiv', name_zh: '基辅', country_zh: '乌克兰' },

  // Asia
  { name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo', name_zh: '东京', country_zh: '日本' },
  { name: 'Osaka', country: 'Japan', timezone: 'Asia/Tokyo', name_zh: '大阪', country_zh: '日本' },
  { name: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai', name_zh: '上海', country_zh: '中国' },
  { name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai', name_zh: '北京', country_zh: '中国' },
  { name: 'Shenzhen', country: 'China', timezone: 'Asia/Shanghai', name_zh: '深圳', country_zh: '中国' },
  { name: 'Guangzhou', country: 'China', timezone: 'Asia/Shanghai', name_zh: '广州', country_zh: '中国' },
  { name: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong', name_zh: '香港', country_zh: '中国' },
  { name: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei', name_zh: '台北', country_zh: '中国台湾' },
  { name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul', name_zh: '首尔', country_zh: '韩国' },
  { name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore', name_zh: '新加坡', country_zh: '新加坡' },
  { name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata', name_zh: '孟买', country_zh: '印度' },
  { name: 'New Delhi', country: 'India', timezone: 'Asia/Kolkata', name_zh: '新德里', country_zh: '印度' },
  { name: 'Bangalore', country: 'India', timezone: 'Asia/Kolkata', name_zh: '班加罗尔', country_zh: '印度' },
  { name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai', name_zh: '迪拜', country_zh: '阿联酋' },
  { name: 'Abu Dhabi', country: 'UAE', timezone: 'Asia/Dubai', name_zh: '阿布扎比', country_zh: '阿联酋' },
  { name: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok', name_zh: '曼谷', country_zh: '泰国' },
  { name: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta', name_zh: '雅加达', country_zh: '印度尼西亚' },
  { name: 'Bali', country: 'Indonesia', timezone: 'Asia/Makassar', name_zh: '巴厘岛', country_zh: '印度尼西亚' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', name_zh: '胡志明市', country_zh: '越南' },
  { name: 'Hanoi', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh', name_zh: '河内', country_zh: '越南' },
  { name: 'Manila', country: 'Philippines', timezone: 'Asia/Manila', name_zh: '马尼拉', country_zh: '菲律宾' },
  { name: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur', name_zh: '吉隆坡', country_zh: '马来西亚' },
  { name: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh', name_zh: '利雅得', country_zh: '沙特阿拉伯' },
  { name: 'Tehran', country: 'Iran', timezone: 'Asia/Tehran', name_zh: '德黑兰', country_zh: '伊朗' },
  { name: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Jerusalem', name_zh: '特拉维夫', country_zh: '以色列' },
  { name: 'Jerusalem', country: 'Israel', timezone: 'Asia/Jerusalem', name_zh: '耶路撒冷', country_zh: '以色列' },
  { name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi', name_zh: '卡拉奇', country_zh: '巴基斯坦' },
  { name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka', name_zh: '达卡', country_zh: '孟加拉国' },
  { name: 'Almaty', country: 'Kazakhstan', timezone: 'Asia/Almaty', name_zh: '阿拉木图', country_zh: '哈萨克斯坦' },
  { name: 'Tashkent', country: 'Uzbekistan', timezone: 'Asia/Tashkent', name_zh: '塔什干', country_zh: '乌兹别克斯坦' },
  { name: 'Kabul', country: 'Afghanistan', timezone: 'Asia/Kabul', name_zh: '喀布尔', country_zh: '阿富汗' },
  { name: 'Kathmandu', country: 'Nepal', timezone: 'Asia/Kathmandu', name_zh: '加德满都', country_zh: '尼泊尔' },
  { name: 'Yangon', country: 'Myanmar', timezone: 'Asia/Yangon', name_zh: '仰光', country_zh: '缅甸' },
  { name: 'Vladivostok', country: 'Russia', timezone: 'Asia/Vladivostok', name_zh: '符拉迪沃斯托克', country_zh: '俄罗斯' },
  
  // Oceania
  { name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney', name_zh: '悉尼', country_zh: '澳大利亚' },
  { name: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne', name_zh: '墨尔本', country_zh: '澳大利亚' },
  { name: 'Brisbane', country: 'Australia', timezone: 'Australia/Brisbane', name_zh: '布里斯班', country_zh: '澳大利亚' },
  { name: 'Perth', country: 'Australia', timezone: 'Australia/Perth', name_zh: '珀斯', country_zh: '澳大利亚' },
  { name: 'Adelaide', country: 'Australia', timezone: 'Australia/Adelaide', name_zh: '阿德莱德', country_zh: '澳大利亚' },
  { name: 'Darwin', country: 'Australia', timezone: 'Australia/Darwin', name_zh: '达尔文', country_zh: '澳大利亚' },
  { name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland', name_zh: '奥克兰', country_zh: '新西兰' },
  { name: 'Wellington', country: 'New Zealand', timezone: 'Pacific/Auckland', name_zh: '惠灵顿', country_zh: '新西兰' },
  { name: 'Suva', country: 'Fiji', timezone: 'Pacific/Fiji', name_zh: '苏瓦', country_zh: '斐济' },
  { name: 'Noumea', country: 'New Caledonia', timezone: 'Pacific/Noumea', name_zh: '努美阿', country_zh: '新喀里多尼亚' },
  { name: 'Apia', country: 'Samoa', timezone: 'Pacific/Apia', name_zh: '阿皮亚', country_zh: '萨摩亚' },
  { name: 'Kiritimati', country: 'Kiribati', timezone: 'Pacific/Kiritimati', name_zh: '基里蒂马蒂', country_zh: '基里巴斯' },

  // Africa
  { name: 'Praia', country: 'Cape Verde', timezone: 'Atlantic/Cape_Verde', name_zh: '普拉亚', country_zh: '佛得角' },
  { name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo', name_zh: '开罗', country_zh: '埃及' },
  { name: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg', name_zh: '约翰内斯堡', country_zh: '南非' },
  { name: 'Cape Town', country: 'South Africa', timezone: 'Africa/Johannesburg', name_zh: '开普敦', country_zh: '南非' },
  { name: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos', name_zh: '拉各斯', country_zh: '尼日利亚' },
  { name: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi', name_zh: '内罗毕', country_zh: '肯尼亚' },
  { name: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca', name_zh: '卡萨布兰卡', country_zh: '摩洛哥' },
  { name: 'Addis Ababa', country: 'Ethiopia', timezone: 'Africa/Addis_Ababa', name_zh: '亚的斯亚贝巴', country_zh: '埃塞俄比亚' },
  { name: 'Accra', country: 'Ghana', timezone: 'Africa/Accra', name_zh: '阿克拉', country_zh: '加纳' },
  
  // UTC
  { name: 'UTC', country: 'Universal Time', timezone: 'UTC', name_zh: '协调世界时', country_zh: '世界标准时间' }
];

// Sort alphabetically by Country then City
availableCities.sort((a, b) => {
  if (a.country === b.country) {
    return a.name.localeCompare(b.name);
  }
  return a.country.localeCompare(b.country);
});
