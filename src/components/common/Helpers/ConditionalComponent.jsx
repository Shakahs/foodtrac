import React from 'react';
import PropTypes from 'prop-types';

const ConditionalComponent = props => (
  <div>
    {props.shouldRender &&
    <div>{props.children}</div>
    }
  </div>
);

ConditionalComponent.propTypes = {
  shouldRender: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
};

ConditionalComponent.defaultProps = {
  shouldRender: false,
};

export default ConditionalComponent;
