import _ from 'lodash';
import React from 'react';
import { Card, CardHeader } from 'material-ui';
import FollowedEntry from './FollowedEntry';
import propSchema from '../common/PropTypes';

const FollowedList = props => (
  <Card>
    <CardHeader
      title="Brands that you follow"
      subtitle="X followed brands"
    />
    {_.map(props.brands, (brand, idx) => <FollowedEntry brand={brand} key={idx} />)}
  </Card>
);

FollowedList.propTypes = {
  brands: propSchema.brands,
};

export default FollowedList;
