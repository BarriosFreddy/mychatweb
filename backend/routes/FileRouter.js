const router = require('express').Router();
const Constants = require('../constants/Constants');
const FileService = require('../services/FileService');
const formidable = require('formidable')();
const fs = require('fs');
const pathUtil = require('path');

const { FILE } = Constants.RESOURCES;

router.post(FILE.upload, (request, response) => {
	formidable.parse(request, (error, fields, files) => {
		if (error) {
			next(error);
			return;
		}
		const oldpath = files.image.path;
		const newpath = pathUtil.join(__dirname, '..', 'files', files.image.name);
		console.log(newpath);

		fs.rename(oldpath, newpath, function (error) {
			if (error) throw error;
			response.send(files);
		});

	});
});

router.get(FILE.image, (request, response) => {
	const { path } = request.params;
	if (path) {
		try {
			const filePath = pathUtil.join(__dirname, '..', 'files', path);
			const image = fs.readFileSync(filePath);
			const imageAsBase64 = Buffer.from(image).toString('base64');
			response.send(imageAsBase64);
		} catch (error) {
			response.send(null);
		}
	}
});

module.exports = router;