import React, { useState, useEffect } from 'react';
import SearchBar from './InputSearchBar';
import BandList from './Bands';
import Loader from '../common/Loader';
import { fetchUserLocation, searchBands } from '../utils/musicBandApi';

const Finder = () => {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [city, setCity] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    const initializeLocation = async () => {
      try {
        setLoading(true);
        const detectedCity = await fetchUserLocation();
        setCurrentLocation(detectedCity);
        setCity(detectedCity);
        const bandsData = await searchBands(detectedCity);
        setBands(bandsData);
      } catch (err) {
        setError('Unable to detect your location. Please enter a city manually.');
      } finally {
        setLoading(false);
      }
    };

    initializeLocation();
  }, []);

  const handleSearch = async (searchCity) => {
    try {
      setLoading(true);
      setError('');
      const bandsData = await searchBands(searchCity);
      setBands(bandsData);
      setCurrentLocation(searchCity);
    } catch (err) {
      setError('Failed to fetch bands. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-lg w-full max-w-6xl p-8 md:p-12 lg:p-16">
        <header className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Harmony Hive
          </h1>
          <p className="text-gray-600 text-lg md:text-xl">
            Discover the heartbeat of local music talent
          </p>
        </header>

        <div className="mb-12 md:mb-16">
          <SearchBar
            onSearch={handleSearch}
            initialCity={city}
            disabled={loading}
            className="bg-gray-100 focus:bg-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 p-4 rounded-lg shadow-sm"
          />
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {currentLocation && !error && (
          <div className="text-center text-gray-600 mb-6">
            Showing results for: {currentLocation}
          </div>
        )}

        {loading ? (
          <Loader />
        ) : (
          <BandList bands={bands} />
        )}
      </div>
    </div>
  );
};

export default Finder;