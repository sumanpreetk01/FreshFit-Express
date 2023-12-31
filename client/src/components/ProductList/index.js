import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
// import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import './productstyle.css';

function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory } = state;

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        items: data.items,
      });
      data.items.forEach((item) => {
        // idbPromise('items', 'put', item);
      });
    } else if (!loading) {
      // idbPromise('items', 'get').then((item) => {
      //   dispatch({
      //     type: UPDATE_PRODUCTS,
      //     item: item,
      //   });
      // });
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.items;
    }

    return state.items.filter(
      (item) => item.category._id === currentCategory
    );
  }

  return (
    <div className="options-title">
      <h2>Our Healthy Options</h2>
      {state.items.length ? (
        <div className="product-item">
          {filterProducts().map((item) => (
            <ProductItem
              key={item._id}
              _id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any items yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
