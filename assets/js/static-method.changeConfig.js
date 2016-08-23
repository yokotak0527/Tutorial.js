/**
* @function Tutorial.changeConfig
*
* @desc  change Tutorial.js configuration.
* @param {(String|Object[])} name
* @param {String}            name.name
* @param {*}                 name.val
* @param {*}                 [val]
*/
static changeConfig(key, val){
  let confArr = Array.isArray(key) ? key : [{'key' : key, 'val' : val}];
  confArr.forEach( obj => __conf[obj.key] = obj.val );
}
