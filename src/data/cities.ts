export interface CityData {
  name: string;
  country: string;
  timezone: string;
}

export const availableCities: CityData[] = [
  // North America
  { name: 'New York', country: 'USA', timezone: 'America/New_York' },
  { name: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles' },
  { name: 'Chicago', country: 'USA', timezone: 'America/Chicago' },
  { name: 'Houston', country: 'USA', timezone: 'America/Chicago' },
  { name: 'Phoenix', country: 'USA', timezone: 'America/Phoenix' },
  { name: 'Denver', country: 'USA', timezone: 'America/Denver' },
  { name: 'San Francisco', country: 'USA', timezone: 'America/Los_Angeles' },
  { name: 'Seattle', country: 'USA', timezone: 'America/Los_Angeles' },
  { name: 'Miami', country: 'USA', timezone: 'America/New_York' },
  { name: 'Boston', country: 'USA', timezone: 'America/New_York' },
  { name: 'Washington D.C.', country: 'USA', timezone: 'America/New_York' },
  { name: 'Atlanta', country: 'USA', timezone: 'America/New_York' },
  { name: 'Honolulu', country: 'USA', timezone: 'Pacific/Honolulu' },
  { name: 'Anchorage', country: 'USA', timezone: 'America/Anchorage' },
  { name: 'Toronto', country: 'Canada', timezone: 'America/Toronto' },
  { name: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver' },
  { name: 'Montreal', country: 'Canada', timezone: 'America/Toronto' },
  { name: 'Calgary', country: 'Canada', timezone: 'America/Edmonton' },
  { name: 'Mexico City', country: 'Mexico', timezone: 'America/Mexico_City' },

  // South America
  { name: 'Sao Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { name: 'Rio de Janeiro', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { name: 'Buenos Aires', country: 'Argentina', timezone: 'America/Argentina/Buenos_Aires' },
  { name: 'Santiago', country: 'Chile', timezone: 'America/Santiago' },
  { name: 'Lima', country: 'Peru', timezone: 'America/Lima' },
  { name: 'Bogota', country: 'Colombia', timezone: 'America/Bogota' },
  { name: 'Caracas', country: 'Venezuela', timezone: 'America/Caracas' },

  // Europe
  { name: 'London', country: 'UK', timezone: 'Europe/London' },
  { name: 'Manchester', country: 'UK', timezone: 'Europe/London' },
  { name: 'Paris', country: 'France', timezone: 'Europe/Paris' },
  { name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin' },
  { name: 'Frankfurt', country: 'Germany', timezone: 'Europe/Berlin' },
  { name: 'Munich', country: 'Germany', timezone: 'Europe/Berlin' },
  { name: 'Madrid', country: 'Spain', timezone: 'Europe/Madrid' },
  { name: 'Barcelona', country: 'Spain', timezone: 'Europe/Madrid' },
  { name: 'Rome', country: 'Italy', timezone: 'Europe/Rome' },
  { name: 'Milan', country: 'Italy', timezone: 'Europe/Rome' },
  { name: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { name: 'Geneva', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow' },
  { name: 'Amsterdam', country: 'Netherlands', timezone: 'Europe/Amsterdam' },
  { name: 'Brussels', country: 'Belgium', timezone: 'Europe/Brussels' },
  { name: 'Vienna', country: 'Austria', timezone: 'Europe/Vienna' },
  { name: 'Stockholm', country: 'Sweden', timezone: 'Europe/Stockholm' },
  { name: 'Oslo', country: 'Norway', timezone: 'Europe/Oslo' },
  { name: 'Copenhagen', country: 'Denmark', timezone: 'Europe/Copenhagen' },
  { name: 'Helsinki', country: 'Finland', timezone: 'Europe/Helsinki' },
  { name: 'Warsaw', country: 'Poland', timezone: 'Europe/Warsaw' },
  { name: 'Prague', country: 'Czech Republic', timezone: 'Europe/Prague' },
  { name: 'Budapest', country: 'Hungary', timezone: 'Europe/Budapest' },
  { name: 'Dublin', country: 'Ireland', timezone: 'Europe/Dublin' },
  { name: 'Lisbon', country: 'Portugal', timezone: 'Europe/Lisbon' },
  { name: 'Athens', country: 'Greece', timezone: 'Europe/Athens' },
  { name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul' },
  { name: 'Kyiv', country: 'Ukraine', timezone: 'Europe/Kyiv' },

  // Asia
  { name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
  { name: 'Osaka', country: 'Japan', timezone: 'Asia/Tokyo' },
  { name: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai' },
  { name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai' },
  { name: 'Shenzhen', country: 'China', timezone: 'Asia/Shanghai' },
  { name: 'Guangzhou', country: 'China', timezone: 'Asia/Shanghai' },
  { name: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong' },
  { name: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei' },
  { name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul' },
  { name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore' },
  { name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata' },
  { name: 'New Delhi', country: 'India', timezone: 'Asia/Kolkata' },
  { name: 'Bangalore', country: 'India', timezone: 'Asia/Kolkata' },
  { name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai' },
  { name: 'Abu Dhabi', country: 'UAE', timezone: 'Asia/Dubai' },
  { name: 'Bangkok', country: 'Thailand', timezone: 'Asia/Bangkok' },
  { name: 'Jakarta', country: 'Indonesia', timezone: 'Asia/Jakarta' },
  { name: 'Bali', country: 'Indonesia', timezone: 'Asia/Makassar' },
  { name: 'Ho Chi Minh City', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
  { name: 'Hanoi', country: 'Vietnam', timezone: 'Asia/Ho_Chi_Minh' },
  { name: 'Manila', country: 'Philippines', timezone: 'Asia/Manila' },
  { name: 'Kuala Lumpur', country: 'Malaysia', timezone: 'Asia/Kuala_Lumpur' },
  { name: 'Riyadh', country: 'Saudi Arabia', timezone: 'Asia/Riyadh' },
  { name: 'Tehran', country: 'Iran', timezone: 'Asia/Tehran' },
  { name: 'Tel Aviv', country: 'Israel', timezone: 'Asia/Jerusalem' },
  { name: 'Jerusalem', country: 'Israel', timezone: 'Asia/Jerusalem' },
  { name: 'Karachi', country: 'Pakistan', timezone: 'Asia/Karachi' },
  { name: 'Dhaka', country: 'Bangladesh', timezone: 'Asia/Dhaka' },
  { name: 'Almaty', country: 'Kazakhstan', timezone: 'Asia/Almaty' },
  
  // Oceania
  { name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
  { name: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne' },
  { name: 'Brisbane', country: 'Australia', timezone: 'Australia/Brisbane' },
  { name: 'Perth', country: 'Australia', timezone: 'Australia/Perth' },
  { name: 'Adelaide', country: 'Australia', timezone: 'Australia/Adelaide' },
  { name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland' },
  { name: 'Wellington', country: 'New Zealand', timezone: 'Pacific/Auckland' },
  { name: 'Suva', country: 'Fiji', timezone: 'Pacific/Fiji' },

  // Africa
  { name: 'Cairo', country: 'Egypt', timezone: 'Africa/Cairo' },
  { name: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { name: 'Cape Town', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { name: 'Lagos', country: 'Nigeria', timezone: 'Africa/Lagos' },
  { name: 'Nairobi', country: 'Kenya', timezone: 'Africa/Nairobi' },
  { name: 'Casablanca', country: 'Morocco', timezone: 'Africa/Casablanca' },
  { name: 'Addis Ababa', country: 'Ethiopia', timezone: 'Africa/Addis_Ababa' },
  { name: 'Accra', country: 'Ghana', timezone: 'Africa/Accra' },
  
  // UTC
  { name: 'UTC', country: 'Universal Time', timezone: 'UTC' }
];

// Sort alphabetically by Country then City
availableCities.sort((a, b) => {
  if (a.country === b.country) {
    return a.name.localeCompare(b.name);
  }
  return a.country.localeCompare(b.country);
});