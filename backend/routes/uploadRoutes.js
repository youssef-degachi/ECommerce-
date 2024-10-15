import path from 'path';
import express from 'express';
import multer from 'multer'; // to download files

const router = express.Router();
//diskStorage to set path 
const storage = multer.diskStorage({
    // Define a destination function to specify where the uploaded files will be stored

  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  // Define a filename function to specify the name of the uploaded file and date as specific key
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Define a fileFilter function to specify the allowed file types and validate the uploaded files
function fileFilter(req, file, cb) {
    // Specify the allowed file types
  const filetypes = /jpe?g|png|webp/;
    // Specify the allowed MIME types
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

    // Check if the file extension matches the allowed file types
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check if the MIME type matches the allowed MIME types
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
        // If the file passes the validation, call the callback with a null error and a value of true
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

// Import the multer library and create an instance with the storage and fileFilter functions
const upload = multer({ storage, fileFilter });

const uploadSingleImage = upload.single('image');

router.post('/', (req, res) => {
  // Define a function to handle the upload of a single image
  uploadSingleImage(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({
      message: 'Image uploaded successfully',
      image: `/${req.file.path}`,
    });
  });
});

export default router;
