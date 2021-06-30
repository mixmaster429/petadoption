import React from 'react';
import bannerimage from '../../assets/imgs/banner.jpg';

export const Banner: React.FC = () => {
  return <div className='banner mb-2' style={{ backgroundImage: `url(${bannerimage})` }}></div>;
};
