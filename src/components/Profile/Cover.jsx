import React from 'react';
import Paper from 'material-ui/Paper';
import propSchema from '../common/PropTypes';
import './cover.scss';

const Cover = props => (
  <div>
    <Paper className="coverContainer">
      <img
        className="coverPicture"
        src={props.coverImage && props.coverImage.filename.length > 0
          ? `https://storage.googleapis.com/foodtrac/${props.coverImage.filename}`
          : 'https://storage.googleapis.com/foodtrac/defaultTruckCover.jpeg'
        }
        alt="https://storage.googleapis.com/foodtrac/defaultTruckCover.jpeg"
        height="35%"
        width="100%"
      />
    </Paper>
    <br />
  </div>
);

Cover.propTypes = {
  coverImage: propSchema.coverImage,
};

export default Cover;
