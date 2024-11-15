import React, { useState } from 'react';
import BandCard from '../common/Card';

const BandList = ({ bands }) => {


  if (bands.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-8">
        No bands found for this location.
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bands.map((band) => (
          <BandCard key={band.id} band={band} />
        ))}
      </div>
    </div>
  );
};

export default BandList;