import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Toggle } from 'material-ui';
import { actions as swActions } from '../../redux/ServiceWorker';
import propSchema from '../common/PropTypes';
import urlB64ToUint8Array from '../../util';

const globalConfig = require('globalConfig');  // eslint-disable-line  import/no-unresolved, import/no-extraneous-dependencies, max-len

class NotificationSubBtn extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle() {
    const vapidPubKey = urlB64ToUint8Array(globalConfig.VAPID_PUB);
    const subPromise = this.props.sw.swReg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPubKey,
    });
    if (this.props.sw.subscription === null) {
      subPromise
        .then(subscription => this.props.swActions.subscribePush(subscription, this.props.user.id));
    } else {
      subPromise
        .then(subscription => subscription.unsubscribe())
        .catch(err => console.log('Error unsubscribing:', err))
        .then(() => this.props.swActions.unsubscribePush(this.props.user.id));
    }
  }

  render() {
    return (
      <div style={{ padding: '20px' }}>
        <Toggle
          label="Notifications"
          defaultToggled={this.props.sw.subscription !== null}
          onToggle={() => this.onToggle()}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ user, sw }) => ({ user, sw });
const mapDispatchToProps = dispatch => ({ swActions: bindActionCreators(swActions, dispatch) });

NotificationSubBtn.propTypes = {
  user: propSchema.user,
  sw: propSchema.sw,
  swActions: propSchema.swActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationSubBtn);
