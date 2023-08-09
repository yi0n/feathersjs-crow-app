const { Service } = require('feathers-sequelize');


exports.Surprisebox = class Surprisebox extends Service {
  get(id, params){
    return super.get(id, params);
  }
  create(data, params) {
    return super.create(data, params);
  }
  update(id, data, params){
    return super.update(id, data, params);
  }
  patch(id, data, params){
    // also patch for boxgroups and fruits in hooks
    // "changed" property indicates value of existing ID has changed
    return super.patch(id, data, params);
  }
  remove(id, params){
    return super.remove(id, params);
  }

  //hurts SR principle but for this datastructure ok
  createBoxgroups(groups){
    groups.forEach(group => {
      if( group.id != null ){
        //update existing group
        //console.log('Update: '+group.id+' '+group.name);
        this.boxgroupModel.update(group.id, { name: group.name } );
      }else{
        //create group
        //console.log('New: '+group.id+' '+group.name);
        this.boxgroupModel.create( { name: group.name } );
      }
      let currentGroupId = group.id;
      //create Fields for the current group
      this.createFruits(group.fruits, currentGroupId);
    });
  }
  createFruits(fruits, currentGroupId){
    fruits.forEach(field => {
      if( fruit.id != null ){
        //update existing fruit
        //console.log('Update: '+fruit.id+' '+fruit.name);
        this.fruitModel.update(fruit.id, { name: fruit.name } );
      }else{
        //create fruit
        //console.log('New: '+fruit.id+' '+fruit.name);
        this.fruitModel.create( { name: fruit.name } );
      }
    });
  }


};
