import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class UploadDropzone extends Component {
  constructor() {
    super();
    this.state = {
      file: [],
    };
  }

  handleDrop(file) {
    this.setState({ file });
  }

  upload(fileObj) {
    const reader = new FileReader();

    reader.onloadend = function (event) {
      const result = event.target.result;
      axios.post('/api/upload', {
        fileData: result,
      })
        .then(res => console.log(res))
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
          ? <div>{this.state.file[0].name}</div>
          : null
        }
      </div>
    );
  }
}

export default UploadDropzone;
