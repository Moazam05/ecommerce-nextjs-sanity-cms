import React from 'react';
import Link from 'next/link';

import { urlFor } from '../lib/client';

const HeroBanner = ({ heroBanner }) => {
  const { smallText, midText, largeText1, image, product, buttonText, desc } =
    heroBanner;
  return (
    <div className='hero-banner-container'>
      <div>
        <p className='beats-solo'>{smallText}</p>
        <h3>{midText}</h3>
        <h1 style={{ marginBottom: '40px' }}>{largeText1}</h1>

        <img
          src={urlFor(image)}
          alt='headphones'
          className='hero-banner-image'
        />
      </div>
      <div>
        <Link type='button' href={`/product/${product}`}>
          <a className='hero-button'>{buttonText}</a>
        </Link>

        <div className='desc'>
          <h5>Description</h5>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
