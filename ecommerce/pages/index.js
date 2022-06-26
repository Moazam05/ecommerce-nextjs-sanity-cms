import React from 'react';

import HeroBanner from '../components/HeroBanner';
import Product from '../components/Product';
import FooterBanner from '../components/FooterBanner';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { client } from '../lib/client';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <Navbar />
      <div className='main-container'>
        <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
        <div className='products-heading'>
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>
        <div className='products-container'>
          {products?.map((product, index) => (
            <Product key={index} product={product} />
          ))}
        </div>
        <FooterBanner footerBanner={bannerData && bannerData[0]} />
      </div>
      <Footer />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type ==  "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type ==  "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
