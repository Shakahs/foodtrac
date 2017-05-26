import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import axios from 'axios';
import _ from 'lodash';
import { connect } from 'react-redux';
import { actions as userActions } from '../../redux/user';
import propSchema from './PropTypes';
// add logic to not display if not logged in or if on brand profile page, use auth.isLoggedIn
class FollowButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFollowed: false,
      buttonText: 'Following',
    };

    this.checkIfFollowed = this.checkIfFollowed.bind(this);
    this.follow = this.follow.bind(this);
    this.unFollow = this.unFollow.bind(this);
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  componentDidMount() {
    this.checkIfFollowed();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.user_follows !== this.props.user.user_follows) {
      this.checkIfFollowed();
    }
  }

  checkIfFollowed() {
    const isFollowed = _.some(this.props.user.user_follows,
      follows => follows.id === this.props.brandId);
    this.setState({ isFollowed });
  }

  toggleFollow() {
    this.setState({ isFollowed: !this.state.isFollowed });
  }

  follow() {
    this.toggleFollow();
    axios.post(`/api/users/${this.props.user.id}/subscribe`, { id: this.props.brandId })
      .then(({ data }) => this.props.dispatch(userActions.userNewFollow(data)));
  }

  unFollow() {
    this.toggleFollow();
    axios.delete(`/api/users/${this.props.user.id}/subscribe?brand_id=${this.props.brandId}`)
      .then(() =>
        this.props.dispatch(userActions.userRemoveFollow(this.props.brandId)));
  }

  render() {
    switch (this.props.path) {
      case '/map':
        return (
          <RaisedButton
            label={this.state.isFollowed ? this.state.buttonText : 'Follow'}
            onMouseEnter={() => this.setState({ buttonText: 'Unfollow' })}
            onMouseLeave={() => this.setState({ buttonText: 'Following' })}
            onClick={this.state.isFollowed ? this.unFollow : this.follow}
          />
        );
      case '/brand/:brandId':
        return (
          <RaisedButton
            label={this.state.isFollowed ? this.state.buttonText : 'Follow'}
            onMouseEnter={() => this.setState({ buttonText: 'Unfollow' })}
            onMouseLeave={() => this.setState({ buttonText: 'Following' })}
            onClick={this.state.isFollowed ? this.unFollow : this.follow}
          />
        );
      default:
        return null;
    }
  }
}

FollowButton.propTypes = {
  brandId: propSchema.brandId,
  user: propSchema.user,
  dispatch: propSchema.dispatch,
  path: propSchema.path,
};

const mapDispatchToProps = dispatch => ({ dispatch });

export default connect(null, mapDispatchToProps)(FollowButton);
