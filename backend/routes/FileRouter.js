const router = require('express').Router();
const Constants = require('../constants/Constants');
const FileService = require('../services/FileService');
const formidable = require('formidable')();
const fs = require('fs');
const path = require('path');

const { FILE } = Constants.RESOURCES;

router.post(FILE.upload, (request, response) => {
	formidable.parse(request, (error, fields, files) => {
		if (error) {
			next(error);
			return;
		}
		const oldpath = files.image.path;
		const newpath = path.join(__dirname, '..', 'files', files.image.name);
		console.log(newpath);

		fs.rename(oldpath, newpath, function (error) {
			if (error) throw error;
			response.send(files);
		});

	});
});

router.get(FILE.image, (request, response) => {
	const { image } = request.params;
	if (image) {
		response.sendFile(path.join(__dirname, '..', 'files', image));
	}
});

/* FileService.upload(body)
	.then(uploadedFile => {
		response.send(uploadedFile);
	})
	.catch(error => console.error(error));
}); */

module.exports = router;