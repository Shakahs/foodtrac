import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import CommentEntry from '../../common/CommentEntry.scss';

const CommentsList = props => (
  <div>
    {props.comments.length > 0 ?
      _.map(props.comments, comment => <CommentEntry comment={comment} />)
      :
      <div className="noItems">No Comments</div>
    }
  </div>
);

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired, //eslint-disable-line react/forbid-prop-types
};

export default CommentsList;
