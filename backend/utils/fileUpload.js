const multer = require('multer')
const fs = require('fs')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      let file_destination = 'public/profileImages';
      if (!fs.existsSync(file_destination)) {
        fs.mkdirSync(file_destination, { recursive: true }); // Create directory if it doesn't exist
      }
  
      cb(null, file_destination);
    },
    filename: function (req, file, cb) {
      let extname = path.extname(file.originalname); // Extract file extension
      let basename = path.basename(file.originalname, extname); // Extract file name without extension
      const uniqueSuffix = Date.now(); // Add unique timestamp
      cb(null, `${basename}-${uniqueSuffix}${extname}`); // Combine basename, timestamp, and extension
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
  });
  
  module.exports = upload;
  