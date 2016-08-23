/**
* @function addEventListener
*
* @memberof Tutorial
* @instance
* @param    {String}   eventName
* @param    {String}   [name]
* @param    {Function} callback

* @return {String} - event listener name.
*/
addEventListener(eventName, name, callback){
  let _         = __privateMap.get(this);
  let conf      = __conf;
  let listener  = _.listener;
  if(typeof name === 'function'){
    callback = name;
    name     = 'el-'+this.id+'-'+Math.random().toString(36).slice(-10);
  }
  if(!listener[eventName]) return '';
  listener[eventName][name] = callback;
  return name;
}
