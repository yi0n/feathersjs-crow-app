//const { query } = require("@feathersjs/express")

/**
 * What do I want from that Hook?
 * Every request must have an ACCOUNT SCOPE, with a WHERE-clause
 * WHERE accountId = {}
 *
 * @param {*} ctx
 * @returns
 */
async function isAccountUser(ctx){
  console.log('isAccountUser check', 'PATH: /'+ctx.path, 'TYPE:', ctx.type, 'METHOD:', ctx.method )
  const { query, user } = ctx.params

  //let inQuery = query["accountId"]; // || ctx.data.accountId
  //is in query as { '$eq': 1 }
  if( user == undefined ){
    Promise.reject(new Error('Account: Un-Authorized'));
  }else{
    const accountId = user.accountId
    Object.assign(query, { accountId: { '$eq': accountId}})
    //ctx.params.query = query
  }


  const service = ctx.path;
  const record = null;
  // const record = await service.findOne(
  //   { accountId: 0 }
  // )
  if(record){
    if( record.accountId.toString() == usersAccountId.toString() ){
      return ctx;
    }else{
      return Promise.reject(new Error('Account: Un-Authorized'));
    }
  }
  return ctx;
}
/**
 * Adds the Account-ID of a user to context.data object
 * @param {*} context
 * @returns
 */
function includeAccountId(context) {
  console.log('includeAccountId', 'PATH: /'+context.path, 'TYPE:', context.type, 'METHOD:', context.method )
  const { app } = context;
  const sequelize = app.get('sequelizeClient');
  const { account } = sequelize.models;
  const accountId = context.params.user.accountId;
  if( accountId == undefined || accountId == null ){
    //no accountId -> do nothing!
    return context;
  }
  context.data = Object.assign(context.data, { accountId: accountId})
  return context;
}

module.exports = {
  isAccountUser, includeAccountId
}
