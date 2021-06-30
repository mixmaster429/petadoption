import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';

type Props = {
  lat: number;
  lng: number;
};

export const Marker: React.FC<Props> = ({ lat, lng }) => {
  return (
    <div>
      <LocationMarkerIcon className='w-10 h-10 text-pink-500' />
    </div>
  );
};
