import React, { useEffect } from 'react';
import { Header, Banner } from 'components';
import { useParams } from 'react-router-dom';
import { petadoptionServices } from '../services';

const Adoption: React.FC = () => {
  const { id } = useParams();

  useEffect(() => {
    petadoptionServices.getdetails(id).then(
      (results) => {
        console.log(results);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <React.Fragment>
      <Header />
      <Banner />
    </React.Fragment>
  );
};

export default Adoption;
