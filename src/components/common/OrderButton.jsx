import React from 'react';
import { FlatButton } from 'material-ui';
import { Link } from 'react-router-dom';
import propSchema from './PropTypes';

const OrderButton = props => (
    props.user.brands.map(brand => brand.id).includes(props.truck.brand_id)
      ? null
      : <Link to={`/order/${props.truck.id}`}>
        <FlatButton
          label="Order"
        />
      </Link>
);

OrderButton.propTypes = {
  truck: propSchema.truck,
  user: propSchema.user,
};

export default OrderButton;
