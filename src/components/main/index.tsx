import React, { useState, useEffect } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { usePlacesWidget } from 'react-google-autocomplete';
import StarRatings from 'react-star-ratings';

export const Main: React.FC = () => {
  const [petadoptions, setPetadoptions] = useState([]);
  const [geoposition, setgeoposition] = useState({
    lat: 0,
    lng: 0,
  });
  const [loading, setLoading] = useState(false)

  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      setgeoposition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
  });

  const find_adoptions = (geoposition) => {
    setPetadoptions([]);
    const API_URL = 'http://localhost:4000/getpetadoptions';
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(geoposition),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          if (result.businesses) setPetadoptions(result.businesses);
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
      <div className='grid lg:grid-flow-col gap-4 mx-2'>
        <div className='col-span-12 lg:col-span-3 px-2'>
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

        <div className='col-span-12 lg:col-span-9 px-2'>
          {petadoptions.length === 0 && <p>No results</p>}

          {petadoptions.map((item, key) => {
            return (
              <div key={key} className='flex border-2 border-gray-100 shadow-sm p-5 mb-5'>
                <div className='item-image'>
                  <img src={item.image_url} alt='' className='object-cover w-40 h-40' />
                </div>

                <div className='item-details ml-5'>
                  <p className='text-lg font-bold'>
                    {key + 1}. {item.name}
                  </p>
                  <div className='flex items-center'>
                    <StarRatings
                      rating={item.rating}
                      starDimension='20px'
                      starRatedColor='#ff0254'
                      numberOfStars={5}
                      name='rating'
                      starSpacing='1px'
                    />
                    <span className='ml-2'>{item.review_count}</span>
                  </div>
                  <p className='text-sm text-gray-600'>
                    {item.categories.map((category, index) => {
                      return (
                        <span key={index}>
                          {category.title}
                          {index === item.categories.length - 1 ? '' : ', '}
                        </span>
                      );
                    })}
                  </p>
                  <p>
                    <span className='font-bold'>Address:</span> {item.location.display_address}
                  </p>
                  <p
                    className={
                      item.is_closed ? 'text-red-900 font-bold' : 'text-green-300 font-bold'
                    }
                  >
                    {item.is_closed ? 'Closed' : 'Open'}
                  </p>
                  <p className='font-medium'>{item.distance.toFixed(2)} Miles away.</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
