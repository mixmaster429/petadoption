import React from 'react';
import StarRatings from 'react-star-ratings';

type Props = {
  petadoptions: any;
  loading: boolean;
  total: Number;
  filter: any;
};

export const ResultLists: React.FC<Props> = ({ petadoptions, loading, total, filter }) => {
  const temp_loading = 5;

  if (loading) {
    return (
      <>
        <div className='text-center my-5'>
          <span className='font-bold text-xl'>Loading...</span>{' '}
          <img src='/imgs/spinner.gif' alt='' className='inline' width='50' />
        </div>
        {Array.from(Array(temp_loading), (e, i) => {
          return (
            <div className='border-2 border-gray-100 shadow-sm p-5 mb-5' key={i}>
              <div className='animate-pulse flex space-x-4'>
                <div className='rounded-full bg-gray-200 h-12 w-12'></div>
                <div className='flex-1 space-y-4 py-1'>
                  <div className='h-4 bg-gray-200 rounded w-3/4'></div>
                  <div className='space-y-2'>
                    <div className='h-4 bg-gray-200 rounded'></div>
                    <div className='h-4 bg-gray-200 rounded w-5/6'></div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div>
      {petadoptions.length === 0 ? (
        <p className='text-center text-xl font-bold mt-5'>No results</p>
      ) : (
        <>
          <p className='mb-2 font-bold'>Total: {total}</p>
          {petadoptions.map((item, key) => {
            return (
              <div key={key} className='md:flex border-2 border-gray-100 shadow-sm p-1 md:p-5 mb-5'>
                <div className='item-image text-center md:text-left'>
                  <img src={item.image_url} alt='' className='object-cover w-40 h-40 inline' />
                </div>

                <div className='item-details ml-5'>
                  <p className='text-lg font-bold'>
                    {filter.pagecount * (filter.page - 1) + key + 1}. {item.name}
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
        </>
      )}
    </div>
  );
};
