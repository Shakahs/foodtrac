import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import propSchema from '../../common/PropTypes';

class UploadDropzone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: [],
    };

    this.handleDrop = this.handleDrop.bind(this);
    this.upload = this.upload.bind(this);
  }

  handleDrop(file) {
    this.setState({ file });
  }

  upload(fileObj) {
    const reader = new FileReader();
    reader.onloadend = (event) => {
      const result = event.target.result;
      axios.post(`/api/brands/${this.props.brandId}/coverImage`, {
        userId: this.props.user.id,
        fileData: result,
      })
        .then(() =>
          setTimeout(() => this.props.getBrand(this.props.brandId), 3000),
        )
        .catch(err => console.log(err));
    };

    reader.readAsDataURL(fileObj);
  }

  render() {
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
        {this.state.file.length > 0
          ? <div>{this.state.file[0].name} was successfully uploaded! Your cover picture will change in a few seconds.</div>
          : null
        }
      </div>
    );
  }
}

UploadDropzone.propTypes = {
  brandId: propSchema.brandId,
  user: propSchema.user,
  getBrand: propSchema.getBrand,
};

export default UploadDropzone;
