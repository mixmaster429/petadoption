import React from 'react';

import { Header, Main, Banner } from 'components';

const Home: React.FC = () => {
  return (
    <React.Fragment>
      <Header />
      <Banner />
      <Main />
    </React.Fragment>
  );
};

export default Home;
