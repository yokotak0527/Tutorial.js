/**
* @function destory
*
* @memberof Tutorial
* @instance
*/
destory(){
  let _           = __privateMap.get(this);
  let instanceMgr = new InstanceManager();
  _.event.removeAllRlation();
  instanceMgr.unregister(this);
  // delete __instanceList['instance-'+this.id];
}
