import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Redirector extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <div>
        {this.props.redirectAddBrand ? <Redirect to="/settings/addbrand" push /> : null}
      </div>
    );
  }
}

Redirector.propTypes = {
  redirectAddBrand: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  redirectAddBrand: state.user.redirectToAddBrand,
});

export default connect(mapStateToProps)(Redirector);
