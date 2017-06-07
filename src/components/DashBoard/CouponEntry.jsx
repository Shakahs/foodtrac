import React, { Component } from 'react';
import propSchema from '../common/PropTypes';

class CouponsList extends Component {
  constructor() {
    super();
    this.state = {};
  }

  couponDiscount() {
    let discount = '';
    if (this.props.coupon.coupons[0].flat_discount > 0) {
      discount = `$${this.props.coupon.coupons[0].flat_discount}`;
    } else {
      discount = `${this.props.coupon.coupons[0].percent_discount}%`;
    }
    return discount;
  }

  render() {
    return (
      <div>
        {`${this.couponDiscount()} off! ${this.props.coupon.redeemed === 1 ? 'redeemed!' : null}`}
      </div>
    );
  }
}

CouponsList.propTypes = {
  coupon: propSchema.coupon,
};

export default CouponsList;
