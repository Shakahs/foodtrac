// const Storage = require('@google-cloud/storage');
// const atob = require('atob');

// const key = require('../../googleUploadKey.json');

// const storage = Storage({
//   projectId: 'foodtrac-169019',
//   credentials: key,
// });

// const bucketName = 'foodtrac';

module.exports = {
  post(req) {
    console.log('IN UPLOAD CONTROLLER', req.body);
    // console.log('IN UPLOAD CONTROLLER decoded', atob(req.body.url));

    // const upload = storage.bucket(bucketName)
    //   .file('testimage2.jpeg')
    //   .createWriteStream();

    // upload.write(req.body.url);
    // upload.end();
  },
};
