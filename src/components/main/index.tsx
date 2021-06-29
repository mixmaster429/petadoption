import React from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { usePlacesWidget } from 'react-google-autocomplete';

export const Main: React.FC = () => {
  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyAs_LAuZVVqNTEdv765oUp6arI5Tjxs43s',
    onPlaceSelected: (place) => {
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
    },
  });

  return (
    <div className='container mx-auto'>
      <div className='grid grid-flow-col gap-4'>
        <div className='col-span-3 px-10'>
          <label htmlFor='company_website' className='block text-sm font-medium text-gray-700'>
            Your Location:
          </label>
          <div className='mt-1 flex rounded-md shadow-sm'>
            <span className='inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm'>
              <LocationMarkerIcon className='h-5 w-5 text-black-500' />
            </span>
            <input
              ref={ref}
              type='text'
              name='company_website'
              id='company_website'
              className='focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300'
            />
          </div>
        </div>

        <div className='col-span-9 bg-gray-200'>2</div>
      </div>
    </div>
  );
};
