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
      trigger: 0,
      flatRate: '',
      percentRate: 0,
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.setValues = this.setValues.bind(this);
    this.setType = this.setType.bind(this);
    this.saveChanges = this.saveChanges.bind(this);
  }

  componentDidMount() {
    this.setDefault();
  }

  setValues(val, key) {
    this.setState({ [key]: val });
  }

  setType(e, i, val) {
    this.setState({
      type: val,
      flatRate: '',
      percentRate: 0,
    });
  }

  setDefault() {
    if (this.props.rewardTrigger > 0) {
      this.setState({
        checked: true,
        trigger: this.props.rewardTrigger,
      });
    }
    if (this.props.coupon) {
      this.setState({
        flatRate: this.props.coupon.flat_discount,
        percentRate: this.props.coupon.percent_discount,
      });
      if (this.props.coupon.flat_discount === 0) {
        this.setState({ type: 2 });
      }
    }
  }

  handleCheck() {
    if (this.state.checked) {
      const reward = {
        coupon: {
          percent_discount: this.state.percentRate === '' ? 0 : this.state.percentRate,
          flat_discount: this.state.flatRate === '' ? 0 : Number(this.state.flatRate),
        },
        reward: { rewards_trigger: 0 },
      };
      axios.put(`/api/brands/${this.props.brandId}/reward/${this.props.defaultCouponId}`, reward)
        .then(() => this.props.getBrand(this.props.brandId))
        .catch(err => console.log(err));
    }
    this.setState({ checked: !this.state.checked });
  }

  saveChanges() {
    const reward = {
      coupon: {
        percent_discount: this.state.percentRate,
        flat_discount: this.state.flatRate === '' ? 0 : Number(this.state.flatRate),
      },
      reward: {
        rewards_trigger: this.state.trigger,
      },
    };
    if (!this.props.defaultCouponId) {
      axios.post(`/api/brands/${this.props.brandId}/reward`, reward)
        .then(() => this.props.getBrand(this.props.brandId))
        .catch(err => console.log(err));
    } else {
      axios.put(`/api/brands/${this.props.brandId}/reward/${this.props.defaultCouponId}`, reward)
        .then(() => this.props.getBrand(this.props.brandId))
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div>
        <Checkbox
          label={'Enable your Reward Program'}
          checked={this.state.checked}
          onCheck={this.handleCheck}
        />
        {this.state.checked ?
          <ManageRewardEntry
            brandId={this.props.brandId}
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
  rewardTrigger: propSchema.rewardTrigger,
  getBrand: propSchema.getBrand,
  coupon: propSchema.coupon,
};

export default ManageReward;
