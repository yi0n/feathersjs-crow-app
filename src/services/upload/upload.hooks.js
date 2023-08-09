const { authenticate } = require('@feathersjs/authentication').hooks;
const { isAccountUser } = require('../../hooks/authorization');
const dauria = require('dauria');

//this hooks happen on service from feathers-blob
//https://github.com/feathersjs-ecosystem/feathers-blob
function convertToURI(context){
  if( !context.data.uri && context.params.file ){
    const file = context.params.file;
    const uri = dauria.getBase64DataURI(file.buffer, file.mimetype);
    context.data = { uri: uri, id: file.originalname };
  }
}

function setStoragePath(context){
  const { app } = context;
  const upload_type = context.data.type
  const destination_map = {
    fruit_logo: "images/fruits/",
    comparision_icons: "images/",
    company_logo: "images/"
  }
  let subdirectory = ''
  const account_uuid = context.params.user.account.uuid;
  if( account_uuid == null || account_uuid == undefined){
    return Promise.reject(new Error('No account identifier'))
  }
  if( upload_type == undefined ){
    subdirectory = 'account/uploads/'
  }else{
    subdirectory = destination_map[upload_type]
  }

  const uploadService = app.service('upload')
  uploadService.Model.path = 'account/'+account_uuid+'/'+subdirectory

  return context
}

module.exports = {
  before: {
    all: [ authenticate('jwt'), isAccountUser],
    find: [],
    get: [],
    create: [ setStoragePath, convertToURI ],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
