import React, { useState, useEffect } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { usePlacesWidget } from 'react-google-autocomplete';

export const Main: React.FC = () => {
  const [petadoptions, setPetadoptions] = useState([]);
  const [geoposition, setgeoposition] = useState({
    lat: 0,
    lng: 0,
  });

  const { ref } = usePlacesWidget({
    apiKey: 'AIzaSyAs_LAuZVVqNTEdv765oUp6arI5Tjxs43s',
    onPlaceSelected: (place) => {
      setgeoposition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
  });

  const find_adoptions = (geoposition) => {
    const API_URL = `https://api.yelp.com/v3/businesses/search?term=pets&latitude=${geoposition.lat}&longitude=${geoposition.lng}&categories=petadoption`;
    fetch(API_URL, {
      method: 'get',
      headers: {
        'Access-Control-Allow-Origin': '*',
        authorization:
          'Bearer RQmAJ375vK7UhAZ6NIeNRziREj9DGsKVr2_9E2rcrIQ-jHsjuGx09I7ObLjcRfhh_PH6ynVzv22Ac5tk9DIJDVOGCz5VgAYo_z7BpgzNMBhaoX1pa7tA2EnPXx3WYHYx',
      },
    })
      .then((res) => {
        console.log('res: ', res);
        setPetadoptions([1]);
      })
      .then(
        (result) => {
          console.log('result: ', result);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  useEffect(() => {
    if (geoposition.lat !== 0) find_adoptions(geoposition);
  }, [geoposition]);

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

        <div className='col-span-9'>
          {petadoptions.map((item, key) => {
            return <div key={key}>aaa</div>;
          })}
        </div>
      </div>
    </div>
  );
};
