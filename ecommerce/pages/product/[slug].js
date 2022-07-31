import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineMinus,
  AiOutlinePlus,
} from 'react-icons/ai';

import { client, urlFor } from '../../lib/client';
import Product from '../../components/Product';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { decQty, incQty } from '../../store/cart/cartSlice';

const ProductDetails = ({ product, products }) => {
  const dispatch = useDispatch();
  const { qty } = useSelector((state) => state.cart);
  const { image, name, details, price } = product;

  const [index, setIndex] = useState(0);

  return (
    <>
      <Navbar />
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src={urlFor(image && image[index])}
              className='product-detail-image'
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => {
              return (
                <img
                  key={i}
                  src={urlFor(item)}
                  className={
                    i === index ? 'small-image selected-image' : 'small-image'
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              );
            })}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={() => dispatch(decQty())}>
                <AiOutlineMinus />
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={() => dispatch(incQty())}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button type='button' onClick='' className='add-to-cart'>
              Add to Cart
            </button>
            <button type='button' onClick='' className='buy-now'>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item, index) => (
              <Product key={index} product={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type ==  "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type ==  "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
