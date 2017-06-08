import React from 'react';
import Paper from 'material-ui/Paper';
import propSchema from '../common/PropTypes';

const Cover = props => (
  <div>
    <Paper>
      <img
        // src="https://cdnb.artstation.com/p/assets/images/images/000/910/393/large/wichanan-sarajan-foodtruck-render2-0001.jpg?1435928759"
        src={`http://storage.googleapis.com/foodtrac/${props.coverImage.filename}`}
        alt="https://cdnb.artstation.com/p/assets/images/images/000/910/393/large/wichanan-sarajan-foodtruck-render2-0001.jpg?1435928759"
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
