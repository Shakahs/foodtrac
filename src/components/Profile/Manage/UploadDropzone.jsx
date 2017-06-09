import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Snackbar } from 'material-ui';
import axios from 'axios';
import { actions as userActions } from '../../../redux/user';
import propSchema from '../../common/PropTypes';

class UploadDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
      open: false,
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleDrop(file) {
    this.setState({
      file,
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
    this.props.close();
  }

  upload(fileObj) {
    const reader = new FileReader();
    reader.onloadend = (event) => {
      const result = event.target.result;
      axios.post(`/api/brands/${this.props.brandId}/${this.props.imageType}`, {
        userId: this.props.user.id,
        fileData: result,
      })
        .then(() =>
          setTimeout(() => {
            this.props.getBrand(this.props.brandId);
            this.props.userActions.requestUserData(this.props.user.id);
            // this.props.close();
          }, 5000),
        )
        .catch(err => console.log(err));
    };

    reader.readAsDataURL(fileObj);
  }

  render() {
    const type = this.props.imageType === 'coverImage'
      ? 'cover picture'
      : 'logo';
    return (
      <div>
        <Dropzone
          accept="image/jpeg, image/png"
          multiple={false}
          onDrop={(accepted) => {
            this.handleDrop(accepted);
            this.upload(accepted[0]);
          }}
        >
          <p>Drop your picture here!</p>
        </Dropzone>
        {this.state.file.length > 0 ?
          <Snackbar
            open={this.state.open}
            message={`${this.state.file[0].name} was successfully uploaded! Your ${type} will change in a few seconds.`}
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
          /> : null
        }
      </div>
    );
  }
}

UploadDropzone.propTypes = {
  brandId: propSchema.brandId,
  user: propSchema.user,
  getBrand: propSchema.getBrand,
  imageType: propSchema.imageType,
  userActions: propSchema.userActions,
  close: propSchema.close,
};

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(null, mapDispatchToProps)(UploadDropzone);
