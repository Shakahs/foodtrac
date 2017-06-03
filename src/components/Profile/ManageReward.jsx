import React, { Component } from 'react';
import { Checkbox } from 'material-ui';
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
          /> : null
        }
      </div>
    );
  }
}

export default ManageReward;
