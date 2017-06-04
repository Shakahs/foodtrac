import React, { Component } from 'react';
import { Checkbox } from 'material-ui';
import axios from 'axios';
import propSchema from '../common/PropTypes';
import ManageRewardEntry from './ManageRewardEntry';

class ManageReward extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      type: 1,
      trigger: 1,
      flatRate: '',
      percentRate: '',
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.setValues = this.setValues.bind(this);
    this.setType = this.setType.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  setValues(val, key) {
    this.setState({ [key]: val });
  }

  setType(e, i, val) {
    this.setState({
      type: val,
      flatRate: '',
      percentRate: '',
    });
  }

  handleCheck() {
    this.setState({ checked: !this.state.checked });
    // put reward trigger to null if checker is false
  }

  saveChanges() {
    if (!this.props.defaultCouponId) {
      const reward = {
        coupon: {},
        reward: {
          rewards_trigger: this.state.trigger,
        },
      };
      if (this.state.percentRate !== '') {
        reward.coupon.percent_discount = this.state.percentRate;
      }
      if (this.state.flatRate !== '') {
        reward.coupon.flat_discount = this.state.flatRate;
      }
      console.log('IN SAVE', reward);
      axios.post(`/api/brands/${this.props.brandId}/reward`, reward)
        .then(() => this.getBrand(this.props.brandId))
        .catch(err => console.log(err));
    } else {
      // put
    }
  }

  render() {
    return (
      <div>
        <Checkbox
          label={'Enable your Reward Program'}
          onCheck={this.handleCheck}
        />
        {this.state.checked ?
          <ManageRewardEntry
            type={this.state.type}
            trigger={this.state.trigger}
            flatRate={this.state.flatRate}
            percentRate={this.state.percentRate}
            setValues={this.setValues}
            setType={this.setType}
            saveChanges={this.saveChanges}
          /> : null
        }
      </div>
    );
  }
}

ManageReward.propTypes = {
  defaultCouponId: propSchema.defaultCouponId,
  brandId: propSchema.brandId,
};

export default ManageReward;
