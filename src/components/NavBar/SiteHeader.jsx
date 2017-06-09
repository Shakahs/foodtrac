import React from 'react';
import { Link } from 'react-router-dom';
import FontIcon from 'material-ui/FontIcon';
import PropTypes from 'prop-types';

const SiteHeader = props => (<div>
  <FontIcon
    className="fa fa-bars"
    hoverColor="#00bcd4"
    onTouchTap={props.handleMenuToggle}
  />
  <Link className="SiteHeaderLink" to="/">
    FoodTrac
  </Link>
</div>);

SiteHeader.propTypes = {
  handleMenuToggle: PropTypes.func.isRequired,
};

export default SiteHeader;
