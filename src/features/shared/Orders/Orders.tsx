import { Fragment } from 'react/jsx-runtime';
import { orders } from './data';
import { Order } from './Order';

export const Orders = () => {
  return (
    <Fragment>
      <h3 className="mb-4 text-lg font-semibold">Twoje osiągnięcia</h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {orders.map((order) => (
          <Order {...order} key={order.title} />
        ))}
      </div>
    </Fragment>
  );
};
