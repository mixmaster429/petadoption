import React from 'react';
import { Header, Banner } from 'components';
import { AdoptionDetail } from 'components/main/adoptionDetail';

const Adoption: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <AdoptionDetail />
    </React.Fragment>
  );
};

export default Adoption;
