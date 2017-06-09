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
      openSuccess: false,
      openFailure: false,
    };
    this.handleDrop = this.handleDrop.bind(this);
    this.upload = this.upload.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.uploadFailure = this.uploadFailure.bind(this);
    this.failureClose = this.failureClose.bind(this);
  }

  handleDrop(file) {
    this.setState({
      file,
      openSuccess: true,
    });
  }

  uploadFailure() {
    this.setState({ openFailure: true });
  }

  failureClose() {
    this.setState({ openFailure: false });
  }

  handleRequestClose() {
    this.setState({
      openSuccess: false,
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
          // className="dropzone"
          accept="image/jpeg, image/png"
          multiple={false}
          onDropAccepted={(file) => {
            this.handleDrop(file);
            this.upload(file[0]);
          }}
          onDropRejected={this.uploadFailure}
        >
          <p>Drop your picture here!</p>
        </Dropzone>
        {this.state.file.length > 0 ?
          <Snackbar
            open={this.state.openSuccess}
            message={`${this.state.file[0].name} was successfully uploaded! Your ${type} will change in a few seconds.`}
            autoHideDuration={3000}
            onRequestClose={this.handleRequestClose}
          /> : null
        }
        <Snackbar
          open={this.state.openFailure}
          message="Upload failed. Make sure to use .jpeg or .png!"
          autoHideDuration={3000}
          onRequestClose={this.failureClose}
        />
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
