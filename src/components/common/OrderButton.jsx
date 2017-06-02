import React from 'react';
import { RaisedButton } from 'material-ui';
import { Link } from 'react-router-dom';
import propSchema from './PropTypes';

const OrderButton = props => (
  <div>
    {props.user.brands.map(brand => brand.id).includes(props.truck.brand_id) ?
        null
        : <Link to={`/order/${props.truck.id}`}>
          <RaisedButton
            label="Order"
          />
        </Link>
    }
  </div>
);

OrderButton.propTypes = {
  truck: propSchema.truck,
  user: propSchema.user,
};

export default OrderButton;
