import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import { CheckCircleIcon, LocationMarkerIcon, PhoneIcon } from '@heroicons/react/outline';
import { MapHours, Reviews } from 'components';
import Slider from 'react-slick';
import { petadoptionServices } from '../../services';

export const AdoptionDetail: React.FC = () => {
  const { id } = useParams();
  const [adoptionData, setAdoptionData] = useState(null);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    petadoptionServices.getdetails(id).then(
      (results) => {
        if (results.name !== 'Error') {
          setAdoptionData(results);
          setLoading(false);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  if (Loading) {
    return (
      <div className='text-center'>
        <span className='font-bold text-xl'>Loading...</span>{' '}
        <img src='/imgs/spinner.gif' alt='' className='inline' width='50' />
      </div>
    );
  }

  if (!adoptionData) return <></>;

  const settings = {
    customPaging: function (i) {
      return (
        <span>
          <img data-id={i} src={adoptionData.photos[i]} alt='paging' />
        </span>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    fade: true,
  };

  return (
    <div className='container mx-auto mt-5'>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mx-2'>
        <div className='lg:col-span-1 px-2'>
          <Slider {...settings}>
            {adoptionData.photos.map((photo, index) => {
              return (
                <div key={index}>
                  <img src={photo} alt='sliderimage' />
                </div>
              );
            })}
          </Slider>
        </div>
        <div className='lg:col-span-2 px-2'>
          <p className='text-3xl font-bold mb-2'>{adoptionData.name}</p>

          <div className='flex items-center'>
            <StarRatings
              rating={adoptionData.rating}
              starDimension='20px'
              starRatedColor='#ff0254'
              numberOfStars={5}
              name='rating'
              starSpacing='1px'
            />
            <span className='ml-2'>{adoptionData.review_count} reviews</span>
          </div>

          <p className='flex items-center'>
            {adoptionData.is_claimed && (
              <>
                <span className='my-2 items-center text-green-900 font-bold inline-flex'>
                  <CheckCircleIcon className='h-5 w-5' /> Claimed
                </span>
                <span className='mx-2'>{'•'}</span>
              </>
            )}

            {adoptionData.categories.map((category, index) => {
              return (
                <span key={index}>
                  {category.title}
                  {index === adoptionData.categories.length - 1 ? '' : ', '}
                </span>
              );
            })}
          </p>

          <p className='flex items-center my-2'>
            <PhoneIcon className='h-5 w-5 mr-1' />
            {adoptionData.display_phone}
          </p>

          <p className='flex items-center my-2'>
            <LocationMarkerIcon className='h-5 w-5 mr-1' />
            {adoptionData.location.display_address.join(', ')}
          </p>

          <MapHours adoptionData={adoptionData} />

          <Reviews />
        </div>
      </div>
    </div>
  );
};
