import _ from 'lodash';
import React from 'react';
import { CardTitle } from 'material-ui';
import FollowedEntry from './FollowedEntry';
import propSchema from '../common/PropTypes';
import DashEntry from './DashEntry';

const FollowedList = props => (
  <DashEntry>
    <CardTitle
      title="Brands that you follow"
      subtitle={`${props.brands.length} followed brands`}
    />
    {props.brands && props.brands.length > 0
      ? _.map(props.brands, (brand, idx) => <FollowedEntry brand={brand} key={idx} />)
      : <h2>You are not currently following any brands.</h2>}
  </DashEntry>
);

FollowedList.propTypes = {
  brands: propSchema.brands,
};

export default FollowedList;
