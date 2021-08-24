const router = require('express').Router();
const File = require('../models/file');

router.post('/', async (req, res) => {
	

	const obj = JSON.parse(JSON.stringify(req.body)); 
    console.log(obj.Download);
    try {
        const file = await File.findOne({ uuid: obj.Download});
        
        if(!file) {
            return res.render('download', { error: 'Link has been expired.'});
        } 
        return res.render('download', { uuid: file.uuid, fileName: file.filename, fileSize: file.size, downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}` });
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
});

module.exports = router;