const attachmentModel = require('../models/AttachmentModel');
const upload = require('../../utils/s3upload');
const imageThumbnail = require('image-thumbnail');

createThumbnail = async (attachment) => {
    let options = {width: 100, height: 100, responseType: 'base64'};
    try {
        const base64meta = attachment.split(',').shift();
        const b64 = attachment.replace(/^data:image.+;base64,/, '');
        const data = Buffer.from(b64, 'base64');
        let result = await imageThumbnail(data, options);
        return base64meta.concat(',', result);
    } catch (err) {
        console.error(err);
    }
}

exports.uploadAttachments = async (defectId, attachments) => {
    try {
        for (const attachment of attachments) {
            const fileName = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
            let path = await upload(fileName, attachment);
            await attachmentModel.create({defect_id: defectId, path});

            const thumbnail = await createThumbnail(attachment);
            path = await upload(fileName, thumbnail, true);
            await attachmentModel.create({defect_id: defectId, path});
        }
    } catch (e) {
        console.log("Error: ", e);
    }
}