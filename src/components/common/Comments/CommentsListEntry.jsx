import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import propSchema from '../PropTypes';
import CommentsInput from './CommentsInput';

class CommentsListEntry extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  renderInputOrText() {
    if (this.state.open) {
      return (
        <CommentsInput
          name="editComment"
          onSubmit={({ editComment }) => {
            this.props.editComment(editComment, this.props.comment.id, this.props.idx);
            this.setState({ open: false });
          }}
        />
      );
    }
    return <CardText>{this.props.comment.text}</CardText>;
  }

  renderButtons() {
    if (this.props.user.id === this.props.comment.user_id) {
      return (
        <div className="icon-side">
          <IconButton
            tooltip="Remove comment"
            onClick={() => this.props.removeComment(this.props.comment.id, this.props.idx)}
          >
            <FontIcon className="fa fa-times-circle" />
          </IconButton>
          <IconButton
            tooltip="Edit comment"
            onClick={() => this.setState({ open: !this.state.open })}
          >
            <FontIcon className="fa fa-pencil-square" />
          </IconButton>
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div className="icon-container">
        <Card>
          <CardHeader
            title={this.props.comment.users.auth0_id}
            subtitle={this.props.comment.created_at}
            avatar="https://ih1.redbubble.net/image.116421576.5606/sticker,375x360.u2.png"
          />
          {this.renderInputOrText()}
        </Card>
        {this.renderButtons()}
      </div>
    );
  }
}

CommentsListEntry.propTypes = {
  editComment: propSchema.editComment,
  comment: propSchema.comment,
  idx: propSchema.idx,
  user: propSchema.user,
  removeComment: propSchema.removeComment,
};

export default CommentsListEntry;
// this.props.editComment(this.props.comment.id, this.props.idx)
