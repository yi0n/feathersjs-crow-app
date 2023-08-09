const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const multer = require('multer');
const mult = multer(); //multipart middleware

//const { Upload } = require('./upload.class');
const hooks = require('./upload.hooks');

module.exports = function (app) {

  //app.use('/upload', new Upload(options, app));

  const blobStorage = fs( 'account/uploads/' );

  app.use(
    'upload',
    mult.single('upload_file'), //upload fieldname!
    function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    blobService({Model: blobStorage, returnUri: false })
  );

  const service = app.service('upload');
  service.hooks(hooks);
};
