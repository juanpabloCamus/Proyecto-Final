
require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
    cloud_name: 'dlt2bs82a', 
    api_key: '532413791729348', 
    api_secret: 'mIw9qujetzzWiez34e_JvdV67H8' 
  });

module.exports = { cloudinary };