const cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createImage = async (req, res) => {
    try {
        const { image } = req.body; 

        const result = await cloudinary.uploader.upload(image, {
            public_id: `${Date.now()}`, 
            resource_type: 'auto'
        });

        res.json(result);

    } catch (err) {
        res.status(500).send('Upload image Error!!!');
    }
};

exports.removeImage = async (req, res) => {
    try {
		const { public_id } = req.body; 

		const result = await cloudinary.uploader.destroy(public_id);
        res.json(result);

    } catch (err) {
        res.status(500).send('Remove image Error!!!');
    }
};
