import React, { useState, useEffect } from 'react';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { usePlacesWidget } from 'react-google-autocomplete';
import { Banner, ResultLists, Paginate } from 'components';

export const Main: React.FC = () => {
  const [petadoptions, setPetadoptions] = useState([]);
  const [total, setTotal] = useState(0);
  const [geoposition, setgeoposition] = useState({
    lat: 0,
    lng: 0,
  });
  const [filter, setFilter] = useState({
    pagecount: 10,
    sortby: 'best_match',
    page: 1,
  });
  const [loading, setLoading] = useState(false);

  // Dom object for google plage widget.
  const { ref } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      setgeoposition({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    },
  });

  // Sort options.
  const sort_options = {
    best_match: 'Best Match',
    rating: 'Rating',
    review_count: 'Review Count',
    distance: 'Distance',
  };

  const setpage = (page) => {
    console.log(page);
    setFilter({
      ...filter,
      page: page,
    });
  };

  // function to all yelp api with location and filter options.
  const find_adoptions = (geoposition) => {
    setPetadoptions([]);
    setLoading(true);
    setTotal(0);
    const params = {
      ...geoposition,
      ...filter,
    };
    const API_URL = 'http://localhost:4000/getpetadoptions';
    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(params),
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
          setLoading(false);
          setTotal(result.total);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  // Call api if the filter or location is changed.
  useEffect(() => {
    if (geoposition.lat !== 0) find_adoptions(geoposition);
  }, [geoposition, filter]);

  return (
    <div>
      <Banner />
      <div className='container mx-auto'>
        <div className='grid lg:grid-flow-col gap-4 mx-2'>
          <div className='col-span-12 lg:col-span-3 px-2'>
            <div>
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
              <div className='divider'></div>
              <div>
                <label htmlFor='sortby' className='block text-sm font-medium text-gray-700'>
                  Sort By:
                </label>
                <select
                  id='sortby'
                  name='sortby'
                  className='mb-3 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  value={filter.sortby}
                  onChange={(e) => setFilter({ ...filter, sortby: e.target.value })}
                >
                  {Object.keys(sort_options).map((option, key) => {
                    return (
                      <option key={key} value={option}>
                        {sort_options[option]}
                      </option>
                    );
                  })}
                </select>

                <label htmlFor='itemcount' className='block text-sm font-medium text-gray-700'>
                  Items per page:
                </label>
                <select
                  id='itemcount'
                  name='itemcount'
                  className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  value={filter.pagecount}
                  onChange={(e) => setFilter({ ...filter, pagecount: Number(e.target.value) })}
                >
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                </select>
              </div>
            </div>
          </div>

          <div className='col-span-12 lg:col-span-9 px-2'>
            <ResultLists
              petadoptions={petadoptions}
              loading={loading}
              total={total}
              filter={filter}
            />

            <Paginate total={total} filter={filter} setpage={setpage} />
          </div>
        </div>
      </div>
    </div>
  );
};
