import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper, RaisedButton, Dialog, FlatButton, TextField } from 'material-ui';
import { Grid, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import axios from 'axios';
import propSchema from '../common/PropTypes';
import CartEntry from './CartEntry';
import { actions as userActions } from '../../redux/user';

class OrderSummary extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      name: '',
    };
    this.calculateTotal = this.calculateTotal.bind(this);
    this.submitOrder = this.submitOrder.bind(this);
    this.orderComplete = this.orderComplete.bind(this);
  }

  changeName(val) {
    const name = val;
    this.setState({ name });
  }

  calculateTotal() {
    let total = 0;
    this.props.currentOrder.forEach((item) => {
      total += (item.price / 100) * item.quantity;
    });
    return total;
  }

  submitOrder() {
    const orderItems = this.props.currentOrder.reduce((acc, item) => {
      for (let i = 0; i < item.quantity; i++) {
        acc.push({ menu_item_id: item.menu_item_id });
      }
      return acc;
    }, []);
    const order = {
      user_id: this.props.userId,
      truck_id: this.props.truck.id,
      date: new Date().toISOString(),
      ready: false,
      name: this.state.name,
      orderitems: orderItems,
    };
    axios.post(`/api/foodtrucks/${this.props.truck.id}/orders`, order)
      .then(() => this.orderComplete())
      .catch(e => console.log(e));
    this.handleRewards();
  }

  brandReward() {
    let userReward = null;
    let index;
    this.props.userRewards.forEach((reward, i) => {
      if (reward.brand_id === this.props.truck.brands.id) {
        userReward = Object.assign({}, reward);
        index = i;
      }
    });
    return [userReward, index];
  }

  handleRewards() {
    const brandReward = this.brandReward();
    const userReward = brandReward[0];
    const index = brandReward[1];
    const rewardsCopy = [...this.props.userRewards];
    if (this.props.truck.brands.rewards_trigger > 0) {
      if (userReward) {
        const newCount = Object.assign({}, userReward);
        const rewardId = newCount.id;
        if ((this.props.truck.brands.rewards_trigger - newCount.count) === 1) {
          newCount.count = 0;
          const newCoupon = {
            redeemed: false,
            coupon_id: this.props.truck.brands.coupon.id,
            user_reward_id: newCount.id,
          };
          axios.post('/api/rewards/usercoupon', newCoupon)
            .then(res => console.log(res))
            .catch(err => console.log(err));
          delete newCount.id;
        } else {
          newCount.count += 1;
          delete newCount.id;
        }
        axios.post('/api/rewards', newCount)
          .then(() => {
            newCount.id = rewardId;
            rewardsCopy[index] = newCount;
            this.props.userActions.updateUserRewards(rewardsCopy);
          })
          .catch(err => console.log(err));
      } else {
        const newReward = {
          brand_id: this.props.truck.brands.id,
          user_id: this.props.userId,
          count: 1,
        };
        axios.post('/api/rewards', newReward)
          .then((res) => {
            rewardsCopy.push(res.data);
            this.props.userActions.updateUserRewards(rewardsCopy);
          })
          .catch(err => console.log(err));
      }
    }
  }

  orderComplete() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const actions = [
      (this.state.name !== '' ?
        <Link to="/">
          <FlatButton
            label="Confirm Order"
            primary
            onClick={this.submitOrder}
          />
        </Link> : null
      ),
    ];
    return (
      <Col xs={4} sm={4} md={4} lg={4}>
        <Paper>
          <div>Order Summary</div>
          <br />
          <Grid fluid>
            {this.props.currentOrder.map((currentItem, i) =>
              (<CartEntry
                key={i} // eslint-disable-line react/no-array-index-key
                index={i}
                currentItem={currentItem}
                removeFromOrder={this.props.removeFromOrder}
              />),
            )}
          </Grid>
          <br />
          {this.props.truck.brands.rewards_trigger > 0 ?
            <div>
              {this.brandReward()[0]
                ? `${this.props.truck.brands.rewards_trigger - this.brandReward()[0].count} more orders before your free coupon!`
                : null}
            </div> : null
          }
          <div>
            TOTAL: ${this.calculateTotal()} + tax
          </div>
          {this.props.currentOrder.length > 0 ?
            <RaisedButton
              label="Submit Order"
              onClick={this.orderComplete}
            /> : null
          }
          <Dialog
            title="Your order is complete!"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.orderComplete}
          >
            <TextField
              floatingLabelText="Give us your name"
              hintText="name"
              onChange={(e, val) => this.changeName(val)}
              value={this.state.name}
            />
          </Dialog>
        </Paper>
      </Col>
    );
  }
}

OrderSummary.propTypes = {
  currentOrder: propSchema.currentOrder,
  truck: propSchema.truck,
  userId: propSchema.userId,
  removeFromOrder: propSchema.removeComment,
  userRewards: propSchema.userRewards,
  userActions: propSchema.userActions,
};

const mapStateToProps = ({ user }) => {
  const userId = user.id;
  const userRewards = user.user_rewards;
  return { userId, userRewards };
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);
