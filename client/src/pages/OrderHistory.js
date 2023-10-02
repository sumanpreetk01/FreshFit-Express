import React from "react";
import { Link } from "react-router-dom";

import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import '../pages/css/orderhistory.css'
function OrderHistory() {
  const { loading, data } = useQuery(QUERY_USER);
  let user;

  if (data) {
    user = data?.user;
  }

  if (loading) {
    return <h1>LOADING....</h1>;
  }

  return (
    <>
<div>
  <Link to="/menu">← Back to Menu</Link>

  {user ? (
    <>
      <h2>
        Order History for {user.firstName} {user.lastName}
      </h2>
      {user?.orders.map((order) => (
        <div key={order._id} className="my-2 card"> 
          <h3>
            {new Date(parseInt(order.purchaseDate)).toLocaleDateString()}
          </h3>
          <div className="flex-row">
            {order.items.map(({ _id, image, name, price }, index) => (
              <div key={index} className="card px-1 py-1">
                <Link to={`/menu/${_id}`}>
                  <img alt={name} src={`/images/${image}`} />
                  <p>{name}</p>
                </Link>
                <div>
                  <span>${price}</span>
                </div>
               
              </div>
            ))}
            
          </div>
         
        </div>
      ))}
    </>
  ) : null}
</div>

    </>
  );
}

export default OrderHistory;
