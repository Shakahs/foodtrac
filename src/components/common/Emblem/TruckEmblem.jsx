import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { FontIcon } from 'material-ui';
import { Link } from 'react-router-dom';
import Emblem from './Emblem';
import propSchema from '../../common/PropTypes';
import './Emblem.scss';

class TruckEmblem extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { truck } = this.props;

    const truckAvatar = (<FontIcon className="fa fa-truck" />);
    const profileLink = (<Link to={`/brand/${truck.brand_id}`} >
      {truck.brands.name}
    </Link>);
    return (
      <Emblem avatar={truckAvatar} title={profileLink} subtitle={truck.brands.description} />
    );
  }
}

TruckEmblem.propTypes = {
  truck: propSchema.truck,
};

export default TruckEmblem;
