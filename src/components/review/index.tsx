import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { petadoptionServices } from '../../services';
import StarRatings from 'react-star-ratings';

export const Reviews: React.FC = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    petadoptionServices.getreviews(id).then(
      (results) => {
        if (results.name !== 'Error') {
          console.log(results);
          setReviews(results.reviews);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  if (!reviews) return <></>;

  return (
    <div>
      <p className='font-bold mt-10 text-lg'>Last Reviews:</p>
      {reviews.map((review, index) => {
        return (
          <div key={index} className='flex mb-5 border-2 p-3'>
            <div className='user-logo'>
              <img
                src={review.user.image_url}
                alt='userlogo'
                className='w-24 h-24 object-cover rounded-md'
              />
            </div>

            <div className='detail flex-1 ml-3'>
              <p className="block">{review.text}</p>

              <StarRatings
                rating={review.rating}
                starDimension='20px'
                starRatedColor='#ff0254'
                numberOfStars={5}
                name='rating'
                starSpacing='1px'
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
