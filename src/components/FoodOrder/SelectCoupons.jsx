import React, { Component } from 'react';
import { SelectField, MenuItem } from 'material-ui';
import propSchema from '../common/PropTypes';

class SelectCoupons extends Component {
  constructor() {
    super();
    this.state = {};
  }

  renderSelectCoupon(coupon, i) {
    if (coupon.coupons[0].percent_discount > 0) {
      return <MenuItem key={i + 1} value={`${coupon.coupons[0].percent_discount}%`} primaryText={`${coupon.coupons[0].percent_discount}% off`} />;
    }
    return <MenuItem key={i + 1} value={`$${coupon.coupons[0].flat_discount}`} primaryText={`$${coupon.coupons[0].flat_discount} off`} />;
  }

  render() {
    return (
      <SelectField
        floatingLabelText="Choose a coupon"
        value={this.props.discount}
        onChange={(e, i, val) => this.props.handleDiscount(val)}
      >
        <MenuItem key={0} value={''} />
        {this.props.coupons.map((coupon, i) => // eslint-disable-line no-confusing-arrow
          coupon.redeemed === 0 ? this.renderSelectCoupon(coupon, i) : null,
        )}
      </SelectField>
    );
  }
}

SelectCoupons.propTypes = {
  discount: propSchema.discount,
  handleDiscount: propSchema.handleDiscount,
  coupons: propSchema.coupons,
};

export default SelectCoupons;
