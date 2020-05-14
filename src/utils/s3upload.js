const config = require('../config');

/**
 *
 * @param fileName {string}
 * @param base64 {string}
 * @param thumbnail {boolean}
 * @returns {Promise<string>}
 */
const imageUpload = async (fileName, base64, thumbnail = false) => {
    const AWS = require('aws-sdk');
    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    const base64Data = new Buffer.from(base64.replace(/^data:image\/\w+;base64,/, ""), 'base64');

    // Getting the file type, ie: jpeg, png or gif
    const type = base64.split(';')[0].split('/')[1];

    const originalOrThumbnail = thumbnail ? 'thumbnail' : 'original';
    const params = {
        Bucket: config.bucketName,
        Key: `public/img/defects/${originalOrThumbnail}/${fileName}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    }

    try {
        const {Location, Key} = await s3.upload(params).promise();
        console.log(`File uploaded successfully. ${Location}`);
        return Key;
    } catch (error) {
        throw error;
    }
}

module.exports = imageUpload;