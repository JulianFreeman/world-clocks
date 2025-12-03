export interface CityData {
  name: string;
  country: string;
  timezone: string;
}

export const availableCities: CityData[] = [
  { name: 'New York', country: 'USA', timezone: 'America/New_York' },
  { name: 'Los Angeles', country: 'USA', timezone: 'America/Los_Angeles' },
  { name: 'Chicago', country: 'USA', timezone: 'America/Chicago' },
  { name: 'London', country: 'UK', timezone: 'Europe/London' },
  { name: 'Paris', country: 'France', timezone: 'Europe/Paris' },
  { name: 'Berlin', country: 'Germany', timezone: 'Europe/Berlin' },
  { name: 'Tokyo', country: 'Japan', timezone: 'Asia/Tokyo' },
  { name: 'Shanghai', country: 'China', timezone: 'Asia/Shanghai' },
  { name: 'Hong Kong', country: 'China', timezone: 'Asia/Hong_Kong' },
  { name: 'Beijing', country: 'China', timezone: 'Asia/Shanghai' }, // Usually same as Shanghai
  { name: 'Sydney', country: 'Australia', timezone: 'Australia/Sydney' },
  { name: 'Melbourne', country: 'Australia', timezone: 'Australia/Melbourne' },
  { name: 'Dubai', country: 'UAE', timezone: 'Asia/Dubai' },
  { name: 'Mumbai', country: 'India', timezone: 'Asia/Kolkata' },
  { name: 'Singapore', country: 'Singapore', timezone: 'Asia/Singapore' },
  { name: 'Seoul', country: 'South Korea', timezone: 'Asia/Seoul' },
  { name: 'Moscow', country: 'Russia', timezone: 'Europe/Moscow' },
  { name: 'Toronto', country: 'Canada', timezone: 'America/Toronto' },
  { name: 'Vancouver', country: 'Canada', timezone: 'America/Vancouver' },
  { name: 'Sao Paulo', country: 'Brazil', timezone: 'America/Sao_Paulo' },
  { name: 'Johannesburg', country: 'South Africa', timezone: 'Africa/Johannesburg' },
  { name: 'Istanbul', country: 'Turkey', timezone: 'Europe/Istanbul' },
  { name: 'Zurich', country: 'Switzerland', timezone: 'Europe/Zurich' },
  { name: 'Auckland', country: 'New Zealand', timezone: 'Pacific/Auckland' },
  { name: 'Honolulu', country: 'USA', timezone: 'Pacific/Honolulu' },
  { name: 'Taipei', country: 'Taiwan', timezone: 'Asia/Taipei' }
];

// Sort alphabetically by Country then City
availableCities.sort((a, b) => {
  if (a.country === b.country) {
    return a.name.localeCompare(b.name);
  }
  return a.country.localeCompare(b.country);
});
