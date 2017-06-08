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

  upload(data) {
    // console.log('IN UPLOAD', data, {
    //   headers: { 'Content-Type': data.type },
    // });

    axios.post('/api/upload', data, {
      headers: { 'Content-Type': data.type },
    })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <Dropzone
          accept="image/jpeg, image/png"
          multiple={false}
          onDrop={(accepted) => {
            // const fr = new FileReader();
            // const binaryData = fr.readAsBinaryString(accepted[0]);
            this.handleDrop(accepted);
            this.upload(accepted[0]);
            console.log('DROPZONE ACCEPTED', accepted);
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
