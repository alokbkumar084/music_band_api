const MUSICBRAINZ_API = 'https://musicbrainz.org/ws/2/artist';
const GEOLOCATION_API = 'https://get.geojs.io/v1/ip/geo.json';

export const fetchUserLocation = async () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(GEOLOCATION_API);
            const data = await response.json();
            resolve(data.city);
          } catch (err) {
            reject(new Error('Failed to get location from IP'));
          }
        },
        async () => {
          try {
            const response = await fetch(GEOLOCATION_API);
            const data = await response.json();
            resolve(data.city);
          } catch (err) {
            reject(new Error('Failed to get location'));
          }
        }
      );
    } else {
      reject(new Error('Geolocation not supported'));
    }
  });
};

export const searchBands = async (city) => {
  const tenYearsAgo = new Date();
  tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
  const dateStr = tenYearsAgo.toISOString().split('T')[0];

  const response = await fetch(
    `${MUSICBRAINZ_API}/?query=area:${city} AND begin:[${dateStr} TO *]&fmt=json&limit=50`,
    {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MusicBandFinder/1.0.0'
      }
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch bands');
  }

  const data = await response.json();
  return data.artists || [];
};