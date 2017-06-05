import React, { Component } from 'react';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import propSchema from '../PropTypes';
import CommentsInput from './CommentsInput';
import UserEmblem from '../Emblem/UserEmblem';

class CommentsListEntry extends Component {
  constructor(props) {
    super(props);

    this.state = { open: false };
  }

  renderInputOrText() {
    const CancelButton = () => (<RaisedButton
      type="submit"
      secondary
      label="Cancel"
      onClick={() => { this.setState({ open: false }); }}
    />);

    if (this.state.open) {
      return (
        <CommentsInput
          name="editComment"
          onSubmit={({ editComment }) => {
            this.props.editComment(editComment, this.props.comment.id, this.props.idx);
            this.setState({ open: false });
          }}
        >
          <CancelButton />
        </CommentsInput>
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
          <CardHeader>
            <UserEmblem user={this.props.comment.users} />
          </CardHeader>
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
