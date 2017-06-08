const Storage = require('@google-cloud/storage');
const parseDataUri = require('parse-data-uri');
const uuidV4 = require('uuid/v4');
const mime = require('mime-types');
const key = require('../../googleCloudKey.json');

const storage = Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT,
  credentials: key,
});

const bucketName = process.env.GOOGLE_CLOUD_STORAGE_IMAGE_BUCKET;

module.exports = {
  post(req, res) {
    const parsed = parseDataUri(req.body.fileData);
    const newFilename = `${uuidV4()}.${mime.extension(parsed.mimeType)}`;


    const bucket = storage.bucket(bucketName)
      .file(newFilename)
      .createWriteStream({
        metadata: { contentType: parsed.mimeType },
        predefinedAcl: 'publicRead',
      });

    bucket.write(parsed.data);
    bucket.end();

    res.status(201).send('data received okay');
  },
};

