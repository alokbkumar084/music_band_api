import React from 'react';

const BandCard = ({ band }) => {
  return (
    <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
      <div className="p-6 md:p-8 lg:p-10">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {band.name}
          {band.disambiguation && (
            <span className="text-base font-normal text-gray-500 ml-3">
              ({band.disambiguation})
            </span>
          )}
        </h3>
        
        <div className="space-y-4">
          {band['life-span']?.begin && (
            <div className="flex items-center text-gray-600">
              <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Founded: {band['life-span'].begin}</span>
            </div>
          )}
          
          {band.area?.name && (
            <div className="flex items-center text-gray-600">
              <svg className="h-6 w-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{band.area.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BandCard;