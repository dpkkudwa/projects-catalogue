const multer = require("multer");

const fileStorage = multer.diskStorage({
  // Destination to store image
  destination: '/tmp',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + file.originalname)
  }
});

const upload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 1000000 // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(csv)$/)) {
       // upload only csv format
       return cb(new Error('Please upload a Image'))
     }
   cb(undefined, true)
  }
});

module.exports = {
  upload
}
