
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dhar2oawa',
    api_key: 826985248116649,
    api_secret: '4GVVWPqBo__iU6MA4ZDPWIEBL1Y',
});

module.exports = { cloudinary };